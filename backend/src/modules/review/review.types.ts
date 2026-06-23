import { Types } from "mongoose";

export interface IReview {
  customerId: Types.ObjectId;

  productId: Types.ObjectId;

  rating: number;

  comment?: string;
}