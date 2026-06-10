import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/auth-request";
import { Role } from "../modules/auth/auth.constants";

export const authorize = (
  ...allowedRoles: Role[]
) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });

      return;
    }

    next();
  };
};