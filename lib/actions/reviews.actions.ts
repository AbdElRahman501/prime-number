"use server";
import { Review as ReviewType } from "@/types";
import Review from "../models/reviews.model";
import { connectToDatabase } from "../mongoose";
import { tags } from "@/constants";
import { revalidateTag, unstable_cache } from "next/cache";

//fetch reviews for home page
export const fetchReviews = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const date = await Review.find({ active: true }).limit(10).lean();
      const reviews: ReviewType[] = JSON.parse(JSON.stringify(date));
      return reviews;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error fetching reviews: ${error.message}`);
      } else {
        throw new Error(`An unknown error occurred`);
      }
    }
  },
  [tags.reviews],
  {
    tags: [tags.reviews],
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);

//fetch all reviews for dashboard
export const fetchAllReviews = async () => {
  try {
    await connectToDatabase();
    const date = await Review.find({});
    const reviews: ReviewType[] = JSON.parse(JSON.stringify(date));
    return reviews;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching reviews: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

// Insert multiple products
export const insertManyReviews = async (reviews: Omit<ReviewType, "_id">[]) => {
  try {
    await connectToDatabase();
    return await Review.insertMany(reviews);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error inserting products: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

// delete review by id
export const deleteReviewById = async (review: ReviewType) => {
  const id = review._id;
  try {
    await connectToDatabase();
    await Review.findByIdAndDelete(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error deleting review with ID ${id}: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

// update review by id
export const updateReviewById = async (data: ReviewType) => {
  const { _id, ...updateData } = data;
  const updatedData = Object.fromEntries(
    Object.entries(updateData).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== null && value !== "",
    ),
  );
  try {
    await connectToDatabase();
    await Review.findByIdAndUpdate(_id, updatedData);
    revalidateTag(tags.reviews);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating review with ID ${_id}: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

// add review
export const addReview = async (review: Omit<ReviewType, "_id">) => {
  try {
    await connectToDatabase();
    await Review.create(review);
    revalidateTag(tags.reviews);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error adding review: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};
