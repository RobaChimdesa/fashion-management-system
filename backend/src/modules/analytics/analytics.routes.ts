import { Router } from "express";

import { AnalyticsController } from "./analytics.controller";

import { authenticate } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../auth/auth.constants";

const router = Router();
/**
 * @swagger
 * /analytics/revenue:
 *   get:
 *     summary: Get revenue report
 *     description: Returns the total revenue generated from verified payments.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue report retrieved successfully
 */
router.get(
  "/revenue",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getRevenueReport,
);
/**
 * @swagger
 * /analytics/monthly-sales:
 *   get:
 *     summary: Get monthly sales report
 *     description: Returns monthly sales statistics.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly sales report retrieved successfully
 */
router.get(
  "/monthly-sales",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getMonthlySalesReport,
);
/**
 * @swagger
 * /analytics/order-status:
 *   get:
 *     summary: Get order status statistics
 *     description: Returns the number of orders grouped by status.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order status statistics retrieved successfully
 */
router.get(
  "/order-status",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getOrderStatusStatistics,
);
/**
 * @swagger
 * /analytics/top-products:
 *   get:
 *     summary: Get top-selling products
 *     description: Returns products ranked by total sales.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top-selling products retrieved successfully
 */
router.get(
  "/top-products",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getTopSellingProducts,
);
/**
 * @swagger
 * /analytics/top-customers:
 *   get:
 *     summary: Get top customers
 *     description: Returns customers ranked by total purchases.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top customers retrieved successfully
 */
router.get(
  "/top-customers",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getTopCustomers,
);
/**
 * @swagger
 * /analytics/customer-growth:
 *   get:
 *     summary: Get customer growth report
 *     description: Returns customer registration growth over time.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer growth report retrieved successfully
 */
router.get(
  "/customer-growth",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getCustomerGrowth,
);
/**
 * @swagger
 * /analytics/product-performance/{productId}:
 *   get:
 *     summary: Get product performance
 *     description: Returns sales and review performance for a specific product.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 6a313ba184aa575d5e1ab62e
 *     responses:
 *       200:
 *         description: Product performance retrieved successfully
 */
router.get(
  "/product-performance/:productId",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getProductPerformance,
);
/**
 * @swagger
 * /analytics/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Returns all dashboard charts and summary statistics.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 */
router.get(
  "/dashboard",
  authenticate,
  authorize(Role.ADMIN, Role.STAFF),
  AnalyticsController.getDashboardCharts,
);
export default router;
