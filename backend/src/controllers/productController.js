import { storage } from "../services/storageService.js";

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, sortBy, limit } = req.query;
    const products = await storage.getProducts({ category, search, sortBy, limit });
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await storage.getProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID '${id}' was not found`
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await storage.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const all = await storage.getProducts();
    const featured = all.filter((p) => p.isFeatured).slice(0, 8);
    res.json({
      success: true,
      count: featured.length,
      data: featured
    });
  } catch (error) {
    next(error);
  }
};
