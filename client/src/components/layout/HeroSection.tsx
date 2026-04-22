import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, PenLine, Sparkles } from "lucide-react";
import Link from "next/link";
import HeroHeading from "./HeroHeading";

const stats = [
  { label: "Articles Published", value: "500+" },
  { label: "Active Writers", value: "120+" },
  { label: "Monthly Readers", value: "10K+" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-indigo-50 via-violet-50/70 to-white dark:from-indigo-950/50 dark:via-violet-950/30 dark:to-slate-950">
      {/* animated blobs */}
      <div
        aria-hidden
        className="animate-blob delay-2000 pointer-events-none absolute -top-32 -left-20 h-125 w-125 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20"
      />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -bottom-20 -right-20 h-125 w-125 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-700/20"
      />
      {/* dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-size-[28px_28px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 text-center">
        {/* badge */}
        <div className="animate-fade-up flex justify-center mb-6">
          <Badge className="gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-800">
            <Sparkles className="size-3.5" />
            Developer Blog Platform
          </Badge>
        </div>

        {/* heading */}
        <HeroHeading />

        {/* sub-heading */}
        <p className="animate-fade-up delay-200 mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Explore insightful articles on web development, programming, and
          technology — written by passionate developers for the community.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gap-2 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 font-semibold transition-all duration-200 hover:scale-105"
          >
            <Link href="/blogs">
              <BookOpen className="size-4" />
              Explore Blogs
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 px-8 rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900/30 transition-all duration-200 hover:scale-105"
          >
            <Link href="/register">
              <PenLine className="size-4" />
              Start Writing
            </Link>
          </Button>
        </div>

        {/* stats */}
        <div className="animate-fade-up delay-450 mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto">
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

      {/* scroll indicator */}
      <div className="animate-fade-up delay-600 relative z-10 flex justify-center pb-10">
        <ChevronDown className="size-6 text-indigo-400 dark:text-indigo-500 animate-bounce" />
      </div>

      {/* wave fade into cards section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-white dark:to-slate-950" />
    </section>
  );
}
