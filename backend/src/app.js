import express from "express";
import cors from "cors";
import morgan from "morgan";

import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { notFoundHandler, globalErrorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    store: "Deepa Electronic Backend API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/chat", chatRoutes);

// Catch-all & Error Handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
