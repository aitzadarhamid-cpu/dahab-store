"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface StickyAddToCartProps {
  productName: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  onAddToCart: () => void;
  /** Ref to the main add-to-cart button — sticky bar shows when this scrolls out of view */
  targetRef: React.RefObject<HTMLButtonElement | HTMLDivElement | null>;
}

export function StickyAddToCart({
  productName,
  price,
  compareAtPrice,
  stock,
  onAddToCart,
  targetRef,
}: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the main CTA is NOT visible
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observerRef.current.observe(target);
    return () => observerRef.current?.disconnect();
  }, [targetRef]);

  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {visible && stock > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-16 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
            <div className="flex items-center gap-3 max-w-lg mx-auto">
              {/* Product info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brand-black truncate">
                  {productName}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-brand-gold text-sm">
                    {formatPrice(price)}
                  </span>
                  {discount > 0 && compareAtPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onAddToCart}
                className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white px-5 py-2.5 rounded-full font-medium text-sm transition-colors shadow-lg flex-shrink-0"
              >
                <ShoppingBag size={16} aria-hidden="true" />
                Ajouter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
