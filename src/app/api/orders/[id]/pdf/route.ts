import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import { jsPDF } from "jspdf";

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

  // Create PDF document (A4)
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // --- Header ---
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("DAHAB", margin, y);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text("Bijoux artisanaux marocains", margin, y + 6);
  doc.setTextColor(0, 0, 0);

  // Order number on the right
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Bon de commande`, pageWidth - margin, y, { align: "right" });
  doc.setFontSize(14);
  doc.text(order.orderNumber, pageWidth - margin, y + 7, { align: "right" });
  y += 20;

  // Divider line
  doc.setDrawColor(201, 168, 76); // brand-gold
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // --- Order info ---
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const orderDate = new Date(order.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.text(`Date : ${orderDate}`, margin, y);
  doc.text(
    `Statut : ${order.status.replace(/_/g, " ")}`,
    pageWidth - margin,
    y,
    { align: "right" }
  );
  y += 10;

  // --- Customer info box ---
  doc.setFillColor(250, 247, 242); // brand-cream
  doc.roundedRect(margin, y, contentWidth, 30, 2, 2, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 120, 120);
  doc.text("CLIENT", margin + 5, y + 6);
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(order.customerName, margin + 5, y + 13);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(order.customerPhone, margin + 5, y + 19);
  doc.text(
    `${order.customerAddress}, ${order.customerCity}`,
    margin + 5,
    y + 25
  );
  y += 40;

  if (order.customerNote) {
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Note : ${order.customerNote}`, margin, y);
    doc.setTextColor(0, 0, 0);
    y += 8;
  }

  // --- Items table ---
  // Table header
  doc.setFillColor(26, 26, 26); // brand-black
  doc.rect(margin, y, contentWidth, 8, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("PRODUIT", margin + 4, y + 5.5);
  doc.text("TAILLE", margin + 95, y + 5.5);
  doc.text("QTE", margin + 115, y + 5.5);
  doc.text("PRIX U.", margin + 130, y + 5.5);
  doc.text("TOTAL", pageWidth - margin - 4, y + 5.5, { align: "right" });
  doc.setTextColor(0, 0, 0);
  y += 8;

  // Table rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  for (let i = 0; i < order.items.length; i++) {
    const item = order.items[i];
    const rowY = y + i * 10;

    // Alternating row background
    if (i % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, rowY, contentWidth, 10, "F");
    }

    // Truncate long product names
    const name =
      item.productName.length > 40
        ? item.productName.substring(0, 37) + "..."
        : item.productName;

    doc.text(name, margin + 4, rowY + 6.5);
    doc.text(item.selectedSize || "-", margin + 95, rowY + 6.5);
    doc.text(String(item.quantity), margin + 115, rowY + 6.5);
    doc.text(formatPrice(item.priceAtOrder), margin + 130, rowY + 6.5);
    doc.text(
      formatPrice(item.priceAtOrder * item.quantity),
      pageWidth - margin - 4,
      rowY + 6.5,
      { align: "right" }
    );
  }

  y += order.items.length * 10 + 5;

  // --- Totals ---
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.line(margin + 100, y, pageWidth - margin, y);
  y += 6;

  const totalsX = margin + 105;
  const totalsValueX = pageWidth - margin - 4;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Sous-total", totalsX, y);
  doc.text(formatPrice(order.subtotal), totalsValueX, y, { align: "right" });
  y += 6;

  if (order.discount > 0) {
    doc.setTextColor(220, 38, 38); // red
    doc.text(`Remise${order.promoCode ? ` (${order.promoCode})` : ""}`, totalsX, y);
    doc.text(`-${formatPrice(order.discount)}`, totalsValueX, y, {
      align: "right",
    });
    doc.setTextColor(0, 0, 0);
    y += 6;
  }

  doc.text("Livraison", totalsX, y);
  doc.text(
    order.shipping === 0 ? "Gratuite" : formatPrice(order.shipping),
    totalsValueX,
    y,
    { align: "right" }
  );
  y += 8;

  // Total line
  doc.setDrawColor(201, 168, 76);
  doc.setLineWidth(0.5);
  doc.line(totalsX, y - 2, pageWidth - margin, y - 2);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL", totalsX, y + 4);
  doc.text(formatPrice(order.total), totalsValueX, y + 4, { align: "right" });
  y += 15;

  // --- Footer ---
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.2);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text(
    "DAHAB - Bijoux artisanaux marocains | dahab.ma | WhatsApp: +212 6 00 00 00 00",
    pageWidth / 2,
    footerY + 5,
    { align: "center" }
  );
  doc.text(
    `Document genere le ${new Date().toLocaleDateString("fr-FR")}`,
    pageWidth / 2,
    footerY + 9,
    { align: "center" }
  );

  // Generate PDF buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="dahab-${order.orderNumber}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
