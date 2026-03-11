"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Wallet, RotateCcw, Users, X } from "lucide-react";

const MESSAGES = [
  {
    icon: Truck,
    text: "Livraison gratuite des 299 MAD",
  },
  {
    icon: Wallet,
    text: "Paiement a la livraison — 0 risque",
  },
  {
    icon: RotateCcw,
    text: "Retours gratuits sous 7 jours",
  },
  {
    icon: Users,
    text: "5 000+ clientes satisfaites au Maroc",
  },
];

const ROTATION_INTERVAL = 4000;
const DISMISSED_KEY = "dahab-announcement-dismissed";

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const wasDismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % MESSAGES.length);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(advance, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [dismissed, advance]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, "true");
  };

  if (!mounted || dismissed) return null;

  const current = MESSAGES[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-brand-black text-white relative overflow-hidden">
      <div className="container-page py-2 px-4">
        <div className="flex items-center justify-center min-h-[28px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <Icon
                size={14}
                className="text-brand-gold flex-shrink-0"
                aria-hidden="true"
              />
              <span className="font-medium tracking-wide">{current.text}</span>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots — desktop only */}
          <div className="hidden sm:flex items-center gap-1.5 ml-4">
            {MESSAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-brand-gold w-3"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Message ${i + 1}`}
              />
            ))}
          </div>

          {/* Close */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 sm:right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fermer l'annonce"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
