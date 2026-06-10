import express from "express";
// import authRoutes from "./modules/auth/auth.routes";

import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Fashion Management API Running",
  });
});

export default app;
