import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useToast } from "../context/ToastContext";
import { api } from "../services/api";
import { products as fallbackProducts } from "../data/products";
import { initialReviews } from "../data/reviews";

export default function HomePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [featuredProducts, setFeaturedProducts] = useState(fallbackProducts.slice(0, 8));
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    let isMounted = true;
    api.getProducts().then((data) => {
      if (isMounted && data && data.length > 0) {
        setFeaturedProducts(data.filter((p) => p.isFeatured).slice(0, 8));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const handleOpenAi = () => {
    if (window.voiceflow && window.voiceflow.chat) {
      window.voiceflow.chat.open();
    } else {
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    try {
      const res = await api.submitContact(formData);
      showToast(res.message || "Message sent! Ticket created.", "success");
    } catch {
      showToast("Message sent! Our support team will reply within 1 hour.", "success");
    }

    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="home-page">
      {/* ===================== HERO SECTION ===================== */}
      <section id="hero">
        <div className="hero-glow glow-1"></div>
        <div className="hero-glow glow-2"></div>

        <div className="hero-content">
          <div className="hero-badge fade-up delay-1">
            ⚡ New Arrivals 2025 — Shop Now
          </div>

          <h1 className="hero-title fade-up delay-2">
            Next-Gen Tech,<br />
            <span className="gradient-text">Delivered Fast.</span>
          </h1>

          <p className="hero-sub fade-up delay-3">
            Explore the latest smartphones, laptops, gadgets &amp; accessories —
            all at unbeatable prices with lightning-fast delivery and comprehensive 2-year warranty.
          </p>

          <div className="hero-btns fade-up delay-4">
            <button
              className="btn-primary"
              onClick={() => navigate("/products")}
            >
              Shop Now →
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
            <button
              className="btn-outline"
              onClick={handleOpenAi}
              style={{
                borderColor: "var(--neon-blue)",
                color: "var(--neon-blue)"
              }}
            >
              Chat with AI 🤖
            </button>
          </div>

          <div className="hero-stats fade-up delay-4">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>2K+</h3>
              <p>Products</p>
            </div>
            <div className="stat-item">
              <h3>99%</h3>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit-ring orbit-1"></div>
          <div className="orbit-ring orbit-2"></div>
          <div className="center-icon">💻</div>
        </div>
      </section>

      {/* ===================== PRODUCTS SECTION ===================== */}
      <section id="products" className="section-wrapper" style={{ background: "var(--surface)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
          <div>
            <div className="section-label">⚡ Featured Products</div>
            <h2 className="section-title">
              Top Picks <span className="gradient-inline">This Week</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Hand-picked from thousands of listings — the best tech at the best prices.
            </p>
          </div>
          <Link to="/products" className="btn-outline" style={{ borderColor: "var(--neon-blue)", color: "var(--neon-blue)" }}>
            View Full Catalog ({featuredProducts.length}+) →
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section id="about" className="section-wrapper" style={{ background: "var(--bg)" }}>
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-card ac1">
              <div className="aicon">🏆</div>
              <h4>10+ Years</h4>
              <p>Trusted electronics retailer since 2014</p>
            </div>
            <div className="about-card ac2">
              <div className="aicon">🚚</div>
              <h4>Same Day</h4>
              <p>Delivery within city limits</p>
            </div>
            <div className="about-card ac3">
              <div className="aicon">🛡️</div>
              <h4>2-Year Warranty</h4>
              <p>On all products, no questions asked</p>
            </div>
          </div>

          <div>
            <div className="section-label">✨ About Us</div>
            <h2 className="section-title">
              Why Choose <span className="gradient-inline">Deepa?</span>
            </h2>
            <div className="neon-divider"></div>
            <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: "1.8", marginBottom: "24px" }}>
              Deepa Electronic has been at the forefront of consumer electronics retail for over a decade.
              We bring you the latest and greatest in tech, curated and verified by our team of hardware experts.
            </p>

            <div className="about-features">
              <div className="feat-item">
                <div className="feat-icon">✅</div>
                <div className="feat-text">
                  <h5>100% Genuine Products</h5>
                  <p>All items are sourced directly from authorized distributors with verified authenticity and manufacturer seals.</p>
                </div>
              </div>
              <div className="feat-item">
                <div className="feat-icon">💰</div>
                <div className="feat-text">
                  <h5>Best Price Guarantee</h5>
                  <p>Find it cheaper elsewhere? We'll match the price instantly — no questions asked.</p>
                </div>
              </div>
              <div className="feat-item">
                <div className="feat-icon">🔧</div>
                <div className="feat-text">
                  <h5>Expert Support</h5>
                  <p>Our tech-savvy team is available 24/7 to help you choose, configure, and troubleshoot your devices.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "32px" }}>
              <Link to="/about" className="btn-primary">
                Explore Our Heritage →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS SECTION ===================== */}
      <section id="testimonials" className="section-wrapper" style={{ background: "var(--surface)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "48px" }}>
          <div>
            <div className="section-label">💬 Reviews</div>
            <h2 className="section-title">
              What Our <span className="gradient-inline">Customers Say</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Real reviews from happy customers across India.
            </p>
          </div>
          <Link to="/reviews" className="btn-outline">
            See All Reviews &amp; Ratings →
          </Link>
        </div>

        <div className="testi-grid">
          {initialReviews.slice(0, 3).map((rev) => (
            <div key={rev.id} className="testi-card">
              <div className="stars">{"★".repeat(rev.rating)}</div>
              <p className="testi-text">"{rev.comment}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{rev.avatar}</div>
                <div>
                  <div className="testi-name">{rev.name}</div>
                  <div className="testi-role">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CONTACT SECTION ===================== */}
      <section id="contact" className="section-wrapper" style={{ background: "var(--bg)" }}>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-label">📬 Get In Touch</div>
            <h2 className="section-title" style={{ fontSize: "36px" }}>
              Let's Talk<br />
              <span className="gradient-inline">Electronics!</span>
            </h2>
            <p>
              Have a question or custom corporate order? We'd love to hear from you.
              Reach out and our team will respond within 1 hour.
            </p>

            <div className="contact-item">
              <span className="cicon">📍</span>
              <span>12, Tech Plaza, MG Road, Bangalore – 560001</span>
            </div>
            <div className="contact-item">
              <span className="cicon">📞</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <span className="cicon">✉️</span>
              <span>hello@deepaelectronic.in</span>
            </div>
            <div className="contact-item">
              <span className="cicon">🕐</span>
              <span>Mon–Sat: 9AM–9PM | Sun: 10AM–6PM</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <input
                id="cf-name"
                className="form-input"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                id="cf-email"
                className="form-input"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                id="cf-subject"
                className="form-input"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="form-group">
              <textarea
                id="cf-msg"
                className="form-textarea"
                placeholder="Your Message…"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{
                alignSelf: "flex-start",
                background: contactSubmitted
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "var(--gradient)"
              }}
            >
              {contactSubmitted ? "Sent! ✓" : "Send Message →"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
