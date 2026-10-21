import { storage } from "../services/storageService.js";

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, type, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Valid email is required" });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message cannot be empty" });
    }

    const inquiry = await storage.addContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      type: (type || "Sales Inquiry").trim(),
      subject: (subject || "General Inquiry").trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! A ticket has been created and our hardware team will reply within 1 hour.",
      ticketId: inquiry.ticketId,
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};
