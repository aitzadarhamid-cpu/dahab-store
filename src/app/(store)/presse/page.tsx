import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  FileCode,
  FileImage,
  Mail,
  MessageCircle,
  Instagram,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// ---------------------------------------------------------------------------
// ISR — revalidate every hour
// ---------------------------------------------------------------------------

export const revalidate = 3600;

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Press Kit DAHAB | Kit Presse Bijouterie Maroc",
  description:
    "Telechargez le kit presse DAHAB : logo, visuels, histoire de marque et chiffres cles. Bijouterie en ligne au Maroc.",
  keywords: [
    "press kit dahab",
    "kit presse bijoux maroc",
    "dahab bijoux presse",
    "dahab media kit",
    "bijouterie maroc presse",
  ],
  alternates: {
    canonical: `${siteUrl}/presse`,
  },
  openGraph: {
    title: "Press Kit DAHAB | Kit Presse Bijouterie Maroc",
    description:
      "Telechargez le kit presse DAHAB : logo, visuels, histoire de marque et chiffres cles. Bijouterie en ligne au Maroc.",
    url: `${siteUrl}/presse`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getPressData() {
  const activeProducts = await prisma.product.count({
    where: { active: true },
  });

  return { activeProducts };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PressKitPage() {
  const { activeProducts } = await getPressData();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DAHAB Bijoux",
    alternateName: "DAHAB",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description:
      "Bijouterie en ligne au Maroc. Bijoux elegants et accessibles pour la femme marocaine. De 99 a 299 MAD avec livraison dans tout le Royaume.",
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
    sameAs: ["https://instagram.com/dahab.bijoux"],
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
        name: "Press Kit",
        item: `${siteUrl}/presse`,
      },
    ],
  };

  const kpiCards = [
    {
      label: "Produits",
      value: `${activeProducts}+`,
    },
    {
      label: "Gamme de prix",
      value: "99 - 299 MAD",
    },
    {
      label: "Livraison",
      value: "Tout le Maroc",
    },
    {
      label: "Paiement",
      value: "A la livraison (COD)",
    },
  ];

  const colors = [
    { name: "Or DAHAB", hex: "#C9A84C" },
    { name: "Noir DAHAB", hex: "#1A1A1A" },
    { name: "Creme", hex: "#FAF7F2" },
  ];

  const downloadableAssets = [
    {
      name: "Logo DAHAB",
      path: "/logo.svg",
      format: "SVG",
      icon: FileCode,
    },
    {
      name: "Image Open Graph",
      path: "/og-image.jpg",
      format: "JPG",
      icon: FileImage,
    },
  ];

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
        {/* ================================================================= */}
        {/* HERO                                                              */}
        {/* ================================================================= */}
        <header className="text-center mb-16">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-3">
            Media &amp; Presse
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-black">
            Kit Presse DAHAB
          </h1>
          <div className="h-1 w-20 bg-brand-gold mx-auto my-6 rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Retrouvez toutes les informations sur la marque DAHAB : notre
            histoire, nos chiffres cles, notre identite visuelle et nos
            ressources telechargeables.
          </p>
        </header>

        {/* ================================================================= */}
        {/* BRAND STORY                                                       */}
        {/* ================================================================= */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-6 text-center">
              Notre Histoire
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-brand-black">DAHAB</strong> (دهب)
                signifie &laquo;&nbsp;or&nbsp;&raquo; en arabe. Fondee en 2024 a
                Casablanca, la marque est nee d&apos;une conviction simple :
                chaque femme merite de porter des bijoux elegants sans se ruiner.
              </p>
              <p>
                Notre mission est de rendre les bijoux elegants accessibles a
                toutes les femmes au Maroc. Avec une gamme de prix de 99 a 299
                MAD, nous proposons des bagues, colliers, bracelets et boucles
                d&apos;oreilles selectionnes avec soin pour leur qualite et leur
                style.
              </p>
              <p>
                DAHAB livre dans tout le Royaume avec paiement a la livraison
                (COD), eliminant toute barriere a l&apos;achat en ligne. Notre
                service client reactif via WhatsApp en francais et en arabe
                accompagne chaque cliente dans son experience.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CHIFFRES CLES                                                     */}
        {/* ================================================================= */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-8 text-center">
            Chiffres Cles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-xl shadow-sm p-5 text-center"
              >
                <p className="font-display text-3xl font-bold text-brand-gold mb-1">
                  {card.value}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* IDENTITE VISUELLE                                                 */}
        {/* ================================================================= */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-8 text-center">
            Identite Visuelle
          </h2>

          {/* Color palette */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 max-w-3xl mx-auto">
            <h3 className="font-display text-lg font-bold text-brand-black mb-4">
              Palette de couleurs
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {colors.map((color) => (
                <div key={color.hex} className="text-center">
                  <div
                    className="aspect-square rounded-xl shadow-sm border border-gray-100 mb-3"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-sm font-medium text-brand-black">
                    {color.name}
                  </p>
                  <code className="text-xs font-mono text-gray-400">
                    {color.hex}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 max-w-3xl mx-auto">
            <h3 className="font-display text-lg font-bold text-brand-black mb-4">
              Typographie
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="font-display text-2xl font-bold text-brand-black mb-1">
                  Playfair Display
                </p>
                <p className="text-xs text-gray-400">
                  Titres et elements de marque
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="font-body text-2xl font-medium text-brand-black mb-1">
                  Inter
                </p>
                <p className="text-xs text-gray-400">
                  Corps de texte et interface
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-sm text-gray-400">
            Pour les assets haute resolution, contactez-nous a{" "}
            <a
              href="mailto:presse@dahab.ma"
              className="text-brand-gold hover:underline"
            >
              presse@dahab.ma
            </a>
          </p>
        </section>

        {/* ================================================================= */}
        {/* ASSETS TELECHARGEABLES                                            */}
        {/* ================================================================= */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-8 text-center">
            Assets Telechargeables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {downloadableAssets.map((asset) => (
              <a
                key={asset.path}
                href={asset.path}
                download
                className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md hover:border-brand-gold/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <asset.icon size={22} className="text-brand-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-black text-sm">
                    {asset.name}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {asset.format}
                  </p>
                </div>
                <Download
                  size={18}
                  className="text-gray-300 group-hover:text-brand-gold transition-colors flex-shrink-0"
                />
              </a>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* CONTACT PRESSE                                                    */}
        {/* ================================================================= */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-8 text-center">
            Contact Presse
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <a
                    href="mailto:presse@dahab.ma"
                    className="text-sm font-medium text-brand-black hover:text-brand-gold transition-colors"
                  >
                    presse@dahab.ma
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">WhatsApp</p>
                  <a
                    href="https://wa.me/212600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-black hover:text-green-600 transition-colors"
                  >
                    +212 6 00 00 00 00
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <Instagram size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Instagram</p>
                  <a
                    href="https://instagram.com/dahab.bijoux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-black hover:text-pink-500 transition-colors"
                  >
                    @dahab.bijoux
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CTA                                                               */}
        {/* ================================================================= */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 max-w-2xl mx-auto">
            <ShoppingBag
              size={32}
              className="text-brand-gold mx-auto mb-4"
            />
            <h2 className="font-display text-2xl font-bold text-brand-black mb-3">
              Decouvrir Nos Bijoux
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Explorez notre collection de bijoux elegants et accessibles,
              livres partout au Maroc.
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 bg-brand-gold text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-gold-dark transition-colors shadow-md"
            >
              Visiter la Boutique
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
