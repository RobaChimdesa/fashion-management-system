import { Router } from "express";

import { ReviewController } from "./review.controller";

import { authenticate } from "../../middlewares/auth.middleware";
// import { ProductController } from "../product/product.controller";

const router = Router();
/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a product review
 *     description: Customer can review a product after receiving their order.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - rating
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 6a313ba184aa575d5e1ab62e
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Excellent quality dress. Highly recommended.
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router.post("/", authenticate, ReviewController.createReview);
/**
 * @swagger
 * /reviews/product/{productId}:
 *   get:
 *     summary: Get reviews for a product
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 6a313ba184aa575d5e1ab62e
 *     responses:
 *       200:
 *         description: Product reviews retrieved successfully
 */
router.get("/product/:productId", ReviewController.getProductReviews);
/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Update a review
 *     description: Customer updates their own review.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *           example: 6a3e3cac51dd8226ed94d054
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: Still very good, but delivery was a bit late.
 *     responses:
 *       200:
 *         description: Review updated successfully
 */
router.patch("/:id", authenticate, ReviewController.updateReview);
/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Customer deletes their own review.
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *           example: 6a3e3cac51dd8226ed94d054
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:id", authenticate, ReviewController.deleteReview);
// router.get("/top-rated", ProductController.getTopRatedProducts);

export default router;
