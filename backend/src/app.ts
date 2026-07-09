import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import customerRoutes from "./modules/customer/customer.routes";
import measurementRoutes from "./modules/measurement/measurement.routes";
import productRoutes from "./modules/product/product.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import orderRoutes from "./modules/order/order.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import notificationRoutes from "./modules/notification/notification.routes";
import reviewRoutes from "./modules/review/review.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import appointmentRoutes from "./modules/appointment/appointment.routes";
import paymentRoutes from "./modules/payment/payment.routes";
import staffRoutes from "./modules/staff/staff.routes";

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/measurements", measurementRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/staff", staffRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Fashion Management API Running",
  });
});

export default app;
