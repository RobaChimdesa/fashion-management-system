import mongoose, { Schema } from "mongoose";
import { IReview } from "./review.types";

const reviewSchema = new Schema<IReview>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index(
  {
    customerId: 1,
    productId: 1,
  },
  {
    unique: true,
  }
);
export const Review =
  mongoose.model<IReview>(
    "Review",
    reviewSchema
  );