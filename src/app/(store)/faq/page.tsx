import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const faqs = [
  {
    question: "Comment passer une commande sur DAHAB ?",
    answer:
      "Parcourez notre boutique, ajoutez vos bijoux preferes au panier, puis cliquez sur 'Commander'. Remplissez vos coordonnees (nom, telephone, ville et adresse) et validez. Vous pouvez aussi commander directement via WhatsApp.",
  },
  {
    question: "Quels sont les modes de paiement disponibles ?",
    answer:
      "Nous proposons le paiement a la livraison (COD). Vous payez uniquement lorsque vous recevez votre colis. Zero risque, 100% satisfaction.",
  },
  {
    question: "Combien coute la livraison ?",
    answer:
      "La livraison est gratuite pour toute commande de 299 MAD ou plus. En dessous de ce montant, les frais de livraison sont de 29 MAD.",
  },
  {
    question: "Dans quelles villes livrez-vous ?",
    answer:
      "Nous livrons dans toutes les villes du Maroc : Casablanca, Rabat, Marrakech, Tanger, Fes, Agadir, Meknes, Oujda, Kenitra, Tetouan et plus de 65 autres villes.",
  },
  {
    question: "Quel est le delai de livraison ?",
    answer:
      "Le delai de livraison est de 2 a 5 jours ouvrables selon votre ville. Les commandes sont preparees sous 24 a 48 heures.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Rendez-vous sur la page 'Mes commandes' et entrez votre numero de telephone pour retrouver toutes vos commandes et leur statut en temps reel.",
  },
  {
    question: "Les bijoux DAHAB sont-ils de bonne qualite ?",
    answer:
      "Oui, chaque bijou est soigneusement selectionne. Nous travaillons avec des materiaux de qualite : or plaque, argent 925, or rose et acier inoxydable pour des pieces durables et elegantes.",
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer:
      "Si vous n'etes pas satisfaite de votre achat, contactez-nous dans les 7 jours suivant la reception via WhatsApp. Nous etudierons votre demande de retour ou d'echange.",
  },
  {
    question: "Comment entretenir mes bijoux ?",
    answer:
      "Evitez le contact avec l'eau, les parfums et les produits chimiques. Rangez vos bijoux dans un endroit sec, de preference dans une pochette. Nettoyez-les delicatement avec un chiffon doux.",
  },
  {
    question: "Comment choisir la bonne taille de bague ?",
    answer:
      "Mesurez le tour de votre doigt avec un fil ou un ruban, puis comparez avec notre guide des tailles disponible sur chaque fiche produit. En cas de doute, contactez-nous via WhatsApp.",
  },
  {
    question: "Proposez-vous des codes promo ?",
    answer:
      "Oui ! Inscrivez-vous a notre newsletter pour recevoir un code promo de -15% sur votre premiere commande. Nous proposons aussi regulierement des offres flash et des promotions speciales.",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "Contactez-nous via WhatsApp pour un service rapide et personnalise en francais et en arabe. Notre equipe est disponible pour repondre a toutes vos questions.",
  },
];

export const metadata: Metadata = {
  title: "FAQ | Questions Frequentes | DAHAB Bijoux Maroc",
  description:
    "Trouvez les reponses a vos questions sur DAHAB : livraison, paiement, retours, tailles, entretien des bijoux. Service client disponible via WhatsApp.",
  keywords: [
    "faq dahab",
    "questions frequentes bijoux maroc",
    "livraison bijoux maroc",
    "paiement a la livraison bijoux",
    "retour bijoux",
    "guide taille bague maroc",
  ],
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: "FAQ | DAHAB Bijoux Maroc",
    description:
      "Reponses a toutes vos questions sur la commande, livraison, paiement et retours chez DAHAB.",
    url: `${siteUrl}/faq`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: `${siteUrl}/faq`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container-page py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Questions Fr&eacute;quentes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les r&eacute;ponses &agrave; vos questions sur
            nos bijoux, la livraison, le paiement et plus encore.
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <h2 className="font-display text-base md:text-lg font-semibold text-brand-black pr-4">
                  {faq.question}
                </h2>
                <span className="text-brand-gold text-xl font-bold flex-shrink-0 group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12 bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            Vous avez d&apos;autres questions ?
          </h2>
          <p className="text-gray-600 mb-6">
            Notre &eacute;quipe est disponible via WhatsApp pour vous aider en
            fran&ccedil;ais et en arabe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/boutique"
              className="inline-block bg-brand-gold text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-gold-dark transition-colors"
            >
              D&eacute;couvrir la Boutique
            </Link>
            <Link
              href="/mes-commandes"
              className="inline-block border border-brand-gold text-brand-gold px-6 py-3 rounded-lg font-medium hover:bg-brand-gold/5 transition-colors"
            >
              Suivre ma commande
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
