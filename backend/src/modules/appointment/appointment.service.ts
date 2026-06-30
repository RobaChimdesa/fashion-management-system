import { Types } from "mongoose";

import { Appointment } from "./appointment.model";
import {
  AppointmentPurpose,
  AppointmentStatus,
  IAppointment,
} from "./appointment.types";

import { Product } from "../product/product.model";
import { Order } from "../order/order.model";
import { Customer } from "../customer/customer.model";
import { Role } from "../auth/auth.constants";

import { NotificationService } from "../notification/notification.service";

import { NotificationType } from "../notification/notification.types";
import { Account } from "../auth/account.model";
// import { Account } from "../account/account.model";
export class AppointmentService {
  static async createAppointment(payload: any) {
    // Product Viewing requires product
    if (
      payload.purpose === AppointmentPurpose.PRODUCT_VIEWING &&
      !payload.productId
    ) {
      throw new Error("Product is required for product viewing.");
    }

    // These appointment types require an order
    if (
      [
        AppointmentPurpose.MEASUREMENT,
        AppointmentPurpose.FITTING,
        AppointmentPurpose.ORDER_DISCUSSION,
        AppointmentPurpose.PICKUP,
      ].includes(payload.purpose) &&
      !payload.orderId
    ) {
      throw new Error("Order is required for this appointment.");
    }

    // Validate product
    if (payload.productId) {
      const product = await Product.findById(payload.productId);

      if (!product) {
        throw new Error("Product not found");
      }
    }

    // Validate order
    if (payload.orderId) {
      const order = await Order.findById(payload.orderId);

      if (!order) {
        throw new Error("Order not found");
      }
    }

    const appointment = await Appointment.create(payload);

    // Notify every staff member
    const staffAccounts = await Account.find({
      role: Role.STAFF,
    });

    for (const staff of staffAccounts) {
      await NotificationService.createNotification(
        staff._id.toString(),
        "New Appointment",
        `A customer booked a ${payload.purpose} appointment.`,
        NotificationType.APPOINTMENT,
        appointment._id.toString(),
      );
    }

    return appointment;
  }

  static async getMyAppointments(customerId: string) {
    return await Appointment.find({
      customerId,
    })
      .populate("productId", "name images")
      .populate("orderId")
      .populate("staffId")
      .sort({
        appointmentDate: 1,
      });
  }

  static async getAllAppointments() {
    return await Appointment.find()
      .populate({
        path: "customerId",
        populate: {
          path: "accountId",
          select: "fullName email",
        },
      })
      .populate("productId", "name images")
      .populate("orderId")
      .populate({
        path: "staffId",
        populate: {
          path: "accountId",
          select: "fullName email",
        },
      })
      .sort({
        appointmentDate: 1,
      });
  }

  static async confirmAppointment(appointmentId: string, staffId: string) {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    appointment.staffId = new Types.ObjectId(staffId);

    appointment.status = AppointmentStatus.CONFIRMED;

    await appointment.save();

    // Notify customer
    const customer = await Customer.findById(appointment.customerId);

    if (customer) {
      await NotificationService.createNotification(
        customer.accountId.toString(),
        "Appointment Confirmed",
        "Your appointment has been confirmed.",
        NotificationType.APPOINTMENT,
        appointment._id.toString(),
      );
    }

    return appointment;
  }

  static async cancelAppointment(appointmentId: string) {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    appointment.status = AppointmentStatus.CANCELLED;

    await appointment.save();

    const customer = await Customer.findById(appointment.customerId);

    if (customer) {
      await NotificationService.createNotification(
        customer.accountId.toString(),
        "Appointment Cancelled",
        "Your appointment has been cancelled.",
        NotificationType.APPOINTMENT,
        appointment._id.toString(),
      );
    }

    return appointment;
  }

  static async completeAppointment(appointmentId: string) {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    appointment.status = AppointmentStatus.COMPLETED;

    await appointment.save();

    const customer = await Customer.findById(appointment.customerId);

    if (customer) {
      await NotificationService.createNotification(
        customer.accountId.toString(),
        "Appointment Completed",
        "Your appointment has been completed.",
        NotificationType.APPOINTMENT,
        appointment._id.toString(),
      );
    }

    return appointment;
  }
}
