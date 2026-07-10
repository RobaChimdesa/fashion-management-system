import bcrypt from "bcrypt";
import { Account } from "../auth/account.model";
import { Role } from "../auth/auth.constants";

export class StaffService {
  static async createStaff(data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    const existing = await Account.findOne({
      email: data.email,
    });

    if (existing) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const staff = await Account.create({
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: Role.STAFF,
      isActive: true,
    });

    return staff;
  }

  static async getAllStaff() {
    return Account.find({
      role: Role.STAFF,
    }).select("-password");
  }

  static async getStaffById(id: string) {
    const staff = await Account.findOne({
      _id: id,
      role: Role.STAFF,
    }).select("-password");

    if (!staff) {
      throw new Error("Staff not found");
    }

    return staff;
  }

  static async updateStaff(
  id: string,
  data: Partial<{
    fullName: string;
    email: string;
    phone: string;
  }>
) {
  // Check if the staff exists
  const staff = await Account.findOne({
    _id: id,
    role: Role.STAFF,
  });

  if (!staff) {
    throw new Error("Staff not found");
  }

  // Check email uniqueness
  if (data.email) {
    const existingEmail = await Account.findOne({
      email: data.email.toLowerCase(),
      _id: { $ne: id },
    });

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    data.email = data.email.toLowerCase();
  }

  const updatedStaff = await Account.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  ).select("-password");

  return updatedStaff;
}

  static async deactivateStaff(id: string) {
    const staff = await Account.findOneAndUpdate(
      {
        _id: id,
        role: Role.STAFF,
      },
      {
        isActive: false,
      },
      {
        new: true,
      },
    );

    if (!staff) {
      throw new Error("Staff not found");
    }

    return staff;
  }

  static async activateStaff(id: string) {
    const staff = await Account.findOneAndUpdate(
      {
        _id: id,
        role: Role.STAFF,
      },
      {
        isActive: true,
      },
      {
        new: true,
      },
    ).select("-password");

    if (!staff) {
      throw new Error("Staff not found");
    }

    return staff;
  }
}
