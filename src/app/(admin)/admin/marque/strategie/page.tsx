"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  Mail,
  MapPin,
  Tag,
  Star,
  Calendar,
  ShoppingBag,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LoyaltyCustomer {
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  tier: string;
}

interface PromoItem {
  code: string;
  type: string;
  value: number;
  usedCount: number;
  estimatedDiscount: number;
  active: boolean;
}

interface SeasonalEvent {
  name: string;
  period: string;
  tip: string;
}

interface StrategyData {
  aov: number;
  aovTrend: { month: string; aov: number }[];
  loyalty: {
    totalCustomers: number;
    tiers: Record<string, number>;
    averageSpent: number;
    topCustomers: LoyaltyCustomer[];
  };
  newsletter: {
    totalActive: number;
    growth: { month: string; subscribers: number }[];
  };
  performanceByCity: { city: string; orders: number; revenue: number }[];
  promoROI: PromoItem[];
  categoryPerformance: {
    category: string;
    revenue: number;
    orders: number;
  }[];
  monthlyRevenueTrend: { month: string; revenue: number }[];
  reviewStats: {
    averageRating: number;
    totalReviews: number;
    approvedReviews: number;
  };
  seasonalCalendar: SeasonalEvent[];
}

// ---------------------------------------------------------------------------
// Chart Colors
// ---------------------------------------------------------------------------

const COLORS = {
  gold: "#C9A84C",
  black: "#1A1A1A",
  cream: "#D4B85E",
  rose: "#B8963A",
  blue: "#3B82F6",
  green: "#10B981",
};

const PIE_COLORS = [
  COLORS.gold,
  COLORS.black,
  COLORS.cream,
  COLORS.rose,
  COLORS.blue,
  COLORS.green,
];

const TIER_COLORS: Record<string, string> = {
  BRONZE: "#CD7F32",
  SILVER: "#A8A9AD",
  GOLD: "#C9A84C",
  DIAMOND: "#3B82F6",
};

// NOTE: SEASON_ICONS kept here for future use in season-based UI enhancements
// const SEASON_ICONS: Record<string, string> = { ... };

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatMAD(value: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(value) + " MAD";
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-MA").format(value);
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function KPICard({
  icon: Icon,
  label,
  value,
  subtitle,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtitle?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div
        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}
      >
        <Icon size={20} />
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-display font-bold text-brand-black">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center">
        <Icon size={16} className="text-brand-gold" />
      </div>
      <h2 className="font-display text-xl font-bold text-brand-black">
        {title}
      </h2>
    </div>
  );
}

function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">{children}</div>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-xl ${className}`}
    />
  );
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < fullStars
              ? "text-brand-gold fill-brand-gold"
              : i === fullStars && hasHalf
                ? "text-brand-gold fill-brand-gold/50"
                : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom Recharts Tooltip
// ---------------------------------------------------------------------------

function CustomTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="font-medium text-brand-black">
          {formatNumber(entry.value)}
          {suffix}
        </p>
      ))}
    </div>
  );
}

// ===========================================================================
// Main Page
// ===========================================================================

