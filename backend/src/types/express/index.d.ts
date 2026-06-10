import { Role } from "../../modules/auth/auth.constants";

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: Role;
    };
  }
}

export {};