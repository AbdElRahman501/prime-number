import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;
