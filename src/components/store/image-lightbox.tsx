"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt: string;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync with external initialIndex when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Main image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full max-w-4xl max-h-[85vh] mx-4 my-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Image precedente"
              >
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 max-w-full overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    i === currentIndex
                      ? "border-brand-gold opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Voir image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${alt} miniature ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
