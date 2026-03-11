"use client";

import { useState } from "react";
import { EMAIL_TEMPLATES } from "@/lib/brand-emails";
import { Mail, Copy, Eye, EyeOff, CheckCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  transactional: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Transactionnel",
  },
  marketing: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    label: "Marketing",
  },
  retention: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Retention",
  },
};

const USAGE_TIPS: Record<string, string[]> = {
  welcome: [
    "Envoyer immediatement apres inscription ou 1ere commande",
    "Le code WELCOME15 doit etre actif dans votre plateforme e-commerce",
    "Personnaliser le prenom si disponible dans vos donnees",
  ],
  "order-confirmation": [
    "Remplacer {{PRODUCTS}} par le tableau HTML des produits commandes",
    "Adapter {{DELIVERY_ESTIMATE}} selon la zone de livraison du client",
    "Le mode de paiement COD est mentionne par defaut",
  ],
  "shipping-notification": [
    "Declencher automatiquement au changement de statut commande",
    "Ajouter le lien de suivi transporteur si disponible",
    "Les zones A/B/C correspondent aux zones DAHAB existantes",
  ],
  "abandoned-cart": [
    "Envoyer 24h apres l'abandon, pas avant",
    "Le code RETOUR10 doit etre a usage unique",
    "Limiter a 1 relance par panier abandonne",
  ],
  "review-request": [
    "Attendre 3 jours apres confirmation livraison",
    "Le code AVIS5 est valable 30 jours",
    "Inclure le nom du produit achete pour personnaliser",
  ],
  promotional: [
    "Template generique — adapter titre et description a chaque campagne",
    "Utiliser pour Ramadan, Eid, Black Friday, nouvelles collections",
    "Respecter la frequence max de 2 emails promo par semaine",
  ],
  reengagement: [
    "Cibler les clients inactifs depuis 60+ jours",
    "Le code RETOUR20 est la remise maximale automatisee",
    "Ne pas envoyer plus d'une fois par trimestre au meme client",
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EmailTemplatesPage() {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function togglePreview(id: string) {
    setActivePreview((prev) => (prev === id ? null : id));
  }

  async function copyHtml(id: string, html: string) {
    try {
      await navigator.clipboard.writeText(html);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback: select from hidden textarea
      const ta = document.createElement("textarea");
      ta.value = html;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Mail size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-black">
              Email Templates
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              7 sequences emails pretes a l&apos;emploi aux couleurs DAHAB
            </p>
          </div>
        </div>
        <div
          className="h-1 w-24 rounded-full mt-4"
          style={{
            background:
              "linear-gradient(135deg, #B8963A 0%, #C9A84C 25%, #E8D48B 50%, #C9A84C 75%, #B8963A 100%)",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Summary badges                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-wrap gap-3 mb-8">
        {(["transactional", "marketing", "retention"] as const).map((cat) => {
          const style = CATEGORY_STYLES[cat];
          const count = EMAIL_TEMPLATES.filter(
            (t) => t.category === cat
          ).length;
          return (
            <span
              key={cat}
              className={`${style.bg} ${style.text} text-xs font-medium px-3 py-1.5 rounded-full`}
            >
              {style.label} ({count})
            </span>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Template cards                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-6">
        {EMAIL_TEMPLATES.map((tpl) => {
          const cat = CATEGORY_STYLES[tpl.category];
          const isOpen = activePreview === tpl.id;
          const isCopied = copiedId === tpl.id;
          const tips = USAGE_TIPS[tpl.id] ?? [];

          return (
            <div
              key={tpl.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Card top */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left: info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display font-bold text-lg text-brand-black truncate">
                        {tpl.name}
                      </h3>
                      <span
                        className={`${cat.bg} ${cat.text} text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0`}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-gray-800">Objet :</span>{" "}
                      {tpl.subject}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      {tpl.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      Declencheur : {tpl.trigger}
                    </div>
                  </div>

                  {/* Right: actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => togglePreview(tpl.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:border-brand-gold hover:text-brand-gold transition-colors"
                    >
                      {isOpen ? (
                        <>
                          <EyeOff size={15} /> Fermer
                        </>
                      ) : (
                        <>
                          <Eye size={15} /> Apercu
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyHtml(tpl.id, tpl.htmlContent)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors ${
                        isCopied
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-brand-gold hover:text-brand-gold"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle size={15} /> Copie !
                        </>
                      ) : (
                        <>
                          <Copy size={15} /> Copier HTML
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Usage tips */}
                {tips.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Conseils d&apos;utilisation
                    </p>
                    <ul className="space-y-1">
                      {tips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-xs text-gray-500 flex items-start gap-1.5"
                        >
                          <span className="text-brand-gold mt-0.5 flex-shrink-0">
                            &bull;
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Preview iframe */}
              {isOpen && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <p className="text-xs text-gray-400 mb-2 text-center">
                    Apercu du template &mdash; les variables (&#123;&#123;...&#125;&#125;) seront remplacees dynamiquement
                  </p>
                  <iframe
                    srcDoc={tpl.htmlContent}
                    title={`Apercu — ${tpl.name}`}
                    className="w-full h-[500px] border border-gray-200 rounded-lg bg-white"
                    sandbox="allow-same-origin"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="py-10 text-center">
        <div
          className="h-0.5 w-16 rounded-full mx-auto mb-4"
          style={{
            background:
              "linear-gradient(135deg, #B8963A 0%, #C9A84C 25%, #E8D48B 50%, #C9A84C 75%, #B8963A 100%)",
          }}
        />
        <p className="text-xs text-gray-400">
          DAHAB Email Templates &mdash; Copier le HTML et coller dans votre
          outil d&apos;emailing (Mailchimp, Brevo, etc.)
        </p>
      </div>
    </div>
  );
}
