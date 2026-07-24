// import bcrypt from "bcrypt";
// import { Account } from "./account.model";
// import { RegisterInput, SafeUserResponse } from "./auth.types";
// import jwt from "jsonwebtoken";
// import { env } from "../../config/env";
// import { LoginInput, LoginResponse } from "./auth.types";
// import { Customer } from "../customer/customer.model";
// import { Role } from "./auth.constants";

// export class AuthService {
//   static async register(payload: RegisterInput): Promise<SafeUserResponse> {
//     const existingUser = await Account.findOne({
//       email: payload.email.toLowerCase(),
//     });

//     if (existingUser) {
//       throw new Error("Email already exists");
//     }

//     const hashedPassword = await bcrypt.hash(payload.password, 10);

//     const user = await Account.create({
//       ...payload,
//       email: payload.email.toLowerCase(),
//       password: hashedPassword,
//       // provider: "LOCAL",
//       // isVerified: false,
//       role: Role.CUSTOMER,
//     });

//     if (user.role === Role.CUSTOMER) {
//       await Customer.create({
//         accountId: user._id,
//       });
//     }

//     return {
//       id: user._id.toString(),
//       fullName: user.fullName,
//       email: user.email,
//       role: user.role,
//     };
//   }

//   static async login(payload: LoginInput): Promise<LoginResponse> {
//     const user = await Account.findOne({
//       email: payload.email.toLowerCase(),
//     }).select("+password");

//     if (!user) {
//       throw new Error("Invalid email or password");
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       payload.password,
//       user.password,
//     );

//     if (!isPasswordCorrect) {
//       throw new Error("Invalid email or password");
//     }

//     if (!user.isActive) {
//     throw new Error(
//       "Your account has been deactivated. Please contact the administrator."
//     );
//   }
//     const token = jwt.sign(
//       {
//         userId: user.id,
//         role: user.role,
//       },
//       env.JWT_SECRET,
//       {
//         expiresIn: "24h",
//         //  expiresIn: env.JWT_EXPIRES_IN
//       },
//     );

//     return {
//       token,
//       user: {
//         id: user.id,
//         fullName: user.fullName,
//         email: user.email,
//         role: user.role,
//       },
//     };
//   }

//   static async getCurrentUser(userId: string) {
//     const user = await Account.findById(userId).select("-password");

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return {
//       id: user.id,
//       fullName: user.fullName,
//       email: user.email,
//       role: user.role,
//     };
//   }
// }

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Account } from "./account.model";
import { Customer } from "../customer/customer.model";

import { env } from "../../config/env";
import { Role } from "./auth.constants";
import crypto from "crypto";
import { EmailService } from "../email/email.service";

import {
  RegisterInput,
  LoginInput,
  LoginResponse,
  SafeUserResponse,
} from "./auth.types";

// import { verifyGoogleToken } from "google.service";
import { verifyGoogleToken } from "./google.service";

export class AuthService {
  // ==========================
  // Register (Email & Password)
  // ==========================
  static async register(payload: RegisterInput): Promise<SafeUserResponse> {
    const existingUser = await Account.findOne({
      email: payload.email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await Account.create({
      fullName: payload.fullName,
      email: payload.email.toLowerCase(),
      password: hashedPassword,
      phone: payload.phone,
      preferredLanguage: payload.preferredLanguage || "en",

      role: Role.CUSTOMER,

      provider: "LOCAL",
      isVerified: false,
    });

    await Customer.create({
      accountId: user._id,
    });

    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }

  // ==========================
  // Login (Email & Password)
  // ==========================
  static async login(payload: LoginInput): Promise<LoginResponse> {
    const user = await Account.findOne({
      email: payload.email.toLowerCase(),
    }).select("+password");

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (user.provider === "GOOGLE") {
      throw new Error(
        "This account uses Google Sign-In. Please continue with Google.",
      );
    }

    if (!user.password) {
      throw new Error("This account uses Google Sign-In.");
    }

    const passwordCorrect = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!passwordCorrect) {
      throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
      throw new Error("Your account has been deactivated.");
    }

    const token = this.generateToken(user.id, user.role);

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

  // ==========================
  // Google Login
  // ==========================
  static async googleLogin(credential: string): Promise<LoginResponse> {
    const googleUser = await verifyGoogleToken(credential);

    let user = await Account.findOne({
      email: googleUser.email.toLowerCase(),
    });

    // ==========================
    // Existing User
    // ==========================
    if (user) {
      if (!user.googleId) {
        user.googleId = googleUser.googleId;
      }

      user.provider = "GOOGLE";
      user.avatar = googleUser.picture;
      user.isVerified = true;

      await user.save();
    }

    // ==========================
    // New User
    // ==========================
    else {
      user = await Account.create({
        fullName: googleUser.name,

        email: googleUser.email.toLowerCase(),

        phone: "",

        role: Role.CUSTOMER,

        preferredLanguage: "en",

        provider: "GOOGLE",

        googleId: googleUser.googleId,

        avatar: googleUser.picture,

        isVerified: true,
      });

      await Customer.create({
        accountId: user._id,
      });
    }

    if (!user.isActive) {
      throw new Error("Your account has been deactivated.");
    }

    const token = this.generateToken(user.id, user.role);

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

  // ==========================
  // Current User
  // ==========================
  static async getCurrentUser(userId: string) {
    const user = await Account.findById(userId).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar,
      preferredLanguage: user.preferredLanguage,
    };
  }

  // ==========================
  // JWT Generator
  // ==========================
  private static generateToken(userId: string, role: Role) {
    return jwt.sign(
      {
        userId,
        role,
      },
      env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );
  }

  static async forgotPassword(email: string) {
    const user = await Account.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);

    await user.save();

    const resetLink = `${env.FRONTEND_URL}/reset-password/${resetToken}`;

    await EmailService.sendResetPasswordEmail(
      user.email,
      user.fullName,
      resetLink,
    );
  }
  static async resetPassword(token: string, password: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await Account.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      throw new Error("Invalid or expired reset token.");
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;

    user.resetPasswordExpires = undefined;

    await user.save();
  }
}
