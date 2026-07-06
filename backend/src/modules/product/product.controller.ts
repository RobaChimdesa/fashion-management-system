import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { AuthRequest } from "../../types/auth-request";
import { UploadService } from "../upload/upload.service";
export class ProductController {
  static async createProduct(req: AuthRequest, res: Response) {
    try {
      const product = await ProductService.createProduct(
        req.body,
        req.user!.id,
      );

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getAllProducts(req: AuthRequest, res: Response) {
    try {
      const products = await ProductService.getAllProducts(req.query as any);

      res.status(200).json({
        success: true,
        ...products,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getProductById(req: AuthRequest, res: Response) {
    try {
      const product = await ProductService.getProductById(
        req.params.id as string,
      );

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateProduct(req: AuthRequest, res: Response) {
    try {
      const product = await ProductService.updateProduct(
        req.params.id as string,
        req.body,
      );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteProduct(req: AuthRequest, res: Response) {
    try {
      const result = await ProductService.deleteProduct(
        req.params.id as string,
      );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const result = await UploadService.uploadImage(req.file.path);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getTopRatedProducts(req: Request, res: Response) {
    const products = await ProductService.getTopRatedProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  }
}
