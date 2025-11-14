import express from "express";
import Job from "../models/job.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Protected: Add new job
router.post("/", protect, async (req, res) => {
  const { title, description, location, applyLink } = req.body;
  try {
    const newJob = new Job({ title, description, location, applyLink });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
