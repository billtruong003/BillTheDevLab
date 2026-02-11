'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

const GRID_COLS = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
};

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const navigate = (direction: -1 | 1) => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + direction + images.length) % images.length;
    setLightboxIndex(next);
  };

  return (
    <>
      <div className={`my-6 grid gap-3 ${GRID_COLS[columns]}`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-video overflow-hidden rounded-cozy border border-[var(--color-border)]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="font-body text-xs text-white">{image.caption}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative h-[80vh] w-[90vw] max-w-4xl">
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={() => navigate(1)}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>

          {images[lightboxIndex].caption && (
            <div className="absolute bottom-8 text-center">
              <span className="rounded-full bg-black/50 px-4 py-2 font-body text-sm text-white">
                {images[lightboxIndex].caption}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
