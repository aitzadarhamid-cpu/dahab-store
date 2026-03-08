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
      topProducts: topItems.map((item) => ({
        name: item.productName,
        totalSold: item._sum.quantity || 0,
        revenue: item._sum.priceAtOrder || 0,
      })),
      ordersByStatus: statusCounts.map((s) => ({
        status: s.status,
        count: s._count,
      })),
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
