import { Router } from "express";

import { AnalyticsController } from "./analytics.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();

router.get(
  "/revenue",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getRevenueReport,
);
router.get(
  "/monthly-sales",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getMonthlySalesReport,
);
router.get(
  "/order-status",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getOrderStatusStatistics,
);
router.get(
  "/top-products",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getTopSellingProducts,
);
router.get(
  "/top-customers",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getTopCustomers,
);
router.get(
  "/customer-growth",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getCustomerGrowth,
);
router.get(
  "/product-performance/:productId",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getProductPerformance,
);
router.get(
  "/dashboard",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getDashboardCharts,
);
export default router;
