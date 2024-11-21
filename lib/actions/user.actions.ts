"use server";
import { Result, User as UserType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { User } from "../models/user.model";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
};
// insert store data
export const insertUsers = async (users: Omit<UserType, "_id">[]) => {
  try {
    await connectToDatabase();
    return await User.insertMany(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};

export const addUser = async (user: Omit<UserType, "_id">) => {
  try {
    await connectToDatabase();
    user.password = hashPassword(user.password);
    return await User.create(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};

export const getUsers = async () => {
  try {
    await connectToDatabase();
    const data = await User.find().select("-password").exec();
    const users: UserType[] = JSON.parse(JSON.stringify(data));
    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};

export const getUser = async (email?: string) => {
  try {
    await connectToDatabase();
    const data = await User.findOne({ email: email })
      .select("-password")
      .exec();
    const user: UserType = JSON.parse(JSON.stringify(data));
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};

export const updateUser = async (user: UserType): Promise<Result> => {
  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(user._id, user);
    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    return { success: false, message: "Error updating user" };
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserType | null> => {
  try {
    await connectToDatabase();
    const data = await User.findOne({ email: email }).exec();
    const user = JSON.parse(JSON.stringify(data));
    if (!user) return null;
    const [saltStored, hashedStored] = user.password.split(":");
    const hashedBuffer = scryptSync(password, saltStored, 64);
    const passwordsMatch = timingSafeEqual(
      Buffer.from(hashedStored, "hex"),
      hashedBuffer,
    );
    if (passwordsMatch) return user;
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};
