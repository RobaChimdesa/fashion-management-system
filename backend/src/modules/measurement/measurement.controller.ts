import { Response } from "express";

import { MeasurementService } from "./measurement.service";
import { AuthRequest } from "../../types/auth-request";

export class MeasurementController {
  static async addMeasurement(
    req: AuthRequest,
    res: Response
  ) {
    try {
      const measurement =
        await MeasurementService.addMeasurement(
          req.user!.id,
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Measurement added successfully",
        data: measurement,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getCurrentMeasurement(
    req: AuthRequest,
    res: Response
  ) {
    try {
      const measurement =
        await MeasurementService.getCurrentMeasurement(
          req.user!.id
        );

      res.status(200).json({
        success: true,
        data: measurement,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getHistory(
    req: AuthRequest,
    res: Response
  ) {
    try {
      const measurements =
        await MeasurementService.getMeasurementHistory(
          req.user!.id
        );

      res.status(200).json({
        success: true,
        data: measurements,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateMeasurement(
    req: AuthRequest,
    res: Response
  ) {
    try {
      const measurement =
        await MeasurementService.updateMeasurement(
          req.params.id as string,
          req.user!.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Measurement updated successfully",
        data: measurement,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteMeasurement(
  req: AuthRequest,
  res: Response
) {
  try {
    const result =
      await MeasurementService.deleteMeasurement(
        req.params.id as string,
        req.user!.id
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
}