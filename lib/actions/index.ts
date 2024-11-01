"use server";
import { deleteProductById, updateProductById } from "./product.actions";

export const removeAction = async (id: string, type?: "product" | "offer") => {
  if (type === "product") {
    await deleteProductById(id);
  } else {
    console.log("not implemented yet");
  }
};

export const editAction = async (formData: FormData) => {
  const { id, NAME } = Object.fromEntries(formData) as {
    id: string;
    NAME?: "product" | "offer";
  };
  if (NAME === "product") {
    await updateProductById(id, formData);
  } else {
    console.log("not implemented yet");
  }
};
