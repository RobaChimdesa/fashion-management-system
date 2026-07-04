import { Router } from "express";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

import { MeasurementController }
  from "./measurement.controller";

const router = Router();

/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Add a new body measurement
 *     tags:
 *       - Measurements
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chest:
 *                 type: number
 *                 example: 95
 *               waist:
 *                 type: number
 *                 example: 82
 *               hip:
 *                 type: number
 *                 example: 98
 *               shoulder:
 *                 type: number
 *                 example: 45
 *               sleeveLength:
 *                 type: number
 *                 example: 63
 *               inseam:
 *                 type: number
 *                 example: 78
 *               neck:
 *                 type: number
 *                 example: 40
 *               height:
 *                 type: number
 *                 example: 175
 *               notes:
 *                 type: string
 *                 example: Preferred loose fitting.
 *     responses:
 *       201:
 *         description: Measurement added successfully
 */
router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.addMeasurement
);

/**
 * @swagger
 * /measurements/current:
 *   get:
 *     summary: Get customer's current measurement
 *     tags:
 *       - Measurements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current measurement retrieved successfully
 */
router.get(
  "/current",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.getCurrentMeasurement
);

/**
 * @swagger
 * /measurements/history:
 *   get:
 *     summary: Get customer's measurement history
 *     tags:
 *       - Measurements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Measurement history retrieved successfully
 */
router.get(
  "/history",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.getHistory
);

/**
 * @swagger
 * /measurements/{id}:
 *   patch:
 *     summary: Update a measurement
 *     tags:
 *       - Measurements
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Measurement ID
 *         schema:
 *           type: string
 *           example: 6a2cd4a3447167c20000d975
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chest:
 *                 type: number
 *               waist:
 *                 type: number
 *               hip:
 *                 type: number
 *               shoulder:
 *                 type: number
 *               sleeveLength:
 *                 type: number
 *               inseam:
 *                 type: number
 *               neck:
 *                 type: number
 *               height:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Measurement updated successfully
 */
router.patch(
  "/:id",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.updateMeasurement
);

/**
 * @swagger
 * /measurements/{id}:
 *   delete:
 *     summary: Delete a measurement
 *     tags:
 *       - Measurements
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Measurement ID
 *         schema:
 *           type: string
 *           example: 6a2cd4a3447167c20000d975
 *     responses:
 *       200:
 *         description: Measurement deleted successfully
 *       404:
 *         description: Measurement not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.deleteMeasurement
);

export default router;