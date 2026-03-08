"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const alreadySubscribed = localStorage.getItem("dahab-newsletter-shown");
    if (alreadySubscribed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("dahab-newsletter-shown", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
        return;
      }

      setSuccess(true);
      localStorage.setItem("dahab-newsletter-shown", "true");
      setTimeout(() => setIsOpen(false), 3000);
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-brand-cream rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Gold accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-white/50 rounded-full transition-colors z-10"
            >
              <X size={18} className="text-gray-500" />
            </button>

            <div className="p-6 sm:p-8">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-2">
                    Bienvenue dans la famille !
                  </h3>
                  <p className="text-gray-600">
                    Votre code <span className="font-bold text-brand-gold">WELCOME15</span> vous attend.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="text-brand-gold" size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-brand-black mb-2">
                      -15% sur votre 1ere commande
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Inscrivez-vous a notre newsletter et recevez votre code promo exclusif !
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Votre prenom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-brand-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        placeholder="Votre adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-brand-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-600">{error}</p>
                    )}
                    <Button
                      type="submit"
                      loading={loading}
                      size="lg"
                      className="w-full"
                    >
                      Recevoir mon code -15%
                    </Button>
                  </form>

                  <button
                    onClick={handleClose}
                    className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors w-full text-center"
                  >
                    Non merci, peut-etre plus tard
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
