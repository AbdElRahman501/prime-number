import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    category: { type: String },
    description: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    company: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
