import { Types } from "mongoose";

import { Payment } from "./payment.model";

import { PaymentStatus } from "./payment.types";

import { Order } from "../order/order.model";

import { NotificationService } from "../notification/notification.service";

import { Customer } from "../customer/customer.model";

// import { Account } from "../auth/auth.model";
import { Account } from "../auth/account.model";

import { Role } from "../auth/auth.constants";
import { NotificationType } from "../notification/notification.types";

export class PaymentService {
  // Customer submits payment
  static async createPayment(payload: any) {
    const order = await Order.findById(payload.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const existingPayment = await Payment.findOne({
      orderId: payload.orderId,
    });

    if (existingPayment) {
      throw new Error("Payment already submitted for this order");
    }

    const payment = await Payment.create({
      ...payload,
      status: PaymentStatus.PENDING,
    });

    // Notify all admins
    const admins = await Account.find({
      role: Role.ADMIN,
    });

    for (const admin of admins) {
      await NotificationService.createNotification(
        admin._id.toString(),
        "New Payment Submitted",
        "A customer has submitted a payment for verification.",
        // "SYSTEM" as any,
        NotificationType.PAYMENT,
        payment._id.toString(),
      );
    }

    return payment;
  }

  // Customer views own payments
  static async getMyPayments(customerId: string) {
    return await Payment.find({
      customerId,
    })
      .populate("orderId")
      .sort({
        createdAt: -1,
      });
  }

  // Admin views all payments
  static async getAllPayments() {
    return await Payment.find()
      .populate({
        path: "customerId",
        populate: {
          path: "accountId",
          select: "fullName email",
        },
      })
      .populate("orderId")
      .populate("verifiedBy", "fullName email")
      .sort({
        createdAt: -1,
      });
  }

  // Verify payment
  static async verifyPayment(paymentId: string, adminId: string) {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    payment.status = PaymentStatus.VERIFIED;

    payment.verifiedBy = new Types.ObjectId(adminId);

    payment.verifiedAt = new Date();

    await payment.save();

    // Update order
    await Order.findByIdAndUpdate(payment.orderId, {
      paymentStatus: "PAID",
    });

    // Notify customer
    const customer = await Customer.findById(payment.customerId);

    if (customer) {
      await NotificationService.createNotification(
        customer.accountId.toString(),
        "Payment Verified",
        "Your payment has been verified successfully.",
        // "SYSTEM" as any,
        NotificationType.PAYMENT,

        payment._id.toString(),
      );
    }

    return payment;
  }

  // Reject payment
  static async rejectPayment(paymentId: string, adminId: string) {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    payment.status = PaymentStatus.REJECTED;

    payment.verifiedBy = new Types.ObjectId(adminId);

    payment.verifiedAt = new Date();

    await payment.save();

    const customer = await Customer.findById(payment.customerId);

    if (customer) {
      await NotificationService.createNotification(
        customer.accountId.toString(),
        "Payment Rejected",
        "Your payment was rejected. Please upload a new receipt.",
        // "SYSTEM" as any,
        NotificationType.PAYMENT,
        payment._id.toString(),
      );
    }

    return payment;
  }
}
