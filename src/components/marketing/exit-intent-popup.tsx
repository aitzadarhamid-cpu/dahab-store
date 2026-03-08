"use client";

import { useState } from "react";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Gift, Copy, Check } from "lucide-react";

const DISCOUNT_CODE = "BIENVENUE10";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useExitIntent(() => {
    const shown = sessionStorage.getItem("exit-popup-shown");
    if (!shown) {
      setIsOpen(true);
      sessionStorage.setItem("exit-popup-shown", "true");
    }
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="text-brand-gold" size={32} />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-black mb-2">
          Attendez !
        </h3>
        <p className="text-gray-600 mb-4">
          Profitez de <span className="text-brand-gold font-bold">-10%</span>{" "}
          sur votre premiere commande
        </p>
        <div className="bg-brand-cream rounded-lg p-4 mb-4">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
            Votre code promo
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-display text-2xl font-bold text-brand-gold tracking-wider">
              {DISCOUNT_CODE}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
              title="Copier le code"
            >
              {copied ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          size="lg"
          className="w-full"
        >
          Decouvrir la collection
        </Button>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Non merci
        </button>
      </div>
    </Modal>
  );
}
