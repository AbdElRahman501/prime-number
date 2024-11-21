import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name required."],
  },
  email: {
    type: String,
    unique: [true, "email already exists."],
    required: [true, "email required."],
  },
  password: {
    type: String,
    required: [true, "password required."],
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forceLogout: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
