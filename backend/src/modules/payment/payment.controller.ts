import { Request, Response } from "express";

import { PaymentService } from "./payment.service";

import { Customer } from "../customer/customer.model";

export class PaymentController {
  // Customer submits payment
  static async createPayment(req: any, res: Response) {
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

      const payment = await PaymentService.createPayment({
        customerId: customer._id,

        orderId: req.body.orderId,

        amount: req.body.amount,

        paymentMethod: req.body.paymentMethod,

        receiptImage: req.body.receiptImage,

        transactionReference: req.body.transactionReference,
      });

      return res.status(201).json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Customer views own payments
  static async getMyPayments(req: any, res: Response) {
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

      const payments = await PaymentService.getMyPayments(
        customer._id.toString(),
      );

      return res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Admin/Staff views all payments
  static async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await PaymentService.getAllPayments();

      return res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Verify payment
  static async verifyPayment(req: any, res: Response) {
    try {
      const payment = await PaymentService.verifyPayment(
        req.params.id,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Reject payment
  static async rejectPayment(req: any, res: Response) {
    try {
      const payment = await PaymentService.rejectPayment(
        req.params.id,
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
