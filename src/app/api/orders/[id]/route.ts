import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const VALID_STATUSES = ["EN_ATTENTE", "CONFIRMEE", "EN_PREPARATION", "EXPEDIEE", "LIVREE", "ANNULEE"];

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json(
      { error: "Commande non trouvee" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();

    if (!body.status || !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json(
        { error: "Statut invalide" },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status: body.status },
      include: { items: { include: { product: { select: { slug: true } } } } },
    });

    // Send status-based email notifications (non-blocking)
    if (order.customerEmail) {
      try {
        const { sendEmail } = await import("@/lib/email");

        if (body.status === "EXPEDIEE") {
          const { generateShippingEmail } = await import(
            "@/lib/emails/shipping-notification"
          );
          const emailContent = generateShippingEmail({
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            customerCity: order.customerCity,
          });
          await sendEmail({
            to: order.customerEmail,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        }

        if (body.status === "LIVREE") {
          const { generateReviewRequestEmail } = await import(
            "@/lib/emails/review-request"
          );
          const firstProductSlug = order.items[0]?.product?.slug;
          const emailContent = generateReviewRequestEmail({
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            productSlug: firstProductSlug ?? undefined,
          });
          await sendEmail({
            to: order.customerEmail,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        }
      } catch (e) {
        console.error("Status email notification failed:", e);
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise a jour" },
      { status: 500 }
    );
  }
}
