import { Types } from "mongoose";

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  READY = "READY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PARTIAL = "PARTIAL",
  PAID = "PAID",
}

export enum OrderType {
  PRODUCT = "PRODUCT",
  CUSTOM = "CUSTOM",
}

export enum ServiceType {
  WEDDING = "WEDDING",
  CULTURAL = "CULTURAL",
  SIRBA = "SIRBA",
  CASUAL = "CASUAL",
  CUSTOM = "CUSTOM",
}

export interface IOrder {
  customerId: Types.ObjectId;

  measurementId: Types.ObjectId;

  orderType: OrderType;

  productId?: Types.ObjectId;

  customDesignImages?: string[];

  customDescription?: string;

  serviceType: ServiceType;

  occasion?: string;

  notes?: string;

  status: OrderStatus;

  paymentStatus: PaymentStatus;

  estimatedDeliveryDate?: Date;

  totalPrice?: number;
}

