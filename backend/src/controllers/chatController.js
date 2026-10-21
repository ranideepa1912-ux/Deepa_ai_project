import { storage } from "../services/storageService.js";

export const handleChat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const q = message.trim().toLowerCase();
    let reply = "I'm your Deepa Electronics Assistant! I can help you pick laptops, smartphones, monitors, audio gear, or answer questions about our Bangalore store and warranty.";

    if (q.includes("laptop") || q.includes("slatebook") || q.includes("programming") || q.includes("coding")) {
      reply = "For high performance, check out the SlateBook Pro 15 (₹1,24,999) featuring an Intel Core i9 14th Gen, 32GB RAM, 1TB NVMe SSD, and 3.2K OLED display. It's in stock for same-day delivery!";
    } else if (q.includes("phone") || q.includes("promax") || q.includes("mobile") || q.includes("smartphone")) {
      reply = "Our flagship smartphone is the ProMax Ultra X (₹79,999). It boasts a 200MP camera, 6.7\" 120Hz dynamic AMOLED screen, and 120W HyperCharge battery.";
    } else if (q.includes("audio") || q.includes("soundcore") || q.includes("headphone") || q.includes("earphone")) {
      reply = "The SoundCore Pro ANC is currently on SALE at ₹12,499 (down from ₹19,999). It features 40-hour battery life and adaptive hybrid noise cancellation up to -45dB.";
    } else if (q.includes("monitor") || q.includes("ultraview") || q.includes("screen") || q.includes("display")) {
      reply = "The UltraView 32\" Monitor offers crisp 4K UHD, 144Hz refresh rate, HDR600, and 90W USB-C single-cable connectivity for ₹34,999.";
    } else if (q.includes("coupon") || q.includes("discount") || q.includes("promo") || q.includes("offer")) {
      reply = "You can use code 'DEEPA10' at checkout for an instant 10% discount on your order! We also have 'TECH2025' for orders above ₹50,000.";
    } else if (q.includes("warranty") || q.includes("guarantee")) {
      reply = "Every product purchased at Deepa Electronic comes with our 2-Year Comprehensive Warranty, covering hardware defects with direct factory support.";
    } else if (q.includes("delivery") || q.includes("shipping") || q.includes("same day")) {
      reply = "We offer guaranteed Same-Day Delivery in Bangalore for orders placed before 2:00 PM, and 2-3 business days express delivery across all other Indian states!";
    } else if (q.includes("store") || q.includes("address") || q.includes("location") || q.includes("visit")) {
      reply = "Our flagship store is located at 12, Tech Plaza, MG Road, Bangalore – 560001. We are open Mon–Sat 9AM–9PM and Sunday 10AM–6PM.";
    }

    res.json({
      success: true,
      data: {
        reply,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};
