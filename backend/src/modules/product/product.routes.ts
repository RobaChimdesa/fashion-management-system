import { Router } from "express";

import { ProductController } from "./product.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  ProductController.createProduct,
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  ProductController.updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  ProductController.deleteProduct,
);

export default router;
