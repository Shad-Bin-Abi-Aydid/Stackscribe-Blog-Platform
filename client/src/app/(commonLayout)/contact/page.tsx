import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import ContactForm from "@/components/modules/contact/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "shadaydid@gmail.com",
    href: "mailto:shadaydid@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "07341 009 647",
    href: "tel:07341009647",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Slough, London, UK",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-indigo-50 via-violet-50/70 to-white dark:from-indigo-950/50 dark:via-violet-950/30 dark:to-slate-950 py-24 text-center px-4">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-700/20"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Badge className="gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-800">
              <Sparkles className="size-3.5" />
              Get In Touch
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white leading-tight">
            We&apos;d Love to{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Hear From You
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a question, suggestion, or just want to say hello? Reach out
            and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-white dark:bg-slate-950 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                Contact Information
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                Reach us through any of the channels below.
              </p>
              <div className="mt-4 h-1 w-16 rounded-full bg-indigo-500" />
            </div>

            <div className="flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-white/70 backdrop-blur p-5 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/40 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/50 p-3 shrink-0">
                    <Icon className="size-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-slate-800 dark:text-white font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-800 dark:text-white font-semibold">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Form */}
          <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/40 backdrop-blur p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Send a Message
            </h2>

            <ContactForm />
          </div>
        </div>
      </section>

      <div className="pointer-events-none h-16 bg-linear-to-b from-transparent to-transparent dark:to-indigo-950" />
    </div>
  );
}
