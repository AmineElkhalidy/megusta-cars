"use client";

import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, isFirebaseConfigured } from "./config";

/** A local uid generated for the fallback (no Firebase) path. */
const LOCAL_UID_KEY = "megusta-local-uid";

function getOrCreateLocalUid(): string {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(LOCAL_UID_KEY);
  if (existing) return existing;
  const next = `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  window.localStorage.setItem(LOCAL_UID_KEY, next);
  return next;
}

/**
 * Returns the current user's uid, auto-signing them in anonymously on first
 * visit when Firebase is configured.
 *
 * Skips the silent anonymous sign-in on the /admin surface — admins are
 * expected to sign in with email + password explicitly via /admin/login.
 */
export function useCurrentUserId(): { uid: string | null; loading: boolean } {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isAdminSurface = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    const authInstance = auth;
    if (!isFirebaseConfigured || !authInstance) {
      setUid(getOrCreateLocalUid());
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(authInstance, async (user: User | null) => {
      if (user) {
        setUid(user.uid);
        setLoading(false);
        return;
      }
      // No one signed in. On the admin surface, don't silently sign in as
      // anonymous — the admin sign-in flow handles authentication there.
      if (isAdminSurface) {
        setUid(null);
        setLoading(false);
        return;
      }
      try {
        const cred = await signInAnonymously(authInstance);
        setUid(cred.user.uid);
      } catch (err) {
        console.error("Anonymous sign-in failed:", err);
        setUid(getOrCreateLocalUid());
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [isAdminSurface]);

  return { uid, loading };
}
