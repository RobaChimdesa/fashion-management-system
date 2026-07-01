import { Types } from "mongoose";

export enum PaymentMethod {
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
  TELEBIRR = "TELEBIRR",
  CBE_BIRR = "CBE_BIRR",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export interface IPayment {
  orderId: Types.ObjectId;

  customerId: Types.ObjectId;

  amount: number;

  paymentMethod: PaymentMethod;

  status: PaymentStatus;

  receiptImage?: string;

  transactionReference?: string;

  verifiedBy?: Types.ObjectId;

  verifiedAt?: Date;
}