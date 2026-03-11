import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Moroccan Seasonal Calendar — static data
// ---------------------------------------------------------------------------

const SEASONAL_CALENDAR = [
  {
    name: "Saint-Valentin",
    period: "Fevrier",
    tip: "Parures couples, gravure personnalisee",
  },
  {
    name: "Ramadan",
    period: "Mars-Avril",
    tip: "Promotions pre-Ramadan, coffrets cadeaux Eid",
  },
  {
    name: "Eid Al Fitr",
    period: "Avril",
    tip: "Coffrets celebration, livraison express",
  },
  {
    name: "Fete des Meres",
    period: "Mai",
    tip: "Bundles cadeaux, packaging premium",
  },
  {
    name: "Eid Al Adha",
    period: "Juin",
    tip: "Bijoux de fete, promotions familles",
  },
  {
    name: "Rentree",
    period: "Septembre",
    tip: "Nouvelle collection, offres etudiantes",
  },
  {
    name: "Black Friday",
    period: "Novembre",
    tip: "Remises exceptionnelles, bundles",
  },
  {
    name: "Fin d'Annee",
    period: "Decembre",
    tip: "Coffrets cadeaux Noel/Nouvel An",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getMonthLabel(date: Date): string {
  return date.toLocaleDateString("fr-FR", { year: "numeric", month: "short" });
}

function getLast6MonthsBoundary(): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

// ---------------------------------------------------------------------------
// GET /api/stats/strategy
// ---------------------------------------------------------------------------

export async function GET() {
  try {
    const sixMonthsAgo = getLast6MonthsBoundary();

    // ----- Parallel queries ------------------------------------------------
    const [
      validOrders,
      allOrdersLast6,
      loyaltyCustomers,
      loyaltyByTier,
      loyaltyAvgSpent,
      topLoyaltyCustomers,
      activeSubscribers,
      subscribersLast6,
      cityStats,
      promoCodes,
      categoryPerformance,
      reviewAgg,
      totalReviews,
      approvedReviews,
    ] = await Promise.all([
      // 1. All valid orders (non-cancelled) for AOV
      prisma.order.aggregate({
        where: { status: { not: "ANNULEE" } },
        _sum: { total: true },
        _count: true,
      }),

      // 2. Orders in last 6 months for trends
      prisma.order.findMany({
        where: {
          status: { not: "ANNULEE" },
          createdAt: { gte: sixMonthsAgo },
        },
        select: { total: true, createdAt: true },
      }),

      // 3. Total loyalty customers
      prisma.customerLoyalty.count(),

      // 4. Loyalty by tier
      prisma.customerLoyalty.groupBy({
        by: ["tier"],
        _count: true,
      }),

      // 5. Average totalSpent per loyalty customer
      prisma.customerLoyalty.aggregate({
        _avg: { totalSpent: true },
      }),

      // 6. Top 5 loyalty customers by totalSpent
      prisma.customerLoyalty.findMany({
        orderBy: { totalSpent: "desc" },
        take: 5,
        select: {
          name: true,
          phone: true,
          totalOrders: true,
          totalSpent: true,
          loyaltyPoints: true,
          tier: true,
        },
      }),

      // 7. Active newsletter subscribers
      prisma.newsletter.count({ where: { active: true } }),

      // 8. Subscribers in last 6 months for growth chart
      prisma.newsletter.findMany({
        where: {
          active: true,
          subscribedAt: { gte: sixMonthsAgo },
        },
        select: { subscribedAt: true },
      }),

      // 9. City performance (top 10 by revenue)
      prisma.order.groupBy({
        by: ["customerCity"],
        where: { status: { not: "ANNULEE" } },
        _count: true,
        _sum: { total: true },
        orderBy: { _sum: { total: "desc" } },
        take: 10,
      }),

      // 10. Promo codes
      prisma.promoCode.findMany({
        select: {
          code: true,
          type: true,
          value: true,
          usedCount: true,
          active: true,
        },
        orderBy: { usedCount: "desc" },
      }),

      // 11. Category performance via OrderItem + Product join
      prisma.orderItem.groupBy({
        by: ["productName"],
        _sum: { quantity: true, priceAtOrder: true },
        _count: true,
      }),

      // 12. Review average rating
      prisma.review.aggregate({
        _avg: { rating: true },
      }),

      // 13. Total reviews
      prisma.review.count(),

      // 14. Approved reviews
      prisma.review.count({ where: { approved: true } }),
    ]);

    // ----- Compute AOV ----------------------------------------------------
    const totalRevenue = validOrders._sum.total || 0;
    const totalOrderCount = validOrders._count || 0;
    const aov = totalOrderCount > 0 ? totalRevenue / totalOrderCount : 0;

    // ----- AOV per month (last 6 months) ----------------------------------
    const aovByMonth: Record<string, { total: number; count: number }> = {};
    allOrdersLast6.forEach((o) => {
      const key = getMonthLabel(o.createdAt);
      if (!aovByMonth[key]) aovByMonth[key] = { total: 0, count: 0 };
      aovByMonth[key].total += o.total;
      aovByMonth[key].count += 1;
    });
    const aovTrend = Object.entries(aovByMonth).map(([month, data]) => ({
      month,
      aov: data.count > 0 ? Math.round(data.total / data.count) : 0,
    }));

    // ----- Monthly revenue trend (last 6 months) --------------------------
    const revenueByMonth: Record<string, number> = {};
    allOrdersLast6.forEach((o) => {
      const key = getMonthLabel(o.createdAt);
      revenueByMonth[key] = (revenueByMonth[key] || 0) + o.total;
    });
    const monthlyRevenueTrend = Object.entries(revenueByMonth).map(
      ([month, revenue]) => ({
        month,
        revenue: Math.round(revenue),
      })
    );

    // ----- Loyalty tier counts --------------------------------------------
    const tierMap: Record<string, number> = {
      BRONZE: 0,
      SILVER: 0,
      GOLD: 0,
      DIAMOND: 0,
    };
    loyaltyByTier.forEach((t) => {
      tierMap[t.tier] = t._count;
    });

    // ----- Newsletter growth by month -------------------------------------
    const subsByMonth: Record<string, number> = {};
    subscribersLast6.forEach((s) => {
      const key = getMonthLabel(s.subscribedAt);
      subsByMonth[key] = (subsByMonth[key] || 0) + 1;
    });
    const newsletterGrowth = Object.entries(subsByMonth).map(
      ([month, count]) => ({
        month,
        subscribers: count,
      })
    );

    // ----- City performance -----------------------------------------------
    const performanceByCity = cityStats.map((c) => ({
      city: c.customerCity || "Inconnue",
      orders: c._count,
      revenue: Math.round(c._sum.total || 0),
    }));

    // ----- Promo ROI ------------------------------------------------------
    const promoROI = promoCodes.map((p) => {
      let estimatedDiscount = 0;
      if (p.type === "FIXED") {
        estimatedDiscount = p.usedCount * p.value;
      } else {
        // PERCENTAGE: estimate based on AOV
        estimatedDiscount = p.usedCount * aov * (p.value / 100);
      }
      return {
        code: p.code,
        type: p.type,
        value: p.value,
        usedCount: p.usedCount,
        estimatedDiscount: Math.round(estimatedDiscount),
        active: p.active,
      };
    });

    // ----- Category performance via product lookup ------------------------
    // We need to map productName -> category from actual products
    const allProducts = await prisma.product.findMany({
      select: { name: true, category: true },
    });
    const productCategoryMap: Record<string, string> = {};
    allProducts.forEach((p) => {
      productCategoryMap[p.name] = p.category;
    });

    const categoryRevMap: Record<
      string,
      { revenue: number; orders: number }
    > = {};
    categoryPerformance.forEach((item) => {
      const cat = productCategoryMap[item.productName] || "AUTRE";
      if (!categoryRevMap[cat]) categoryRevMap[cat] = { revenue: 0, orders: 0 };
      categoryRevMap[cat].revenue += item._sum.priceAtOrder || 0;
      categoryRevMap[cat].orders += item._count;
    });
    const categoryStats = Object.entries(categoryRevMap).map(
      ([category, data]) => ({
        category,
        revenue: Math.round(data.revenue),
        orders: data.orders,
      })
    );

    // ----- Review stats ---------------------------------------------------
    const reviewStats = {
      averageRating: reviewAgg._avg.rating
        ? Math.round(reviewAgg._avg.rating * 10) / 10
        : 0,
      totalReviews,
      approvedReviews,
    };

    // ----- Build response -------------------------------------------------
    const stats = {
      aov: Math.round(aov),
      aovTrend,
      loyalty: {
        totalCustomers: loyaltyCustomers,
        tiers: tierMap,
        averageSpent: Math.round(loyaltyAvgSpent._avg.totalSpent || 0),
        topCustomers: topLoyaltyCustomers,
      },
      newsletter: {
        totalActive: activeSubscribers,
        growth: newsletterGrowth,
      },
      performanceByCity,
      promoROI,
      categoryPerformance: categoryStats,
      monthlyRevenueTrend,
      reviewStats,
      seasonalCalendar: SEASONAL_CALENDAR,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Strategy stats error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des statistiques strategiques" },
      { status: 500 }
    );
  }
}
