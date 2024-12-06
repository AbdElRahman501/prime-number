"use server";
import { Result, User as UserType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { User } from "../models/user.model";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Utility function to verify a password
const verifyPassword = (
  storedPassword: string,
  enteredPassword: string,
): boolean => {
  const [salt, storedHash] = storedPassword.split(":");
  const enteredHash = scryptSync(enteredPassword, salt, 64);
  return timingSafeEqual(Buffer.from(storedHash, "hex"), enteredHash);
};
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

export const addUser = async (user: Omit<UserType, "_id">): Promise<Result> => {
  try {
    await connectToDatabase();
    user.password = hashPassword(user.password);
    await User.create(user);
    return { success: true, message: "User added successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("duplicate")) {
        return {
          success: false,
          message: "هذا البريد الالكتروني موجود بالفعل",
        };
      }
    }
    return { success: false, message: "Error adding user" };
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
    if (error instanceof Error) {
      if (error.message.includes("duplicate")) {
        return {
          success: false,
          message: "هذا البريد الالكتروني موجود بالفعل",
        };
      }
    }
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
    const isPasswordValid = verifyPassword(user.password, password);
    if (isPasswordValid) return user;
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};

export const deleteUser = async (use: UserType) => {
  try {
    await connectToDatabase();
    await User.findByIdAndDelete(use._id);
    return { success: true, message: "User deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving store: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred at insertStore`);
    }
  }
};

export const changePassword = async (
  id: string,
  password: string,
  newPassword: string,
): Promise<Result> => {
  try {
    await connectToDatabase();
    const user = await User.findById(id).exec();
    if (!user) {
      return { success: false, message: "لم يتم العثور على المستخدم" };
    }

    const isPasswordValid = verifyPassword(user.password, password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "رقم السري الحالي الذي ادخلته غير صحيح",
      };
    }

    const hashedNewPassword = hashPassword(newPassword);
    await User.findByIdAndUpdate(id, { password: hashedNewPassword });

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
};
