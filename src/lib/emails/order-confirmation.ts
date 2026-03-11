import { getDeliveryEstimate } from "@/lib/moroccan-cities";

// ---------------------------------------------------------------------------
// Order Confirmation Email — DAHAB Transactional Email
// Sent immediately after a new order is placed
// ---------------------------------------------------------------------------

export interface OrderData {
  orderNumber: string;
  customerName: string;
  customerCity: string;
  items: {
    name: string;
    quantity: number;
    priceAtOrder: number;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

function formatPrice(amount: number): string {
  return amount.toLocaleString("fr-MA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function buildItemsHtml(items: OrderData["items"]): string {
  return items
    .map(
      (item) => `
      <tr>
        <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1A1A1A;padding:8px 0;border-bottom:1px solid #f0ede8;">
          ${item.name}${item.quantity > 1 ? ` <span style="color:#888;">&times;${item.quantity}</span>` : ""}
        </td>
        <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1A1A1A;padding:8px 0;border-bottom:1px solid #f0ede8;text-align:right;white-space:nowrap;">
          ${formatPrice(item.priceAtOrder * item.quantity)} MAD
        </td>
      </tr>`
    )
    .join("");
}

export function generateOrderConfirmationEmail(order: OrderData): {
  subject: string;
  html: string;
} {
  const deliveryEstimate = getDeliveryEstimate(order.customerCity);
  const orderDate = new Date().toLocaleDateString("fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const subject = `Commande ${order.orderNumber} confirmee — DAHAB`;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Confirmation de commande DAHAB</title></head>
<body style="margin:0;padding:0;background-color:#FAF7F2;font-family:'Inter',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF7F2;">
<tr><td align="center" style="padding:20px 0;">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

<!-- Gold bar -->
<tr>
  <td style="background-color:#C9A84C;padding:8px 0;text-align:center;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="text-align:center;font-family:'Inter',Arial,sans-serif;font-size:11px;color:#FAF7F2;letter-spacing:2px;">L'ELEGANCE ACCESSIBLE</td></tr></table>
  </td>
</tr>

<!-- Logo -->
<tr>
  <td style="background-color:#1A1A1A;padding:24px 0;text-align:center;">
    <span style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:bold;color:#C9A84C;letter-spacing:3px;">DAHAB</span>
    <br/>
    <span style="font-family:'Inter',Arial,sans-serif;font-size:10px;color:#C9A84C;letter-spacing:4px;">&#1583;&#1607;&#1576;</span>
  </td>
</tr>

<!-- Content -->
<tr>
  <td style="padding:40px 32px;">
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1A1A1A;margin:0 0 6px;text-align:center;">Merci pour votre commande !</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;text-align:center;margin:0 0 4px;">
      Bonjour <strong style="color:#1A1A1A;">${order.customerName}</strong>,
    </p>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#888;text-align:center;margin:0 0 24px;">
      Commande n&deg; <strong style="color:#1A1A1A;">${order.orderNumber}</strong> &mdash; ${orderDate}
    </p>

    <!-- Order items -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF7F2;border-radius:8px;">
      <tr><td style="padding:20px;">
        <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">Recapitulatif</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${buildItemsHtml(order.items)}
        </table>

        <!-- Totals -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
          <tr>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;padding:4px 0;">Sous-total</td>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#555;padding:4px 0;text-align:right;">${formatPrice(order.subtotal)} MAD</td>
          </tr>
          <tr>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;padding:4px 0;">Livraison</td>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#555;padding:4px 0;text-align:right;">${order.shipping === 0 ? "Gratuite" : `${formatPrice(order.shipping)} MAD`}</td>
          </tr>${
    order.discount > 0
      ? `
          <tr>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#27ae60;padding:4px 0;">Remise</td>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#27ae60;padding:4px 0;text-align:right;">-${formatPrice(order.discount)} MAD</td>
          </tr>`
      : ""
  }
          <tr>
            <td colspan="2" style="padding:8px 0 0;"><hr style="border:none;border-top:1px solid #e5e5e5;margin:0;"/></td>
          </tr>
          <tr>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#1A1A1A;font-weight:600;padding:8px 0 0;">Total</td>
            <td style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#C9A84C;font-weight:bold;padding:8px 0 0;text-align:right;">${formatPrice(order.total)} MAD</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Delivery info -->
    <div style="text-align:center;margin:28px 0 24px;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#555;margin:0 0 4px;">
        Livraison a <strong style="color:#1A1A1A;">${order.customerCity}</strong>
      </p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#C9A84C;font-weight:bold;margin:0;">
        Estimee en ${deliveryEstimate}
      </p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;margin:8px 0 0;">
        Paiement a la livraison (COD)
      </p>
    </div>

    <!-- WhatsApp CTA -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin:24px auto;">
      <tr>
        <td style="background-color:#C9A84C;border-radius:6px;padding:14px 32px;text-align:center;">
          <a href="https://wa.me/212600000000" style="color:#ffffff;font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;">Suivre sur WhatsApp</a>
        </td>
      </tr>
    </table>

    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;text-align:center;margin:0;">
      Votre bijou est prepare avec soin. Merci de votre confiance !
    </p>
  </td>
</tr>

<!-- Footer -->
<tr>
  <td style="background-color:#1A1A1A;padding:32px 24px;text-align:center;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="text-align:center;padding-bottom:16px;">
          <a href="https://instagram.com/dahab.bijoux" style="color:#C9A84C;font-family:'Inter',Arial,sans-serif;font-size:12px;text-decoration:none;margin:0 8px;">Instagram</a>
          <span style="color:#444;">&middot;</span>
          <a href="https://tiktok.com/@dahab.bijoux" style="color:#C9A84C;font-family:'Inter',Arial,sans-serif;font-size:12px;text-decoration:none;margin:0 8px;">TikTok</a>
          <span style="color:#444;">&middot;</span>
          <a href="https://wa.me/212600000000" style="color:#C9A84C;font-family:'Inter',Arial,sans-serif;font-size:12px;text-decoration:none;margin:0 8px;">WhatsApp</a>
        </td>
      </tr>
      <tr>
        <td style="text-align:center;">
          <span style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:#888;">DAHAB &mdash; Casablanca, Maroc</span>
        </td>
      </tr>
    </table>
  </td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, html };
}
