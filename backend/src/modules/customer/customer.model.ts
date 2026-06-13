import mongoose, { Schema, Document } from "mongoose";

import { Gender, PreferredLanguage, ICustomer } from "./customer.types";

export interface CustomerDocument extends ICustomer, Document {}

const customerSchema = new Schema<CustomerDocument>(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: Object.values(Gender),
    },

    dateOfBirth: {
      type: Date,
    },


    address: {
      country: {
        type: String,
        default: "Ethiopia",
      },
      city: {
        type: String,
      },

      subCity: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Customer = mongoose.model<CustomerDocument>(
  "Customer",
  customerSchema,
);
