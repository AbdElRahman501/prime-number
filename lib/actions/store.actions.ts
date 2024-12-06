"use server";
import { contacts, Feature, Link, Result, Store as StoreType } from "@/types";
import { connectToDatabase } from "../mongoose";
import Store from "../models/store.model";
import { revalidateTag, unstable_cache } from "next/cache";
import { tags } from "@/constants";

// insert store data
export const insertStore = async (store: StoreType) => {
  try {
    await connectToDatabase();
    const newStore = new Store(store);
    const result = await newStore.save();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};

// fetch store data
export const fetchStoreData = async () => {
  try {
    await connectToDatabase();
    const data = await Store.findOne({});
    const store: StoreType = JSON.parse(JSON.stringify(data));
    return store;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at fetchStore`);
    }
  }
};

// fetch cashed store data
export const fetchStore = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const data = await Store.findOne({});
      const store: StoreType = JSON.parse(JSON.stringify(data));
      return store;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching store: ${error.message}`);
      } else {
        throw new Error(`An unknown error occurred at fetchStore`);
      }
    }
  },
  [tags.store],
  {
    tags: [tags.store],
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);

export const updateStore = async (
  data: Partial<{
    contacts: contacts;
    socialMedia: Omit<Link, "_id">[];
    links: Omit<Link, "_id">[];
    features: Omit<Feature, "_id">[];
  }>,
): Promise<Result> => {
  try {
    await connectToDatabase();
    await Store.findOneAndUpdate({}, data);
    revalidateTag(tags.store);
    return {
      success: true,
      message: "Store updated successfully.",
    };
  } catch (error: unknown) {
    console.error("Error updating store:", error);
    return { success: false, message: "Error updating store" };
  }
};
