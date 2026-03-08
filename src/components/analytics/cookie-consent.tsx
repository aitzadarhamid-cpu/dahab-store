"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield } from "lucide-react";
import { getConsentStatus, setAnalyticsConsent } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Cookie consent banner — French / Moroccan style with DAHAB gold colours
// Only shows if user has not yet made a choice.
// Saves preference in localStorage. GA4 and Meta Pixel scripts only fire
// after the user clicks "Accepter".
// ---------------------------------------------------------------------------

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no choice was made yet
    const status = getConsentStatus();
    if (status === null) {
      // Small delay so the banner appears after page paint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setVisible(false);
    // Reload to activate GA4 / Meta Pixel scripts
    window.location.reload();
  };

  const handleRefuse = () => {
    setAnalyticsConsent(false);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-brand-gold/20 overflow-hidden">
            {/* Gold accent bar */}
            <div className="h-1 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light" />

            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Cookie size={20} className="text-brand-gold" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-brand-black mb-1">
                    Nous utilisons des cookies
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    DAHAB utilise des cookies pour ameliorer votre experience, analyser le
                    trafic et personnaliser les publicites. Vous pouvez accepter ou refuser
                    les cookies non essentiels.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAccept}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-gold text-white font-medium py-2.5 px-5 rounded-lg hover:bg-brand-gold-dark transition-colors text-sm"
                    >
                      <Shield size={16} />
                      Accepter
                    </button>
                    <button
                      onClick={handleRefuse}
                      className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-600 font-medium py-2.5 px-5 rounded-lg hover:border-gray-400 hover:text-gray-800 transition-colors text-sm"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
