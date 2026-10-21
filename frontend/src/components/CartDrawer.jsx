import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
    formatPrice
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />

      <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>
            Shopping Cart <span style={{ color: "var(--neon-blue)" }}>({totalItems})</span>
          </h3>
          <button
            className="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h4>Your cart is empty</h4>
              <p style={{ marginTop: "8px", fontSize: "14px" }}>
                Explore our catalog of smartphones, laptops, audio gear, and more.
              </p>
              <Link
                to="/products"
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: "24px" }}
              >
                Browse Products →
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-icon">{item.icon}</div>
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>

                <div className="cart-item-actions">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-count">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                    title="Increase quantity"
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
                      marginLeft: "6px",
                      fontSize: "15px"
                    }}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span className="cart-total-price">{formatPrice(totalPrice)}</span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
              Taxes & free standard shipping calculated at checkout.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link
                to="/cart"
                className="btn-primary"
                style={{ width: "100%", textAlign: "center" }}
                onClick={() => setIsCartOpen(false)}
              >
                Proceed to Checkout →
              </Link>
              <button
                className="btn-outline"
                style={{ width: "100%", padding: "10px" }}
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
