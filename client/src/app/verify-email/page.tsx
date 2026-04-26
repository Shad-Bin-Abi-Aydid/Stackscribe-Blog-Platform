"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast } from "sonner";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) return;

    authClient.verifyEmail({ query: { token } }).then(({ error }) => {
      if (error) {
        toast.error("Verification failed. Link may have expired.");
      } else {
        toast.success("Email verified! You can now log in.");
      }
      router.push("/login");
    });
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-slate-500">Verifying your email...</p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
