const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || "+212600000000";

function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

export function getWhatsAppLink(message: string): string {
  const phone = cleanPhone(WHATSAPP_PHONE);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getOrderWhatsAppMessage(order: {
  orderNumber: string;
  customerName: string;
  total: number;
  items: { productName: string; quantity: number; priceAtOrder: number }[];
  customerCity: string;
  customerAddress: string;
  customerPhone: string;
}): string {
  const itemsList = order.items
    .map(
      (item) =>
        `  - ${item.productName} x${item.quantity} = ${item.priceAtOrder * item.quantity} MAD`
    )
    .join("\n");

  return `Nouvelle commande DAHAB! #${order.orderNumber}

Client: ${order.customerName}
Tel: ${order.customerPhone}
Ville: ${order.customerCity}
Adresse: ${order.customerAddress}

Articles:
${itemsList}

Total: ${order.total} MAD
Paiement: A la livraison (COD)`;
}

export function getOrderShareMessage(order: {
  orderNumber: string;
  total: number;
}): string {
  return `J'ai commande de magnifiques bijoux chez DAHAB! Commande #${order.orderNumber} - ${order.total} MAD. Decouvrez leur collection sur dahab.ma`;
}

export async function sendWhatsAppNotification(order: {
  orderNumber: string;
  customerName: string;
  total: number;
  items: { productName: string; quantity: number; priceAtOrder: number }[];
  customerCity: string;
  customerAddress: string;
  customerPhone: string;
}): Promise<string> {
  const message = getOrderWhatsAppMessage(order);
  const link = getWhatsAppLink(message);
  // In production, integrate with WhatsApp Business API
  // For now, return the wa.me link for manual sending
  return link;
}
