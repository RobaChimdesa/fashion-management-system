import { Router } from "express";
import { OrderController } from "./order.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 6a313ba184aa575d5e1ab62e
 *               measurementId:
 *                 type: string
 *                 example: 6a2cd4a3447167c20000d975
 *               orderType:
 *                 type: string
 *                 example: PRODUCT
 *               notes:
 *                 type: string
 *                 example: Please deliver before next week.
 *     responses:
 *       201:
 *         description: Order created successfully
 */

router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  OrderController.createOrder,
);

/**
 * @swagger
 * /orders/my-orders:
 *   get:
 *     summary: Get logged-in customer's orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer orders retrieved successfully
 */

router.get(
  "/my-orders",
  authenticate,
  authorize(Role.CUSTOMER),
  OrderController.getMyOrders,
);
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */
router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  OrderController.getAllOrders,
);

/**
 * @swagger
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags:
 *       - Orders
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
 *         description: Order cancelled successfully
 */

router.patch(
  "/:id/cancel",
  authenticate,
  authorize(Role.CUSTOMER),
  OrderController.cancelOrder,
);


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6a3d17c127b0555a7659fede
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */
router.get(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  OrderController.getOrderById,
);
/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6a3d17c127b0555a7659fede
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: DELIVERED
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.patch(
  "/:id/status",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  OrderController.updateOrderStatus,
);



export default router;
