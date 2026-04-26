import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_KEY,
  },
});

// If your Prisma file is located elsewhere, you can change the path
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  trustedOrigins: [
    process.env.APP_URL || "http://localhost:3000",
    "http://localhost:3000",
    "https://stackscribe-blog-platform.vercel.app",
    "https://stackscribe-blog-platform-shad-aydids-projects.vercel.app",
  ],

  // Added user additional fields
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  // For the email verification
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

      try {
        await transporter.sendMail({
          from: '"Stackscribe Blog" <shadaydid@gmail.com>',
          to: user.email,
          subject: "Verify your email address",
          html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8" />
                <title>Email Verification</title>
              </head>
              <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial, sans-serif;">
                <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;margin-top:40px;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="background:#111827;color:white;text-align:center;padding:20px;font-size:22px;font-weight:bold;">
                      StackScribe
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px;color:#333;">
                      <h2 style="margin-top:0;">Verify Your Email</h2>
                      <p>Thank you for signing up for <strong>StackScribe</strong>. Please confirm your email address by clicking the button below.</p>
                      <div style="text-align:center;margin:30px 0;">
                        <a href="${verificationUrl}" style="background:#2563eb;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">
                          Verify Email
                        </a>
                      </div>
                      <p>If the button doesn't work, copy and paste this link:</p>
                      <p style="word-break:break-all;color:#2563eb;">${verificationUrl}</p>
                      <p style="margin-top:30px;font-size:14px;color:#666;">If you did not create this account, you can safely ignore this email.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f4f4f4;text-align:center;padding:15px;font-size:12px;color:#777;">
                      © ${new Date().getFullYear()} StackScribe. All rights reserved.
                    </td>
                  </tr>
                </table>
              </body>
              </html>
              `,
        });
      } catch (err: any) {
        console.error("Email error:", err.message);
        throw err;
      }
    },
  },

  // For the google logIn
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
      // This allow user to select email from multiple email
      prompt: "select_account consent",
      // redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
});
