"use server";

import { Offer as OfferType } from "@/types";
import { connectToDatabase } from "../mongoose";
import Offer from "../models/offer.model";
import { revalidateTag } from "next/cache";
import { tags } from "@/constants";

export const fetchAllOffers = async () => {
  try {
    await connectToDatabase();
    const data = await Offer.find({});
    const offers: OfferType[] = JSON.parse(JSON.stringify(data));
    return offers;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching offers: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

export const insertManyOffers = async (
  productsArray: Omit<OfferType, "_id">[],
) => {
  try {
    await connectToDatabase();
    return await Offer.insertMany(productsArray);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error inserting products: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

// delete offer by id

export const deleteOfferById = async (item: OfferType) => {
  const id = item._id;
  try {
    await connectToDatabase();
    await Offer.findByIdAndDelete(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error deleting offer with ID ${id}: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

// update offer by id

export const updateOfferById = async (data: OfferType) => {
  const { _id, ...updateData } = data;
  const updatedData = Object.fromEntries(
    Object.entries(updateData).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== null && value !== "",
    ),
  );
  try {
    await connectToDatabase();
    await Offer.findByIdAndUpdate(_id, updatedData);
    revalidateTag(tags.offers);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating offer with ID ${_id}: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};

// add offer

export const addOffer = async (offer: Omit<OfferType, "_id">) => {
  try {
    await connectToDatabase();
    await Offer.create(offer);
    revalidateTag(tags.offers);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating offer: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred`);
    }
  }
};
