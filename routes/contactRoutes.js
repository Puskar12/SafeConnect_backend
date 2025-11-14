import express from "express";
import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    
    const contact = new Contact({ name, email, message });
    await contact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
      console.log(email)
      console.log(process.env.EMAIL_USER)

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: message,
      replyTo: email,
    });

    await transporter.sendMail({
      from: `Fraud Innovations <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Fraud Innovations!",
      text: `Hi ${name},\n\nThank you for reaching out to Fraud Innovations!\nWe have received your message and our team will get back to you soon.\n\nYour message:\n"${message}"\n\nBest regards,\nTeam Fraud Innovations`,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message" });
  }
});

export default router;
