import { Response } from "express";

import { AuthRequest } from "../../types/auth-request";

import { DashboardService } from "./dashboard.service";

import { Customer } from "../customer/customer.model";

export class DashboardController {
  static async getAdminDashboard(req: AuthRequest, res: Response) {
    try {
      const data = await DashboardService.getAdminStats();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getStaffDashboard(req: AuthRequest, res: Response) {
    try {
      const data = await DashboardService.getStaffStats();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getCustomerDashboard(req: AuthRequest, res: Response) {
    try {
      const customer = await Customer.findOne({
        accountId: req.user!.id,
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer profile not found",
        });
      }

      const data = await DashboardService.getCustomerStats(
        customer._id.toString(),
      );

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getAdminOverview(req: AuthRequest, res: Response) {
    try {
      const data = await DashboardService.getAdminOverview();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
