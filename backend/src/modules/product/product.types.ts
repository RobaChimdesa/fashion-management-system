import { Types } from "mongoose";

export enum ProductCategory {
  OROMO_WEDDING_DRESS = "Oromo Wedding Dress",
  HABESHA_KEMIS = "Habesha Kemis",
  WEDDING_DRESS = "Wedding Dress",
  WEDDING = "WEDDING",
  CULTURAL = "CULTURAL",
  PERFORMANCE = "PERFORMANCE",
  MODERN = "MODERN",
  CHILDREN = "CHILDREN",
  MODERN_SUIT = "Modern Suit",
  CHILDREN_TRADITIONAL_WEAR = "Children Traditional Wear",
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

  Price: number;

  isAvailable: boolean;

  createdBy: Types.ObjectId;
  averageRating?: number;

  totalReviews?: number;
}
