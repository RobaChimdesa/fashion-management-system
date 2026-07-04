import { Router } from "express";

import { AppointmentController } from "./appointment.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();


/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Book a new appointment
 *     description: Customer books an appointment for measurement, fitting, pickup, order discussion, or product viewing.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - purpose
 *               - appointmentDate
 *             properties:
 *               purpose:
 *                 type: string
 *                 example: MEASUREMENT
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-10T10:00:00Z
 *               productId:
 *                 type: string
 *                 example: 6a313ba184aa575d5e1ab62e
 *               orderId:
 *                 type: string
 *                 example: 6a3d17c127b0555a7659fede
 *               notes:
 *                 type: string
 *                 example: I prefer a morning appointment.
 *     responses:
 *       201:
 *         description: Appointment created successfully
 */
router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  AppointmentController.createAppointment,
);

/**
 * @swagger
 * /appointments/my:
 *   get:
 *     summary: Get my appointments
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer appointments retrieved successfully
 */
router.get(
  "/my",
  authenticate,
  authorize(Role.CUSTOMER),
  AppointmentController.getMyAppointments,
);

// Staff/Admin
/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve all appointments for Admin and Staff.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 */
router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.getAllAppointments,
);

/**
 * @swagger
 * /appointments/{id}/confirm:
 *   patch:
 *     summary: Confirm an appointment
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           example: 6a5f2f3acb123456789abcd1
 *     responses:
 *       200:
 *         description: Appointment confirmed successfully
 */
router.patch(
  "/:id/confirm",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.confirmAppointment,
);
/**
 * @swagger
 * /appointments/{id}/cancel:
 *   patch:
 *     summary: Cancel an appointment
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           example: 6a5f2f3acb123456789abcd1
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 */
router.patch(
  "/:id/cancel",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.cancelAppointment,
);

/**
 * @swagger
 * /appointments/{id}/complete:
 *   patch:
 *     summary: Complete an appointment
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           example: 6a5f2f3acb123456789abcd1
 *     responses:
 *       200:
 *         description: Appointment completed successfully
 */
router.patch(
  "/:id/complete",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AppointmentController.completeAppointment,
);

export default router;
