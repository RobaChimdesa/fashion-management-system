// import mongoose, { Schema } from "mongoose";
// import { Role } from "./auth.constants";

// export interface IAccount extends mongoose.Document {
//   fullName: string;
//   email: string;
//   password: string;
//   phone: string;
//   role: Role;
//   preferredLanguage: "en" | "am" | "om";
//   isActive: boolean;
// }

// const accountSchema = new Schema<IAccount>(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false,
//     },

//     phone: {
//       type: String,

//     },

//     role: {
//       type: String,
//       enum: Object.values(Role),
//       default: Role.CUSTOMER,
//     },

//     preferredLanguage: {
//       type: String,
//       enum: ["en", "am", "om"],
//       default: "en",
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Account = mongoose.model<IAccount>(
//   "Account",
//   accountSchema
// );

import mongoose, { Schema } from "mongoose";
import { Role } from "./auth.constants";

export interface IAccount extends mongoose.Document {
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  
  role: Role;

  preferredLanguage: "en" | "am" | "om";

  provider: "LOCAL" | "GOOGLE";
  googleId?: string;
  avatar?: string;

  isVerified: boolean;
  isActive: boolean;
}

const accountSchema = new Schema<IAccount>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
    },

    preferredLanguage: {
      type: String,
      enum: ["en", "am", "om"],
      default: "en",
    },

    provider: {
      type: String,
      enum: ["LOCAL", "GOOGLE"],
      default: "LOCAL",
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    avatar: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Account = mongoose.model<IAccount>("Account", accountSchema);
