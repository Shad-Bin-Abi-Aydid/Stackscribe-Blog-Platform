"use server";

import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = formData;

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "shadaydid@gmail.com",
    subject: `New message from ${name} — StackScribe`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5;">New Contact Message — StackScribe</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 80px;"><strong>Name</strong></td>
            <td style="padding: 8px 0; color: #1e293b;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td>
            <td style="padding: 8px 0; color: #1e293b;">
              <a href="mailto:${email}" style="color: #4f46e5;">${email}</a>
            </td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="color: #64748b; margin-bottom: 8px;"><strong>Message</strong></p>
        <p style="color: #1e293b; white-space: pre-wrap;">${message}</p>
      </div>
    `,
  });

  if (error) return { success: false };
  return { success: true };
}
