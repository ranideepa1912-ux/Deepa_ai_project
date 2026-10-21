import React, { useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
    formatPrice
  } = useCart();
  const { showToast } = useToast();

  const [promoCode, setPromoCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [checkoutData, setCheckoutData] = useState({
    name: "Arjun Verma",
    email: "arjun@example.com",
    address: "Flat 402, Skyline Residency, Indiranagar",
    city: "Bangalore",
    pincode: "560038",
    paymentMethod: "upi"
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "DEEPA10") {
      setDiscountRate(0.1);
      setAppliedPromo("DEEPA10 (10% OFF Applied)");
      showToast("Coupon 'DEEPA10' applied! 10% discount added.", "success");
    } else {
      showToast("Invalid coupon code. Try 'DEEPA10'", "info");
    }
  };

  const discountAmount = Math.round(totalPrice * discountRate);
  const taxableAmount = totalPrice - discountAmount;
  const estimatedTax = Math.round(taxableAmount * 0.18);
  const finalTotal = taxableAmount + estimatedTax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.warn("Confetti effect skipped", err);
    }

    const generatedId = "DEP-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderSuccess(true);
    clearCart();
    showToast(`Order #${generatedId} successfully placed!`, "success");
  };

  if (orderSuccess) {
    return (
      <div className="section-wrapper" style={{ paddingTop: "160px", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "var(--card)",
            border: "1px solid var(--border-neon)",
            borderRadius: "var(--radius-lg)",
            padding: "50px 30px",
            boxShadow: "0 20px 60px rgba(0,212,255,0.15)"
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontSize: "32px", marginBottom: "12px" }}>Order Confirmed!</h2>
          <p style={{ color: "var(--neon-blue)", fontWeight: 800, fontSize: "18px", marginBottom: "16px" }}>
            Order ID: {orderId}
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.7", marginBottom: "28px" }}>
            Thank you for shopping with Deepa Electronic. A confirmation with tracking details
            has been sent to your email. Your package is being packed at our Bangalore facility for
            same-day dispatch.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            <Link to="/products" className="btn-primary">
              Continue Shopping →
            </Link>
            <Link to="/" className="btn-outline">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="section-wrapper" style={{ paddingTop: "160px", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🛒</div>
        <h2>Your Shopping Cart is Empty</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "12px", maxWidth: "480px", margin: "12px auto 28px" }}>
          You don't have any gadgets or accessories in your cart yet. Explore our top picks this week and snag exclusive deals.
        </p>
        <Link to="/products" className="btn-primary">
          Explore Electronics Store →
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page section-wrapper" style={{ paddingTop: "140px" }}>
      <div style={{ marginBottom: "36px" }}>
        <div className="section-label">🛒 Checkout &amp; Review</div>
        <h1 className="section-title">
          Shopping Cart <span className="gradient-inline">({totalItems} items)</span>
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "50px",
          alignItems: "start"
        }}
      >
        {/* Cart Items List */}
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "30px" }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px"
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    flexShrink: 0
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ flexGrow: 1 }}>
                  <Link
                    to={`/products/${item.id}`}
                    style={{ fontSize: "16px", fontWeight: 700, display: "block", color: "var(--text)" }}
                  >
                    {item.name}
                  </Link>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {item.category}
                  </span>
                  <div style={{ marginTop: "6px", fontSize: "15px", fontWeight: 800, color: "var(--neon-blue)" }}>
                    {formatPrice(item.price)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 800, minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      marginLeft: "12px",
                      fontSize: "16px"
                    }}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Details Form */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "28px"
            }}
          >
            <h3 style={{ fontSize: "18px", marginBottom: "18px" }}>
              📍 Shipping &amp; Delivery Information
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div className="form-group">
                <label>Receiver Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={checkoutData.name}
                  onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email Notification</label>
                <input
                  type="email"
                  className="form-input"
                  value={checkoutData.email}
                  onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label>Street Address</label>
              <input
                type="text"
                className="form-input"
                value={checkoutData.address}
                onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-input"
                  value={checkoutData.city}
                  onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  className="form-input"
                  value={checkoutData.pincode}
                  onChange={(e) => setCheckoutData({ ...checkoutData, pincode: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "32px",
            position: "sticky",
            top: "100px"
          }}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>Order Summary</h3>

          {/* Coupon Code Section */}
          <form onSubmit={handleApplyPromo} style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
            <input
              type="text"
              placeholder="Promo Code (try DEEPA10)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="form-input"
              style={{ padding: "10px 14px", fontSize: "13px" }}
            />
            <button
              type="submit"
              className="btn-outline"
              style={{ padding: "10px 18px", fontSize: "13px" }}
            >
              Apply
            </button>
          </form>

          {appliedPromo && (
            <div
              style={{
                fontSize: "12px",
                color: "var(--neon-green)",
                background: "rgba(16, 185, 129, 0.1)",
                padding: "6px 12px",
                borderRadius: "6px",
                marginBottom: "20px"
              }}
            >
              ✓ {appliedPromo}
            </div>
          )}

          {/* Calculations */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--neon-green)" }}>
                <span>Discount (10%)</span>
                <span>- {formatPrice(discountAmount)}</span>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Express Shipping</span>
              <span style={{ color: "var(--neon-blue)", fontWeight: 700 }}>FREE</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Estimated GST (18%)</span>
              <span>{formatPrice(estimatedTax)}</span>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "14px",
                marginTop: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong style={{ fontSize: "18px" }}>Grand Total:</strong>
              <strong className="gradient-text" style={{ fontSize: "24px" }}>
                {formatPrice(finalTotal)}
              </strong>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="btn-primary"
            style={{ width: "100%", padding: "16px", fontSize: "16px" }}
          >
            ⚡ Place Order Now
          </button>

          <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginTop: "14px" }}>
            🔒 Safe 256-bit encrypted checkout with instant dispatch guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
