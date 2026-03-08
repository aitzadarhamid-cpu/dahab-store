import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { BoutiqueClient } from "./boutique-client";

export const metadata: Metadata = {
  title: "Boutique - Collection de Bijoux",
  description:
    "Parcourez notre collection complete de bijoux: bagues, colliers, bracelets et boucles d'oreilles. De 99 a 299 MAD.",
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
        : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  return (
    <BoutiqueClient
      products={products}
      currentCategory={searchParams.category}
      currentSort={searchParams.sort}
    />
  );
}
