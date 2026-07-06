import { Request, Response } from "express";

import { AnalyticsService } from "./analytics.service";

export class AnalyticsController {
  static async getRevenueReport(req: Request, res: Response) {
    try {
      const report = await AnalyticsService.getRevenueReport();

      return res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async getMonthlySalesReport(req: Request, res: Response) {
    try {
      const report = await AnalyticsService.getMonthlySalesReport();

      return res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async getOrderStatusStatistics(req: Request, res: Response) {
    try {
      const report = await AnalyticsService.getOrderStatusStatistics();

      return res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async getTopSellingProducts(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 10;

      const report = await AnalyticsService.getTopSellingProducts(limit);

      return res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async getTopCustomers(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 10;

      const customers = await AnalyticsService.getTopCustomers(limit);

      return res.status(200).json({
        success: true,
        data: customers,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async getCustomerGrowth(req: Request, res: Response) {
    try {
      const report = await AnalyticsService.getCustomerGrowth();

      return res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getProductPerformance(req: Request, res: Response) {
    try {
      const report = await AnalyticsService.getProductPerformance(
        req.params.productId as string,
      );

      return res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async getDashboardCharts(req: Request, res: Response) {
    try {
      const charts = await AnalyticsService.getDashboardCharts();

      return res.status(200).json({
        success: true,
        data: charts,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
