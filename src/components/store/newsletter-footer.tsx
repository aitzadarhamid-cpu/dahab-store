"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-gold/10 border-t border-brand-gold/20">
      <div className="container-page py-10">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Rejoignez la famille DAHAB
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Recevez nos nouveautes, offres exclusives et conseils beaute directement dans votre boite mail.
          </p>

          {success ? (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Check size={20} />
              <span className="font-medium">Merci pour votre inscription !</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 bg-brand-gold text-white rounded-lg font-medium hover:bg-brand-gold-dark transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                <span className="hidden sm:inline">S&apos;inscrire</span>
              </button>
            </form>
          )}
          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
