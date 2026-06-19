import { Types } from "mongoose";

export enum ProductCategory {
  WEDDING = "WEDDING",
  CULTURAL = "CULTURAL",
  PERFORMANCE = "PERFORMANCE",
  MODERN = "MODERN",
  CHILDREN = "CHILDREN",
}

export enum CulturalStyle {
  OROMO = "OROMO",
  HABESHA = "HABESHA",
}

export interface IProduct {
  name: string;

  description: string;

  category: ProductCategory;

  culturalStyle?: CulturalStyle;

  images: string[];

  estimatedPrice: number;

  isAvailable: boolean;

  createdBy: Types.ObjectId;
}