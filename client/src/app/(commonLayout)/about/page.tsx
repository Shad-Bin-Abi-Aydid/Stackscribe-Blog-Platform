import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, PenLine, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Articles Published", value: "500+" },
  { label: "Active Writers", value: "120+" },
  { label: "Monthly Readers", value: "10K+" },
];

const features = [
  {
    icon: PenLine,
    title: "Open Publishing",
    description:
      "Any developer can sign up and start sharing their knowledge with the community — no gatekeeping.",
  },
  {
    icon: Zap,
    title: "Quality Content",
    description:
      "Articles focused on real-world web development, programming patterns, and practical technology insights.",
  },
  {
    icon: Users,
    title: "Built for Community",
    description:
      "A platform where developers learn from each other, grow together, and celebrate good writing.",
  },
];

export default function AboutPage() {
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
              About StackScribe
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white leading-tight">
            A Platform Built by{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Developers
            </span>
            , for Developers
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            StackScribe is an open blogging platform where developers write,
            share, and discover practical knowledge on web development and
            modern technology.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 rounded-2xl border border-indigo-100 bg-white/70 backdrop-blur px-4 py-5 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/40 transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {s.value}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white dark:bg-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              What We Offer
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
              Everything you need to read, write, and grow.
            </p>
            <div className="mt-4 h-1 w-16 rounded-full bg-indigo-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-indigo-100 bg-white/70 backdrop-blur p-6 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/40 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/50 p-3">
                  <f.icon className="size-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-slate-950 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/40 backdrop-blur px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Ready to share your knowledge?
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
            Join our community of writers and start publishing today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 font-semibold transition-all duration-200 hover:scale-105"
            >
              <Link href="/register">
                <PenLine className="size-4" />
                Start Writing
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 px-8 rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900/30 transition-all duration-200 hover:scale-105"
            >
              <Link href="/blogs">
                <BookOpen className="size-4" />
                Explore Blogs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="pointer-events-none h-16 bg-linear-to-b from-transparent to-transparent dark:to-indigo-950" />
    </div>
  );
}
