import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Code promo requis" },
        { status: 400 }
      );
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!promo || !promo.active) {
      return NextResponse.json(
        { error: "Code promo invalide" },
        { status: 404 }
      );
    }

    if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "Ce code promo a expire" },
        { status: 400 }
      );
    }

    if (promo.maxUses > 0 && promo.usedCount >= promo.maxUses) {
      return NextResponse.json(
        { error: "Ce code promo a atteint sa limite d'utilisation" },
        { status: 400 }
      );
    }

    if (subtotal < promo.minOrder) {
      return NextResponse.json(
        {
          error: `Commande minimum de ${promo.minOrder} MAD requise pour ce code`,
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discount = 0;
    if (promo.type === "PERCENTAGE") {
      discount = Math.round((subtotal * promo.value) / 100);
    } else {
      discount = Math.min(promo.value, subtotal);
    }

    return NextResponse.json({
      valid: true,
      code: promo.code,
      type: promo.type,
      value: promo.value,
      discount,
      message:
        promo.type === "PERCENTAGE"
          ? `-${promo.value}% applique`
          : `-${promo.value} MAD applique`,
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    return NextResponse.json(
      { error: "Erreur de validation" },
      { status: 500 }
    );
  }
}
