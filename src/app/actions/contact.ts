"use server";

import { headers } from "next/headers";
import { contact } from "@/content";
import { rateLimit } from "@/lib/rateLimit";

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string; fallback?: boolean };

const field = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(form, "website", 200)) return { status: "ok" };

  const name = field(form, "name", 120);
  const company = field(form, "company", 120);
  const role = field(form, "role", 160);
  const email = field(form, "email", 200);
  const message = field(form, "message", 4000);

  if (!name || !email || !message) return { status: "error", message: "Please add your name, email and a message." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "That email address doesn't look right." };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) return { status: "error", message: "Too many messages from this connection. Please email me directly." };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { status: "error", fallback: true, message: "The form isn't connected yet. Please send the same message by email." };
  }

  const rows = [
    ["Name", name],
    ["Company", company || "—"],
    ["Role", role || "—"],
    ["Email", email],
  ];
  const html = `${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v)}</p>`).join("")}<hr><p style="white-space:pre-wrap">${escape(message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? contact.email],
        reply_to: email,
        subject: `Portfolio enquiry: ${role || "role"}${company ? ` at ${company}` : ""} (${name})`,
        html,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return { status: "ok" };
  } catch (err) {
    console.error("contact form", err);
    return { status: "error", fallback: true, message: "Sending failed on my side. Please send the same message by email." };
  }
}
