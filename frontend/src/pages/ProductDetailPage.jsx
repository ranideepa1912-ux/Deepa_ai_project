import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductCard from "../components/ProductCard";
import { api } from "../services/api";
import { products as fallbackProducts } from "../data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, formatPrice } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState(fallbackProducts);

  useEffect(() => {
    let active = true;
    setLoading(true);

    api.getProductById(id)
      .then((data) => {
        if (active) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          const fb = fallbackProducts.find((p) => p.id === id);
          setProduct(fb || null);
          setLoading(false);
        }
      });

    api.getProducts().then((list) => {
      if (active && list && list.length > 0) setAllProducts(list);
    }).catch(() => {});

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="section-wrapper" style={{ paddingTop: "160px", textAlign: "center" }}>
        <div style={{ fontSize: "36px", marginBottom: "16px" }}>⚡</div>
        <h3>Loading Product Specifications...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-wrapper" style={{ paddingTop: "160px", textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
          The product you are looking for does not exist or has been discontinued.
        </p>
        <Link to="/products" className="btn-primary" style={{ marginTop: "24px" }}>
          Browse All Products →
        </Link>
      </div>
    );
  }

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} × ${product.name} to cart!`, "success");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(allProducts.filter((p) => p.id !== product.id))
    .slice(0, 3);

  return (
    <div className="product-detail-page section-wrapper" style={{ paddingTop: "140px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "28px", fontSize: "14px", color: "var(--text-muted)" }}>
        <Link to="/" style={{ color: "var(--text-muted)" }}>Home</Link>
        {" / "}
        <Link to="/products" style={{ color: "var(--text-muted)" }}>Products</Link>
        {" / "}
        <span style={{ color: "var(--neon-blue)" }}>{product.name}</span>
      </div>

      {/* Main Showcase Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "60px",
          alignItems: "start",
          marginBottom: "80px"
        }}
      >
        {/* Visual Column */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "60px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {product.badge && (
            <span
              className={`product-badge ${product.badgeType}`}
              style={{ position: "absolute", top: "24px", left: "24px" }}
            >
              {product.badge}
            </span>
          )}

          <div
            style={{
              fontSize: "120px",
              margin: "30px 0",
              filter: "drop-shadow(0 0 40px rgba(0, 212, 255, 0.4))",
              animation: "float-icon 4s ease-in-out infinite"
            }}
          >
            {product.icon}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", background: "rgba(255,255,255,0.05)", padding: "6px 14px", borderRadius: "50px" }}>
              ⚡ In Stock
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", background: "rgba(255,255,255,0.05)", padding: "6px 14px", borderRadius: "50px" }}>
              🛡️ 2-Year Warranty
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", background: "rgba(255,255,255,0.05)", padding: "6px 14px", borderRadius: "50px" }}>
              🚚 Same-Day Dispatch
            </span>
          </div>
        </div>

        {/* Info Column */}
        <div>
          <span className="section-label">{product.category}</span>
          <h1 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", marginBottom: "12px" }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div className="stars" style={{ margin: 0 }}>
              {"★".repeat(Math.round(product.rating))}
            </div>
            <span style={{ fontWeight: 700, fontSize: "15px" }}>{product.rating}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              ({product.reviewsCount} customer reviews)
            </span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "24px" }}>
            <span style={{ fontSize: "36px", fontWeight: 900 }} className="gradient-text">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span style={{ fontSize: "20px", color: "var(--text-muted)", textDecoration: "line-through" }}>
                  {formatPrice(product.oldPrice)}
                </span>
                <span
                  style={{
                    background: "rgba(247, 37, 133, 0.15)",
                    color: "var(--neon-pink)",
                    border: "1px solid rgba(247, 37, 133, 0.3)",
                    padding: "4px 10px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: 800
                  }}
                >
                  Save {discountPercent}%
                </span>
              </>
            )}
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: "1.8", marginBottom: "30px" }}>
            {product.fullDesc || product.desc}
          </p>

          {/* Quantity and Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-pill)",
                padding: "4px 12px",
                gap: "12px"
              }}
            >
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span style={{ fontWeight: 800, minWidth: "20px", textAlign: "center" }}>
                {quantity}
              </span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button className="btn-primary" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>

            <button className="btn-outline" onClick={handleBuyNow} style={{ borderColor: "var(--neon-purple)", color: "var(--neon-purple)" }}>
              ⚡ Buy Now
            </button>
          </div>

          {/* Specs List */}
          {product.specs && (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px"
              }}
            >
              <h4 style={{ marginBottom: "16px", fontSize: "16px", color: "var(--text)" }}>
                Technical Specifications
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13.5px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)"
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>{spec.label}</span>
                    <span style={{ fontWeight: 600, color: "var(--text)", textAlign: "right", maxWidth: "60%" }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <div className="section-label">⚡ Recommendations</div>
        <h2 className="section-title">You Might Also Like</h2>
        <div className="products-grid" style={{ marginTop: "32px" }}>
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
