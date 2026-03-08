import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "productId requis" },
      { status: 400 }
    );
  }

  const reviews = await prisma.review.findMany({
    where: { productId, approved: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const stats = await prisma.review.aggregate({
    where: { productId, approved: true },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return NextResponse.json({
    reviews,
    averageRating: stats._avg.rating || 0,
    totalReviews: stats._count.rating,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { productId, customerName, rating, comment } = await request.json();

    if (!productId || !customerName || !rating || !comment) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Note entre 1 et 5" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        productId,
        customerName: customerName.trim(),
        rating: Math.round(rating),
        comment: comment.trim(),
        approved: false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation de l'avis" },
      { status: 500 }
    );
  }
}
