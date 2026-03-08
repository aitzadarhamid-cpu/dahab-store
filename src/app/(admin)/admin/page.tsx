"use client";

import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Clock, Package } from "lucide-react";
import { formatPrice, getStatusLabel } from "@/lib/utils";
import type { StatsData } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return <p>Erreur de chargement</p>;

  const cards = [
    {
      label: "Revenue Totale",
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Commandes Totales",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "En Attente",
      value: stats.pendingOrders.toString(),
      icon: Clock,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "Produits Actifs",
      value: stats.activeProducts.toString(),
      icon: Package,
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-brand-black mb-6">
        Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-5 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon size={20} />
            </div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-display font-bold text-brand-black">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4">
            Top Produits
          </h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune donnee disponible</p>
          ) : (
            <div className="space-y-3">
              {stats.topProducts.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-brand-gold text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">
                      {p.totalSold} vendus
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatPrice(p.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders by Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4">
            Commandes par Statut
          </h2>
          {stats.ordersByStatus.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune commande</p>
          ) : (
            <div className="space-y-3">
              {stats.ordersByStatus.map((s) => (
                <div
                  key={s.status}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-sm">
                    {getStatusLabel(s.status)}
                  </span>
                  <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
