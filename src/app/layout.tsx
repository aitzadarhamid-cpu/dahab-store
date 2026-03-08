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
    default: "DAHAB - Bijoux Elegants pour la Femme Marocaine | Bijouterie en Ligne Maroc",
    template: "%s | DAHAB Bijoux Maroc",
  },
  description:
    "Decouvrez DAHAB, votre bijouterie en ligne au Maroc. Bagues, colliers, bracelets et boucles d'oreilles elegants de 99 a 299 MAD. Livraison partout au Maroc. Paiement a la livraison.",
  keywords: [
    "bijoux maroc",
    "bijoux en ligne maroc",
    "bijouterie en ligne maroc",
    "bagues femme maroc",
    "colliers or maroc",
    "bracelets femme maroc",
    "boucles d'oreilles maroc",
    "bijoux casablanca",
    "bijoux rabat",
    "bijoux marrakech",
    "livraison maroc",
    "paiement livraison",
    "bijoux pas cher maroc",
    "accessoires femme maroc",
    "bijoux fantaisie maroc",
    "cadeau femme maroc",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "fr-MA": siteUrl,
    },
  },
  openGraph: {
    title: "DAHAB - Bijoux Elegants pour la Femme Marocaine",
    description:
      "Bijoux elegants et accessibles de 99 a 299 MAD. Livraison partout au Maroc. Paiement a la livraison.",
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "DAHAB - Bijoux Elegants pour la Femme Marocaine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAHAB - Bijoux Elegants pour la Femme Marocaine",
    description:
      "Bijoux elegants et accessibles de 99 a 299 MAD. Livraison partout au Maroc.",
    images: [`${siteUrl}/og-image.jpg`],
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
  other: {
    "geo.region": "MA",
    "geo.placename": "Casablanca",
    "geo.position": "33.5731;-7.5898",
    ICBM: "33.5731, -7.5898",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DAHAB Bijoux",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Bijouterie en ligne au Maroc. Bijoux elegants et accessibles pour la femme marocaine.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["French", "Arabic"],
  },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DAHAB Bijoux",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/boutique?q={search_term_string}`,
    "query-input": "required name=search_term_string",
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
      </head>
      <body className="font-body antialiased bg-brand-cream text-brand-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
