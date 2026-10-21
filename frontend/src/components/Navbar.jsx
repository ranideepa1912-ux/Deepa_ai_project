import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleOpenAi = () => {
    if (window.voiceflow && window.voiceflow.chat) {
      window.voiceflow.chat.open();
    } else {
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="logo-link">
          <div className="logo">
            Deepa <span>Electronic</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button
            className="btn-outline"
            onClick={handleOpenAi}
            style={{
              padding: "8px 18px",
              fontSize: "13.5px",
              borderColor: "var(--neon-blue)",
              color: "var(--neon-blue)"
            }}
          >
            <span>🤖</span>
            <span>AI Support</span>
          </button>

          <button
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
          >
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          <Link to="/contact" className="nav-cta">
            Get in Touch
          </Link>

          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setMobileMenuOpen(false)}>
          Products Catalog
        </NavLink>
        <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
          About Us
        </NavLink>
        <NavLink to="/reviews" onClick={() => setMobileMenuOpen(false)}>
          Customer Reviews
        </NavLink>
        <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
          Contact Support
        </NavLink>
        <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)}>
          Shopping Cart ({totalItems})
        </NavLink>
      </div>
    </>
  );
}
