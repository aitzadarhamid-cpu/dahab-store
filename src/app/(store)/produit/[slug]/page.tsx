import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailClient } from "./product-detail-client";
import { getCategoryLabel } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const CATEGORY_SLUG_MAP: Record<string, string> = {
  BAGUE: "bagues",
  COLLIER: "colliers",
  BRACELET: "bracelets",
  BOUCLES_OREILLES: "boucles-oreilles",
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return {};

  const images: string[] = JSON.parse(product.images);
  const categoryLabel = getCategoryLabel(product.category);
  const productTitle = `${product.name} | Bijoux Maroc`;
  const productDescription = `${product.name} - ${categoryLabel} DAHAB. ${product.description.slice(0, 120)}. ${product.price} MAD. Livraison partout au Maroc.`;

  return {
    title: productTitle,
    description: productDescription,
    keywords: [
      product.name.toLowerCase(),
      `${categoryLabel.toLowerCase()} maroc`,
      `${categoryLabel.toLowerCase()} en ligne maroc`,
      "bijoux maroc",
      "bijoux en ligne maroc",
      "dahab bijoux",
    ],
    alternates: {
      canonical: `${siteUrl}/produit/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | DAHAB Bijoux Maroc`,
      description: productDescription,
      url: `${siteUrl}/produit/${product.slug}`,
      siteName: "DAHAB Bijoux",
      locale: "fr_MA",
      type: "website",
      images: images[0]
        ? [
            {
              url: images[0],
              width: 800,
              height: 800,
              alt: `${product.name} - ${categoryLabel} DAHAB Bijoux Maroc`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | DAHAB Bijoux Maroc`,
      description: productDescription,
      images: images[0] ? [images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      reviews: {
        where: { approved: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
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

  const images: string[] = JSON.parse(product.images);
  const categoryLabel = getCategoryLabel(product.category);
  const categorySlug = CATEGORY_SLUG_MAP[product.category] || "boutique";

  // Compute average rating from approved reviews
  const approvedReviews = product.reviews || [];
  const averageRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
        approvedReviews.length
      : undefined;

  // Product JSON-LD with full schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images,
    brand: {
      "@type": "Brand",
      name: "DAHAB",
    },
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/produit/${product.slug}`,
      priceCurrency: "MAD",
      price: product.price,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "DAHAB Bijoux",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MA",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
    },
    ...(averageRating !== undefined && approvedReviews.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: averageRating.toFixed(1),
            reviewCount: approvedReviews.length,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  // Breadcrumb JSON-LD
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
        name: "Boutique",
        item: `${siteUrl}/boutique`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${siteUrl}/boutique/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${siteUrl}/produit/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
