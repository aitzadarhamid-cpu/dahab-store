export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ISR — revalidate every hour
// ---------------------------------------------------------------------------

export const revalidate = 3600;

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Lookbook DAHAB | Collections de Bijoux — Inspiration & Tendances",
  description:
    "Decouvrez les collections DAHAB : bijoux de soiree, du quotidien, idees cadeaux et pieces de fete. Inspiration pour la femme marocaine.",
  keywords: [
    "lookbook bijoux maroc",
    "collections bijoux dahab",
    "bijoux soiree maroc",
    "idees cadeaux bijoux",
    "bijoux mariage maroc",
    "tendances bijoux femme",
    "inspiration bijoux",
  ],
  alternates: {
    canonical: `${siteUrl}/lookbook`,
  },
  openGraph: {
    title: "Lookbook DAHAB | Collections de Bijoux — Inspiration & Tendances",
    description:
      "Decouvrez les collections DAHAB : bijoux de soiree, du quotidien, idees cadeaux et pieces de fete.",
    url: `${siteUrl}/lookbook`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Collection config
// ---------------------------------------------------------------------------

interface CollectionDef {
  id: string;
  name: string;
  description: string;
  voirPlusHref: string;
  voirPlusLabel: string;
}

const COLLECTIONS: CollectionDef[] = [
  {
    id: "soiree",
    name: "Soiree",
    description:
      "Des pieces raffinees pour illuminer vos soirees. Colliers et boucles d\u2019oreilles qui captent la lumiere et subliment chaque moment.",
    voirPlusHref: "/boutique?category=COLLIER",
    voirPlusLabel: "Voir les colliers",
  },
  {
    id: "quotidien",
    name: "Quotidien",
    description:
      "L\u2019elegance de tous les jours. Bagues et bracelets discrets mais precieux, pour accompagner votre style au fil des heures.",
    voirPlusHref: "/boutique?category=BAGUE",
    voirPlusLabel: "Voir les bagues",
  },
  {
    id: "cadeau",
    name: "Cadeau",
    description:
      "Offrir un bijou DAHAB, c\u2019est offrir un souvenir dore. Decouvrez nos pieces les plus appreciees, parfaites pour chaque occasion.",
    voirPlusHref: "/boutique",
    voirPlusLabel: "Voir la boutique",
  },
  {
    id: "mariage",
    name: "Mariage & Fete",
    description:
      "Celebrations, fiancailles, grandes occasions — nos pieces les plus precieuses pour des moments inoubliables.",
    voirPlusHref: "/boutique?sort=price-desc",
    voirPlusLabel: "Voir les pieces prestige",
  },
];

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getLookbookProducts() {
  const [soiree, quotidien, cadeau, mariage] = await Promise.all([
    prisma.product.findMany({
      where: {
        active: true,
        category: { in: ["COLLIER", "BOUCLES_OREILLES"] },
        featured: true,
      },
      take: 4,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, slug: true, price: true, images: true },
    }),
    prisma.product.findMany({
      where: {
        active: true,
        category: { in: ["BAGUE", "BRACELET"] },
        price: { lte: 199 },
      },
      take: 4,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, slug: true, price: true, images: true },
    }),
    prisma.product.findMany({
      where: {
        active: true,
        featured: true,
      },
      take: 4,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, slug: true, price: true, images: true },
    }),
    prisma.product.findMany({
      where: { active: true },
      take: 4,
      orderBy: { price: "desc" },
      select: { id: true, name: true, slug: true, price: true, images: true },
    }),
  ]);

  return { soiree, quotidien, cadeau, mariage };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseFirstImage(images: string): string {
  try {
    const parsed = JSON.parse(images) as string[];
    return parsed[0] || "/placeholder-product.svg";
  } catch {
    return "/placeholder-product.svg";
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function LookbookPage() {
  const products = await getLookbookProducts();

  const collectionProducts: Record<string, typeof products.soiree> = {
    soiree: products.soiree,
    quotidien: products.quotidien,
    cadeau: products.cadeau,
    mariage: products.mariage,
  };

  return (
    <div className="container-page py-8 md:py-12">
      {/* ================================================================= */}
      {/* Hero                                                               */}
      {/* ================================================================= */}
      <section className="text-center mb-20">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4">
          Lookbook DAHAB
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light max-w-xl mx-auto mb-6">
          Nos collections, votre inspiration
        </p>
        <div className="h-1 w-16 bg-brand-gold mx-auto rounded-full" />
      </section>

      {/* ================================================================= */}
      {/* Collection sections                                                */}
      {/* ================================================================= */}
      {COLLECTIONS.map((col, index) => {
        const items = collectionProducts[col.id];
        return (
          <section key={col.id} className="mb-20">
            {/* Visual separator between sections */}
            {index > 0 && (
              <div className="flex items-center justify-center gap-4 mb-16">
                <div className="h-px w-12 bg-brand-gold/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
                <div className="h-px w-12 bg-brand-gold/30" />
              </div>
            )}

            {/* Collection header */}
            <div className="mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
                {col.name}
              </h2>
              <div className="h-1 w-16 bg-brand-gold mb-6 rounded-full" />
              <p className="text-gray-500 max-w-2xl leading-relaxed">
                {col.description}
              </p>
            </div>

            {/* Product grid */}
            {items.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                {items.map((product) => {
                  const firstImage = parseFirstImage(product.images);
                  return (
                    <Link
                      key={product.id}
                      href={`/produit/${product.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-3">
                        <Image
                          src={firstImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                      <h3 className="font-medium text-sm text-brand-black group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-display font-bold text-brand-gold">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-brand-cream/50 rounded-xl p-12 text-center mb-8">
                <p className="text-gray-400 text-sm">
                  De nouvelles pieces arrivent bientot pour cette collection.
                </p>
              </div>
            )}

            {/* Voir plus link */}
            <Link
              href={col.voirPlusHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:text-brand-gold-dark transition-colors group"
            >
              {col.voirPlusLabel}
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                &rarr;
              </span>
            </Link>
          </section>
        );
      })}

      {/* ================================================================= */}
      {/* CTA section                                                        */}
      {/* ================================================================= */}
      <section className="text-center py-16 md:py-20">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-brand-gold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
          <div className="h-px w-12 bg-brand-gold/30" />
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Trouvez votre bijou parfait
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
          Parcourez toute notre collection et laissez-vous inspirer par
          l&apos;artisanat marocain.
        </p>
        <Link
          href="/boutique"
          className="btn-primary inline-block px-8 py-3 text-sm"
        >
          Decouvrir la boutique
        </Link>
      </section>
    </div>
  );
}
