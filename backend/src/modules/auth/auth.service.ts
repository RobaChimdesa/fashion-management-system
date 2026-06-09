// Check existing email
// Hash password
// Create account
// Return account data

import bcrypt from "bcrypt";
import { Account } from "./account.model";
import { RegisterInput, SafeUserResponse } from "./auth.types";
import { Role } from "./auth.constants";

export class AuthService {
  static async register(
    payload: RegisterInput
  ): Promise<SafeUserResponse> {
    const existingUser = await Account.findOne({
      email: payload.email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(
      payload.password,
      10
    );

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
}