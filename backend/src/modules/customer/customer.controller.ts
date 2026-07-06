import { Response } from "express";

import { CustomerService } from "./customer.service";
import { AuthRequest } from "../../types/auth-request";

export class CustomerController {
  static async getMyProfile(req: AuthRequest, res: Response) {
    try {
      const profile = await CustomerService.getMyProfile(req.user!.id);

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateMyProfile(req: AuthRequest, res: Response) {
    try {
      const profile = await CustomerService.updateMyProfile(
        req.user!.id,
        req.body,
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: profile,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
