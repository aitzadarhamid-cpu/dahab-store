"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ABANDONED_CART_KEY = "dahab-abandoned-cart-dismissed";
const ABANDONED_CART_DELAY = 30000; // 30 seconds

export function AbandonedCartBar() {
  const { items, total, itemCount } = useCart();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user dismissed the bar in this session
    const wasDismissed = sessionStorage.getItem(ABANDONED_CART_KEY);
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Check if returning visitor with abandoned cart
    const hadPreviousCart = localStorage.getItem("dahab-abandoned-timestamp");
    if (hadPreviousCart && items.length > 0) {
      // Returning visitor — show immediately after a short delay
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }

    // New session: show after 30s if cart has items
    if (items.length > 0) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, ABANDONED_CART_DELAY);
      return () => clearTimeout(timer);
    }
  }, [items.length]);

  // Save timestamp when user has items (for detecting returning visitors)
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("dahab-abandoned-timestamp", Date.now().toString());
    } else {
      localStorage.removeItem("dahab-abandoned-timestamp");
    }
  }, [items.length]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(ABANDONED_CART_KEY, "true");
  };

  // Don't show if cart is empty, or was dismissed
  if (items.length === 0 || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-0"
        >
          <div className="max-w-2xl mx-auto md:mb-4">
            <div className="bg-white border border-brand-gold/30 rounded-2xl shadow-2xl p-4 md:p-5">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="hidden sm:flex bg-brand-gold/10 rounded-full p-3 flex-shrink-0">
                  <ShoppingBag size={24} className="text-brand-gold" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-display font-bold text-brand-black text-sm md:text-base">
                        Vous avez oublie quelque chose...
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {itemCount} article{itemCount > 1 ? "s" : ""} vous
                        attend{itemCount > 1 ? "ent" : ""} dans votre panier
                      </p>
                    </div>
                    <button
                      onClick={handleDismiss}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>

                  {/* Mini cart preview */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      {items.slice(0, 3).map((item, i) => (
                        <div
                          key={`${item.id}-${item.selectedSize}-${i}`}
                          className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-white flex-shrink-0"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ))}
                      {items.length > 3 && (
                        <div className="w-10 h-10 rounded-lg bg-brand-cream border-2 border-white flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-brand-gold">
                            +{items.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-display font-bold text-brand-gold ml-2">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link href="/commander" onClick={handleDismiss}>
                    <Button size="sm" className="w-full sm:w-auto gap-2">
                      Finaliser ma commande
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
