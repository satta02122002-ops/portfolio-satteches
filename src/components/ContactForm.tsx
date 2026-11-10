"use client";

import { useActionState, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { contact, contactCopy } from "@/content";
import { track } from "@/lib/analytics";

const input =
  "mt-1.5 block w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent min-h-11";

type Values = Record<"name" | "company" | "role" | "email" | "message", string>;

export function ContactForm({ company = "" }: { company?: string }) {
  // React resets the form after every action, so keep what was typed to refill it on error.
  const last = useRef<Values>({ name: "", company, role: "", email: "", message: "" });
  const [state, action, pending] = useActionState<ContactState, FormData>(async (prev, form) => {
    const get = (k: string) => String(form.get(k) ?? "");
    last.current = { name: get("name"), company: get("company"), role: get("role"), email: get("email"), message: get("message") };
    const result = await sendContact(prev, form);
    if (result.status === "ok") track("contact_form_sent");
    return result;
  }, { status: "idle" });
  const v = last.current;

  function mailtoFallback() {
    const get = (k: keyof Values) => v[k];
    const subject = `Portfolio enquiry: ${get("role") || "role"}${get("company") ? ` at ${get("company")}` : ""}`;
    const body = `${get("message")}\n\n${get("name")}\n${get("company")}\n${get("email")}`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  if (state.status === "ok") {
    return (
      <div role="status" className="flex flex-col items-start justify-center gap-4 rounded-lg border border-line bg-surface p-8">
        <span className="stamp">✓ RECEIVED</span>
        <p className="font-display text-2xl font-bold">{contactCopy.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-lg border border-line bg-surface p-5 sm:p-7">
      <p className="label mb-4 text-muted">Booking form · all fields go straight to my inbox</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-[0.95rem] font-semibold">
          Name <span className="text-accent" aria-hidden="true">*</span>
          <input name="name" required autoComplete="name" defaultValue={v.name} className={input} />
        </label>
        <label className="block text-[0.95rem] font-semibold">
          Company
          <input name="company" autoComplete="organization" defaultValue={v.company} className={input} />
        </label>
        <label className="block text-[0.95rem] font-semibold">
          Role you&apos;re hiring for
          <input name="role" defaultValue={v.role} className={input} placeholder="e.g. Senior Logistics Coordinator" />
        </label>
        <label className="block text-[0.95rem] font-semibold">
          Email <span className="text-accent" aria-hidden="true">*</span>
          <input name="email" type="email" required autoComplete="email" defaultValue={v.email} className={input} />
        </label>
      </div>
      <label className="mt-4 block text-[0.95rem] font-semibold">
        Message <span className="text-accent" aria-hidden="true">*</span>
        <textarea name="message" required rows={5} defaultValue={v.message} className={`${input} resize-y`} />
      </label>
      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
        </button>
        <a href={`mailto:${contact.email}`} className="link text-[0.95rem]" data-track="contact_click">
          or email {contact.email}
        </a>
      </div>
      <div aria-live="polite" className="mt-4 empty:hidden">
        {state.status === "error" && (
          <p className="rounded-md border border-accent/50 px-4 py-3 text-[0.95rem]">
            {state.message}{" "}
            {state.fallback && (
              <button
                type="button"
                className="link min-h-11 font-semibold"
                onClick={() => {
                  track("contact_click");
                  window.location.href = mailtoFallback();
                }}
              >
                Open it in your email app
              </button>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
