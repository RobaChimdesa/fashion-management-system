import express from "express";
// import authRoutes from "./modules/auth/auth.routes";

import authRoutes from "./modules/auth/auth.routes";
import customerRoutes from "./modules/customer/customer.routes";
import measurementRoutes from "./modules/measurement/measurement.routes";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/measurements", measurementRoutes);
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Fashion Management API Running",
  });
});

export default app;
