import { storage } from "../services/storageService.js";

export const getReviews = async (req, res, next) => {
  try {
    const { rating, limit } = req.query;
    const reviews = await storage.getReviews({ rating, limit });
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { name, role, rating, product, comment } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!comment || !comment.trim()) {
      return res.status(400).json({ success: false, message: "Review comment is required" });
    }
    const numRating = Number(rating);
    if (!numRating || numRating < 1 || numRating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const newReview = await storage.addReview({
      name: name.trim(),
      role: (role || "").trim(),
      rating: numRating,
      product: (product || "").trim(),
      comment: comment.trim()
    });

    res.status(201).json({
      success: true,
      message: "Review successfully published",
      data: newReview
    });
  } catch (error) {
    next(error);
  }
};
