// POST /register

import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { Role } from "./auth.constants";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authenticate, AuthController.me); // Middleware runs before the controller.
router.get(
  "/admin",
  authenticate,
  authorize(Role.ADMIN),
  AuthController.adminOnly,
);



export default router;
