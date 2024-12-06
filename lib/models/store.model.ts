import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String },
});

const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});
const featuresSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
const storeSchema = new mongoose.Schema({
  contacts: {
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    workHours: {
      start: { type: String },
      end: { type: String },
    },
  },
  socialMedia: [socialMediaSchema],
  features: [featuresSchema],
  links: [linkSchema],
});
const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);
export default Store;
