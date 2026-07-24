import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRequest } from "../../types/auth-request";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "Customer registered successfully",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      });
    }
  }
static async me(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const user =
      await AuthService.getCurrentUser(userId);

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "User not found",
    });
  }
}

static async adminOnly(
  req: AuthRequest,
  res: Response
): Promise<void> {

  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
  });
}

static async googleLogin(
  req: Request,
  res: Response
) {
  try {

    const result =
      await AuthService.googleLogin(
        req.body.credential
      );

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      data: result,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Google login failed",
    });

  }
}

static async forgotPassword(
  req: Request,
  res: Response,
) {
  try {
    await AuthService.forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message:
        "If an account exists, a password reset email has been sent.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
}
static async resetPassword(
  req: Request,
  res: Response
) {
  try {
    const token = req.params.token;

    if (!token || Array.isArray(token)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    const { password } = req.body;

    await AuthService.resetPassword(token, password);

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Password reset failed",
    });
  }
}

}
