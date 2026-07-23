import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env";

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
}

export async function verifyGoogleToken(
  credential: string
): Promise<GoogleUser> {

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token.");
  }

  return {
    googleId: payload.sub,

    email: payload.email || "",

    name: payload.name || "",

    picture: payload.picture,
  };
}