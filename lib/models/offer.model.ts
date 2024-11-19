import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  start: { type: String },
  end: { type: String },
  active: { type: Boolean, default: true },
});

const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);
export default Offer;
