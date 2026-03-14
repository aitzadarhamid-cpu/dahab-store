export const dynamic = "force-dynamic";

import {
  Package,
  ShoppingCart,
  Mail,
  Star,
} from "lucide-react";
import { BRAND_MODULES } from "@/lib/brand-data";
import { HubCard } from "@/components/marque/hub-card";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Data fetching — server component, runs at request time
// ---------------------------------------------------------------------------

async function getHubStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [activeProducts, monthlyOrders, newsletterSubs, approvedReviews] =
    await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.order.count({
        where: {
          createdAt: { gte: startOfMonth },
          status: { not: "ANNULEE" },
        },
      }),
      prisma.newsletter.count({ where: { active: true } }),
      prisma.review.count({ where: { approved: true } }),
    ]);

  return { activeProducts, monthlyOrders, newsletterSubs, approvedReviews };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function MarqueHubPage() {
  const stats = await getHubStats();

  const kpiCards = [
    {
      label: "Produits actifs",
      value: stats.activeProducts,
      icon: Package,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Commandes ce mois",
      value: stats.monthlyOrders,
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Abonnés newsletter",
      value: stats.newsletterSubs,
      icon: Mail,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Avis clients",
      value: stats.approvedReviews,
      icon: Star,
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-brand-black">
          Système de Marque DAHAB
        </h1>
        <p className="text-gray-500 mt-1">
          Gérez votre identité de marque, marketing et stratégie
        </p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpiCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm">
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

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {BRAND_MODULES.map((mod) => (
          <HubCard
            key={mod.id}
            icon={mod.icon}
            label={mod.label}
            description={mod.description}
            href={mod.href}
            color={mod.color}
          />
        ))}
      </div>
    </div>
  );
}
