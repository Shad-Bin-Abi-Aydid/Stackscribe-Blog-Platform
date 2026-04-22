"use client";

import { useState } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/actions/contact.action";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    setPending(true);
    const result = await sendContactEmail(data);
    setPending(false);

    if (result.success) {
      toast.success("Message sent! We'll get back to you soon.");
      form.reset();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Your Name
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="John Doe"
          className="rounded-xl border border-indigo-100 dark:border-indigo-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="rounded-xl border border-indigo-100 dark:border-indigo-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Write your message here..."
          className="rounded-xl border border-indigo-100 dark:border-indigo-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        className="gap-2 mt-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <Send className="size-4" />
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
