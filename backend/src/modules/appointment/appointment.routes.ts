import { Router } from "express";

import { AppointmentController } from "./appointment.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();

// Customer
router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  AppointmentController.createAppointment,
);

router.get(
  "/my",
  authenticate,
  authorize(Role.CUSTOMER),
  AppointmentController.getMyAppointments,
);

// Staff/Admin
router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.getAllAppointments,
);

router.patch(
  "/:id/confirm",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.confirmAppointment,
);

router.patch(
  "/:id/cancel",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.cancelAppointment,
);

router.patch(
  "/:id/complete",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.completeAppointment,
);

export default router;
