import { Request, Response } from "express";

import { ReviewService } from "./review.service";
import { Customer } from "../customer/customer.model";

export class ReviewController {
  // static async createReview(req: any, res: Response) {
  //   try {
  //     const review = await ReviewService.createReview({
  //       customerId: req.user.customerId,

  //       productId: req.body.productId,

  //       rating: req.body.rating,

  //       comment: req.body.comment,
  //     });

  //     return res.status(201).json({
  //       success: true,
  //       data: review,
  //     });
  //   } catch (error: any) {
  //     return res.status(400).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }
  static async createReview(req: any, res: Response) {
    try {
      const customer = await Customer.findOne({
        accountId: req.user.id,
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer profile not found",
        });
      }

      const review = await ReviewService.createReview({
        customerId: customer._id,
        productId: req.body.productId,
        rating: req.body.rating,
        comment: req.body.comment,
      });

      return res.status(201).json({
        success: true,
        data: review,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateReview(req: any, res: Response) {
    try {
      const customer = await Customer.findOne({
        accountId: req.user.id,
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer profile not found",
        });
      }
      const review = await ReviewService.updateReview(
        req.params.id,
        customer._id.toString(),
        req.body,
      );

      return res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteReview(req: any, res: Response) {
    try {
      const customer = await Customer.findOne({
        accountId: req.user.id,
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer profile not found",
        });
      }

      await ReviewService.deleteReview(req.params.id, customer._id.toString());

      return res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getProductReviews(req: Request, res: Response) {
    try {
      const reviews = await ReviewService.getProductReviews(
        req.params.productId as string,
      );

      return res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
