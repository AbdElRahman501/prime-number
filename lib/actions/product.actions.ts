"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyName, CompanyProductCount, PhoneNumber, Sort } from "@/types";
import Product from "../models/products.model";
import { connectToDatabase } from "../mongoose";
import { revalidateTag, unstable_cache } from "next/cache";
import { tags } from "@/constants";

interface FetchOptions {
  page?: number;
  limit: number;
  sort?: "asc" | "desc";
  sortBy?: keyof PhoneNumber;
  query?: string;
}
interface FilterOptions {
  limit: number;
  companies?: CompanyName[];
  sort?: "asc" | "desc";
  maxPrice: number;
  minPrice: number;
  sortBy?: keyof PhoneNumber;
  query?: string;
}

// Fetch all products
export const fetchProducts = async ({
  page = 1,
  limit,
  sort,
  sortBy,
  query = "",
}: FetchOptions) => {
  const sortByField = sortBy ? sortBy : "_id"; // Default to '_id' if sortBy is undefined
  const sortOrder = sort === "asc" ? 1 : -1; // Default to descending if sort is undefined
  const searchCriteria = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { phoneNumber: { $regex: query, $options: "i" } },
          { company: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  try {
    await connectToDatabase();
    const totalProducts = await Product.countDocuments(searchCriteria);
    const products = await Product.find(searchCriteria)
      .sort({ [sortByField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);
    const phoneNumbers: PhoneNumber[] = JSON.parse(JSON.stringify(products));

    return { phoneNumbers, totalProducts };
  } catch (error: any) {
    throw new Error(
      `Error fetching products with pagination: ${error.message}`,
    );
  }
};

export const fetchFilteredProducts = unstable_cache(
  async ({
    limit,
    sort,
    companies = [],
    maxPrice,
    minPrice,
    sortBy,
    query = "",
  }: FilterOptions) => {
    const sortByField = sortBy ? sortBy : "_id"; // Default to '_id' if sortBy is undefined
    const sortOrder = sort === "asc" ? 1 : -1; // Default to descending if sort is undefined
    const priceFilterCondition = {
      price: { $gte: minPrice, $lte: maxPrice },
    };

    const companiesCondition =
      Array.isArray(companies) && companies.length > 0
        ? {
            company: {
              $in: companies.map(
                (c: string) => new RegExp(`\\b${c || ""}\\b`, "i"),
              ),
            },
          }
        : {};

    const searchCriteria = query
      ? {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { phoneNumber: { $regex: query, $options: "i" } },
            { company: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const finalQuery = {
      $and: [
        searchCriteria,
        priceFilterCondition,
        companiesCondition,
        { active: true },
      ],
    };

    try {
      await connectToDatabase();
      const totalProducts = await Product.countDocuments(finalQuery);
      const products = await Product.find(finalQuery)
        .sort({ [sortByField]: sortOrder })
        .limit(limit);
      const phoneNumbers: PhoneNumber[] = JSON.parse(JSON.stringify(products));

      return { phoneNumbers, totalProducts };
    } catch (error: any) {
      throw new Error(
        `Error fetching products with pagination: ${error.message}`,
      );
    }
  },
  [tags.products],
  {
    tags: [tags.products],
    revalidate: 60 * 60 * 24 * 2, // 2 days
  },
);

export const fetchProductsByPhoneNumbers = async (phoneNumbers: string[]) => {
  try {
    await connectToDatabase();
    const data = await Product.find({
      phoneNumber: { $in: phoneNumbers },
      active: true,
    });
    const products: PhoneNumber[] = JSON.parse(JSON.stringify(data));
    return products;
  } catch (error: any) {
    throw new Error(
      `Error fetching products with IDs ${phoneNumbers.join(", ")}: ${error.message}`,
    );
  }
};

export const increaseScore = async (phoneNumber: string) => {
  try {
    await connectToDatabase();
    await Product.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { $inc: { score: 1 } },
    );
  } catch (error: any) {
    throw new Error(
      `Error increasing score for phone number: ${error.message}`,
    );
  }
};

export const getQuickProducts = async (sort: Sort) => {
  try {
    if (sort === "Tr") return await fetchTopRatedProducts(4);
    if (sort === "Nst") return await fetchNewestProducts(4);
    return await fetchNewestProducts(4);
  } catch (error: any) {
    throw new Error(`Error fetching Quick Products : ${error.message}`);
  }
};

export const fetchTopRatedProducts = unstable_cache(
  async (limit: number) => {
    try {
      await connectToDatabase();
      const data = await Product.find({ active: true })
        .sort({ score: -1 }) // Sort by score in descending order
        .limit(limit); // Limit to the top result
      const phoneNumbers: PhoneNumber[] = JSON.parse(JSON.stringify(data));
      return phoneNumbers;
    } catch (error: any) {
      throw new Error(`Error fetching Top rated Products: ${error.message}`);
    }
  },
  [tags.topRatedProducts, tags.products],
  {
    tags: [tags.topRatedProducts, tags.products],
    revalidate: 60 * 60 * 24 * 2, // 2 days
  },
);

export const fetchNewestProducts = unstable_cache(
  async (limit: number) => {
    try {
      const top = await fetchTopRatedProducts(4);
      const excludedIds = top.map((product) => product._id);

      await connectToDatabase();
      const data = await Product.find({
        active: true,
        _id: { $nin: excludedIds },
      })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(limit); // Limit to the top result
      const phoneNumbers: PhoneNumber[] = JSON.parse(JSON.stringify(data));
      return phoneNumbers;
    } catch (error: any) {
      throw new Error(`Error fetching Newest Products: ${error.message}`);
    }
  },
  [tags.newestProducts, tags.products],
  {
    tags: [tags.newestProducts, tags.products],
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);

// Insert multiple products
export const insertManyProducts = async (
  productsArray: Omit<PhoneNumber, "_id">[],
) => {
  try {
    await connectToDatabase();
    return await Product.insertMany(productsArray);
  } catch (error: any) {
    throw new Error(`Error inserting products: ${error.message}`);
  }
};

export const addProduct = async (product: Omit<PhoneNumber, "_id">) => {
  try {
    await connectToDatabase();
    await Product.create(product);
    revalidateTag(tags.products);
  } catch (error: any) {
    throw new Error(`Error adding product: ${error.message}`);
  }
};

// Update a product by ID
export const updateProductById = async (data: PhoneNumber) => {
  const { _id, ...updateData } = data;
  const updatedData = Object.fromEntries(
    Object.entries(updateData).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== null && value !== "",
    ),
  );
  try {
    await connectToDatabase();
    await Product.findByIdAndUpdate(_id, updatedData);
    revalidateTag(tags.products);
  } catch (error: any) {
    throw new Error(`Error updating product with ID ${_id}: ${error.message}`);
  }
};

export const switchProductActive = async (data: PhoneNumber) => {
  const { _id, ...updateData } = data;
  try {
    await connectToDatabase();
    await Product.findOneAndUpdate({ _id }, { active: !updateData.active });
    revalidateTag(tags.products);
  } catch (error: any) {
    throw new Error(`Error updating product with ID ${_id}: ${error.message}`);
  }
};

// Delete a product by ID
export const deleteProductById = async (item: PhoneNumber) => {
  const id = item._id;
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    revalidateTag(tags.products);
  } catch (error: any) {
    throw new Error(`Error deleting product with ID ${id}: ${error.message}`);
  }
};

// Fetch a product by ID
export const fetchProductById = async (id: string) => {
  try {
    await connectToDatabase();
    return await Product.findById(id);
  } catch (error: any) {
    throw new Error(`Error fetching product with ID ${id}: ${error.message}`);
  }
};
// Fetch a product by phone number
export const fetchProductByPhoneNumber = async (phoneNumber: string) => {
  try {
    await connectToDatabase();
    return await Product.findOne({ phoneNumber });
  } catch (error: any) {
    throw new Error(
      `Error fetching product with phoneNumber ${phoneNumber}: ${error.message}`,
    );
  }
};

export const countProductsByCompanies = unstable_cache(
  async (companyNames: string[]): Promise<CompanyProductCount[]> => {
    try {
      await connectToDatabase();
      const productCounts = await Product.aggregate([
        { $match: { company: { $in: companyNames }, active: true } },
        { $group: { _id: "$company", count: { $sum: 1 } } },
        { $project: { company: "$_id", count: 1, _id: 0 } },
      ]);
      return productCounts;
    } catch (error: any) {
      throw new Error(
        `Error counting products for companies ${companyNames.join(", ")}: ${error.message}`,
      );
    }
  },
  [tags.productCounts, tags.products],
  {
    tags: [tags.productCounts, tags.products],
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);
