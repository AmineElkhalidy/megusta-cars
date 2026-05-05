"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";
import type { Car } from "@/lib/types";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function sanitizeFileName(name: string): string {
  return name.replace(/[^\w.\-]+/g, "_").slice(0, 120) || "photo";
}

/**
 * Upload car photos to `cars/{carId}/{timestamp}_{random}_{filename}`.
 * Order is preserved; first URL is intended as the primary cover image.
 */
export async function uploadCarImages(carId: string, files: File[]): Promise<string[]> {
  if (!storage) throw new Error("Firebase Storage is not configured");

  const urls: string[] = [];
  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      throw new Error(
        `Unsupported file type: ${file.type || "unknown"}. Use JPG, PNG, WebP, or GIF.`
      );
    }
    if (file.size > MAX_BYTES) {
      throw new Error("Each image must be 5 MB or smaller.");
    }
    const safe = sanitizeFileName(file.name);
    const key = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}_${safe}`;
    const storageRef = ref(storage, `cars/${carId}/${key}`);
    await uploadBytes(storageRef, file, { contentType: file.type });
    urls.push(await getDownloadURL(storageRef));
  }
  return urls;
}

/**
 * Merge freshly uploaded URLs into a car payload.
 * First upload becomes `imageUrl`; additional uploads append to the gallery.
 */
export function mergeUploadedCarPhotos(
  base: Omit<Car, "id">,
  uploadedUrls: string[],
  editing: Car | null
): Omit<Car, "id"> {
  if (uploadedUrls.length === 0) return base;
  const [first, ...rest] = uploadedUrls;
  const existingGallery = editing?.images ?? base.images ?? [];
  const mergedGallery =
    rest.length > 0 ? [...existingGallery, ...rest] : existingGallery;

  return {
    ...base,
    imageUrl: first,
    images: mergedGallery.filter((u) => u && u !== first),
  };
}
