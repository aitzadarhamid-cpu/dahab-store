import { getDeliveryEstimate } from "@/lib/moroccan-cities";

// ---------------------------------------------------------------------------
// Shipping Notification Email — DAHAB Transactional Email
// Sent when order status changes to EXPEDIEE
// ---------------------------------------------------------------------------

export interface ShippingData {
  orderNumber: string;
  customerName: string;
  customerCity: string;
}

export function generateShippingEmail(order: ShippingData): {
  subject: string;
  html: string;
} {
  const deliveryEstimate = getDeliveryEstimate(order.customerCity);

  const subject = `Votre colis DAHAB est en route ! — ${order.orderNumber}`;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Votre colis DAHAB est en route</title></head>
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
  <td style="padding:40px 32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:12px;">&#128230;</div>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1A1A1A;margin:0 0 8px;">Votre commande est en route !</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;line-height:1.6;margin:0 0 8px;">
      Bonjour <strong style="color:#1A1A1A;">${order.customerName}</strong>,
    </p>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;line-height:1.6;margin:0 0 24px;">
      Votre commande <strong style="color:#1A1A1A;">${order.orderNumber}</strong> a ete expediee et est en chemin vers vous.
    </p>

    <!-- Delivery estimate box -->
    <div style="background-color:#FAF7F2;border-radius:8px;padding:24px;margin:0 0 24px;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Livraison estimee</p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#C9A84C;font-weight:bold;margin:0 0 4px;">${deliveryEstimate}</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#555;margin:0 0 16px;">
        Destination : <strong style="color:#1A1A1A;">${order.customerCity}</strong>
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;text-align:center;">
            Zone A (Casablanca, Rabat) : 24h &bull; Zone B : 24-48h &bull; Zone C : 48-72h
          </td>
        </tr>
      </table>
    </div>

    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#555;line-height:1.6;margin:0 0 24px;">
      Une question sur votre livraison ? Contactez-nous directement sur WhatsApp, nous sommes la pour vous aider.
    </p>

    <!-- WhatsApp CTA -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px;">
      <tr>
        <td style="background-color:#C9A84C;border-radius:6px;padding:14px 32px;text-align:center;">
          <a href="https://wa.me/212600000000" style="color:#ffffff;font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;">Contacter le Support</a>
        </td>
      </tr>
    </table>

    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;margin:0;">
      Merci pour votre confiance !
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
