import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;

  const orders = await prisma.order.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  // Build CSV
  const headers = [
    "Numero",
    "Date",
    "Client",
    "Telephone",
    "Ville",
    "Adresse",
    "Articles",
    "Sous-total",
    "Livraison",
    "Total",
    "Statut",
  ];

  const rows = orders.map((order) => [
    order.orderNumber,
    order.createdAt.toISOString().split("T")[0],
    order.customerName,
    order.customerPhone,
    order.customerCity,
    `"${order.customerAddress.replace(/"/g, '""')}"`,
    `"${order.items.map((i) => `${i.productName} x${i.quantity}`).join(", ")}"`,
    order.subtotal.toFixed(2),
    order.shipping.toFixed(2),
    order.total.toFixed(2),
    order.status,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="commandes-dahab-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
