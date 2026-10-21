import { storage } from "../services/storageService.js";

export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim() || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    const result = await storage.addNewsletterSubscription(email);

    if (result.status === "already_subscribed") {
      return res.json({
        success: true,
        message: "You are already a VIP subscriber! Check your inbox for updates."
      });
    }

    res.status(201).json({
      success: true,
      message: "Subscribed! You'll receive VIP discounts and flash drop announcements."
    });
  } catch (error) {
    next(error);
  }
};
