"use client";

import { useEffect, useState } from "react";
import { subscribeCars } from "./cars";
import { isFirebaseConfigured } from "./config";
import { mockCars } from "@/lib/mock-data";
import type { Car } from "@/lib/types";

type UseCarsResult = {
  cars: Car[];
  loading: boolean;
  /** True once the initial load (or the fallback emit) has happened. */
  ready: boolean;
  /**
   * True when Firebase is configured and the Firestore cars collection is
   * empty (cars shown are the mockCars fallback). Admin uses this to offer
   * a "seed demo fleet" action.
   */
  firestoreEmpty: boolean;
};

/**
 * Subscribes to the live cars collection. When Firestore is empty or Firebase
 * isn't configured, gracefully falls back to `mockCars` so landing + fleet
 * pages always have something to render.
 */
export function useCars(): UseCarsResult {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [ready, setReady] = useState(!isFirebaseConfigured);
  const [firestoreEmpty, setFirestoreEmpty] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsub = subscribeCars((next) => {
      setFirestoreEmpty(next.length === 0);
      setCars(next.length > 0 ? next : mockCars);
      setReady(true);
    });
    return () => unsub();
  }, []);

  return { cars, loading: !ready, ready, firestoreEmpty };
}

/** Convenience: look up one car by id from the live list. */
export function useCar(carId: string | undefined | null): {
  car: Car | null;
  loading: boolean;
} {
  const { cars, loading } = useCars();
  if (!carId) return { car: null, loading };
  return { car: cars.find((c) => c.id === carId) ?? null, loading };
}
