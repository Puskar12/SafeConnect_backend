import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  applyLink: { type: String, default: "#" },
});

export default mongoose.model("Job", jobSchema);
