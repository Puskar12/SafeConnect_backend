import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["investor", "hr"], default: "investor" },
});

const Investor = mongoose.model("Investor", investorSchema);
export default Investor;
