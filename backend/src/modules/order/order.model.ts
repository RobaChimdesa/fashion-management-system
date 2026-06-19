import mongoose, { Schema } from "mongoose";
import { CallbackWithoutResultAndOptionalError } from "mongoose";

import {
  IOrder,
  OrderType,
  OrderStatus,
  PaymentStatus,
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

    orderType: {
      type: String,
      enum: Object.values(OrderType),
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },

    customDesignImages: [
      {
        type: String,
      },
    ],

    customDescription: {
      type: String,
    },

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

    totalPrice: {
      type: Number,
      min: 0,
    },

    notes: String,
  },
  {
    timestamps: true,
  }
);


orderSchema.pre("validate", function () {
  if (
    this.orderType === OrderType.PRODUCT &&
    !this.productId
  ) {
    throw new Error(
      "Product is required for product orders"
    );
  }

  if (this.orderType === OrderType.CUSTOM) {
    if (
      !this.customDesignImages ||
      this.customDesignImages.length === 0
    ) {
      throw new Error(
        "At least one custom design image is required"
      );
    }

    if (
      !this.customDescription ||
      this.customDescription.trim() === ""
    ) {
      throw new Error(
        "Custom description is required"
      );
    }
  }
});

export const Order = mongoose.model<IOrder>(
  "Order",
  orderSchema
);