import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GravityCanvas from "./components/GravityCanvas";
import CartDrawer from "./components/CartDrawer";
import VoiceflowChat from "./components/VoiceflowChat";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";

// Helper to ensure window scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <ScrollToTop />
          {/* Main App Layout */}
          <div className="app-container">
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>

            <Footer />

            {/* Global Overlays & Widgets */}
            <CartDrawer />
            <GravityCanvas />
            <VoiceflowChat />
          </div>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
