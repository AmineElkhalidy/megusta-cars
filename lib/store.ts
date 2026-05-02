"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { Booking, Car, CarStatus } from "./types";
import { mockCars } from "./mock-data";

/**
 * Customer-facing booking store.
 * Persists reservations to localStorage so the User Dashboard
 * reflects bookings instantly, even before Firebase is wired.
 */
type BookingStore = {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  cancelBooking: (id: string) => void;
  clearBookings: () => void;
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) => {
        const newBooking: Booking = {
          ...booking,
          id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          createdAt: Date.now(),
        };
        set({ bookings: [newBooking, ...get().bookings] });
        return newBooking;
      },
      updateBookingStatus: (id, status) => {
        set({
          bookings: get().bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        });
      },
      cancelBooking: (id) => {
        set({
          bookings: get().bookings.map((b) =>
            b.id === id ? { ...b, status: "cancelled" } : b
          ),
        });
      },
      clearBookings: () => set({ bookings: [] }),
    }),
    { name: "megusta-bookings" }
  )
);

/**
 * Admin-facing fleet store.
 * Source of truth for cars during demo. Swap mutations for Firestore writes when ready.
 */
type FleetStore = {
  cars: Car[];
  addCar: (car: Omit<Car, "id">) => void;
  updateCar: (id: string, updates: Partial<Car>) => void;
  removeCar: (id: string) => void;
  setStatus: (id: string, status: CarStatus) => void;
};

export const useFleetStore = create<FleetStore>()(
  persist(
    (set, get) => ({
      cars: mockCars,
      addCar: (car) => {
        const newCar: Car = { ...car, id: `car_${Date.now()}` };
        set({ cars: [newCar, ...get().cars] });
      },
      updateCar: (id, updates) => {
        set({
          cars: get().cars.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        });
      },
      removeCar: (id) => {
        set({ cars: get().cars.filter((c) => c.id !== id) });
      },
      setStatus: (id, status) => {
        set({
          cars: get().cars.map((c) => (c.id === id ? { ...c, status } : c)),
        });
      },
    }),
    { name: "megusta-fleet" }
  )
);

/** Track hydration so persisted stores don't cause SSR mismatch flicker. */
export function useStoreHydration() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
