"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db, isFirebaseConfigured } from "./config";

const ADMINS_COLLECTION = "admins";

/**
 * Admin authorization is controlled by the Firestore `admins/{uid}` collection.
 * An account is considered an admin when a document at that path exists.
 * The agency owner creates this doc manually in the Firebase console.
 */
async function isAdminUid(uid: string): Promise<boolean> {
  if (!db) return false;
  try {
    const snap = await getDoc(doc(db, ADMINS_COLLECTION, uid));
    return snap.exists();
  } catch (err) {
    console.error("Admin lookup failed:", err);
    return false;
  }
}

export async function signInAdmin(email: string, password: string): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(
      "Firebase is not configured. Add your credentials to .env.local first."
    );
  }
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const admin = await isAdminUid(cred.user.uid);
  if (!admin) {
    // Clean up: reject the session so the user doesn't stay half signed-in.
    await signOut(auth);
    throw new AdminAccessDeniedError(
      "This account is not authorized to access the admin panel."
    );
  }
  return cred.user;
}

export async function signOutAdmin(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

export class AdminAccessDeniedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminAccessDeniedError";
  }
}

export type AdminAuthState = {
  /** Firebase user, if any is signed in. */
  user: User | null;
  /** True once the `admins/{uid}` lookup has resolved for the current user. */
  loading: boolean;
  /** True when the signed-in user has a matching admins doc. */
  isAdmin: boolean;
};

/**
 * Live hook for the admin surface: watches Firebase auth state, and for each
 * signed-in user checks the `admins` collection to decide authorization.
 */
export function useAdminAuth(): AdminAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (next) => {
      setUser(next);
      if (!next || next.isAnonymous) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setLoading(true);
      const admin = await isAdminUid(next.uid);
      setIsAdmin(admin);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading, isAdmin };
}
