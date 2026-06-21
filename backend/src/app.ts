import express from "express";
// import authRoutes from "./modules/auth/auth.routes";

import authRoutes from "./modules/auth/auth.routes";
import customerRoutes from "./modules/customer/customer.routes";
import measurementRoutes from "./modules/measurement/measurement.routes";
import productRoutes from "./modules/product/product.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import orderRoutes from "./modules/order/order.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import notificationRoutes from "./modules/notification/notification.routes";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/measurements", measurementRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Fashion Management API Running",
  });
});

export default app;

// completed the core foundation:

// ✅ Authentication & Authorization (JWT, RBAC)
// ✅ Customer Module
// ✅ Measurement Module
// ✅ Product Module
// ✅ Order Module
// ✅ Dashboard Module

// the left modules
// 1. Notification Module
// 2. File Upload Module
// 3. Product Inventory Module
// 4. Staff Management Module
// 5. Payment Module
// 6. Review & Rating Module
// 7. Reporting Module
