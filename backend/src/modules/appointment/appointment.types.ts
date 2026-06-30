import { Types } from "mongoose";

export enum AppointmentPurpose {
  MEASUREMENT = "MEASUREMENT",

  CONSULTATION = "CONSULTATION",

  PRODUCT_VIEWING = "PRODUCT_VIEWING",

  ORDER_DISCUSSION = "ORDER_DISCUSSION",

  FITTING = "FITTING",

  PICKUP = "PICKUP",

  OTHER = "OTHER",
}

export enum AppointmentStatus {
  PENDING = "PENDING",

  CONFIRMED = "CONFIRMED",

  COMPLETED = "COMPLETED",

  CANCELLED = "CANCELLED",

  RESCHEDULED = "RESCHEDULED",
}

export interface IAppointment {
  customerId: Types.ObjectId;

  staffId?: Types.ObjectId;

  orderId?: Types.ObjectId;

  productId?: Types.ObjectId;

  purpose: AppointmentPurpose;

  appointmentDate: Date;

  status: AppointmentStatus;

  notes?: string;
}