import { Review } from "./review.model";
import { Types } from "mongoose";
import { Order } from "../order/order.model";
import { OrderStatus } from "../order/order.types";
import { Product } from "../product/product.model";
export class ReviewService {
  static async createReview(payload: any) {
    const deliveredOrder = await Order.findOne({
      customerId: payload.customerId,
      productId: payload.productId,
      status: OrderStatus.DELIVERED,
    });

    if (!deliveredOrder) {
      throw new Error("You can only review products you have received");
    }

    return await Review.create(payload);
  }

  static async updateReview(
    reviewId: string,
    customerId: string,
    payload: any,
  ) {
    const review = await Review.findOne({
      _id: reviewId,
      customerId,
    });

    if (!review) {
      throw new Error("Review not found");
    }

    review.rating = payload.rating ?? review.rating;

    review.comment = payload.comment ?? review.comment;

    await review.save();

    return review;
  }

  static async deleteReview(reviewId: string, customerId: string) {
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      customerId,
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return true;
  }

  static async getProductReviews(productId: string) {
    return await Review.find({
      productId,
    })
      .populate("customerId", "fullName")
      .sort({
        createdAt: -1,
      });
  }

  static async getProductRating(productId: string) {
    const result = await Review.aggregate([
      {
        $match: {
          productId: new Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$productId",
          averageRating: {
            $avg: "$rating",
          },

          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    return (
      result[0] || {
        averageRating: 0,
        totalReviews: 0,
      }
    );
  }
  static async updateProductRating(productId: string) {
    const result = await Review.aggregate([
      {
        $match: {
          productId: new Types.ObjectId(productId),
        },
      },

      {
        $group: {
          _id: "$productId",

          averageRating: {
            $avg: "$rating",
          },

          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    const stats = result[0] || {
      averageRating: 0,
      totalReviews: 0,
    };

    await Product.findByIdAndUpdate(productId, {
      averageRating: Number(stats.averageRating).toFixed(1),
      totalReviews: stats.totalReviews,
    });
  }

}
