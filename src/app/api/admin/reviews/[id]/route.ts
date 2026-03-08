import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const review = await prisma.review.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(review);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.review.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
