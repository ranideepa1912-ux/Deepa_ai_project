import { storage } from "../services/storageService.js";

export const validateCoupon = async (req, res, next) => {
  try {
    const { code, amount } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required"
      });
    }

    const result = await storage.validateCoupon(code, Number(amount) || 0);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }

    res.json({
      success: true,
      message: `Coupon '${result.code}' applied successfully!`,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
