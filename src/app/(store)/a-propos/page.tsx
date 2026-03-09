import type { Metadata } from "next";
import Link from "next/link";
import { Gem, Truck, Shield, Heart, Star, MapPin } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "A Propos de DAHAB | Bijouterie en Ligne au Maroc",
  description:
    "D\u00e9couvrez DAHAB, votre bijouterie en ligne de confiance au Maroc. Notre histoire, nos valeurs et notre engagement pour des bijoux \u00e9l\u00e9gants et accessibles. Livraison partout au Maroc.",
  keywords: [
    "dahab bijoux",
    "bijouterie en ligne maroc",
    "a propos dahab",
    "bijoux maroc",
    "bijouterie maroc",
    "qui sommes nous dahab",
  ],
  alternates: {
    canonical: `${siteUrl}/a-propos`,
  },
  openGraph: {
    title: "A Propos de DAHAB | Bijouterie en Ligne au Maroc",
    description:
      "D\u00e9couvrez DAHAB, votre bijouterie en ligne de confiance au Maroc. Bijoux \u00e9l\u00e9gants et accessibles pour la femme marocaine.",
    url: `${siteUrl}/a-propos`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

export default function AProposPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DAHAB Bijoux",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Bijouterie en ligne au Maroc. Bijoux \u00e9l\u00e9gants et accessibles pour la femme marocaine. Bagues, colliers, bracelets et boucles d'oreilles de 99 \u00e0 299 MAD.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
      addressCountry: "MA",
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French", "Arabic"],
      areaServed: "MA",
    },
    sameAs: [],
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
        name: "A Propos",
        item: `${siteUrl}/a-propos`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="container-page py-8 md:py-12">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-black mb-6">
            A Propos de DAHAB
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Votre bijouterie en ligne de confiance au Maroc. Des bijoux
            &eacute;l&eacute;gants, accessibles et livr&eacute;s partout dans le Royaume.
          </p>
        </header>

        {/* Notre Histoire */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-6 text-center">
              Notre Histoire
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                DAHAB est n&eacute;e d&apos;une passion pour la beaut&eacute; et
                l&apos;&eacute;l&eacute;gance de la femme marocaine. Le mot
                &laquo;&nbsp;DAHAB&nbsp;&raquo; signifie &laquo;&nbsp;or&nbsp;&raquo;
                en arabe, symbolisant la pr&eacute;ciosit&eacute; et le raffinement que
                nous mettons dans chaque pi&egrave;ce de notre collection.
              </p>
              <p>
                Notre mission est simple : rendre les bijoux &eacute;l&eacute;gants
                accessibles &agrave; toutes les femmes au Maroc. Que vous soyez &agrave;
                Casablanca, Rabat, Marrakech, Tanger, F&egrave;s, Agadir ou dans
                toute autre ville du Royaume, DAHAB vous livre vos bijoux
                pr&eacute;f&eacute;r&eacute;s directement chez vous.
              </p>
              <p>
                Chaque bague, collier, bracelet et paire de boucles
                d&apos;oreilles est s&eacute;lectionn&eacute;e avec soin pour garantir
                une qualit&eacute; exceptionnelle &agrave; un prix juste, de 99 &agrave; 299
                MAD.
              </p>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-10 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-3">
                Qualit&eacute; Garantie
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chaque bijou DAHAB est s&eacute;lectionn&eacute; avec soin. Nous
                travaillons avec des mat&eacute;riaux de qualit&eacute; : or plaqu&eacute;,
                argent 925, or rose et acier inoxydable pour des pi&egrave;ces
                durables et &eacute;l&eacute;gantes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-3">
                Livraison Partout au Maroc
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nous livrons dans toutes les villes du Maroc. Livraison gratuite
                &agrave; partir de 299 MAD. Votre commande arrive chez vous en 2 &agrave; 5
                jours ouvrables, soigneusement emball&eacute;e.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-3">
                Paiement &agrave; la Livraison
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Achetez en toute confiance avec le paiement &agrave; la livraison
                (COD). Vous ne payez qu&apos;une fois votre colis entre vos
                mains. Z&eacute;ro risque, 100% satisfaction.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-3">
                Prix Accessibles
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Des bijoux &eacute;l&eacute;gants de 99 &agrave; 299 MAD. Notre engagement :
                proposer des pi&egrave;ces de qualit&eacute; &agrave; des prix justes, pour
                que chaque femme marocaine puisse se faire plaisir.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-3">
                Service Client R&eacute;actif
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Notre &eacute;quipe est &agrave; votre &eacute;coute pour r&eacute;pondre &agrave;
                toutes vos questions. Contactez-nous via WhatsApp pour un
                service rapide et personnalis&eacute; en fran&ccedil;ais et en arabe.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-3">
                100% Marocain
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                DAHAB est une marque marocaine, cr&eacute;&eacute;e au Maroc et pour le
                Maroc. Nous comprenons les go&ucirc;ts et les attentes de la femme
                marocaine en mati&egrave;re de bijoux et d&apos;accessoires.
              </p>
            </div>
          </div>
        </section>

        {/* Nos Collections */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-6 text-center">
            Nos Collections de Bijoux
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            D&eacute;couvrez nos quatre collections de bijoux, soigneusement
            s&eacute;lectionn&eacute;es pour r&eacute;pondre &agrave; tous vos besoins et toutes les
            occasions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Bagues",
                href: "/boutique/bagues",
                desc: "Bagues en or, argent et fantaisie",
              },
              {
                name: "Colliers",
                href: "/boutique/colliers",
                desc: "Colliers et pendentifs \u00e9l\u00e9gants",
              },
              {
                name: "Bracelets",
                href: "/boutique/bracelets",
                desc: "Bracelets et joncs raffin\u00e9s",
              },
              {
                name: "Boucles d'oreilles",
                href: "/boutique/boucles-oreilles",
                desc: "Cr\u00e9oles, puces et pendantes",
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="bg-white rounded-xl p-6 shadow-sm text-center group hover:shadow-md transition-shadow"
              >
                <h3 className="font-display text-lg font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pourquoi DAHAB */}
        <section className="mb-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-6 text-center">
            Pourquoi Choisir DAHAB ?
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-600 leading-relaxed">
            <p>
              Au Maroc, acheter des bijoux en ligne peut sembler intimidant.
              Chez DAHAB, nous avons cr&eacute;&eacute; une exp&eacute;rience d&apos;achat
              simple, s&eacute;curis&eacute;e et agr&eacute;able. Voici pourquoi des
              milliers de femmes marocaines nous font confiance :
            </p>
            <ul className="space-y-3 pl-4">
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-0.5">&#x2022;</span>
                <span>
                  <strong>Bijoux de qualit&eacute; &agrave; prix accessible</strong> : des
                  mat&eacute;riaux durables (or plaqu&eacute;, argent 925) de 99 &agrave; 299
                  MAD
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-0.5">&#x2022;</span>
                <span>
                  <strong>Livraison dans tout le Maroc</strong> : Casablanca,
                  Rabat, Marrakech, Tanger, F&egrave;s, Agadir et plus encore
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-0.5">&#x2022;</span>
                <span>
                  <strong>Paiement &agrave; la livraison</strong> : payez uniquement
                  lorsque vous recevez votre colis
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-0.5">&#x2022;</span>
                <span>
                  <strong>Livraison gratuite</strong> d&egrave;s 299 MAD d&apos;achat
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-0.5">&#x2022;</span>
                <span>
                  <strong>Service client r&eacute;actif</strong> via WhatsApp en
                  fran&ccedil;ais et en arabe
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-4">
            Pr&ecirc;te &agrave; D&eacute;couvrir Nos Bijoux ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Parcourez notre collection et trouvez le bijou parfait. Livraison
            partout au Maroc avec paiement &agrave; la livraison.
          </p>
          <Link
            href="/boutique"
            className="inline-block bg-brand-gold text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-gold-dark transition-colors shadow-md"
          >
            D&eacute;couvrir la Boutique
          </Link>
        </section>
      </div>
    </>
  );
}
