"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
  alt: string;
};

/** Responsive image gallery with a large hero shot and clickable thumbnails. */
export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images.length ? images : ["/placeholder.png"];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted shadow-xl shadow-foreground/5 ring-1 ring-border">
        <Image
          src={safeImages[activeIndex]}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {/* Top vignette for chip readability */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      {safeImages.length > 1 ? (
        <div className="grid grid-cols-3 gap-3">
          {safeImages.map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show image ${idx + 1}`}
              aria-pressed={activeIndex === idx}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted transition-all ${
                activeIndex === idx
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100 hover:-translate-y-0.5"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} preview ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 33vw, 200px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
