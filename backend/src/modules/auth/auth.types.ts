import { Role } from "./auth.constants";

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  preferredLanguage?: "en" | "am" | "om";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SafeUserResponse {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: SafeUserResponse;
}

export interface GoogleLoginInput {
  credential: string;
}
