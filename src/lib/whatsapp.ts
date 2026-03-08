// =============================================================================
// WhatsApp Service for DAHAB Jewelry Store
// Provides link generators for order confirmations, product inquiries, and support
// =============================================================================

// Server-side phone number (used in API routes)
const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+212600000000";

/**
 * Clean a phone number to digits only (removes +, spaces, dashes, etc.)
 */
function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

/**
 * Get the cleaned WhatsApp phone number for client-side usage.
 * Uses NEXT_PUBLIC_WHATSAPP_PHONE env var.
 */
export function getWhatsAppPhone(): string {
  return cleanPhone(WHATSAPP_PHONE);
}

// =============================================================================
// Link Generators
// =============================================================================

/**
 * Generate a WhatsApp link with a pre-filled message.
 */
export function getWhatsAppLink(message: string): string {
  const phone = cleanPhone(WHATSAPP_PHONE);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a WhatsApp link for customer support (generic inquiry).
 */
export function getSupportWhatsAppLink(): string {
  const message = "Bonjour DAHAB, j'ai une question...";
  return getWhatsAppLink(message);
}

/**
 * Generate a WhatsApp link for ordering a product directly from its page.
 * Used by the "Commander via WhatsApp" button on product detail pages.
 */
export function getProductWhatsAppLink(product: {
  name: string;
  price: number;
  selectedSize?: string;
  quantity?: number;
}): string {
  const qty = product.quantity || 1;
  const sizeInfo = product.selectedSize ? `\nTaille: ${product.selectedSize}` : "";
  const message = `Bonjour DAHAB! Je suis interesse(e) par ce produit:\n\nProduit: ${product.name}\nPrix: ${product.price} MAD\nQuantite: ${qty}${sizeInfo}\n\nEst-il disponible?`;
  return getWhatsAppLink(message);
}

// =============================================================================
// Order Message Templates
// =============================================================================

/**
 * Generate the full order notification message for the business owner.
 * Includes all customer and order details.
 */
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

/**
 * Generate a customer-facing order confirmation message.
 * Used on the confirmation page "Confirmer sur WhatsApp" button.
 */
export function getOrderConfirmationWhatsAppMessage(order: {
  orderNumber: string;
  customerName: string;
  customerCity: string;
  total: number;
}): string {
  return `Bonjour DAHAB! Je viens de passer la commande #${order.orderNumber}. Nom: ${order.customerName}, Ville: ${order.customerCity}, Total: ${order.total} MAD`;
}

/**
 * Generate a shareable message for social sharing of the order.
 */
export function getOrderShareMessage(order: {
  orderNumber: string;
  total: number;
}): string {
  return `J'ai commande de magnifiques bijoux chez DAHAB! Commande #${order.orderNumber} - ${order.total} MAD. Decouvrez leur collection sur dahab.ma`;
}

// =============================================================================
// Server-side notification (for API routes)
// =============================================================================

/**
 * Send a WhatsApp notification for a new order.
 * In production, this would integrate with WhatsApp Business API.
 * For now, returns the wa.me link for manual sending.
 */
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
