import { Request, Response } from "express";

import { OrderService } from "./order.service";
import { AuthRequest } from "../../types/auth-request";
import { Customer } from "../customer/customer.model";

export class OrderController {
  static async createOrder(req: AuthRequest, res: Response) {
    try {
      // Find customer profile linked to logged-in account
      const customer = await Customer.findOne({
        accountId: req.user!.id,
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer profile not found",
        });
      }

      const order = await OrderService.createOrder({
        ...req.body,
        customerId: customer._id,
      });

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getMyOrders(req: AuthRequest, res: Response) {
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

      const orders = await OrderService.getMyOrders(
        customer._id.toString(),
        req.query as any,
      );

      res.status(200).json({
        success: true,
        ...orders,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getOrderById(req: AuthRequest, res: Response) {
    try {
      const order = await OrderService.getOrderById(req.params.id as string);

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async cancelOrder(req: AuthRequest, res: Response) {
    try {
      const order = await OrderService.cancelOrder(req.params.id as string);

      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateOrderStatus(req: AuthRequest, res: Response) {
    try {
      const order = await OrderService.updateOrderStatus(
        req.params.id as string,
        req.body.status,
      );

      res.status(200).json({
        success: true,
        message: "Order status updated",
        data: order,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  //   static async getMyStats(
  //   req: AuthRequest,
  //   res: Response
  // ) {
  //   try {
  //     const customer =
  //       await Customer.findOne({
  //         accountId: req.user!.id,
  //       });

  //     if (!customer) {
  //       return res.status(404).json({
  //         success: false,
  //         message:
  //           "Customer profile not found",
  //       });
  //     }

  //     const stats =
  //       await OrderService.getCustomerStats(
  //         customer._id.toString()
  //       );

  //     res.status(200).json({
  //       success: true,
  //       data: stats,
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }

  // static async getAdminStats(
  //   req: AuthRequest,
  //   res: Response
  // ) {
  //   try {
  //     const stats =
  //       await OrderService.getAdminStats();

  //     res.status(200).json({
  //       success: true,
  //       data: stats,
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }
  // static async getStaffStats(
  //   req: AuthRequest,
  //   res: Response
  // ) {
  //   try {
  //     const stats =
  //       await OrderService.getStaffStats();

  //     res.status(200).json({
  //       success: true,
  //       data: stats,
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();

      return res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
