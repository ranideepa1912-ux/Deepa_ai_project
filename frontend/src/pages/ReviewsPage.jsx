import React, { useState } from "react";
import { initialReviews } from "../data/reviews";
import { products } from "../data/products";
import { useToast } from "../context/ToastContext";

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [starFilter, setStarFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    rating: 5,
    product: products[0]?.name || "ProMax Ultra X",
    comment: ""
  });

  const filteredReviews = reviewsList.filter((r) => {
    if (starFilter === "all") return true;
    return r.rating === parseInt(starFilter, 10);
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const created = {
      id: Date.now(),
      name: newReview.name,
      avatar: newReview.name.charAt(0).toUpperCase() || "U",
      role: newReview.role || "Verified Buyer",
      rating: Number(newReview.rating),
      date: "Just now",
      product: newReview.product,
      comment: newReview.comment
    };

    setReviewsList([created, ...reviewsList]);
    setShowModal(false);
    showToast("Thank you! Your verified review has been published.", "success");
    setNewReview({
      name: "",
      role: "",
      rating: 5,
      product: products[0]?.name || "ProMax Ultra X",
      comment: ""
    });
  };

  return (
    <div className="reviews-page section-wrapper" style={{ paddingTop: "140px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}>
        <div className="section-label">💬 Customer Feedback</div>
        <h1 className="section-title">
          Real Stories from <br />
          <span className="gradient-inline">Real Tech Enthusiasts</span>
        </h1>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          Discover what thousands of tech lovers across India experience when shopping with Deepa Electronic.
        </p>
      </div>

      {/* Ratings Summary Card */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "40px",
          marginBottom: "50px",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr auto",
          gap: "40px",
          alignItems: "center"
        }}
      >
        {/* Score Column */}
        <div style={{ textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: "30px" }}>
          <div style={{ fontSize: "56px", fontWeight: 900, lineHeight: 1 }} className="gradient-text">
            4.9
          </div>
          <div className="stars" style={{ fontSize: "22px", margin: "10px 0" }}>
            ★★★★★
          </div>
          <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Based on 50,000+ verified customer reviews
          </div>
        </div>

        {/* Breakdown Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { stars: "5 Stars", pct: 92 },
            { stars: "4 Stars", pct: 6 },
            { stars: "3 Stars", pct: 2 },
            { stars: "2 Stars", pct: 0 },
            { stars: "1 Star",  pct: 0 }
          ].map((bar, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "13px" }}>
              <span style={{ width: "55px", color: "var(--text-muted)" }}>{bar.stars}</span>
              <div
                style={{
                  flexGrow: 1,
                  height: "8px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${bar.pct}%`,
                    height: "100%",
                    background: "var(--gradient)",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <span style={{ width: "35px", textAlign: "right", color: "var(--text-muted)" }}>
                {bar.pct}%
              </span>
            </div>
          ))}
        </div>

        {/* CTA Column */}
        <div style={{ textAlign: "center" }}>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            ✍️ Leave a Review
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "32px", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>Filter by rating:</span>
        {["all", "5", "4"].map((val) => (
          <button
            key={val}
            onClick={() => setStarFilter(val)}
            style={{
              padding: "6px 16px",
              borderRadius: "50px",
              border: starFilter === val ? "1px solid var(--neon-blue)" : "1px solid var(--border)",
              background: starFilter === val ? "rgba(0,212,255,0.15)" : "transparent",
              color: starFilter === val ? "var(--neon-blue)" : "var(--text-muted)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {val === "all" ? "All Reviews" : `${val} Stars Only`}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="testi-grid">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="testi-card">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div className="stars" style={{ margin: 0 }}>
                  {"★".repeat(rev.rating)}
                </div>
                {rev.date && (
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {rev.date}
                  </span>
                )}
              </div>

              {rev.product && (
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--neon-blue)",
                    background: "rgba(0,212,255,0.1)",
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: "50px",
                    marginBottom: "14px"
                  }}
                >
                  Verified Purchase: {rev.product}
                </div>
              )}

              <p className="testi-text">"{rev.comment}"</p>
            </div>

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

      {/* Modal for Leave a Review */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 10002,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-neon)",
              borderRadius: "var(--radius-lg)",
              padding: "36px",
              width: "500px",
              maxWidth: "100%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "22px" }}>Share Your Experience</h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "20px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Vikram Sharma"
                />
              </div>

              <div className="form-group">
                <label>Your Title or City</label>
                <input
                  type="text"
                  className="form-input"
                  value={newReview.role}
                  onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  placeholder="e.g. Creator, Bangalore"
                />
              </div>

              <div className="form-group">
                <label>Product Purchased</label>
                <select
                  className="form-select"
                  value={newReview.product}
                  onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating (Stars)</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        border: newReview.rating === star ? "1px solid #fbbf24" : "1px solid var(--border)",
                        background: newReview.rating === star ? "rgba(251,191,36,0.15)" : "transparent",
                        color: "#fbbf24",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Review *</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: "100px" }}
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Describe your delivery speed, product quality, or customer support..."
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Review →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
