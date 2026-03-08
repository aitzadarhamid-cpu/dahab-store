"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Clock } from "lucide-react";
import { useCountdown, getEndOfDay } from "@/hooks/useCountdown";

const URGENCY_DISMISSED_KEY = "dahab-urgency-dismissed";
const PROMO_CODE = "DAHAB25";

export function UrgencyBar() {
  const [dismissed, setDismissed] = useState(true); // Start hidden to avoid flash
  const [mounted, setMounted] = useState(false);
  const endOfDay = useMemo(() => getEndOfDay(), []);
  const { hours, minutes, seconds, expired } = useCountdown(endOfDay);

  useEffect(() => {
    setMounted(true);
    // Only check dismissal per-page navigation (using sessionStorage with page key)
    const wasDismissed = sessionStorage.getItem(URGENCY_DISMISSED_KEY);
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(URGENCY_DISMISSED_KEY, "true");
  };

  // Reset on page navigation (clear the key so it comes back)
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.removeItem(URGENCY_DISMISSED_KEY);
    };

    // Listen for Next.js page transitions
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  if (!mounted || expired) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white overflow-hidden"
        >
          <div className="container-page py-2 px-4">
            <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm relative">
              {/* Flame icon */}
              <Flame
                size={16}
                className="text-yellow-300 flex-shrink-0 animate-pulse"
              />

              {/* Text */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="font-bold uppercase tracking-wide">
                  Offre Flash
                </span>
                <span className="hidden sm:inline">:</span>
                <span>
                  <span className="font-bold">-25%</span> sur tout avec le code
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold tracking-wider">
                  {PROMO_CODE}
                </span>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Clock size={14} className="hidden sm:block" />
                <span className="font-mono font-bold tabular-nums">
                  {String(hours).padStart(2, "0")}:
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute right-0 p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
