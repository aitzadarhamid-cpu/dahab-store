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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "DAHAB - Bijoux Elegants pour la Femme Marocaine",
    template: "%s | DAHAB Bijoux",
  },
  description:
    "Decouvrez DAHAB, votre bijouterie en ligne au Maroc. Bagues, colliers, bracelets et boucles d'oreilles elegants de 99 a 299 MAD. Livraison partout au Maroc. Paiement a la livraison.",
  keywords: [
    "bijoux maroc",
    "bijoux en ligne maroc",
    "bagues femme maroc",
    "colliers or maroc",
    "bijoux casablanca",
    "livraison maroc",
    "paiement livraison",
  ],
  openGraph: {
    title: "DAHAB - Bijoux Elegants pour la Femme Marocaine",
    description:
      "Bijoux elegants et accessibles. Livraison partout au Maroc. Paiement a la livraison.",
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-brand-cream text-brand-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
