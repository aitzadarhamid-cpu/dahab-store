export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { BoutiqueClient } from "./boutique-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Boutique Bijoux en Ligne | Bagues, Colliers, Bracelets au Maroc",
  description:
    "Parcourez notre collection compl\u00e8te de bijoux en ligne au Maroc : bagues, colliers, bracelets et boucles d'oreilles \u00e9l\u00e9gants de 99 \u00e0 299 MAD. Livraison partout au Maroc. Paiement \u00e0 la livraison.",
  keywords: [
    "boutique bijoux maroc",
    "bijoux en ligne maroc",
    "acheter bijoux maroc",
    "bagues colliers bracelets maroc",
    "bijoux pas cher maroc",
  ],
  alternates: {
    canonical: `${siteUrl}/boutique`,
  },
  openGraph: {
    title: "Boutique Bijoux en Ligne | DAHAB Bijoux Maroc",
    description:
      "Collection compl\u00e8te de bijoux \u00e9l\u00e9gants de 99 \u00e0 299 MAD. Livraison partout au Maroc.",
    url: `${siteUrl}/boutique`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

interface Props {
  searchParams: { category?: string; material?: string; sort?: string; minPrice?: string; maxPrice?: string };
}

export default async function BoutiquePage({ searchParams }: Props) {
  const where: Record<string, unknown> = { active: true };
  if (searchParams.category) where.category = searchParams.category;
  if (searchParams.material) where.material = searchParams.material;
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) (where.price as Record<string, number>).gte = parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice) (where.price as Record<string, number>).lte = parseFloat(searchParams.maxPrice);
  }

  const orderBy: Record<string, string> =
    searchParams.sort === "price-asc"
      ? { price: "asc" }
      : searchParams.sort === "price-desc"
        ? { price: "desc" }
        : searchParams.sort === "popular"
          ? { featured: "desc" }
          : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      compareAtPrice: true,
      images: true,
      category: true,
      material: true,
      stock: true,
      featured: true,
      createdAt: true,
    },
  });

  return (
    <BoutiqueClient
      products={products}
      currentCategory={searchParams.category}
      currentSort={searchParams.sort}
      currentMaterial={searchParams.material}
    />
  );
}
