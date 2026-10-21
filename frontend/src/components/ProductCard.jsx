import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product }) {
  const { addToCart, formatPrice } = useCart();
  const { showToast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
    setIsAdded(true);
    showToast(`Added ${product.name} to cart!`, "success");

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div className="product-card">
      {product.badge && (
        <span className={`product-badge ${product.badgeType}`}>
          {product.badge}
        </span>
      )}

      <Link
        to={`/products/${product.id}`}
        style={{ display: "contents", color: "inherit" }}
      >
        <div className="product-icon-wrap">
          <span>{product.icon}</span>
        </div>

        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.desc}</div>
      </Link>

      <div className="product-footer">
        <div>
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="product-old-price">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          className={`add-btn ${isAdded ? "added" : ""}`}
          onClick={handleAdd}
          title="Add to Cart"
          aria-label={`Add ${product.name} to cart`}
        >
          {isAdded ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}
