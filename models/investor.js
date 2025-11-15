import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["investor", "hr", "member"], default: "member" },
});

const Investor = mongoose.model("Investor", investorSchema);
export default Investor;
