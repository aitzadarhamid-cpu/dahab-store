// ---------------------------------------------------------------------------
// DAHAB Email Templates — 7 ready-to-use branded email sequences
// Colors: Gold #C9A84C | Black #1A1A1A | Cream #FAF7F2
// Font stack: 'Inter', Arial, sans-serif (web-safe fallback for emails)
// ---------------------------------------------------------------------------

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  trigger: string;
  category: "transactional" | "marketing" | "retention";
  previewText: string;
  htmlContent: string;
}

// ---------------------------------------------------------------------------
// Shared HTML fragments
// ---------------------------------------------------------------------------

const HEADER = `<tr>
  <td style="background-color:#C9A84C;padding:8px 0;text-align:center;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="text-align:center;font-family:'Inter',Arial,sans-serif;font-size:11px;color:#FAF7F2;letter-spacing:2px;">L'ELEGANCE ACCESSIBLE</td></tr></table>
  </td>
</tr>
<tr>
  <td style="background-color:#1A1A1A;padding:24px 0;text-align:center;">
    <span style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:bold;color:#C9A84C;letter-spacing:3px;">DAHAB</span>
    <br/>
    <span style="font-family:'Inter',Arial,sans-serif;font-size:10px;color:#C9A84C;letter-spacing:4px;">&#1583;&#1607;&#1576;</span>
  </td>
</tr>`;

const FOOTER = `<tr>
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
        <td style="text-align:center;padding-bottom:12px;">
          <span style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:#888;">DAHAB &mdash; Casablanca, Maroc</span>
        </td>
      </tr>
      <tr>
        <td style="text-align:center;">
          <a href="{{UNSUBSCRIBE_URL}}" style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:#666;text-decoration:underline;">Se desabonner</a>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

function wrapEmail(bodyRows: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>DAHAB</title></head>
<body style="margin:0;padding:0;background-color:#FAF7F2;font-family:'Inter',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF7F2;">
<tr><td align="center" style="padding:20px 0;">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
${HEADER}
${bodyRows}
${FOOTER}
</table>
</td></tr>
</table>
</body>
</html>`;
}

