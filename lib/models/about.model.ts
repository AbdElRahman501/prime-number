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
});

const About = mongoose.models.About || mongoose.model("About", aboutSchema);
export default About;
