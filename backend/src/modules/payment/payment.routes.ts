import { Router } from "express";

import { PaymentController } from "./payment.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();

/**
 * Customer
 */

// Submit payment

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Submit a payment
 *     description: Customer submits payment information for an order.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - paymentMethod
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 6a3d17c127b0555a7659fede
 *               amount:
 *                 type: number
 *                 example: 18000
 *               paymentMethod:
 *                 type: string
 *                 example: TELEBIRR
 *               transactionId:
 *                 type: string
 *                 example: TXN123456789
 *               receiptImage:
 *                 type: string
 *                 example: https://res.cloudinary.com/demo/image/upload/receipt.jpg
 *     responses:
 *       201:
 *         description: Payment submitted successfully
 */
router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  PaymentController.createPayment,
);
/**
 * @swagger
 * /payments/my:
 *   get:
 *     summary: Get my payments
 *     description: Returns all payments made by the logged-in customer.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer payments retrieved successfully
 */
// View my payments
router.get(
  "/my",
  authenticate,
  authorize(Role.CUSTOMER),
  PaymentController.getMyPayments,
);

/**
 * Admin / Staff
 */

// View all payments
/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieve all submitted payments (Admin/Staff only).
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
 */
router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  PaymentController.getAllPayments,
);

// Verify payment
/**
 * @swagger
 * /payments/{id}/verify:
 *   patch:
 *     summary: Verify a payment
 *     description: Admin verifies a submitted payment.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *           example: 6a5f2f3acb123456789abcd1
 *     responses:
 *       200:
 *         description: Payment verified successfully
 */
router.patch(
  "/:id/verify",
  authenticate,
  authorize(Role.ADMIN),
  PaymentController.verifyPayment,
);

// Reject payment
/**
 * @swagger
 * /payments/{id}/reject:
 *   patch:
 *     summary: Reject a payment
 *     description: Admin rejects a submitted payment.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *           example: 6a5f2f3acb123456789abcd1
 *     responses:
 *       200:
 *         description: Payment rejected successfully
 */
router.patch(
  "/:id/reject",
  authenticate,
  authorize(Role.ADMIN),
  PaymentController.rejectPayment,
);

export default router;
