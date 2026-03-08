import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const promos = await prisma.promoCode.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ promos });
}

export async function POST(request: NextRequest) {
  try {
    const { code, type, value, minOrder, maxUses } = await request.json();

    const promo = await prisma.promoCode.create({
      data: {
        code: code.toUpperCase().trim(),
        type,
        value,
        minOrder: minOrder || 0,
        maxUses: maxUses || 0,
      },
    });

    return NextResponse.json(promo, { status: 201 });
  } catch (error) {
    console.error("Create promo error:", error);
    return NextResponse.json({ error: "Erreur creation promo" }, { status: 500 });
  }
}
