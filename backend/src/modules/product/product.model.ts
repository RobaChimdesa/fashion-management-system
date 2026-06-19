import mongoose, { Schema } from "mongoose";

import {
  IProduct,
  ProductCategory,
  CulturalStyle,
} from "./product.types";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },

    culturalStyle: {
      type: String,
      enum: Object.values(CulturalStyle),
    },

    images: [
      {
        type: String,
      },
    ],

    estimatedPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>(
  "Product",
  productSchema
);