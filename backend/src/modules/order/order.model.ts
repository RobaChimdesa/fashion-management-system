import mongoose, { Schema } from "mongoose";

import {
  IOrder,
  OrderStatus,
  PaymentStatus,
  ServiceType,
} from "./order.types";

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    measurementId: {
      type: Schema.Types.ObjectId,
      ref: "Measurement",
      required: true,
    },

    serviceType: {
      type: String,
      enum: Object.values(ServiceType),
      required: true,
    },

    occasion: String,

    notes: String,

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
    },

    estimatedDeliveryDate: Date,

    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model(
  "Order",
  orderSchema
);