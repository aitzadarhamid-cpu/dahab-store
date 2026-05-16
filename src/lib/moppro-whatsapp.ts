const SELLER_PHONE =
  process.env.WHATSAPP_PHONE ||
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
  '+33600000000';

function clean(phone: string) {
  return phone.replace(/[^0-9]/g, '');
}

export function buildLink(phone: string, message: string) {
  return `https://wa.me/${clean(phone)}?text=${encodeURIComponent(message)}`;
}

export function sellerOrderLink(order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  withUpsell: boolean;
  items: { name: string; quantity: number; price: number }[];
}) {
  const lines = order.items
    .map((i) => `  • ${i.name} ×${i.quantity} = ${(i.price * i.quantity).toFixed(2)} €`)
    .join('\n');

  const msg =
    `🛒 NOUVELLE COMMANDE MopPro Elite\n` +
    `━━━━━━━━━━━━━━━━\n` +
    `📋 N° ${order.orderNumber}\n` +
    `👤 ${order.customerName}\n` +
    `📞 ${order.customerPhone}\n` +
    `📍 ${order.customerAddress}\n` +
    `━━━━━━━━━━━━━━━━\n` +
    `${lines}\n` +
    `━━━━━━━━━━━━━━━━\n` +
    `💰 Total : ${order.total.toFixed(2)} €\n` +
    (order.withUpsell ? `✅ Upsell éponge inclus\n` : '') +
    `🚚 Livraison gratuite`;

  return buildLink(SELLER_PHONE, msg);
}

export function customerConfirmLink(order: {
  orderNumber: string;
  customerName: string;
  total: number;
}) {
  const msg =
    `Bonjour ! Je viens de commander le MopPro Elite.\n` +
    `📋 Commande : ${order.orderNumber}\n` +
    `👤 Nom : ${order.customerName}\n` +
    `💰 Total : ${order.total.toFixed(2)} €\n` +
    `Merci de confirmer ma commande 🙏`;

  return buildLink(SELLER_PHONE, msg);
}

export function statusUpdateLink(
  customerPhone: string,
  order: { orderNumber: string; customerName: string; status: string }
) {
  const messages: Record<string, string> = {
    EN_COURS: `Bonjour ${order.customerName} ! Votre commande MopPro Elite #${order.orderNumber} est en cours de préparation. Expédition sous 24h ! 🚀`,
    EXPEDIE: `Bonjour ${order.customerName} ! Votre MopPro Elite #${order.orderNumber} vient d'être expédié. Vous le recevrez dans 2-3 jours 📦`,
    LIVRE: `Bonjour ${order.customerName} ! Votre MopPro Elite #${order.orderNumber} a été livré ✅ Nous espérons qu'il vous donnera entière satisfaction !`,
    ANNULE: `Bonjour ${order.customerName}, votre commande #${order.orderNumber} a été annulée. Contactez-nous pour plus d'infos.`,
  };
  const msg = messages[order.status];
  if (!msg) return null;
  return buildLink(customerPhone, msg);
}
