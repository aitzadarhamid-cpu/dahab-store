import { prisma } from "@/lib/prisma";
import { MOROCCAN_CITIES } from "@/lib/moroccan-cities";
import { formatPrice } from "@/lib/utils";
import {
  MapPin,
  ExternalLink,
  TrendingUp,
  Package,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

const LANDING_PAGES = [
  {
    city: "Casablanca",
    slug: "casablanca",
    description: "Capitale économique — Page régionale SEO",
    zone: "A" as const,
    status: "active" as const,
  },
  {
    city: "Marrakech",
    slug: "marrakech",
    description: "Ville ocre — Page régionale SEO",
    zone: "A" as const,
    status: "active" as const,
  },
  {
    city: "Rabat",
    slug: "rabat",
    description: "Capitale du Royaume — Page régionale SEO",
    zone: "A" as const,
    status: "active" as const,
  },
];

export default async function VillesManagerPage() {
  // Fetch city stats from orders
  const cityOrders = await prisma.order.groupBy({
    by: ["customerCity"],
    where: { status: { not: "ANNULEE" } },
    _count: true,
    _sum: { total: true },
    orderBy: { _count: { customerCity: "desc" } },
    take: 20,
  });

  // Map to landing pages
  const landingStats = LANDING_PAGES.map((page) => {
    const orderData = cityOrders.find(
      (o) =>
        o.customerCity.toLowerCase().includes(page.city.toLowerCase()) ||
        page.city.toLowerCase().includes(o.customerCity.toLowerCase())
    );
    return {
      ...page,
      orders: orderData?._count || 0,
      revenue: orderData?._sum.total || 0,
    };
  });

  const totalLandingOrders = landingStats.reduce(
    (sum, s) => sum + s.orders,
    0
  );
  const totalLandingRevenue = landingStats.reduce(
    (sum, s) => sum + s.revenue,
    0
  );

  // Zone stats
  const zoneStats = {
    A: MOROCCAN_CITIES.filter((c) => c.zone === "A").length,
    B: MOROCCAN_CITIES.filter((c) => c.zone === "B").length,
    C: MOROCCAN_CITIES.filter((c) => c.zone === "C").length,
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-black mb-2">
          Landing Pages Régionales
        </h1>
        <p className="text-gray-600">
          Pages SEO par ville pour capter le trafic local et améliorer le
          référencement.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-brand-gold" size={18} />
            <span className="text-sm text-gray-500">Pages actives</span>
          </div>
          <p className="font-display text-2xl font-bold text-brand-black">
            {LANDING_PAGES.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Package className="text-brand-gold" size={18} />
            <span className="text-sm text-gray-500">Commandes villes</span>
          </div>
          <p className="font-display text-2xl font-bold text-brand-black">
            {totalLandingOrders}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-brand-gold" size={18} />
            <span className="text-sm text-gray-500">CA villes</span>
          </div>
          <p className="font-display text-2xl font-bold text-brand-gold">
            {formatPrice(Math.round(totalLandingRevenue))}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-brand-gold" size={18} />
            <span className="text-sm text-gray-500">Villes couvertes</span>
          </div>
          <p className="font-display text-2xl font-bold text-brand-black">
            {MOROCCAN_CITIES.length}
          </p>
        </div>
      </div>

      {/* Active Landing Pages */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="font-display text-2xl font-bold text-brand-black mb-6">
          Pages Actives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {landingStats.map((page) => (
            <div
              key={page.slug}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-brand-gold/10 to-brand-cream p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-brand-gold" size={20} />
                    <h3 className="font-display text-lg font-bold text-brand-black">
                      {page.city}
                    </h3>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {page.description}
                </p>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Zone de livraison</span>
                  <span className="font-medium text-brand-black">
                    Zone {page.zone} — 24h
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Commandes</span>
                  <span className="font-medium text-brand-black">
                    {page.orders}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Chiffre d&apos;affaires</span>
                  <span className="font-display font-bold text-brand-gold">
                    {formatPrice(Math.round(page.revenue))}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 p-4">
                <Link
                  href={`/boutique/${page.slug}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 text-sm font-medium text-brand-gold hover:text-brand-gold-dark transition-colors"
                >
                  <ExternalLink size={14} />
                  Voir la page publique
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="font-display text-2xl font-bold text-brand-black mb-6">
          Zones de Livraison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["A", "B", "C"] as const).map((zone) => {
            const cities = MOROCCAN_CITIES.filter((c) => c.zone === zone);
            const delay =
              zone === "A" ? "24h" : zone === "B" ? "24-48h" : "48-72h";
            const color =
              zone === "A"
                ? "bg-green-50 border-green-200"
                : zone === "B"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-orange-50 border-orange-200";

            return (
              <div
                key={zone}
                className={`rounded-xl border p-5 ${color}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg font-bold text-brand-black">
                    Zone {zone}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock size={14} className="text-gray-500" />
                    <span className="font-medium">{delay}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {zoneStats[zone]} villes — Livraison en {delay}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cities.map((city) => (
                    <span
                      key={city.name}
                      className="bg-white/70 px-2 py-0.5 rounded text-xs text-gray-700"
                    >
                      {city.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Cities by Orders */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="font-display text-2xl font-bold text-brand-black mb-6">
          Top Villes par Commandes
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">
                  Ville
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">
                  Commandes
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">
                  CA
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase px-4 py-3">
                  Page SEO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cityOrders.map((city, i) => {
                const hasLanding = LANDING_PAGES.some(
                  (p) =>
                    city.customerCity
                      .toLowerCase()
                      .includes(p.city.toLowerCase())
                );
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-brand-black">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={14}
                          className={
                            hasLanding ? "text-brand-gold" : "text-gray-300"
                          }
                        />
                        {city.customerCity}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">
                      {city._count}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-display font-bold text-brand-gold">
                      {formatPrice(Math.round(city._sum.total || 0))}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {hasLanding ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {cityOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-400 text-sm"
                  >
                    Aucune commande enregistrée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO Tips */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="font-display text-2xl font-bold text-brand-black mb-6">
          Conseils SEO Régional
        </h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-brand-black mb-3">
                ✅ Bonnes pratiques
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>
                    Title : &quot;Bijoux [Ville] | Bagues, Colliers &amp;
                    Bracelets — DAHAB&quot;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>
                    Schema.org LocalBusiness avec adresse spécifique
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>
                    Contenu unique mentionnant la ville 3-5 fois naturellement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>
                    Social proof local : &quot;X clientes à [Ville]&quot;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>
                    Info livraison spécifique (zone + délai)
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-brand-black mb-3">
                📊 Métriques à suivre
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>
                    Position Google pour &quot;bijoux [ville]&quot;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>Taux de conversion par page ville</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>Trafic organique par page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>Commandes originées depuis la page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">•</span>
                  <span>
                    Taux de rebond (cibler &lt; 60%)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
