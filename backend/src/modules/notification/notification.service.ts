import { Types } from "mongoose";

import { Notification } from "./notification.model";

import { INotification, NotificationType } from "./notification.types";

export class NotificationService {
  static async createNotification(
    accountId: string,
    title: string,
    message: string,
    type: NotificationType,
    relatedEntityId?: string,
  ) {
    return await Notification.create({
      accountId: new Types.ObjectId(accountId),

      title,

      message,

      type,

      relatedEntityId: relatedEntityId
        ? new Types.ObjectId(relatedEntityId)
        : undefined,
    });
  }

  static async getMyNotifications(accountId: string) {
    return await Notification.find({
      accountId,
    }).sort({
      createdAt: -1,
    });
  }

  static async markAsRead(notificationId: string, accountId: string) {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        accountId,
      },
      {
        isRead: true,
      },
      {
        returnDocument: "after",
      },
    );

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  }

  static async markAllAsRead(accountId: string) {
    await Notification.updateMany(
      {
        accountId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    return {
      message: "All notifications marked as read",
    };
  }

  static async deleteNotification(notificationId: string, accountId: string) {
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      accountId,
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    return {
      message: "Notification deleted successfully",
    };
  }

  static async getUnreadCount(accountId: string) {
    const count = await Notification.countDocuments({
      accountId,
      isRead: false,
    });

    return {
      unreadCount: count,
    };
  }
}
