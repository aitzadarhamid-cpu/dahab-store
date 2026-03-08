"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const RECENTLY_VIEWED_KEY = "dahab-recently-viewed";
const MAX_ITEMS = 10;

export interface RecentlyViewedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  viewedAt: number;
}

/**
 * Track a product view in localStorage
 */
export function trackProductView(product: {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}) {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let items: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];

    // Remove existing entry for this product
    items = items.filter((item) => item.id !== product.id);

    // Add to front
    items.unshift({
      ...product,
      viewedAt: Date.now(),
    });

    // Keep only the last MAX_ITEMS
    items = items.slice(0, MAX_ITEMS);

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
  } catch {
    // Ignore localStorage errors
  }
}

interface RecentlyViewedProps {
  excludeProductId?: string;
}

export function RecentlyViewed({ excludeProductId }: RecentlyViewedProps) {
  const [products, setProducts] = useState<RecentlyViewedProduct[]>([]);
  const [, setScrollPosition] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        let items: RecentlyViewedProduct[] = JSON.parse(stored);
        if (excludeProductId) {
          items = items.filter((item) => item.id !== excludeProductId);
        }
        setProducts(items);
      }
    } catch {
      // Ignore
    }
  }, [excludeProductId]);

  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const handleScroll = () => {
        setScrollPosition(node.scrollLeft);
      };
      node.addEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("recently-viewed-scroll");
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container-page">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg md:text-xl font-bold text-brand-black flex items-center gap-2">
            <Eye size={20} className="text-brand-gold" />
            Vus recemment
          </h3>
          {products.length > 3 && (
            <div className="flex gap-1">
              <button
                onClick={() => scroll("left")}
                className="p-1.5 rounded-full border border-gray-200 hover:border-brand-gold hover:text-brand-gold transition-colors"
                aria-label="Precedent"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-1.5 rounded-full border border-gray-200 hover:border-brand-gold hover:text-brand-gold transition-colors"
                aria-label="Suivant"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div
          id="recently-viewed-scroll"
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 w-36 md:w-44 snap-start"
            >
              <Link
                href={`/produit/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 144px, 176px"
                  />
                </div>
                <p className="text-xs md:text-sm font-medium text-brand-black group-hover:text-brand-gold transition-colors line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs md:text-sm font-display font-bold text-brand-gold">
                  {formatPrice(product.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
