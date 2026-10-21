import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { seedProducts, seedCategories } from "../data/seedProducts.js";
import { seedReviews, seedCoupons } from "../data/seedReviews.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../../data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

class StorageService {
  constructor() {
    this.initialized = false;
    this.memoryCache = null;
  }

  async init() {
    if (this.initialized) return;

    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      try {
        const raw = await fs.readFile(STORE_PATH, "utf-8");
        this.memoryCache = JSON.parse(raw);
      } catch (err) {
        // File doesn't exist, create default store
        this.memoryCache = {
          products: seedProducts,
          categories: seedCategories,
          reviews: seedReviews,
          coupons: seedCoupons,
          orders: [],
          contactInquiries: [],
          newsletterSubscribers: []
        };
        await fs.writeFile(STORE_PATH, JSON.stringify(this.memoryCache, null, 2), "utf-8");
      }
      this.initialized = true;
    } catch (error) {
      console.error("StorageService initialization failed:", error);
      throw error;
    }
  }

  async persist() {
    try {
      await fs.writeFile(STORE_PATH, JSON.stringify(this.memoryCache, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to persist data to store.json:", err);
    }
  }

  /* ---------------- PRODUCTS ---------------- */
  async getProducts({ category, search, sortBy, limit } = {}) {
    await this.init();
    let result = [...this.memoryCache.products];

    if (category && category.toLowerCase() !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.fullDesc && p.fullDesc.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (limit && Number(limit) > 0) {
      result = result.slice(0, Number(limit));
    }

    return result;
  }

  async getProductById(id) {
    await this.init();
    return this.memoryCache.products.find((p) => p.id === id) || null;
  }

  async getCategories() {
    await this.init();
    return this.memoryCache.categories;
  }

  /* ---------------- REVIEWS ---------------- */
  async getReviews({ rating, limit } = {}) {
    await this.init();
    let list = [...this.memoryCache.reviews];

    if (rating && Number(rating) > 0) {
      list = list.filter((r) => r.rating === Number(rating));
    }

    if (limit && Number(limit) > 0) {
      list = list.slice(0, Number(limit));
    }

    return list;
  }

  async addReview({ name, role, rating, product, comment }) {
    await this.init();
    const newReview = {
      id: Date.now(),
      name,
      avatar: name.charAt(0).toUpperCase() || "U",
      role: role || "Verified Buyer",
      rating: Number(rating),
      date: "Just now",
      product: product || "Electronics Store",
      comment,
      createdAt: new Date().toISOString()
    };

    this.memoryCache.reviews.unshift(newReview);
    await this.persist();
    return newReview;
  }

  /* ---------------- COUPONS ---------------- */
  async validateCoupon(code, orderAmount = 0) {
    await this.init();
    const cleanCode = (code || "").trim().toUpperCase();
    const coupon = this.memoryCache.coupons.find(
      (c) => c.code === cleanCode && c.isActive
    );

    if (!coupon) {
      return { valid: false, message: "Invalid or expired promo code" };
    }

    if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
      return {
        valid: false,
        message: `Order must be at least ₹${coupon.minOrderAmount.toLocaleString(
          "en-IN"
        )} to use this code`
      };
    }

    return {
      valid: true,
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      description: coupon.description
    };
  }

  /* ---------------- ORDERS ---------------- */
  async createOrder({ items, customer, couponCode, paymentMethod }) {
    await this.init();

    // Verify items against catalog and calculate pricing
    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const dbProduct = this.memoryCache.products.find((p) => p.id === item.id);
      if (!dbProduct) {
        throw new Error(`Product ${item.id} not found in catalog`);
      }
      const qty = Math.max(1, Number(item.quantity) || 1);
      const lineTotal = dbProduct.price * qty;
      subtotal += lineTotal;

      verifiedItems.push({
        id: dbProduct.id,
        name: dbProduct.name,
        price: dbProduct.price,
        quantity: qty,
        lineTotal
      });
    }

    // Apply Coupon
    let discountPercent = 0;
    let discountAmount = 0;
    if (couponCode) {
      const couponRes = await this.validateCoupon(couponCode, subtotal);
      if (couponRes.valid) {
        discountPercent = couponRes.discountPercent;
        discountAmount = Math.round((subtotal * discountPercent) / 100);
      }
    }

    const taxableAmount = subtotal - discountAmount;
    const gst = Math.round(taxableAmount * 0.18);
    const shipping = subtotal > 1000 ? 0 : 150;
    const grandTotal = taxableAmount + gst + shipping;

    const orderId = `DEP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      orderId,
      items: verifiedItems,
      subtotal,
      discountPercent,
      discountAmount,
      tax: gst,
      shipping,
      grandTotal,
      customer: {
        name: customer?.name || "Customer",
        email: customer?.email || "customer@example.com",
        phone: customer?.phone || "",
        address: customer?.address || "",
        city: customer?.city || "",
        pincode: customer?.pincode || ""
      },
      paymentMethod: paymentMethod || "upi",
      status: "Processing (Bangalore Dispatch Queue)",
      estimatedDelivery: "Same-Day Delivery (within 6 hours)",
      createdAt: new Date().toISOString()
    };

    this.memoryCache.orders.unshift(newOrder);
    await this.persist();
    return newOrder;
  }

  async getOrderById(orderId) {
    await this.init();
    return (
      this.memoryCache.orders.find(
        (o) => o.orderId.toUpperCase() === orderId.trim().toUpperCase()
      ) || null
    );
  }

  /* ---------------- CONTACT & SUPPORT ---------------- */
  async addContactMessage({ name, email, phone, type, subject, message }) {
    await this.init();
    const ticketId = `TCK-${Math.floor(10000 + Math.random() * 90000)}`;
    const inquiry = {
      ticketId,
      name,
      email,
      phone: phone || "",
      type: type || "Sales Inquiry",
      subject: subject || "General Inquiry",
      message,
      status: "Open",
      receivedAt: new Date().toISOString()
    };

    this.memoryCache.contactInquiries.unshift(inquiry);
    await this.persist();
    return inquiry;
  }

  /* ---------------- NEWSLETTER ---------------- */
  async addNewsletterSubscription(email) {
    await this.init();
    const cleanEmail = (email || "").trim().toLowerCase();
    const exists = this.memoryCache.newsletterSubscribers.find(
      (s) => s.email === cleanEmail
    );

    if (exists) {
      return { status: "already_subscribed", email: cleanEmail };
    }

    const subscriber = {
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    };
    this.memoryCache.newsletterSubscribers.unshift(subscriber);
    await this.persist();
    return { status: "subscribed", email: cleanEmail };
  }
}

export const storage = new StorageService();
