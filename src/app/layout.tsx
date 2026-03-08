import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "DAHAB | Bijoux en Ligne au Maroc - Bagues, Colliers, Bracelets & Boucles d'Oreilles",
    template: "DAHAB | %s - Bijoux en Ligne au Maroc",
  },
  description:
    "DAHAB, la bijouterie en ligne n\u00b01 au Maroc. D\u00e9couvrez notre collection de bagues, colliers, bracelets et boucles d'oreilles \u00e9l\u00e9gants de 99 \u00e0 299 MAD. Livraison partout au Maroc. Paiement \u00e0 la livraison. Qualit\u00e9 garantie.",
  keywords: [
    "bijoux maroc",
    "bijoux en ligne maroc",
    "bijouterie en ligne maroc",
    "bague or maroc",
    "bagues femme maroc",
    "collier or maroc",
    "colliers femme maroc",
    "bracelets femme maroc",
    "bracelet or maroc",
    "boucles d'oreilles maroc",
    "bijoux casablanca",
    "bijoux rabat",
    "bijoux marrakech",
    "bijoux tanger",
    "bijoux fes",
    "bijoux agadir",
    "livraison maroc",
    "paiement livraison maroc",
    "bijoux pas cher maroc",
    "accessoires femme maroc",
    "bijoux fantaisie maroc",
    "cadeau femme maroc",
    "bijoux or plaque maroc",
    "bijoux argent maroc",
    "achat bijoux en ligne maroc",
    "bijouterie maroc",
    "dahab bijoux",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "fr-MA": siteUrl,
    },
  },
  openGraph: {
    title: "DAHAB | Bijoux en Ligne au Maroc - Bagues, Colliers, Bracelets",
    description:
      "Bijouterie en ligne au Maroc. Bijoux \u00e9l\u00e9gants et accessibles de 99 \u00e0 299 MAD. Livraison partout au Maroc. Paiement \u00e0 la livraison.",
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "DAHAB - Bijouterie en Ligne au Maroc | Bagues, Colliers, Bracelets & Boucles d'Oreilles",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAHAB | Bijoux en Ligne au Maroc",
    description:
      "Bijouterie en ligne au Maroc. Bijoux \u00e9l\u00e9gants de 99 \u00e0 299 MAD. Livraison partout au Maroc. Paiement \u00e0 la livraison.",
    images: [`${siteUrl}/og-image.jpg`],
    site: "@dahab_bijoux",
    creator: "@dahab_bijoux",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "ecommerce",
  other: {
    "geo.region": "MA",
    "geo.placename": "Casablanca, Maroc",
    "geo.position": "33.5731;-7.5898",
    ICBM: "33.5731, -7.5898",
    "content-language": "fr-MA",
    "dc.language": "fr-MA",
    "dc.coverage": "Maroc",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DAHAB Bijoux",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Bijouterie en ligne au Maroc. Bijoux \u00e9l\u00e9gants et accessibles pour la femme marocaine. Bagues, colliers, bracelets et boucles d'oreilles de 99 \u00e0 299 MAD.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressRegion: "Casablanca-Settat",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["French", "Arabic"],
    areaServed: "MA",
  },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DAHAB Bijoux",
  url: siteUrl,
  description:
    "Bijouterie en ligne au Maroc. Bagues, colliers, bracelets et boucles d'oreilles \u00e9l\u00e9gants.",
  inLanguage: "fr-MA",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/boutique?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "DAHAB Bijoux",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  description:
    "Bijouterie en ligne au Maroc. Bijoux \u00e9l\u00e9gants pour la femme marocaine.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressRegion: "Casablanca-Settat",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.5731",
    longitude: "-7.5898",
  },
  priceRange: "99 MAD - 299 MAD",
  currenciesAccepted: "MAD",
  paymentAccepted: "Cash on Delivery",
  areaServed: {
    "@type": "Country",
    name: "Morocco",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="alternate" hrefLang="fr-MA" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="font-body antialiased bg-brand-cream text-brand-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
