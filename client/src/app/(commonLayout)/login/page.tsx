import { LoginForm } from "@/components/modules/authentication/login-form";

export default function Page() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-indigo-50 via-violet-50/70 to-white dark:from-indigo-950/50 dark:via-violet-950/30 dark:to-slate-950 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-700/20"
      />
      <div className="relative w-full max-w-sm">
        <LoginForm />
      </div>
    </section>
  );
}
