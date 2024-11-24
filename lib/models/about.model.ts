import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // content type can vary depending on the block type
    required: true,
  },
  level: {
    type: String,
    enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
    default: "h2",
  },
});

const About = mongoose.models.About || mongoose.model("About", aboutSchema);
export default About;
