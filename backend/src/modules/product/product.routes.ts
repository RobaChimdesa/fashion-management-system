import { Router } from "express";

import { ProductController } from "./product.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";
import { upload } from "../../middlewares/upload.middleware";
import { UploadService } from "../upload/upload.service";
const router = Router();

router.post(
  "/upload-image",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  upload.single("image"),
  ProductController.uploadImage,
);
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  ProductController.createProduct,
);

router.get("/", ProductController.getAllProducts);
router.get("/top-rated", ProductController.getTopRatedProducts);

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
