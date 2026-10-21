import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { api } from "../services/api";
import { categories as fallbackCategories, products as fallbackProducts } from "../data/products";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [categoriesList, setCategoriesList] = useState(fallbackCategories);
  const [productsList, setProductsList] = useState(fallbackProducts);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [loading, setLoading] = useState(false);

  // Fetch Categories on mount
  useEffect(() => {
    api.getCategories().then((cats) => {
      if (cats && cats.length > 0) setCategoriesList(cats);
    }).catch(() => {});
  }, []);

  // Fetch Products whenever filters change
  useEffect(() => {
    let active = true;
    setLoading(true);

    api.getProducts({
      category: selectedCategory,
      search: searchQuery,
      sortBy
    })
      .then((data) => {
        if (active) {
          setProductsList(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="products-page section-wrapper" style={{ paddingTop: "140px" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
        <div className="section-label">⚡ Full Tech Catalog</div>
        <h1 className="section-title">
          Explore Our <span className="gradient-inline">Electronics</span>
        </h1>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          Explore genuine cutting-edge smartphones, powerhouse laptops, audio systems,
          and studio accessories directly from certified manufacturers.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "24px",
          marginBottom: "36px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative", flexGrow: 1, minWidth: "260px" }}>
            <span
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "var(--text-muted)"
              }}
            >
              🔍
            </span>
            <input
              type="text"
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, feature, or specs..."
              style={{ paddingLeft: "46px" }}
            />
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ padding: "12px 18px", width: "auto" }}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "6px"
          }}
        >
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: "var(--radius-pill)",
                border:
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "1px solid var(--neon-blue)"
                    : "1px solid var(--border)",
                background:
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "rgba(0, 212, 255, 0.15)"
                    : "rgba(255, 255, 255, 0.03)",
                color:
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "var(--neon-blue)"
                    : "var(--text-muted)",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}
      >
        <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          Showing <span style={{ color: "var(--text)", fontWeight: 700 }}>{productsList.length}</span> electronics
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {loading && <span style={{ marginLeft: "10px", color: "var(--neon-blue)" }}>● Updating...</span>}
        </div>
      </div>

      {/* Grid */}
      {productsList.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "var(--surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)"
          }}
        >
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔍</div>
          <h3>No matching electronics found</h3>
          <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
            Try modifying your search query or selecting another category.
          </p>
          <button
            className="btn-outline"
            style={{ marginTop: "20px" }}
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {productsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
