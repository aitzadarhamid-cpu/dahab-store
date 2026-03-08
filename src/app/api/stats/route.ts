import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      orders,
      totalOrders,
      pendingOrders,
      activeProducts,
      topItems,
      ordersByCity,
      promoCodes,
      recentOrders,
    ] = await Promise.all([
      prisma.order.findMany({
        where: {
          createdAt: { gte: thirtyDaysAgo },
          status: { not: "ANNULEE" },
        },
        select: { total: true, createdAt: true, status: true },
      }),
      prisma.order.count({ where: { status: { not: "ANNULEE" } } }),
      prisma.order.count({ where: { status: "EN_ATTENTE" } }),
      prisma.product.count({ where: { active: true } }),
      prisma.orderItem.groupBy({
        by: ["productName"],
        _sum: { quantity: true, priceAtOrder: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
      // Orders grouped by city
      prisma.order.groupBy({
        by: ["customerCity"],
        where: { status: { not: "ANNULEE" } },
        _count: true,
        _sum: { total: true },
        orderBy: { _count: { customerCity: "desc" } },
        take: 10,
      }),
      // Promo code usage stats
      prisma.promoCode.findMany({
        where: { usedCount: { gt: 0 } },
        select: {
          code: true,
          type: true,
          value: true,
          usedCount: true,
          active: true,
        },
        orderBy: { usedCount: "desc" },
        take: 10,
      }),
      // All orders for conversion rate calculation (last 30 days)
      prisma.order.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { status: true, total: true, createdAt: true },
      }),
    ]);

    // Revenue
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    // Revenue by day
    const revenueByDay: Record<string, number> = {};
    const ordersByDay: Record<string, number> = {};
    orders.forEach((o) => {
      const date = o.createdAt.toISOString().split("T")[0];
      revenueByDay[date] = (revenueByDay[date] || 0) + o.total;
      ordersByDay[date] = (ordersByDay[date] || 0) + 1;
    });

    // Orders by status
    const statusCounts = await prisma.order.groupBy({
      by: ["status"],
      _count: true,
    });

    // Conversion rate: LIVREE / total orders (last 30 days)
    const totalRecentOrders = recentOrders.length;
    const deliveredOrders = recentOrders.filter(
      (o) => o.status === "LIVREE"
    ).length;
    const cancelledOrders = recentOrders.filter(
      (o) => o.status === "ANNULEE"
    ).length;
    const conversionRate =
      totalRecentOrders > 0
        ? Math.round((deliveredOrders / totalRecentOrders) * 100)
        : 0;
    const cancelRate =
      totalRecentOrders > 0
        ? Math.round((cancelledOrders / totalRecentOrders) * 100)
        : 0;

    // Weekly revenue (group by week)
    const revenueByWeek: Record<string, number> = {};
    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      // Get ISO week start (Monday)
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      const weekStart = new Date(d.setDate(diff));
      const key = weekStart.toISOString().split("T")[0];
      revenueByWeek[key] = (revenueByWeek[key] || 0) + o.total;
    });

    const stats = {
      totalRevenue,
      totalOrders,
      pendingOrders,
      activeProducts,
      revenueByDay: Object.entries(revenueByDay)
        .map(([date, revenue]) => ({ date, revenue }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      ordersByDay: Object.entries(ordersByDay)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      revenueByWeek: Object.entries(revenueByWeek)
        .map(([week, revenue]) => ({ week, revenue }))
        .sort((a, b) => a.week.localeCompare(b.week)),
      topProducts: topItems.map((item) => ({
        name: item.productName,
        totalSold: item._sum.quantity || 0,
        revenue: item._sum.priceAtOrder || 0,
      })),
      ordersByStatus: statusCounts.map((s) => ({
        status: s.status,
        count: s._count,
      })),
      ordersByCity: ordersByCity.map((c) => ({
        city: c.customerCity,
        count: c._count,
        revenue: c._sum.total || 0,
      })),
      promoStats: promoCodes.map((p) => ({
        code: p.code,
        type: p.type,
        value: p.value,
        usedCount: p.usedCount,
        active: p.active,
      })),
      conversionRate,
      cancelRate,
      deliveredOrders,
      totalRecentOrders,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des statistiques" },
      { status: 500 }
    );
  }
}
