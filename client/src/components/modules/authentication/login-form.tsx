"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

// Zod Validation
const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function LoginForm() {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error?.message, { id: toastId });
          return;
        }
        toast.success("Logged in successfully", { id: toastId });
        form.reset();
        router.push("/dashboard");
      } catch {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
    },
  });

  return (
    <div className="w-full rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-white/80 dark:bg-indigo-950/40 backdrop-blur shadow-xl shadow-indigo-100/50 dark:shadow-indigo-900/20 px-8 py-10">
      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="inline-flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/50 p-3 mb-4">
          <BookOpen className="size-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign in to your StackScribe account
        </p>
      </div>

      {/* Google */}
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        type="button"
        className="w-full rounded-xl border-indigo-100 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 gap-2 mb-6"
      >
        <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-indigo-100 dark:bg-indigo-900/50" />
        <span className="text-xs text-slate-400 dark:text-slate-500">or sign in with email</span>
        <div className="flex-1 h-px bg-indigo-100 dark:bg-indigo-900/50" />
      </div>

      {/* Form */}
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>

      {/* Submit */}
      <Button
        form="login-form"
        type="submit"
        size="lg"
        className="w-full mt-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 font-semibold transition-all duration-200 hover:scale-105"
      >
        Sign In
      </Button>

      {/* Footer link */}
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