export default function StrategiePage() {
  const [data, setData] = useState<StrategyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stats/strategy")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ---- Loading skeleton --------------------------------------------------
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-black">
            Tableau de Bord Strategique
          </h1>
          <p className="text-gray-500 mt-1">Chargement des donnees...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonBlock className="h-80" />
          <SkeletonBlock className="h-80" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonBlock className="h-80" />
          <SkeletonBlock className="h-80" />
        </div>
      </div>
    );
  }

  // ---- Error state -------------------------------------------------------
  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-700 font-medium">
          {error || "Impossible de charger les statistiques"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 text-sm text-red-600 underline hover:no-underline"
        >
          Reessayer
        </button>
      </div>
    );
  }

  // ---- Prepare chart data ------------------------------------------------
  const tierData = Object.entries(data.loyalty.tiers).map(
    ([tier, count]) => ({
      tier,
      count,
      fill: TIER_COLORS[tier] || COLORS.gold,
    })
  );

  // ---- Render ------------------------------------------------------------
  return (
    <div className="space-y-8">
      {/* ================================================================= */}
      {/* Header                                                            */}
      {/* ================================================================= */}
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-black">
          Tableau de Bord Strategique
        </h1>
        <p className="text-gray-500 mt-1">
          KPIs avances, tendances et intelligence commerciale DAHAB
        </p>
      </div>

      {/* ================================================================= */}
      {/* KPI Row (4 cards)                                                 */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={ShoppingBag}
          label="Panier Moyen (AOV)"
          value={formatMAD(data.aov)}
          subtitle="Toutes commandes valides"
          color="bg-amber-50 text-amber-700"
        />
        <KPICard
          icon={Users}
          label="Clients Fidelite"
          value={formatNumber(data.loyalty.totalCustomers)}
          subtitle={`Moy. depense: ${formatMAD(data.loyalty.averageSpent)}`}
          color="bg-purple-50 text-purple-700"
        />
        <KPICard
          icon={Mail}
          label="Abonnes Newsletter"
          value={formatNumber(data.newsletter.totalActive)}
          subtitle="Abonnes actifs"
          color="bg-green-50 text-green-700"
        />
        <KPICard
          icon={Star}
          label="Note Moyenne"
          value={`${data.reviewStats.averageRating}/5`}
          subtitle={`${data.reviewStats.approvedReviews} avis approuves sur ${data.reviewStats.totalReviews}`}
          color="bg-blue-50 text-blue-700"
        />
      </div>

      {/* ================================================================= */}
      {/* Revenue Trend + AOV Trend                                         */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <ChartCard>
          <SectionTitle icon={TrendingUp} title="Tendance Revenus Mensuels" />
          {data.monthlyRevenueTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.monthlyRevenueTrend}>
                <defs>
                  <linearGradient
                    id="goldGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS.gold}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.gold}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#999" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#999" }}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={<CustomTooltip suffix=" MAD" />}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={COLORS.gold}
                  strokeWidth={2.5}
                  fill="url(#goldGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">
              Pas de donnees de revenus disponibles
            </p>
          )}
        </ChartCard>

        {/* AOV Trend */}
        <ChartCard>
          <SectionTitle icon={ShoppingBag} title="Tendance Panier Moyen" />
          {data.aovTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.aovTrend}>
                <defs>
                  <linearGradient
                    id="blueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS.blue}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.blue}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#999" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#999" }}
                  tickLine={false}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip
                  content={<CustomTooltip suffix=" MAD" />}
                />
                <Area
                  type="monotone"
                  dataKey="aov"
                  stroke={COLORS.blue}
                  strokeWidth={2.5}
                  fill="url(#blueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">
              Pas de donnees AOV disponibles
            </p>
          )}
        </ChartCard>
      </div>

      {/* ================================================================= */}
      {/* City Performance + Category Performance                           */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* City Performance — Horizontal Bar */}
        <ChartCard>
          <SectionTitle icon={MapPin} title="Performance par Ville" />
          {data.performanceByCity.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data.performanceByCity}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: "#999" }}
                  tickLine={false}
                  tickFormatter={(v) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
                  }
                />
                <YAxis
                  type="category"
                  dataKey="city"
                  tick={{ fontSize: 12, fill: "#666" }}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  content={<CustomTooltip suffix=" MAD" />}
                />
                <Bar
                  dataKey="revenue"
                  fill={COLORS.gold}
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">
              Pas de donnees par ville disponibles
            </p>
          )}
        </ChartCard>

        {/* Category Performance — Pie Chart */}
        <ChartCard>
          <SectionTitle icon={Tag} title="Performance par Categorie" />
          {data.categoryPerformance.length > 0 ? (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.categoryPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    dataKey="revenue"
                    nameKey="category"
                    stroke="none"
                    paddingAngle={2}
                  >
                    {data.categoryPerformance.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={PIE_COLORS[idx % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatMAD(Number(value))}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span className="text-xs text-gray-600">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Category breakdown table below chart */}
              <div className="w-full mt-2">
                <div className="grid grid-cols-2 gap-2">
                  {data.categoryPerformance.map((cat, idx) => (
                    <div
                      key={cat.category}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            PIE_COLORS[idx % PIE_COLORS.length],
                        }}
                      />
                      <span className="text-gray-600 truncate">
                        {cat.category}
                      </span>
                      <span className="text-gray-400 ml-auto text-xs">
                        {cat.orders} cmd
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">
              Pas de donnees de categorie disponibles
            </p>
          )}
        </ChartCard>
      </div>

      {/* ================================================================= */}
      {/* Loyalty Tiers + Newsletter Growth                                 */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loyalty Tiers */}
        <ChartCard>
          <SectionTitle icon={Users} title="Repartition Fidelite" />
          <div className="grid grid-cols-2 gap-3 mb-6">
            {tierData.map((t) => (
              <div
                key={t.tier}
                className="rounded-lg border border-gray-100 p-4 text-center"
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${t.fill}20` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.fill }}
                  />
                </div>
                <p className="text-2xl font-display font-bold text-brand-black">
                  {t.count}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  {t.tier}
                </p>
              </div>
            ))}
          </div>
          {/* Top 5 Customers */}
          {data.loyalty.topCustomers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Top 5 Clients Fidelite
              </h3>
              <div className="space-y-2">
                {data.loyalty.topCustomers.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-brand-black">
                          {c.name || "Client"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {c.totalOrders} commandes
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-brand-black">
                        {formatMAD(c.totalSpent)}
                      </p>
                      <span
                        className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${TIER_COLORS[c.tier] || COLORS.gold}20`,
                          color: TIER_COLORS[c.tier] || COLORS.gold,
                        }}
                      >
                        {c.tier}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ChartCard>

        {/* Newsletter Growth */}
        <ChartCard>
          <SectionTitle icon={Mail} title="Croissance Newsletter" />
          {data.newsletter.growth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.newsletter.growth}>
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS.green}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.green}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#999" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#999" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="subscribers"
                  stroke={COLORS.green}
                  strokeWidth={2.5}
                  fill="url(#greenGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">
              Pas de donnees newsletter disponibles
            </p>
          )}
        </ChartCard>
      </div>

      {/* ================================================================= */}
      {/* Promo Performance Table + Review Summary                          */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Promo Performance — Table (2/3 width) */}
        <div className="lg:col-span-2">
          <ChartCard>
            <SectionTitle icon={Tag} title="Performance Promotions" />
            {data.promoROI.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="text-right py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valeur
                      </th>
                      <th className="text-right py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisations
                      </th>
                      <th className="text-right py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remise estimee
                      </th>
                      <th className="text-center py-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.promoROI.map((promo) => (
                      <tr
                        key={promo.code}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 px-3">
                          <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-brand-black font-bold">
                            {promo.code}
                          </code>
                        </td>
                        <td className="py-3 px-3 text-gray-600">
                          {promo.type === "FIXED"
                            ? "Montant fixe"
                            : "Pourcentage"}
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-brand-black">
                          {promo.type === "FIXED"
                            ? `${promo.value} MAD`
                            : `${promo.value}%`}
                        </td>
                        <td className="py-3 px-3 text-right text-gray-700">
                          {promo.usedCount}
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-red-600">
                          -{formatMAD(promo.estimatedDiscount)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                              promo.active
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                promo.active
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />
                            {promo.active ? "Actif" : "Inactif"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center py-12">
                Aucun code promo utilise
              </p>
            )}
          </ChartCard>
        </div>

        {/* Review Summary (1/3 width) */}
        <ChartCard>
          <SectionTitle icon={Star} title="Avis Clients" />
          <div className="flex flex-col items-center py-6">
            <p className="text-5xl font-display font-bold text-brand-black mb-2">
              {data.reviewStats.averageRating}
            </p>
            <StarRating rating={data.reviewStats.averageRating} />
            <p className="text-sm text-gray-400 mt-3">
              sur 5 etoiles
            </p>
          </div>
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Total avis
              </span>
              <span className="text-sm font-bold text-brand-black">
                {data.reviewStats.totalReviews}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Avis approuves
              </span>
              <span className="text-sm font-bold text-green-600">
                {data.reviewStats.approvedReviews}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                En attente
              </span>
              <span className="text-sm font-bold text-amber-600">
                {data.reviewStats.totalReviews -
                  data.reviewStats.approvedReviews}
              </span>
            </div>
            {data.reviewStats.totalReviews > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Taux d&apos;approbation</span>
                  <span>
                    {Math.round(
                      (data.reviewStats.approvedReviews /
                        data.reviewStats.totalReviews) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.round(
                        (data.reviewStats.approvedReviews /
                          data.reviewStats.totalReviews) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      {/* ================================================================= */}
      {/* Seasonal Calendar                                                 */}
      {/* ================================================================= */}
      <div>
        <SectionTitle icon={Calendar} title="Calendrier Saisonnier" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.seasonalCalendar.map((event) => (
            <div
              key={event.name}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:border-brand-gold/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-bold text-brand-black text-sm">
                    {event.name}
                  </h3>
                  <p className="text-xs text-brand-gold font-medium mt-0.5">
                    {event.period}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <Calendar
                    size={14}
                    className="text-brand-gold"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {event.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* Footer note                                                       */}
      {/* ================================================================= */}
      <div className="text-center py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Donnees mises a jour en temps reel — Tableau de bord strategique
          DAHAB
        </p>
      </div>
    </div>
  );
}
