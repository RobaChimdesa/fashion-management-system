import mongoose, { Schema } from "mongoose";

import { INotification, NotificationType } from "./notification.types";

const notificationSchema = new Schema<INotification>(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
