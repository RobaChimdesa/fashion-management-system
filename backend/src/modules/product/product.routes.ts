import { Router } from "express";

import { ProductController } from "./product.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";
import { upload } from "../../middlewares/upload.middleware";
import { UploadService } from "../upload/upload.service";
const router = Router();

/**
 * @swagger
 * /products/upload-image:
 *   post:
 *     summary: Upload a product image
 *     description: Uploads an image to Cloudinary and returns the image URL.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/upload-image",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  upload.single("image"),
  ProductController.uploadImage,
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - culturalStyle
 *               - estimatedPrice
 *             properties:
 *               name:
 *                 type: string
 *                 example: Oromo Wedding Dress
 *               description:
 *                 type: string
 *                 example: Traditional Oromo wedding dress.
 *               category:
 *                 type: string
 *                 example: WEDDING
 *               culturalStyle:
 *                 type: string
 *                 example: OROMO
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://res.cloudinary.com/demo/image/upload/sample.jpg
 *               estimatedPrice:
 *                 type: number
 *                 example: 18000
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  ProductController.createProduct,
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of all products.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get("/", ProductController.getAllProducts);
/**
 * @swagger
 * /products/top-rated:
 *   get:
 *     summary: Get top-rated products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Top-rated products retrieved successfully
 */
router.get("/top-rated", ProductController.getTopRatedProducts);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 6a313ba184aa575d5e1ab62e
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", ProductController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               estimatedPrice:
 *                 type: number
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

router.patch(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  ProductController.updateProduct,
);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  ProductController.deleteProduct,
);

export default router;
