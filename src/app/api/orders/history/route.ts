import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Numero de telephone requis" },
        { status: 400 }
      );
    }

    // Normalize phone to match stored format
    const normalizePhone = (p: string) => p.replace(/[\s\-().+]/g, "").slice(-9);
    const normalized = normalizePhone(phone);

    const orders = await prisma.order.findMany({
      where: {
        customerPhone: {
          endsWith: normalized,
        },
      },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    if (orders.length === 0) {
      return NextResponse.json(
        { error: "Aucune commande trouvee pour ce numero" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      orders: orders.map((order) => ({
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        customerName: order.customerName,
        customerCity: order.customerCity,
        createdAt: order.createdAt,
        itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
        items: order.items.map((item) => ({
          name: item.productName,
          image: item.productImage,
          quantity: item.quantity,
          price: item.priceAtOrder,
          size: item.selectedSize,
        })),
      })),
    });
  } catch (error) {
    console.error("Order history error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
