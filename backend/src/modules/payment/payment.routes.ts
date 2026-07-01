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
router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  PaymentController.createPayment,
);

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
router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  PaymentController.getAllPayments,
);

// Verify payment
router.patch(
  "/:id/verify",
  authenticate,
  authorize(Role.ADMIN),
  PaymentController.verifyPayment,
);

// Reject payment
router.patch(
  "/:id/reject",
  authenticate,
  authorize(Role.ADMIN),
  PaymentController.rejectPayment,
);

export default router;
