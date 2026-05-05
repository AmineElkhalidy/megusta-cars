"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";
import type { Car, CarStatus } from "@/lib/types";
import { mockCars } from "@/lib/mock-data";

const CARS_COLLECTION = "cars";

/** Narrow the plain Firestore shape back into our `Car` type. */
function docToCar(id: string, data: Record<string, unknown>): Car {
  return { id, ...(data as Omit<Car, "id">) };
}

/**
 * Subscribe to the cars collection in real time.
 * Returns an unsubscribe function. Calls `onChange` with an array each update.
 */
export function subscribeCars(
  onChange: (cars: Car[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (!isFirebaseConfigured || !db) {
    // Fallback: emit mock data once. Caller treats this like a static snapshot.
    onChange(mockCars);
    return () => {};
  }

  const q = query(collection(db, CARS_COLLECTION), orderBy("make"));
  return onSnapshot(
    q,
    (snap) => {
      const cars = snap.docs.map((d) => docToCar(d.id, d.data()));
      onChange(cars);
    },
    (err) => {
      console.error("subscribeCars error:", err);
      onError?.(err);
    }
  );
}

/** Allocate a new car document id before uploads (e.g. Storage paths under `cars/{id}/`). */
export function allocateCarDocumentId(): string {
  if (!db) throw new Error("Firebase not configured");
  return doc(collection(db, CARS_COLLECTION)).id;
}

/** Create a new car document. Pass `id` to use a pre-allocated id (after uploading images). */
export async function createCar(
  car: Omit<Car, "id">,
  options?: { id?: string }
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  if (options?.id) {
    await setDoc(doc(db, CARS_COLLECTION, options.id), car);
    return options.id;
  }
  const ref = await addDoc(collection(db, CARS_COLLECTION), car);
  return ref.id;
}

export async function updateCar(id: string, updates: Partial<Car>): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  // Firestore doesn't want `id` inside the payload; strip it defensively.
  const { id: _ignored, ...rest } = updates as Partial<Car> & { id?: string };
  void _ignored;
  await updateDoc(doc(db, CARS_COLLECTION, id), rest);
}

export async function removeCar(id: string): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, CARS_COLLECTION, id));
}

export async function setCarStatus(id: string, status: CarStatus): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await updateDoc(doc(db, CARS_COLLECTION, id), { status });
}

/**
 * One-shot seed. Writes `mockCars` into the cars collection in a single batch
 * so an empty Firestore project can be bootstrapped with the demo fleet.
 */
export async function seedCars(): Promise<number> {
  if (!db) throw new Error("Firebase not configured");
  const batch = writeBatch(db);
  for (const { id: _mockId, ...rest } of mockCars) {
    void _mockId;
    const ref = doc(collection(db, CARS_COLLECTION));
    batch.set(ref, rest);
  }
  await batch.commit();
  return mockCars.length;
}
