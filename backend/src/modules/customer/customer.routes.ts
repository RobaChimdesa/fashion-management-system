import { Router } from "express";

import { CustomerController } from "./customer.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { Role } from "../auth/auth.constants";

const router = Router();

router.get(
  "/me",
  authenticate,
  authorize(Role.CUSTOMER),
  CustomerController.getMyProfile,
);

router.patch(
  "/me",
  authenticate,
  authorize(Role.CUSTOMER),
  CustomerController.updateMyProfile,
);

export default router;
