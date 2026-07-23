// POST /register

import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { Role } from "./auth.constants";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new account
 *     tags:
 *       - Authentication
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
 *                 example: Roba Chimdessa
 *               email:
 *                 type: string
 *                 example: roba@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post("/register", AuthController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the system
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: roba@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", AuthController.login);

/**
 
 */

router.post("/google", AuthController.googleLogin);
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 */
router.get("/me", authenticate, AuthController.me); // Middleware runs before the controller.
/**
 * @swagger
 * /auth/admin:
 *   get:
 *     summary: Admin only endpoint
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 */

router.get(
  "/admin",
  authenticate,
  authorize(Role.ADMIN),
  AuthController.adminOnly,
);

export default router;
