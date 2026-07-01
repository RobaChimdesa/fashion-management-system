import { Request, Response } from "express";
import { AppointmentService } from "./appointment.service";
import { Customer } from "../customer/customer.model";
// import { AppointmentService } from "./appointment.service";

export class AppointmentController {
  // Customer books an appointment
  static async createAppointment(req: any, res: Response) {
    try {
      const customer = await Customer.findOne({
        accountId: req.user.id,
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      const appointment = await AppointmentService.createAppointment({
        customerId: customer._id,

        productId: req.body.productId,

        orderId: req.body.orderId,

        purpose: req.body.purpose,

        appointmentDate: req.body.appointmentDate,

        notes: req.body.notes,
      });

      return res.status(201).json({
        success: true,
        data: appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Customer views own appointments
  static async getMyAppointments(req: any, res: Response) {
    try {
      // const appointments = await AppointmentService.getMyAppointments(
      // req.user.customerId,
      // );
      const customer = await Customer.findOne({
        accountId: req.user.id,
      });

      const appointments = await AppointmentService.getMyAppointments(
        customer!._id.toString(),
      );

      return res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Staff/Admin view all appointments
  static async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getAllAppointments();

      return res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Staff confirms appointment
  static async confirmAppointment(req: any, res: Response) {
    try {
      const appointment = await AppointmentService.confirmAppointment(
        req.params.id as string,
        req.user.staffId,
      );

      return res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Staff cancels appointment
  static async cancelAppointment(req: Request, res: Response) {
    try {
      const appointment = await AppointmentService.cancelAppointment(
        req.params.id as string,
      );

      return res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Staff completes appointment
  static async completeAppointment(req: Request, res: Response) {
    try {
      const appointment = await AppointmentService.completeAppointment(
        req.params.id as string,
      );

      return res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
