import { Router } from "express";

import { DashboardController } from "./dashboard.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();

router.get(
  "/admin",
  authenticate,
  authorize(Role.ADMIN),
  DashboardController.getAdminDashboard,
);

router.get(
  "/staff",
  authenticate,
  authorize(Role.STAFF, Role.ADMIN),
  DashboardController.getStaffDashboard,
);

router.get(
  "/customer",
  authenticate,
  authorize(Role.CUSTOMER),
  DashboardController.getCustomerDashboard,
);

router.get(
  "/admin-overview",
  authenticate,
  authorize(Role.ADMIN),
  DashboardController.getAdminOverview
);

export default router;
