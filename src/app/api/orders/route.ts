import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber, getShippingCost } from "@/lib/utils";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { orderNumber: { contains: search } },
      { customerPhone: { contains: search } },
      { customerName: { contains: search } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({
    orders,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      customerNote,
      items,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Le panier est vide" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const shipping = getShippingCost(subtotal);
    const total = subtotal + shipping;

    // Generate unique order number
    let orderNumber = generateOrderNumber();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.order.findUnique({
        where: { orderNumber },
      });
      if (!existing) break;
      orderNumber = generateOrderNumber();
      attempts++;
    }

    // Create order with items in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerPhone,
          customerCity,
          customerAddress,
          customerNote: customerNote || null,
          subtotal,
          shipping,
          total,
          items: {
            create: items.map(
              (item: {
                id: string;
                name: string;
                price: number;
                quantity: number;
                selectedSize?: string;
                image: string;
              }) => ({
                productId: item.id,
                productName: item.name,
                priceAtOrder: item.price,
                quantity: item.quantity,
                selectedSize: item.selectedSize || null,
                productImage: item.image,
              })
            ),
          },
        },
        include: { items: true },
      });

      // Decrement stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    // Send WhatsApp notification (non-blocking)
    try {
      await sendWhatsAppNotification({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerCity: order.customerCity,
        customerAddress: order.customerAddress,
        total: order.total,
        items: order.items,
      });
      await prisma.order.update({
        where: { id: order.id },
        data: { whatsappSent: true },
      });
    } catch (e) {
      console.error("WhatsApp notification failed:", e);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation de la commande" },
      { status: 500 }
    );
  }
}
