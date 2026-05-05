"use client";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";
import type { Booking, BookingStatus } from "@/lib/types";

const BOOKINGS_COLLECTION = "bookings";

function docToBooking(id: string, data: Record<string, unknown>): Booking {
  return { id, ...(data as Omit<Booking, "id">) };
}

/**
 * Subscribe to a single user's bookings in real time (newest first).
 * Does nothing when Firebase isn't configured — callers then rely on the
 * Zustand booking store as the local fallback.
 */
export function subscribeUserBookings(
  userId: string,
  onChange: (bookings: Booking[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (!isFirebaseConfigured || !db || !userId) return () => {};

  // Equality-only query — no composite index needed (Firestore requires one if we
  // added orderBy("createdAt") here). Newest-first sorting happens client-side.
  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where("userId", "==", userId)
  );
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => docToBooking(d.id, d.data()));
      list.sort((a, b) => b.createdAt - a.createdAt);
      onChange(list);
    },
    (err) => {
      console.error("subscribeUserBookings error:", err);
      onError?.(err);
    }
  );
}

/** Subscribe to *all* bookings — admin use only. */
export function subscribeAllBookings(
  onChange: (bookings: Booking[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (!isFirebaseConfigured || !db) return () => {};

  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    q,
    (snap) => onChange(snap.docs.map((d) => docToBooking(d.id, d.data()))),
    (err) => {
      console.error("subscribeAllBookings error:", err);
      onError?.(err);
    }
  );
}

/** Create a new booking. Returns the generated Firestore id. */
export async function createBooking(
  payload: Omit<Booking, "id" | "createdAt"> & { createdAt?: number }
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const ref = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...payload,
    createdAt: payload.createdAt ?? Date.now(),
  });
  return ref.id;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await updateDoc(doc(db, BOOKINGS_COLLECTION, id), { status });
}

export async function cancelBooking(id: string): Promise<void> {
  return updateBookingStatus(id, "cancelled");
}
