"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneNumber, Sort } from "@/types";
import Product from "../models/products.model";
import { connectToDatabase } from "../mongoose";
import { revalidateTag, unstable_cache } from "next/cache";
import { tags } from "@/constants";

// Fetch all products
export const fetchProducts = async (
  page: number = 1,
  limit: number = 10,
  sort?: "asc" | "desc",
  sortBy?: keyof PhoneNumber,
) => {
  try {
    await connectToDatabase();
    const products = await Product.find({})
      .sort({ [sortBy as keyof PhoneNumber]: sort === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalProducts = await Product.countDocuments({});
    const phoneNumbers: PhoneNumber[] = JSON.parse(JSON.stringify(products));

    return { phoneNumbers, totalProducts };
  } catch (error: any) {
    throw new Error(
      `Error fetching products with pagination: ${error.message}`,
    );
  }
};
// TODO : add save and cart and message buttons to increase score
export const increaseScore = async (id: string) => {
  try {
    await connectToDatabase();
    await Product.findOneAndUpdate({ _id: id }, { $inc: { score: 1 } });
  } catch (error: any) {
    throw new Error(
      `Error fetching products with pagination: ${error.message}`,
    );
  }
};

export const getQuickProducts = async (sort: Sort) => {
  try {
    if (sort === "Tr") return await fetchTopRatedProducts(4);
    if (sort === "Nst") return await fetchNewestProducts(4);
    return await fetchNewestProducts(4);
  } catch (error: any) {
    throw new Error(`Error fetching filtered products: ${error.message}`);
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
      throw new Error(`Error fetching filtered products: ${error.message}`);
    }
  },
  [tags.topRatedProducts],
  {
    tags: [tags.topRatedProducts],
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);

export const fetchNewestProducts = unstable_cache(
  async (limit: number) => {
    try {
      await connectToDatabase();
      const data = await Product.find({ active: true })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(limit); // Limit to the top result
      const phoneNumbers: PhoneNumber[] = JSON.parse(JSON.stringify(data));
      return phoneNumbers;
    } catch (error: any) {
      throw new Error(`Error fetching filtered products: ${error.message}`);
    }
  },
  [tags.newestProducts],
  {
    tags: [tags.newestProducts],
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
    throw new Error(`Error fetching all products: ${error.message}`);
  }
};

// Update a product by ID
export const updateProductById = async (id: string, formData: FormData) => {
  const updateData = Object.fromEntries(formData);
  try {
    await connectToDatabase();
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error: any) {
    throw new Error(`Error updating product with ID ${id}: ${error.message}`);
  }
};

// Delete a product by ID
export const deleteProductById = async (id: string) => {
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

// TODO: add edit and delete many products by array of ids
