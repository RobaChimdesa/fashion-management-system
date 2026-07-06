import { Types } from "mongoose";

export interface IMeasurement {
  customerId: Types.ObjectId;

  chest?: number;
  waist?: number;
  hip?: number;
  shoulder?: number;
  sleeveLength?: number;
  inseam?: number;
  neck?: number;
  height?: number;

  notes?: string;

  isCurrent?: boolean;
}
