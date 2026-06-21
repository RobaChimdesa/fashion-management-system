import { Response } from "express";

import { AuthRequest } from "../../types/auth-request";

import { NotificationService } from "./notification.service";

export class NotificationController {
  static async getMyNotifications(req: AuthRequest, res: Response) {
    try {
      const notifications = await NotificationService.getMyNotifications(
        req.user!.id,
      );

      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getUnreadCount(req: AuthRequest, res: Response) {
    try {
      const count = await NotificationService.getUnreadCount(req.user!.id);

      res.status(200).json({
        success: true,
        data: count,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async markAsRead(req: AuthRequest, res: Response) {
    try {
      const notification = await NotificationService.markAsRead(
        req.params.id as string,
        req.user!.id,
      );

      res.status(200).json({
        success: true,
        message: "Notification marked as read",
        data: notification,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async markAllAsRead(req: AuthRequest, res: Response) {
    try {
      const result = await NotificationService.markAllAsRead(req.user!.id);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteNotification(req: AuthRequest, res: Response) {
    try {
      const result = await NotificationService.deleteNotification(
        req.params.id as string,
        req.user!.id,
      );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