function ctaButton(text: string, href: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:24px auto;">
  <tr>
    <td style="background-color:#C9A84C;border-radius:6px;padding:14px 32px;text-align:center;">
      <a href="${href}" style="color:#ffffff;font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;">${text}</a>
    </td>
  </tr>
</table>`;
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  // 1. Welcome
  {
    id: "welcome",
    name: "Bienvenue chez DAHAB",
    subject: "Bienvenue dans l'univers DAHAB \u2728",
    description:
      "Email de bienvenue envoye apres la premiere commande ou inscription a la newsletter. Inclut un code promo de bienvenue.",
    trigger: "Premiere commande ou inscription newsletter",
    category: "transactional",
    previewText:
      "Bienvenue dans l'univers DAHAB ! Votre code -15% vous attend...",
    htmlContent: wrapEmail(`<tr>
  <td style="padding:40px 32px;text-align:center;">
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#1A1A1A;margin:0 0 8px;">Bienvenue chez DAHAB</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;line-height:1.6;margin:0 0 20px;">
      Merci de rejoindre l'univers DAHAB. Nous creons des bijoux elegants et accessibles, fabriques avec soin pour sublimer chaque femme marocaine.
    </p>
    <div style="background-color:#FAF7F2;border:2px dashed #C9A84C;border-radius:8px;padding:20px;margin:20px 0;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;">Votre cadeau de bienvenue</p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#C9A84C;font-weight:bold;margin:0;">WELCOME15</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1A1A1A;margin:6px 0 0;">-15% sur votre prochaine commande</p>
    </div>
    ${ctaButton("Decouvrir la Collection", "{{SITE_URL}}/boutique")}
    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;margin:16px 0 0;">
      Une question ? Ecrivez-nous sur <a href="https://wa.me/212600000000" style="color:#C9A84C;text-decoration:none;font-weight:600;">WhatsApp</a>
    </p>
  </td>
</tr>`),
  },

  // 2. Order Confirmation
  {
    id: "order-confirmation",
    name: "Confirmation de commande",
    subject: "Commande {{ORDER_NUMBER}} confirmee \u2728",
    description:
      "Confirmation envoyee apres validation d'une commande. Recapitulatif commande, estimation livraison, lien suivi WhatsApp.",
    trigger: "Apres validation commande",
    category: "transactional",
    previewText: "Votre commande DAHAB est confirmee ! Voici le recapitulatif.",
    htmlContent: wrapEmail(`<tr>
  <td style="padding:40px 32px;">
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1A1A1A;margin:0 0 6px;text-align:center;">Commande Confirmee !</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#888;text-align:center;margin:0 0 24px;">Commande n&deg; <strong style="color:#1A1A1A;">{{ORDER_NUMBER}}</strong></p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF7F2;border-radius:8px;padding:20px;">
      <tr><td style="padding:16px 20px;">
        <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">Recapitulatif</p>
        {{PRODUCTS}}
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:12px 0;"/>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1A1A1A;font-weight:600;">Total</td>
            <td style="font-family:'Inter',Arial,sans-serif;font-size:16px;color:#C9A84C;font-weight:bold;text-align:right;">{{TOTAL}} MAD</td>
          </tr>
        </table>
      </td></tr>
    </table>
    <div style="text-align:center;margin:24px 0;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#555;">Livraison estimee : <strong style="color:#1A1A1A;">{{DELIVERY_ESTIMATE}}</strong></p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;margin-top:4px;">Paiement a la livraison (COD)</p>
    </div>
    ${ctaButton("Suivre sur WhatsApp", "https://wa.me/212600000000")}
    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#888;text-align:center;">
      Votre bijou est prepare avec soin. Merci de votre confiance !
    </p>
  </td>
</tr>`),
  },

  // 3. Shipping Notification
  {
    id: "shipping-notification",
    name: "Votre colis est en route",
    subject: "Votre colis DAHAB est en route ! \ud83d\ude9a",
    description:
      "Notification d'expedition. Estimation de livraison, informations de suivi, zones de livraison.",
    trigger: "Statut change en EXPEDIEE",
    category: "transactional",
    previewText:
      "Bonne nouvelle ! Votre colis DAHAB est en chemin vers vous.",
    htmlContent: wrapEmail(`<tr>
  <td style="padding:40px 32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:12px;">\ud83d\udce6</div>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1A1A1A;margin:0 0 8px;">Votre colis est en route !</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;line-height:1.6;margin:0 0 24px;">
      Votre commande <strong>{{ORDER_NUMBER}}</strong> a ete expediee et est en chemin vers vous.
    </p>
    <div style="background-color:#FAF7F2;border-radius:8px;padding:20px;margin:0 0 24px;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Livraison estimee</p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#C9A84C;font-weight:bold;margin:0;">{{DELIVERY_ESTIMATE}}</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#555;margin:8px 0 0;">Zone A (Casablanca, Rabat) : 24h &bull; Zone B : 24-48h &bull; Zone C : 48-72h</p>
    </div>
    ${ctaButton("Contacter le Support", "https://wa.me/212600000000")}
  </td>
</tr>`),
  },

  // 4. Abandoned Cart
  {
    id: "abandoned-cart",
    name: "Votre panier vous attend",
    subject: "Vous avez oublie quelque chose... \u2728",
    description:
      "Rappel de panier abandonne avec image produit, message d'urgence stock limite, et code promo de recuperation.",
    trigger: "24h apres abandon panier",
    category: "retention",
    previewText:
      "Votre bijou DAHAB vous attend encore... et il est en stock limite.",
    htmlContent: wrapEmail(`<tr>
  <td style="padding:40px 32px;text-align:center;">
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1A1A1A;margin:0 0 8px;">Vous avez oublie quelque chose...</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;line-height:1.6;margin:0 0 24px;">
      Le <strong style="color:#1A1A1A;">{{PRODUCT_NAME}}</strong> est toujours dans votre panier.
    </p>
    <div style="margin:0 0 24px;">
      <img src="{{PRODUCT_IMAGE}}" alt="{{PRODUCT_NAME}}" width="260" style="max-width:260px;width:100%;border-radius:8px;display:block;margin:0 auto;"/>
    </div>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#c0392b;font-weight:600;margin:0 0 20px;">
      \u26a0\ufe0f Stock limite &mdash; Ne laissez pas passer ce bijou
    </p>
    <div style="background-color:#FAF7F2;border:2px dashed #C9A84C;border-radius:8px;padding:16px;margin:0 0 24px;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Offre speciale retour</p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#C9A84C;font-weight:bold;margin:0;">RETOUR10</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#1A1A1A;margin:4px 0 0;">-10% pour finaliser votre commande</p>
    </div>
    ${ctaButton("Finaliser ma Commande", "{{CART_URL}}")}
  </td>
</tr>`),
  },

  // 5. Review Request
  {
    id: "review-request",
    name: "Donnez votre avis",
    subject: "Comment trouvez-vous votre bijou DAHAB ? \u2b50",
    description:
      "Demande d'avis envoyee 3 jours apres livraison. Inclut un code promo incitatif pour le prochain achat.",
    trigger: "3 jours apres livraison",
    category: "retention",
    previewText:
      "Votre avis compte ! Partagez votre experience et recevez -5%.",
    htmlContent: wrapEmail(`<tr>
  <td style="padding:40px 32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:12px;">\u2b50</div>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1A1A1A;margin:0 0 8px;">Comment trouvez-vous votre bijou ?</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;line-height:1.6;margin:0 0 24px;">
      Merci pour votre achat ! Votre avis nous aide a continuer a creer de beaux bijoux pour vous.
    </p>
    <div style="background-color:#FAF7F2;border-radius:8px;padding:20px;margin:0 0 24px;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#555;margin:0 0 8px;">En remerciement, recevez un code promo :</p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#C9A84C;font-weight:bold;margin:0;">AVIS5</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#1A1A1A;margin:4px 0 0;">-5% sur votre prochaine commande</p>
    </div>
    ${ctaButton("Laisser un Avis", "{{REVIEW_URL}}")}
  </td>
</tr>`),
  },

  // 6. Promotional
  {
    id: "promotional",
    name: "Offre speciale",
    subject: "{{PROMO_TITLE}} | Offre Exclusive DAHAB \u2728",
    description:
      "Template promotionnel generique pour les offres, nouvelles collections, et evenements (Ramadan, Eid, etc.).",
    trigger: "Manuel — promotions, nouvelles collections, Ramadan/Eid",
    category: "marketing",
    previewText:
      "Une offre exclusive vous attend chez DAHAB...",
    htmlContent: wrapEmail(`<tr>
  <td style="padding:0;">
    <div style="background-color:#1A1A1A;padding:40px 32px;text-align:center;">
      <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#C9A84C;margin:0 0 8px;">{{PROMO_TITLE}}</h1>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#ccc;line-height:1.6;margin:0;">
        {{PROMO_DESCRIPTION}}
      </p>
    </div>
  </td>
</tr>
<tr>
  <td style="padding:32px;">
    <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;text-align:center;margin:0 0 16px;text-transform:uppercase;letter-spacing:1px;">Produits en vedette</p>
    {{FEATURED_PRODUCTS}}
    <div style="background-color:#FAF7F2;border:2px dashed #C9A84C;border-radius:8px;padding:16px;margin:24px 0;text-align:center;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Code promo</p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#C9A84C;font-weight:bold;margin:0;">{{PROMO_CODE}}</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#555;margin:4px 0 0;">Valide jusqu'au {{EXPIRY_DATE}}</p>
    </div>
    ${ctaButton("Profiter de l'Offre", "{{PROMO_URL}}")}
  </td>
</tr>`),
  },

  // 7. Re-engagement
  {
    id: "reengagement",
    name: "Vous nous manquez",
    subject: "Cela fait longtemps... Un cadeau pour vous \ud83c\udf81",
    description:
      "Email de reactivation envoye 60 jours apres la derniere commande. Code promo exclusif pour encourager le retour.",
    trigger: "60 jours sans commande",
    category: "retention",
    previewText:
      "Vous nous manquez ! Decouvrez nos nouveautes avec -20% en cadeau.",
    htmlContent: wrapEmail(`<tr>
  <td style="padding:40px 32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:12px;">\ud83c\udf81</div>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#1A1A1A;margin:0 0 8px;">Vous nous manquez...</h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#555;line-height:1.6;margin:0 0 8px;">
      Cela fait un moment que nous ne vous avons pas vue. Nous avons pense a vous et nous vous avons prepare un cadeau special.
    </p>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#555;margin:0 0 24px;">
      Decouvrez nos nouvelles pieces et laissez-vous surprendre.
    </p>
    <div style="background-color:#FAF7F2;border:2px dashed #C9A84C;border-radius:8px;padding:20px;margin:0 0 24px;">
      <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;">Cadeau exclusif de retour</p>
      <p style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#C9A84C;font-weight:bold;margin:0;">RETOUR20</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1A1A1A;margin:6px 0 0;">-20% sur votre prochaine commande</p>
    </div>
    ${ctaButton("Redecouvrir DAHAB", "{{SITE_URL}}/boutique")}
  </td>
</tr>`),
  },
];
