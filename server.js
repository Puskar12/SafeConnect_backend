import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import jobRoutes from "./routes/jobRoutes.js";
import investorRoutes from "./routes/investorRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://safe-connect-backend.vercel.app/",
  credentials: true
}));


// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/investors", investorRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send("Fraud Innovations API Running"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
