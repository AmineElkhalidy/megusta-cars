"use client";

import { useEffect, useState } from "react";
import {
  subscribeAllBookings,
  subscribeUserBookings,
} from "./bookings";
import { isFirebaseConfigured } from "./config";
import { useCurrentUserId } from "./auth";
import { useBookingStore, useStoreHydration } from "@/lib/store";
import type { Booking } from "@/lib/types";

type UseBookingsResult = {
  bookings: Booking[];
  loading: boolean;
  /** The current user's uid (anonymous). `null` while auth is resolving. */
  uid: string | null;
};

/**
 * Returns the current user's bookings.
 *  - Firebase configured → live Firestore subscription filtered by uid
 *  - Not configured        → falls back to the persisted Zustand store
 */
export function useUserBookings(): UseBookingsResult {
  const { uid, loading: authLoading } = useCurrentUserId();
  const [firestoreBookings, setFirestoreBookings] = useState<Booking[] | null>(
    null
  );
  const hydrated = useStoreHydration();
  const localBookings = useBookingStore((s) => s.bookings);

  useEffect(() => {
    if (!isFirebaseConfigured || !uid) return;
    const unsub = subscribeUserBookings(uid, (next) =>
      setFirestoreBookings(next)
    );
    return () => unsub();
  }, [uid]);

  if (!isFirebaseConfigured) {
    return {
      bookings: hydrated ? localBookings : [],
      loading: !hydrated,
      uid,
    };
  }

  return {
    bookings: firestoreBookings ?? [],
    loading: authLoading || firestoreBookings === null,
    uid,
  };
}

/**
 * Returns every booking. Admin use only.
 * Falls back to local Zustand bookings when Firebase isn't configured so the
 * admin preview still demonstrates the UI before credentials land.
 */
export function useAllBookings(): { bookings: Booking[]; loading: boolean } {
  const [firestoreBookings, setFirestoreBookings] = useState<Booking[] | null>(
    null
  );
  const hydrated = useStoreHydration();
  const localBookings = useBookingStore((s) => s.bookings);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsub = subscribeAllBookings((next) => setFirestoreBookings(next));
    return () => unsub();
  }, []);

  if (!isFirebaseConfigured) {
    return { bookings: hydrated ? localBookings : [], loading: !hydrated };
  }

  return {
    bookings: firestoreBookings ?? [],
    loading: firestoreBookings === null,
  };
}
