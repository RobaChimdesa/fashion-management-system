import { Types } from "mongoose";

export enum NotificationType {
  ORDER_CREATED = "ORDER_CREATED",
  ORDER_CONFIRMED = "ORDER_CONFIRMED",
  ORDER_IN_PROGRESS = "ORDER_IN_PROGRESS",
  ORDER_READY = "ORDER_READY",
  ORDER_DELIVERED = "ORDER_DELIVERED",
  ORDER_CANCELLED = "ORDER_CANCELLED",

  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",

  NEW_CUSTOMER = "NEW_CUSTOMER",
  APPOINTMENT = "APPOINTMENT",
  PAYMENT = "PAYMENT",
}

export interface INotification {
  accountId: Types.ObjectId;

  title: string;

  message: string;

  type: NotificationType;
  relatedEntityId?: Types.ObjectId;

  isRead: boolean;
}
