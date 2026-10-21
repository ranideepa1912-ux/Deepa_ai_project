import { products as fallbackProducts, categories as fallbackCategories } from "../data/products";
import { initialReviews as fallbackReviews } from "../data/reviews";

const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || `Request failed with status ${res.status}`);
    }
    return json;
  } catch (error) {
    console.warn(`[API] ${endpoint} request failed:`, error.message);
    throw error;
  }
}

export const api = {
  // Products
  async getProducts({ category, search, sortBy } = {}) {
    try {
      const params = new URLSearchParams();
      if (category && category !== "All") params.append("category", category);
      if (search) params.append("search", search);
      if (sortBy) params.append("sortBy", sortBy);

      const qs = params.toString() ? `?${params.toString()}` : "";
      const res = await request(`/products${qs}`);
      return res.data;
    } catch {
      // Fallback to local memory if offline
      let list = [...fallbackProducts];
      if (category && category !== "All") {
        list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
      }
      if (sortBy === "price-low") list.sort((a, b) => a.price - b.price);
      if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);
      if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
      return list;
    }
  },

  async getProductById(id) {
    try {
      const res = await request(`/products/${id}`);
      return res.data;
    } catch {
      return fallbackProducts.find((p) => p.id === id) || null;
    }
  },

  async getCategories() {
    try {
      const res = await request("/products/categories");
      return res.data;
    } catch {
      return fallbackCategories;
    }
  },

  // Reviews
  async getReviews({ rating } = {}) {
    try {
      const qs = rating && rating !== "all" ? `?rating=${rating}` : "";
      const res = await request(`/reviews${qs}`);
      return res.data;
    } catch {
      let list = [...fallbackReviews];
      if (rating && rating !== "all") {
        list = list.filter((r) => r.rating === Number(rating));
      }
      return list;
    }
  },

  async submitReview(reviewData) {
    try {
      const res = await request("/reviews", {
        method: "POST",
        body: JSON.stringify(reviewData)
      });
      return res.data;
    } catch (err) {
      // Fallback local creation
      return {
        id: Date.now(),
        name: reviewData.name,
        avatar: reviewData.name.charAt(0).toUpperCase(),
        role: reviewData.role || "Verified Buyer",
        rating: Number(reviewData.rating),
        date: "Just now",
        product: reviewData.product || "Electronics Store",
        comment: reviewData.comment
      };
    }
  },

  // Coupons
  async validateCoupon(code, amount) {
    try {
      const res = await request("/coupons/validate", {
        method: "POST",
        body: JSON.stringify({ code, amount })
      });
      return res.data;
    } catch (error) {
      if (code?.trim().toUpperCase() === "DEEPA10") {
        return {
          valid: true,
          code: "DEEPA10",
          discountPercent: 10,
          description: "10% off storewide discount"
        };
      }
      throw error;
    }
  },

  // Orders
  async createOrder(orderPayload) {
    try {
      const res = await request("/orders", {
        method: "POST",
        body: JSON.stringify(orderPayload)
      });
      return res.data;
    } catch {
      // Fallback mock order creation
      return {
        orderId: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
        ...orderPayload,
        status: "Confirmed (Local Dispatch)",
        createdAt: new Date().toISOString()
      };
    }
  },

  // Contact
  async submitContact(formData) {
    return await request("/contact", {
      method: "POST",
      body: JSON.stringify(formData)
    });
  },

  // Newsletter
  async subscribeNewsletter(email) {
    return await request("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email })
    });
  },

  // AI Chat
  async askAi(message) {
    try {
      const res = await request("/chat", {
        method: "POST",
        body: JSON.stringify({ message })
      });
      return res.data.reply;
    } catch {
      return "I'm Deepa Electronics Assistant! We offer same-day delivery in Bangalore, 2-year comprehensive warranty, and 100% genuine guaranteed products.";
    }
  }
};
