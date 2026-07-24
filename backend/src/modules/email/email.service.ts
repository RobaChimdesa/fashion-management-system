import nodemailer from "nodemailer";
import { env } from "../../config/env";

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: Number(env.EMAIL_PORT),
    secure: false,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  static async sendResetPasswordEmail(
    email: string,
    fullName: string,
    resetLink: string,
  ) {
    await this.transporter.sendMail({
      from: `"Kan Seenaa" <${env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Hello ${fullName},</h2>

        <p>You requested to reset your password.</p>

        <p>
          Click the button below to create a new password.
        </p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            background:#2563eb;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:20px;">
          This link expires in 30 minutes.
        </p>

        <p>
          If you didn't request this,
          simply ignore this email.
        </p>
      </div>
      `,
    });
  }
}