"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const MOCK_PURCHASES = [
  { name: "Fatima", city: "Casablanca", product: "Bague Sultane Or" },
  { name: "Amina", city: "Rabat", product: "Collier Medina Or" },
  { name: "Khadija", city: "Marrakech", product: "Bracelet Amazigh Dore" },
  { name: "Sara", city: "Tanger", product: "Boucles Zellige Or" },
  { name: "Nora", city: "Fes", product: "Bague Rose Eternelle" },
  { name: "Zineb", city: "Agadir", product: "Collier Etoile du Sahara" },
  { name: "Houda", city: "Meknes", product: "Bracelet Cascade Or Rose" },
  { name: "Salma", city: "Oujda", product: "Boucles Perle Argent" },
];

export function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % MOCK_PURCHASES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const purchase = MOCK_PURCHASES[currentIndex];
  const minutesAgo = Math.floor(Math.random() * 15) + 1;

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="bg-brand-gold/10 rounded-full p-2 flex-shrink-0">
              <ShoppingBag size={16} className="text-brand-gold" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-800">
                <strong>{purchase.name}</strong> de{" "}
                <strong>{purchase.city}</strong>
              </p>
              <p className="text-xs text-gray-600 truncate">
                vient de commander{" "}
                <span className="text-brand-gold font-medium">
                  {purchase.product}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                il y a {minutesAgo} min
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
