import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePhone } from "@/lib/utils";

function calculateTier(totalSpent: number): string {
  if (totalSpent >= 5000) return "DIAMOND";
  if (totalSpent >= 2000) return "GOLD";
  if (totalSpent >= 500) return "SILVER";
  return "BRONZE";
}

// POST: add/update loyalty points after an order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, name, orderAmount } = body;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Le numero de telephone est requis" },
        { status: 400 }
      );
    }

    if (!orderAmount || typeof orderAmount !== "number" || orderAmount <= 0) {
      return NextResponse.json(
        { error: "Le montant de la commande est invalide" },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);
    const pointsEarned = Math.floor(orderAmount); // 1 MAD = 1 point

    // Upsert customer loyalty profile
    const existing = await prisma.customerLoyalty.findUnique({
      where: { phone: normalizedPhone },
    });

    let customer;

    if (existing) {
      const newTotalSpent = existing.totalSpent + orderAmount;
      const newTotalOrders = existing.totalOrders + 1;
      const newPoints = existing.loyaltyPoints + pointsEarned;
      const newTier = calculateTier(newTotalSpent);

      customer = await prisma.customerLoyalty.update({
        where: { phone: normalizedPhone },
        data: {
          totalSpent: newTotalSpent,
          totalOrders: newTotalOrders,
          loyaltyPoints: newPoints,
          tier: newTier,
          name: name || existing.name,
        },
      });
    } else {
      const tier = calculateTier(orderAmount);
      customer = await prisma.customerLoyalty.create({
        data: {
          phone: normalizedPhone,
          name: name || "",
          totalOrders: 1,
          totalSpent: orderAmount,
          loyaltyPoints: pointsEarned,
          tier,
        },
      });
    }

    return NextResponse.json({
      success: true,
      customer,
      pointsEarned,
    });
  } catch (error) {
    console.error("Loyalty update error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise a jour des points" },
      { status: 500 }
    );
  }
}

// GET: get loyalty profile by phone number
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Le numero de telephone est requis" },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);

    const customer = await prisma.customerLoyalty.findUnique({
      where: { phone: normalizedPhone },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Aucun profil de fidelite trouve pour ce numero" },
        { status: 404 }
      );
    }

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("Loyalty lookup error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
