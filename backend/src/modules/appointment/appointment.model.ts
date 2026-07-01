import mongoose, { Schema } from "mongoose";

import {
  IAppointment,
  AppointmentPurpose,
  AppointmentStatus,
} from "./appointment.types";

const appointmentSchema = new Schema<IAppointment>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // staffId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Staff",
    // },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },

    purpose: {
      type: String,
      enum: Object.values(AppointmentPurpose),
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema,
);
