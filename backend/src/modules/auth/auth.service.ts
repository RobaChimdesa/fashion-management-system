// Check existing email
// Hash password
// Create account
// Return account data

import bcrypt from "bcrypt";
import { Account } from "./account.model";
import { RegisterInput, SafeUserResponse } from "./auth.types";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { LoginInput, LoginResponse } from "./auth.types";
import { Role } from "./auth.constants";

export class AuthService {
  static async register(payload: RegisterInput): Promise<SafeUserResponse> {
    const existingUser = await Account.findOne({
      email: payload.email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await Account.create({
      ...payload,
      email: payload.email.toLowerCase(),
      password: hashedPassword,
      role: Role.CUSTOMER,
    });

    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }

  static async login(payload: LoginInput): Promise<LoginResponse> {
    const user = await Account.findOne({
      email: payload.email.toLowerCase(),
    }).select("+password");

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: "24h",
        //  expiresIn: env.JWT_EXPIRES_IN
      },
    );

    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }
}
