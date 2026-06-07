import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Fashion Management API Running",
  });
});

export default app;