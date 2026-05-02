import type { Car } from "./types";

/**
 * Demo fleet. Replace with Firestore reads in production.
 * Each car has a primary image plus a small gallery for the details page.
 */
export const mockCars: Car[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    type: "Sedan",
    transmission: "Automatic",
    fuel: "Electric",
    seats: 5,
    doors: 4,
    airConditioning: true,
    pricePerDay: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620891549027-942faa9d65d4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["Autopilot", "Glass Roof", "Premium Audio", "Wireless Charging"],
    description:
      "Whisper-quiet electric sedan with rapid acceleration and an effortless minimalist interior.",
    status: "available",
  },
  {
    id: "2",
    make: "Porsche",
    model: "Macan",
    year: 2023,
    type: "SUV",
    transmission: "Automatic",
    fuel: "Gasoline",
    seats: 5,
    doors: 5,
    airConditioning: true,
    pricePerDay: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1503376712341-0048236c9302?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503376712341-0048236c9302?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611016186353-9af58c69a533?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["Leather Seats", "Navigation", "Sunroof", "Sport Mode"],
    description:
      "Premium compact SUV blending sports-car handling with everyday usability.",
    status: "available",
  },
  {
    id: "3",
    make: "BMW",
    model: "4 Series",
    year: 2024,
    type: "Coupe",
    transmission: "Automatic",
    fuel: "Gasoline",
    seats: 4,
    doors: 2,
    airConditioning: true,
    pricePerDay: 110,
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["M Sport Package", "Heated Seats", "Apple CarPlay", "HUD"],
    description:
      "Driver-focused coupe with athletic styling and balanced rear-wheel-drive dynamics.",
    status: "available",
  },
  {
    id: "4",
    make: "Volvo",
    model: "XC90",
    year: 2024,
    type: "SUV",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 7,
    doors: 5,
    airConditioning: true,
    pricePerDay: 135,
    imageUrl:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["AWD", "Panoramic Roof", "360 Camera", "Bowers & Wilkins Audio"],
    description:
      "Spacious 7-seat SUV with Scandinavian craftsmanship and class-leading safety.",
    status: "available",
  },
  {
    id: "5",
    make: "Audi",
    model: "A6",
    year: 2023,
    type: "Sedan",
    transmission: "Automatic",
    fuel: "Gasoline",
    seats: 5,
    doors: 4,
    airConditioning: true,
    pricePerDay: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["Virtual Cockpit", "Matrix LED", "Quattro AWD", "Bang & Olufsen"],
    description:
      "Refined executive sedan with intuitive tech and quietly confident performance.",
    status: "available",
  },
  {
    id: "6",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2024,
    type: "Sedan",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    doors: 4,
    airConditioning: true,
    pricePerDay: 105,
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814086367-b30c662e4d14?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617531653520-bd7c93b9e9e0?q=80&w=2070&auto=format&fit=crop",
    ],
    features: ["Burmester Audio", "Ambient Lighting", "Active Brake Assist", "MBUX"],
    description:
      "Elegant business sedan with the latest MBUX infotainment and a serene cabin.",
    status: "available",
  },
];
