import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, phone } = await request.json();

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: "Numero de commande et telephone requis" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber: orderNumber.toUpperCase().trim() },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Commande introuvable" },
        { status: 404 }
      );
    }

    // Verify phone matches (normalize both)
    const normalizePhone = (p: string) => p.replace(/[\s\-().+]/g, "").slice(-9);
    if (normalizePhone(order.customerPhone) !== normalizePhone(phone)) {
      return NextResponse.json(
        { error: "Le telephone ne correspond pas a cette commande" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
      total: order.total,
      subtotal: order.subtotal,
      shipping: order.shipping,
      discount: order.discount,
      customerName: order.customerName,
      customerCity: order.customerCity,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        name: item.productName,
        image: item.productImage,
        quantity: item.quantity,
        price: item.priceAtOrder,
        size: item.selectedSize,
      })),
    });
  } catch (error) {
    console.error("Track order error:", error);
    return NextResponse.json(
      { error: "Erreur de suivi" },
      { status: 500 }
    );
  }
}
