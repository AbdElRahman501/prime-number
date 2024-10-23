import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  phoneNumber: { type: String, required: true },
  company: { type: String },
});

const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);
export default Offer;
