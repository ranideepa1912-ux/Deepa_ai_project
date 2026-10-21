import "dotenv/config";
import app from "./src/app.js";
import { storage } from "./src/services/storageService.js";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    // Warm up the storage service and ensure seed data is loaded
    await storage.init();
    console.log("⚡ [Deepa Backend] Storage database initialized.");

    const server = app.listen(PORT, () => {
      console.log(`
======================================================
  ⚡ DEEPA ELECTRONIC — FULL-STACK API SERVER
======================================================
  🟢 Environment:  ${process.env.NODE_ENV || "development"}
  🟢 Server URL:   http://localhost:${PORT}
  🟢 Health Check: http://localhost:${PORT}/api/health
  🟢 API Endpoints:
     - GET  /api/products
     - GET  /api/products/:id
     - GET  /api/products/categories
     - GET  /api/products/featured
     - GET  /api/reviews
     - POST /api/reviews
     - POST /api/orders
     - GET  /api/orders/:id
     - POST /api/coupons/validate
     - POST /api/contact
     - POST /api/newsletter/subscribe
     - POST /api/chat
======================================================
      `);
    });

    // Graceful Shutdown
    const handleShutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await storage.persist();
        console.log("💾 State persisted. Process exited cleanly.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => handleShutdown("SIGINT"));
    process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
