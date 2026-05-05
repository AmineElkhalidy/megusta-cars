"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { FirebaseError } from "firebase/app";
import {
  AdminAccessDeniedError,
  signInAdmin,
} from "@/lib/firebase/admin-auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { site } from "@/lib/site-config";

function friendlyError(err: unknown): string {
  if (err instanceof AdminAccessDeniedError) return err.message;
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Email or password is incorrect.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and retry.";
      case "auth/invalid-email":
        return "That doesn't look like a valid email address.";
      default:
        return err.message;
    }
  }
  return "Something went wrong. Please try again.";
}

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      await signInAdmin(email, password);
      router.replace(redirectTo);
    } catch (err) {
      setErrorMessage(friendlyError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-md flex-col justify-center px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-7 w-7" aria-hidden />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {site.name} · Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Sign in to the agency panel
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Only authorized agency accounts can manage the fleet and reservations.
        </p>
      </div>

      {!isFirebaseConfigured ? (
        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800 dark:text-amber-200">
          <p className="font-semibold">Firebase isn&apos;t configured yet.</p>
          <p className="mt-1 text-amber-800/80 dark:text-amber-200/80">
            Add your credentials to <code>.env.local</code> and follow{" "}
            <code>FIREBASE_SETUP.md</code> to enable admin login.
          </p>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-4">
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@megusta.ma"
              className="h-12 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              minLength={6}
              className="h-12 rounded-2xl border border-border bg-background px-4 text-base font-medium text-foreground outline-none ring-primary/30 focus:ring-2"
            />
          </label>
        </div>

        {errorMessage ? (
          <p
            role="alert"
            className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-700 dark:text-red-300"
          >
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || !isFirebaseConfigured}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Signing in…
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" aria-hidden />
              Sign in
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Forgot your password? Reset it from the Firebase console.
        </p>
      </form>
    </div>
  );
}
