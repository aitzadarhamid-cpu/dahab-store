"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingCart,
  Clock,
  Package,
  TrendingUp,
  TrendingDown,
  MapPin,
  Tag,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatPrice, getStatusLabel } from "@/lib/utils";
import type { StatsData } from "@/types";

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#D4B85E";
const BLACK = "#1A1A1A";

const PIE_COLORS = [
  "#C9A84C",
  "#1A1A1A",
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

// ---------------------------------------------------------------------------
// Period tabs
// ---------------------------------------------------------------------------

type Period = "day" | "week";

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("day");

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ---------- Loading skeleton ----------
  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-72 bg-gray-200 rounded-xl" />
          <div className="h-72 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!stats) return <p>Erreur de chargement</p>;

  // ---------- Prepare chart data ----------
  const revenueChartData =
    period === "day"
      ? stats.revenueByDay.map((d) => ({
          label: new Date(d.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
          }),
          revenue: Math.round(d.revenue),
        }))
      : stats.revenueByWeek.map((w) => ({
          label: `Sem. ${new Date(w.week).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
          })}`,
          revenue: Math.round(w.revenue),
        }));

  const ordersChartData = stats.ordersByDay.map((d) => ({
    label: new Date(d.date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    }),
    commandes: d.count,
  }));

  const cityData = stats.ordersByCity.map((c) => ({
    name: c.city,
    commandes: c.count,
    revenue: Math.round(c.revenue),
  }));

  const statusData = stats.ordersByStatus.map((s) => ({
    name: getStatusLabel(s.status),
    value: s.count,
  }));

  // ---------- KPI Cards ----------
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

      {/* ========== KPI Cards ========== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-5 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}
            >
              <card.icon size={20} />
            </div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-display font-bold text-brand-black">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* ========== Conversion rate cards ========== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-green-600" />
            <span className="text-sm text-gray-500">Taux de livraison</span>
          </div>
          <p className="text-3xl font-display font-bold text-green-600">
            {stats.conversionRate}%
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {stats.deliveredOrders} / {stats.totalRecentOrders} (30j)
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={18} className="text-red-500" />
            <span className="text-sm text-gray-500">Taux d&apos;annulation</span>
          </div>
          <p className="text-3xl font-display font-bold text-red-500">
            {stats.cancelRate}%
          </p>
          <p className="text-xs text-gray-400 mt-1">
            sur les 30 derniers jours
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-brand-gold" />
            <span className="text-sm text-gray-500">Panier moyen</span>
          </div>
          <p className="text-3xl font-display font-bold text-brand-gold">
            {stats.totalOrders > 0
              ? formatPrice(Math.round(stats.totalRevenue / stats.totalOrders))
              : "0 MAD"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            revenue / commandes
          </p>
        </div>
      </div>

      {/* ========== Revenue chart ========== */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">
            Revenue (30 derniers jours)
          </h2>
          <div className="flex gap-2">
            {(["day", "week"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  period === p
                    ? "bg-brand-gold text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {p === "day" ? "Jour" : "Semaine"}
              </button>
            ))}
          </div>
        </div>
        {revenueChartData.length === 0 ? (
          <p className="text-gray-400 text-sm py-12 text-center">
            Aucune donnee disponible
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v} MAD`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: 13,
                }}
                formatter={(value) => [
                  `${Number(value).toLocaleString("fr-FR")} MAD`,
                  "Revenue",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={GOLD}
                strokeWidth={2}
                fill="url(#goldGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ========== Orders per day chart ========== */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-display font-bold text-lg mb-4">
          Commandes par jour
        </h2>
        {ordersChartData.length === 0 ? (
          <p className="text-gray-400 text-sm py-12 text-center">
            Aucune donnee disponible
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ordersChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: 13,
                }}
              />
              <Bar
                dataKey="commandes"
                fill={GOLD_LIGHT}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ========== Two-column section ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

        {/* Orders by Status (Pie Chart) */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4">
            Commandes par Statut
          </h2>
          {statusData.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune commande</p>
          ) : (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((_, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      fontSize: 13,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {statusData.map((s, idx) => (
                  <div key={s.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          PIE_COLORS[idx % PIE_COLORS.length],
                      }}
                    />
                    <span className="text-gray-600">{s.name}</span>
                    <span className="ml-auto font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== Orders by City ========== */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-brand-gold" />
          Commandes par Ville
        </h2>
        {cityData.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucune donnee disponible</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={100}
                tick={{ fontSize: 12, fill: BLACK }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: 13,
                }}
                formatter={(value, name) => {
                  if (name === "revenue")
                    return [`${Number(value).toLocaleString("fr-FR")} MAD`, "Revenue"];
                  return [String(value), "Commandes"];
                }}
              />
              <Bar
                dataKey="commandes"
                fill={GOLD}
                radius={[0, 6, 6, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ========== Promo code stats ========== */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <Tag size={18} className="text-brand-gold" />
          Codes Promo Utilises
        </h2>
        {stats.promoStats.length === 0 ? (
          <p className="text-gray-400 text-sm">
            Aucun code promo utilise
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-gray-500">
                    Code
                  </th>
                  <th className="text-left py-2 font-medium text-gray-500">
                    Type
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500">
                    Valeur
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500">
                    Utilisations
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.promoStats.map((promo) => (
                  <tr
                    key={promo.code}
                    className="border-b last:border-0"
                  >
                    <td className="py-3 font-mono font-bold text-brand-gold">
                      {promo.code}
                    </td>
                    <td className="py-3 text-gray-600">
                      {promo.type === "PERCENTAGE" ? "Pourcentage" : "Fixe"}
                    </td>
                    <td className="py-3 text-right font-medium">
                      {promo.type === "PERCENTAGE"
                        ? `${promo.value}%`
                        : formatPrice(promo.value)}
                    </td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center justify-center bg-brand-gold/10 text-brand-gold font-bold w-8 h-8 rounded-full">
                        {promo.usedCount}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          promo.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {promo.active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
