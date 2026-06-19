import { Router } from "express";

import { OrderController } from "./order.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();

/*
Customer routes
*/

router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER),
  OrderController.createOrder,
);

router.get(
  "/my-orders",
  authenticate,
  authorize(Role.CUSTOMER),
  OrderController.getMyOrders,
);
// router.get(
//   "/my-stats",
//   authenticate,
//   authorize(Role.CUSTOMER),
//   OrderController.getMyStats
// );

// router.get(
//   "/staff-stats",
//   authenticate,
//   authorize(
//     Role.STAFF,
//     Role.ADMIN
//   ),
//   OrderController.getStaffStats
// );
// router.get(
//   "/admin-stats",
//   authenticate,
//   authorize(Role.ADMIN),
//   OrderController.getAdminStats
// );

router.patch(
  "/:id/cancel",
  authenticate,
  authorize(Role.CUSTOMER),
  OrderController.cancelOrder,
);

/*
Staff/Admin routes
*/

router.get(
  "/:id",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  OrderController.getOrderById,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  OrderController.updateOrderStatus,
);



export default router;
