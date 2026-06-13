import mongoose, { Schema, Document } from "mongoose";

import { IMeasurement } from "./measurement.types";

export interface MeasurementDocument
  extends IMeasurement,
    Document {}

const measurementSchema =
  new Schema<MeasurementDocument>(
    {
      customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
      },

      chest: Number,

      waist: Number,

      hip: Number,

      shoulder: Number,

      sleeveLength: Number,

      inseam: Number,

      neck: Number,

      height: Number,

      notes: {
        type: String,
      },

      isCurrent: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Measurement =
  mongoose.model<MeasurementDocument>(
    "Measurement",
    measurementSchema
  );