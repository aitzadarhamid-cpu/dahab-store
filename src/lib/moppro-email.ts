import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL || 'MopPro Elite <noreply@moppro.fr>';
const ADMIN_EMAIL = process.env.MOPPRO_ADMIN_EMAIL || '';

interface OrderData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  withUpsell: boolean;
}

function customerHtml(o: OrderData) {
  const rows = o.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #1e2a4a;color:#c0c8e0;">${i.name} ×${i.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #1e2a4a;color:#fff;text-align:right;font-weight:bold;">${(i.price * i.quantity).toFixed(2)} €</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:system-ui,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:24px 16px;">
    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#00d4ff,#0099cc);border-radius:16px;padding:12px 24px;">
        <span style="color:#0a0f1e;font-size:20px;font-weight:900;">🧹 MopPro Elite</span>
      </div>
    </div>

    <!-- Success card -->
    <div style="background:#0d1526;border:1px solid rgba(0,212,255,0.2);border-radius:20px;padding:28px;margin-bottom:20px;">
      <div style="text-align:center;margin-bottom:20px;">
        <div style="font-size:48px;margin-bottom:8px;">✅</div>
        <h1 style="color:#fff;font-size:22px;font-weight:900;margin:0 0 8px;">Commande confirmée !</h1>
        <p style="color:#8899bb;margin:0;">Bonjour ${o.customerName}, votre commande est enregistrée.</p>
      </div>

      <div style="background:#0a0f1e;border-radius:12px;padding:16px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="color:#8899bb;font-size:13px;">N° de commande</span>
          <span style="color:#00d4ff;font-weight:900;font-size:15px;">${o.orderNumber}</span>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span style="color:#8899bb;font-size:13px;">Livraison à</span>
          <span style="color:#c0c8e0;font-size:13px;text-align:right;max-width:60%;">${o.customerAddress}</span>
        </div>
      </div>

      <!-- Order summary -->
      <table style="width:100%;border-collapse:collapse;">
        ${rows}
        <tr>
          <td style="padding:12px 0 0;color:#8899bb;">Livraison</td>
          <td style="padding:12px 0 0;color:#34d399;text-align:right;font-weight:bold;">GRATUITE</td>
        </tr>
        <tr>
          <td style="padding:8px 0 0;color:#fff;font-weight:900;font-size:16px;">Total</td>
          <td style="padding:8px 0 0;color:#fff;font-weight:900;font-size:20px;text-align:right;">${o.total.toFixed(2)} €</td>
        </tr>
      </table>
    </div>

    <!-- Delivery info -->
    <div style="background:#0d1526;border:1px solid rgba(52,211,153,0.2);border-radius:16px;padding:20px;margin-bottom:20px;">
      <h3 style="color:#34d399;margin:0 0 12px;font-size:15px;">📦 Votre livraison</h3>
      <p style="color:#c0c8e0;margin:0 0 6px;font-size:13px;">🚚 Expédition sous 24h ouvrées</p>
      <p style="color:#c0c8e0;margin:0 0 6px;font-size:13px;">📅 Livraison estimée : 3 à 5 jours ouvrés</p>
      <p style="color:#c0c8e0;margin:0;font-size:13px;">🔄 Satisfait ou remboursé 30 jours sans condition</p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:16px 0;">
      <p style="color:#4a5568;font-size:12px;margin:0;">© 2025 MopPro Elite · Tous droits réservés</p>
      <p style="color:#4a5568;font-size:12px;margin:4px 0 0;">Des questions ? Répondez à cet email.</p>
    </div>
  </div>
</body>
</html>`;
}

function adminHtml(o: OrderData) {
  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui;background:#f5f5f5;padding:24px;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border-left:4px solid #00d4ff;">
    <h2 style="margin:0 0 16px;color:#0a0f1e;">🛒 Nouvelle commande MopPro Elite</h2>
    <p><strong>N° :</strong> ${o.orderNumber}</p>
    <p><strong>Client :</strong> ${o.customerName}</p>
    <p><strong>Email :</strong> ${o.customerEmail}</p>
    <p><strong>Tél :</strong> ${o.customerPhone}</p>
    <p><strong>Adresse :</strong> ${o.customerAddress}</p>
    <p><strong>Total :</strong> ${o.total.toFixed(2)} €${o.withUpsell ? ' (upsell inclus)' : ''}</p>
    <hr/>
    ${o.items.map((i) => `<p>${i.name} ×${i.quantity} — ${(i.price * i.quantity).toFixed(2)} €</p>`).join('')}
  </div>
</body>
</html>`;
}

export async function sendOrderConfirmation(order: OrderData) {
  if (!resend) return;
  await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: order.customerEmail,
      subject: `✅ Commande confirmée ${order.orderNumber} — MopPro Elite`,
      html: customerHtml(order),
    }),
    ADMIN_EMAIL &&
      resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: `🛒 Nouvelle commande ${order.orderNumber} — ${order.total.toFixed(2)} €`,
        html: adminHtml(order),
      }),
  ]);
}
