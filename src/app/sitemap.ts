import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Fetch all active products
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true, category: true },
  });

  // Product URLs
  const productUrls = products.map((p) => ({
    url: `${siteUrl}/produit/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Category pages
  const categories = [
    { slug: "bagues", label: "BAGUE" },
    { slug: "colliers", label: "COLLIER" },
    { slug: "bracelets", label: "BRACELET" },
    { slug: "boucles-oreilles", label: "BOUCLES_OREILLES" },
  ];

  // Find most recent product update per category for lastModified
  const categoryUrls = categories.map((cat) => {
    const catProducts = products.filter((p) => p.category === cat.label);
    const lastModified =
      catProducts.length > 0
        ? catProducts.reduce((latest, p) =>
            p.updatedAt > latest ? p.updatedAt : latest,
            catProducts[0].updatedAt
          )
        : new Date();

    return {
      url: `${siteUrl}/boutique/${cat.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    };
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/boutique`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/livraison`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guide-tailles`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/conditions-generales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/politique-retour`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/favoris`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/suivi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  return [...staticPages, ...categoryUrls, ...productUrls];
}
