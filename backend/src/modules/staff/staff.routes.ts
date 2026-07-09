import { Router } from "express";
import { StaffController } from "./staff.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { Role } from "../auth/auth.constants";

const router = Router();

/**
 * Admin Only
 */

// Create Staff  

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create a new staff account
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Abebe Kebede
 *               email:
 *                 type: string
 *                 example: abebe@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               phone:
 *                 type: string
 *                 example: "0912345678"
 *     responses:
 *       201:
 *         description: Staff account created successfully.
 *       400:
 *         description: Invalid request.
 */
router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  StaffController.createStaff
);

// Get All Staff
/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff accounts
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff accounts.
 */
router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  StaffController.getAllStaff
);

// Get One Staff
/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get a staff account by ID
 *     tags: [Staff]
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
 *         description: Staff found.
 *       404:
 *         description: Staff not found.
 */
router.get(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  StaffController.getStaffById
);

// Update Staff

/**
 * @swagger
 * /staff/{id}:
 *   patch:
 *     summary: Update a staff account
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Staff updated successfully.
 */
router.patch(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  StaffController.updateStaff
);

// Deactivate Staff
/**
 * @swagger
 * /staff/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a staff account
 *     tags: [Staff]
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
 *         description: Staff account deactivated successfully.
 */
router.patch(
  "/:id/deactivate",
  authenticate,
  authorize(Role.ADMIN),
  StaffController.deactivateStaff
);

/**
 * @swagger
 * /staff/{id}/activate:
 *   patch:
 *     summary: Activate a staff account
 *     tags: [Staff]
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
 *         description: Staff account activated successfully.
 */
router.patch(
  "/:id/activate",
  authenticate,
  authorize(Role.ADMIN),
  StaffController.activateStaff
);



export default router;