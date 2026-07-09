import { Request, Response } from "express";
import { StaffService } from "./staff.service";
export class StaffController {
  // Create Staff
  static async createStaff(req: Request, res: Response) {
    try {
      const staff = await StaffService.createStaff(req.body);

      return res.status(201).json({
        success: true,
        message: "Staff account created successfully",
        data: staff,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All Staff
  static async getAllStaff(req: Request, res: Response) {
    try {
      const staff = await StaffService.getAllStaff();

      return res.status(200).json({
        success: true,
        data: staff,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get One Staff
  static async getStaffById(req: Request, res: Response) {
    try {
      const staff = await StaffService.getStaffById(req.params.id as string);

      return res.status(200).json({
        success: true,
        data: staff,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update Staff
  static async updateStaff(req: Request, res: Response) {
    try {
      const staff = await StaffService.updateStaff(
        req.params.id as string,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Staff updated successfully",
        data: staff,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Deactivate Staff
  static async deactivateStaff(req: Request, res: Response) {
    try {
      const staff = await StaffService.deactivateStaff(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: "Staff account deactivated successfully",
        data: staff,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async activateStaff(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid staff id",
      });
    }

    const staff = await StaffService.activateStaff(id);

    return res.status(200).json({
      success: true,
      message: "Staff account activated successfully",
      data: staff,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
}