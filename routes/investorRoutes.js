import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Investor from "../models/investor.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  const { email, password, role } = req.body; 
  try {
    const existing = await Investor.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newInvestor = new Investor({ email, password: hashedPassword, role });
    await newInvestor.save();

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Investor.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role }, // include role
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, role: user.role }); //send role back to frontend
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
