"use client";

import { useState } from "react";
import { Diamond, Award, Crown, Star, Search, Gift, Phone, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface LoyaltyProfile {
  id: string;
  phone: string;
  name: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  tier: string;
  createdAt: string;
}

const tiers = [
  {
    name: "Bronze",
    key: "BRONZE",
    icon: Award,
    range: "0 - 499 MAD",
    color: "from-amber-700 to-amber-600",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    benefits: [
      "1 point par MAD depense",
      "Acces aux ventes privees",
      "Newsletter exclusive",
    ],
  },
  {
    name: "Silver",
    key: "SILVER",
    icon: Star,
    range: "500 - 1 999 MAD",
    color: "from-gray-400 to-gray-500",
    textColor: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    benefits: [
      "Tous les avantages Bronze",
      "Livraison gratuite des 99 MAD",
      "-5% supplementaire sur les promos",
    ],
  },
  {
    name: "Gold",
    key: "GOLD",
    icon: Crown,
    range: "2 000 - 4 999 MAD",
    color: "from-brand-gold to-brand-gold-light",
    textColor: "text-brand-gold",
    bgColor: "bg-brand-cream",
    borderColor: "border-brand-gold/30",
    benefits: [
      "Tous les avantages Silver",
      "Livraison gratuite sans minimum",
      "Acces prioritaire aux nouveautes",
      "-10% le jour de votre anniversaire",
    ],
  },
  {
    name: "Diamond",
    key: "DIAMOND",
    icon: Diamond,
    range: "5 000+ MAD",
    color: "from-blue-400 to-purple-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    benefits: [
      "Tous les avantages Gold",
      "Cadeau exclusif a chaque commande",
      "Service client VIP WhatsApp",
      "Invitations evenements prives",
      "-15% le jour de votre anniversaire",
    ],
  },
];

export default function FidelitePage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<LoyaltyProfile | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setProfile(null);
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/loyalty?phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Aucun profil trouve");
        return;
      }

      setProfile(data.customer);
    } catch {
      setError("Erreur lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  const currentTier = profile
    ? tiers.find((t) => t.key === profile.tier)
    : null;

  const nextTier = profile
    ? tiers.find(
        (_, i) =>
          i > 0 && tiers[i - 1]?.key === profile.tier
      ) || null
    : null;

  const getNextTierThreshold = (): number => {
    if (!profile) return 500;
    switch (profile.tier) {
      case "BRONZE": return 500;
      case "SILVER": return 2000;
      case "GOLD": return 5000;
      default: return 0;
    }
  };

  const progressPercent = profile
    ? profile.tier === "DIAMOND"
      ? 100
      : Math.min(100, (profile.totalSpent / getNextTierThreshold()) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-black text-white py-16 sm:py-20">
        <div className="container-page text-center">
          <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Diamond className="text-brand-gold" size={32} />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Programme de Fidelite{" "}
            <span className="text-brand-gold">DAHAB</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Chaque achat vous rapproche de recompenses exclusives. Gagnez des points, montez en niveau et profitez d&apos;avantages uniques.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center text-brand-black mb-10">
            Comment ca marche ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-brand-gold" size={24} />
              </div>
              <h3 className="font-display font-bold text-brand-black mb-2">
                Achetez
              </h3>
              <p className="text-sm text-gray-600">
                Chaque MAD depense = 1 point de fidelite
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-brand-gold" size={24} />
              </div>
              <h3 className="font-display font-bold text-brand-black mb-2">
                Montez en niveau
              </h3>
              <p className="text-sm text-gray-600">
                Plus vous depensez, plus votre tier augmente
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-brand-gold" size={24} />
              </div>
              <h3 className="font-display font-bold text-brand-black mb-2">
                Profitez
              </h3>
              <p className="text-sm text-gray-600">
                Debloquez des avantages exclusifs a chaque tier
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-page">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center text-brand-black mb-10">
            Les niveaux de fidelite
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className={`rounded-xl border-2 ${tier.borderColor} ${tier.bgColor} p-6 relative overflow-hidden`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tier.color}`}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}
                  >
                    <tier.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-black">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-gray-500">{tier.range}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className={`${tier.textColor} mt-0.5`}>&#10003;</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Points */}
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-brand-black text-center mb-2">
                Consulter mes points
              </h2>
              <p className="text-gray-500 text-sm text-center mb-6">
                Entrez votre numero de telephone pour voir votre profil de fidelite
              </p>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    placeholder="06 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-brand-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  loading={loading}
                  size="lg"
                  className="w-full gap-2"
                >
                  <Search size={18} />
                  Verifier mes points
                </Button>
              </form>

              {error && searched && (
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">{error}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Votre profil sera cree automatiquement lors de votre premiere commande.
                  </p>
                </div>
              )}

              {profile && currentTier && (
                <div className="mt-8 space-y-6">
                  {/* Profile card */}
                  <div
                    className={`rounded-xl ${currentTier.bgColor} border ${currentTier.borderColor} p-5`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentTier.color} flex items-center justify-center`}
                        >
                          <currentTier.icon size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-brand-black">
                            {profile.name || "Client DAHAB"}
                          </p>
                          <p className={`text-sm font-medium ${currentTier.textColor}`}>
                            Tier {currentTier.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-display font-bold text-brand-black">
                          {profile.loyaltyPoints}
                        </p>
                        <p className="text-xs text-gray-500">Points</p>
                      </div>
                      <div>
                        <p className="text-2xl font-display font-bold text-brand-black">
                          {profile.totalOrders}
                        </p>
                        <p className="text-xs text-gray-500">Commandes</p>
                      </div>
                      <div>
                        <p className="text-2xl font-display font-bold text-brand-black">
                          {formatPrice(profile.totalSpent)}
                        </p>
                        <p className="text-xs text-gray-500">Total depense</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress to next tier */}
                  {nextTier && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          Progres vers {nextTier.name}
                        </span>
                        <span className="font-medium text-brand-black">
                          {formatPrice(profile.totalSpent)} / {formatPrice(getNextTierThreshold())}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${currentTier.color} transition-all duration-500`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Plus que{" "}
                        {formatPrice(getNextTierThreshold() - profile.totalSpent)}{" "}
                        pour atteindre {nextTier.name}
                      </p>
                    </div>
                  )}

                  {profile.tier === "DIAMOND" && (
                    <div className="text-center text-sm text-blue-600 font-medium">
                      Vous avez atteint le tier le plus eleve ! Merci pour votre fidelite.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
