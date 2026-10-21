import { storage } from "../services/storageService.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items, customer, couponCode, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one valid item"
      });
    }

    if (!customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({
        success: false,
        message: "Customer name, email, and delivery address are required"
      });
    }

    const order = await storage.createOrder({
      items,
      customer,
      couponCode,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully! Dispatched to Bangalore fulfillment queue.",
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await storage.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${id} was not found`
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
