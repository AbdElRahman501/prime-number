"use server";
import { AboutBlock, Result } from "@/types";
import { connectToDatabase } from "../mongoose";
import About from "../models/about.model";
import { revalidateTag, unstable_cache } from "next/cache";
import { tags } from "@/constants";

export const insertAboutData = async (
  about: Omit<AboutBlock, "_id">[],
  reset?: boolean,
) => {
  try {
    await connectToDatabase();
    if (reset) {
      await About.collection.drop();
    }
    const data = await About.insertMany(about);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving about Data: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertAboutData`);
    }
  }
};

export const getAboutData = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const data = await About.find({});
      const about: AboutBlock[] = JSON.parse(JSON.stringify(data));
      return about;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching about Data: ${error.message}`);
      } else {
        throw new Error(`An unknown error occurred at getAboutData`);
      }
    }
  },
  [tags.about],
  {
    tags: [tags.about],
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);

export const getAllAboutDate = async () => {
  try {
    await connectToDatabase();
    const data = await About.find({}).select("-__v");
    const about: AboutBlock[] = JSON.parse(JSON.stringify(data));
    return about;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching about Data: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at getAllAboutDate`);
    }
  }
};

export const updateAbout = async (
  data: Omit<AboutBlock, "_id">[],
): Promise<Result> => {
  try {
    await connectToDatabase();
    await About.deleteMany({});
    await About.insertMany(data);
    revalidateTag(tags.about);
    return {
      success: true,
      message: "About updated successfully.",
    };
  } catch (error: unknown) {
    console.error("Error updating About:", error);
    return { success: false, message: "Error updating About" };
  }
};
