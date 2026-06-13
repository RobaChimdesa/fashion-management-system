import { Router } from "express";

import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

import { MeasurementController }
  from "./measurement.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.addMeasurement
);

router.get(
  "/current",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.getCurrentMeasurement
);

router.get(
  "/history",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.getHistory
);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.updateMeasurement
);

router.delete(
  "/:id",
  authenticate,
  authorize(Role.CUSTOMER),
  MeasurementController.deleteMeasurement
);

export default router;