import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthAdmin } from "@/lib/auth";

// POST: subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "L'adresse email est requise" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      // Reactivate if previously unsubscribed
      if (!existing.active) {
        await prisma.newsletter.update({
          where: { email: email.toLowerCase() },
          data: { active: true, firstName: firstName || existing.firstName },
        });
        return NextResponse.json({ success: true, message: "Re-inscription reussie" });
      }
      return NextResponse.json(
        { error: "Cette adresse email est deja inscrite" },
        { status: 409 }
      );
    }

    await prisma.newsletter.create({
      data: {
        email: email.toLowerCase(),
        firstName: firstName || "",
      },
    });

    return NextResponse.json({ success: true, message: "Inscription reussie" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}

// GET: list subscribers (admin only)
export async function GET() {
  try {
    const admin = await getAuthAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Non autorise" },
        { status: 401 }
      );
    }

    const subscribers = await prisma.newsletter.findMany({
      orderBy: { subscribedAt: "desc" },
    });

    const total = subscribers.length;
    const active = subscribers.filter((s) => s.active).length;

    // Count new subscribers this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = subscribers.filter(
      (s) => new Date(s.subscribedAt) >= startOfMonth
    ).length;

    return NextResponse.json({
      subscribers,
      stats: {
        total,
        active,
        newThisMonth,
      },
    });
  } catch (error) {
    console.error("Newsletter list error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recuperation" },
      { status: 500 }
    );
  }
}
