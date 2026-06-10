import { Request } from "express";
import { Role } from "../modules/auth/auth.constants";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}