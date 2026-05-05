export type CarStatus = "available" | "rented" | "maintenance";
export type Transmission = "Automatic" | "Manual";
export type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string; // SUV, Sedan, Coupe, Hatchback
  transmission: Transmission;
  fuel: FuelType;
  seats: number;
  doors: number;
  airConditioning: boolean;
  pricePerDay: number;
  imageUrl: string; // primary
  images?: string[]; // gallery
  features: string[];
  description?: string;
  status: CarStatus;
}

export type BookingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  carLabel: string;
  carImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  totalAmount: number;
  status: BookingStatus;
  createdAt: number;
}
