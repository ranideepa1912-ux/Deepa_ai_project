import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("Subscribed! You'll receive VIP discounts in your inbox.", "success");
    setEmail("");
  };

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo" style={{ fontSize: "24px" }}>
            Deepa <span>Electronic</span>
          </div>
          <p>
            Your trusted destination for premier consumer tech, smartphones,
            laptops, smart audio, and cutting-edge electronic essentials since 2014.
          </p>
          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <span style={{ fontSize: "20px", cursor: "pointer" }}>🌐</span>
            <span style={{ fontSize: "20px", cursor: "pointer" }}>📱</span>
            <span style={{ fontSize: "20px", cursor: "pointer" }}>💼</span>
            <span style={{ fontSize: "20px", cursor: "pointer" }}>📸</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/about">About Deepa</Link></li>
            <li><Link to="/reviews">Customer Reviews</Link></li>
            <li><Link to="/contact">Contact & Store</Link></li>
            <li><Link to="/cart">Cart & Checkout</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Top Categories</h4>
          <ul>
            <li><Link to="/products?category=Smartphones">Smartphones 5G</Link></li>
            <li><Link to="/products?category=Laptops">Gaming & OLED Laptops</Link></li>
            <li><Link to="/products?category=Audio">ANC Headphones</Link></li>
            <li><Link to="/products?category=Wearables">Smartwatches</Link></li>
            <li><Link to="/products?category=Displays">4K Displays</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Stay in the Loop</h4>
          <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginBottom: "12px" }}>
            Subscribe to receive exclusive launches, flash discounts, and product drops.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Deepa Electronic. All rights reserved. Designed for speed & excellence.</p>
        <div className="footer-legal">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Deepa Electronic respects your privacy. All user transactions and details are 256-bit encrypted."); }}>Privacy Policy</a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: All products include official manufacturer warranty and 30-day replacement support."); }}>Terms of Service</a>
          <a href="#refund" onClick={(e) => { e.preventDefault(); alert("Refund Policy: 7-day hassle-free refund on unopened and defective merchandise."); }}>Refund Policy</a>
          <a href="#warranty" onClick={(e) => { e.preventDefault(); alert("2-Year Comprehensive Warranty provided on all premium gadgets."); }}>Warranty</a>
        </div>
      </div>
    </footer>
  );
}
