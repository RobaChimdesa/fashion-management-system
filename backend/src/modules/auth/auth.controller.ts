// Receive request
// Call service
// Return response
// Handle errors

import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(
    req: Request,
    res: Response
  ) {
    try {
      const user = await AuthService.register(
        req.body
      );

      return res.status(201).json({
        success: true,
        message:
          "Customer registered successfully",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Registration failed",
      });
    }
  }
}