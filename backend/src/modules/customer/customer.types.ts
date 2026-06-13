import { Types } from "mongoose";


export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum PreferredLanguage {
  ENGLISH = "ENGLISH",
  AMHARIC = "AMHARIC",
  OROMO = "OROMO",
}

export interface ICustomer {
  accountId: Types.ObjectId;

  phoneNumber?: string;

  gender?: Gender;

  dateOfBirth?: Date;

  address?: {
    country: string;
    city: string;
    subCity?: string;
    
  };
}