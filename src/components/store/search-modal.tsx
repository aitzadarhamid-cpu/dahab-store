"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { trackSearch } from "@/lib/analytics";

interface SearchProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  images: string;
  category: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
      setSearched(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(
        `/api/products?search=${encodeURIComponent(searchQuery)}&limit=8`
      );
      const data = await res.json();
      setResults(data.products || []);

      // Track search
      trackSearch(searchQuery, data.total || 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);

    // Debounce search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchProducts(value.trim());
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl mx-auto mt-20 sm:mt-24 mx-4 sm:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 sm:mx-0">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b">
                <Search size={20} className="text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Rechercher un bijou..."
                  className="flex-1 text-base outline-none bg-transparent text-brand-black placeholder-gray-400"
                  autoComplete="off"
                />
                {loading && (
                  <Loader2 size={18} className="text-brand-gold animate-spin flex-shrink-0" />
                )}
                {query && !loading && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      setSearched(false);
                      inputRef.current?.focus();
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Effacer la recherche"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {searched && !loading && results.length === 0 && (
                  <div className="px-5 py-10 text-center">
                    <p className="text-gray-500 text-sm">
                      Aucun resultat pour &quot;{query}&quot;
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Essayez un autre terme de recherche
                    </p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    {results.map((product) => {
                      const images: string[] = JSON.parse(product.images);
                      const mainImage = images[0] || "/placeholder.jpg";
                      return (
                        <Link
                          key={product.id}
                          href={`/produit/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={mainImage}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-black truncate">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-brand-gold">
                                {formatPrice(product.price)}
                              </span>
                              {product.compareAtPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  {formatPrice(product.compareAtPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Quick links when empty */}
                {!searched && (
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
                      Categories populaires
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "Bagues", href: "/boutique?category=BAGUE" },
                        { label: "Colliers", href: "/boutique?category=COLLIER" },
                        { label: "Bracelets", href: "/boutique?category=BRACELET" },
                        { label: "Boucles d'oreilles", href: "/boutique?category=BOUCLES_OREILLES" },
                      ].map((cat) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          onClick={onClose}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-brand-gold hover:text-white text-sm text-gray-700 rounded-full transition-colors"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-5 py-3 border-t bg-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {results.length > 0
                    ? `${results.length} resultat${results.length > 1 ? "s" : ""}`
                    : "Tapez pour rechercher"}
                </span>
                <kbd className="hidden sm:inline text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">
                  ESC
                </kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
