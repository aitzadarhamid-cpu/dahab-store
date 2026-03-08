import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailClient } from "./product-detail-client";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return {};

  const images: string[] = JSON.parse(product.images);

  return {
    title: product.name,
    description: `${product.description.slice(0, 155)}... ${product.price} MAD`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: images[0] ? [{ url: images[0] }] : [],
      locale: "fr_MA",
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product || !product.active) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      active: true,
      id: { not: product.id },
    },
    take: 4,
  });

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
