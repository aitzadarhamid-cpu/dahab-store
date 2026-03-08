import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryPageClient } from "./category-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface CategoryConfig {
  slug: string;
  dbCategory: string;
  label: string;
  singularLabel: string;
  title: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  bagues: {
    slug: "bagues",
    dbCategory: "BAGUE",
    label: "Bagues",
    singularLabel: "Bague",
    title: "Bagues pour Femme",
    metaTitle: "Bagues pour Femme au Maroc | Or, Argent & Fantaisie",
    description:
      "D\u00e9couvrez notre collection de bagues pour femme au Maroc. Bagues en or plaqu\u00e9, argent 925, or rose et acier inoxydable. De 99 \u00e0 299 MAD avec livraison partout au Maroc et paiement \u00e0 la livraison.",
    h1: "Bagues pour Femme au Maroc",
    intro:
      "Sublimez vos mains avec notre collection de bagues \u00e9l\u00e9gantes. Que vous cherchiez une bague en or plaqu\u00e9 pour une occasion sp\u00e9ciale, une bague en argent 925 pour le quotidien, ou une bague fantaisie tendance, DAHAB vous propose des mod\u00e8les raffin\u00e9s \u00e0 prix accessible. Toutes nos bagues sont livr\u00e9es partout au Maroc avec paiement \u00e0 la livraison.",
    keywords: [
      "bague femme maroc",
      "bague or maroc",
      "bague argent maroc",
      "bague or rose maroc",
      "bague fantaisie maroc",
      "bague pas cher maroc",
      "achat bague en ligne maroc",
      "bague casablanca",
      "bague rabat",
    ],
  },
  colliers: {
    slug: "colliers",
    dbCategory: "COLLIER",
    label: "Colliers",
    singularLabel: "Collier",
    title: "Colliers pour Femme",
    metaTitle: "Colliers pour Femme au Maroc | Or, Argent & Pendentifs",
    description:
      "Explorez notre collection de colliers pour femme au Maroc. Colliers en or plaqu\u00e9, argent 925, pendentifs et cha\u00eenes \u00e9l\u00e9gantes. De 99 \u00e0 299 MAD avec livraison partout au Maroc et paiement \u00e0 la livraison.",
    h1: "Colliers pour Femme au Maroc",
    intro:
      "Embellissez votre d\u00e9collet\u00e9 avec nos colliers et pendentifs \u00e9l\u00e9gants. Des cha\u00eenes fines en or plaqu\u00e9 aux pendentifs en argent 925, notre collection de colliers DAHAB allie qualit\u00e9 et \u00e9l\u00e9gance \u00e0 un prix accessible. Livraison dans toutes les villes du Maroc avec paiement \u00e0 la livraison.",
    keywords: [
      "collier femme maroc",
      "collier or maroc",
      "collier argent maroc",
      "pendentif maroc",
      "chaine or maroc",
      "collier fantaisie maroc",
      "collier pas cher maroc",
      "achat collier en ligne maroc",
      "collier casablanca",
    ],
  },
  bracelets: {
    slug: "bracelets",
    dbCategory: "BRACELET",
    label: "Bracelets",
    singularLabel: "Bracelet",
    title: "Bracelets pour Femme",
    metaTitle: "Bracelets pour Femme au Maroc | Or, Argent & Fantaisie",
    description:
      "D\u00e9couvrez notre collection de bracelets pour femme au Maroc. Bracelets en or plaqu\u00e9, argent 925, joncs et bracelets fantaisie. De 99 \u00e0 299 MAD avec livraison partout au Maroc et paiement \u00e0 la livraison.",
    h1: "Bracelets pour Femme au Maroc",
    intro:
      "Accessoirisez vos poignets avec nos bracelets \u00e9l\u00e9gants. Joncs dor\u00e9s, bracelets en argent 925, cha\u00eenes d\u00e9licates ou bracelets fantaisie : la collection DAHAB offre une vari\u00e9t\u00e9 de styles pour chaque occasion. Livr\u00e9s partout au Maroc avec paiement \u00e0 la livraison.",
    keywords: [
      "bracelet femme maroc",
      "bracelet or maroc",
      "bracelet argent maroc",
      "jonc or maroc",
      "bracelet fantaisie maroc",
      "bracelet pas cher maroc",
      "achat bracelet en ligne maroc",
      "bracelet casablanca",
      "bracelet rabat",
    ],
  },
  "boucles-oreilles": {
    slug: "boucles-oreilles",
    dbCategory: "BOUCLES_OREILLES",
    label: "Boucles d'oreilles",
    singularLabel: "Boucles d'oreilles",
    title: "Boucles d'Oreilles pour Femme",
    metaTitle: "Boucles d'Oreilles pour Femme au Maroc | Or, Argent & Cr\u00e9oles",
    description:
      "Explorez notre collection de boucles d'oreilles pour femme au Maroc. Cr\u00e9oles, puces, pendantes en or plaqu\u00e9 et argent 925. De 99 \u00e0 299 MAD avec livraison partout au Maroc et paiement \u00e0 la livraison.",
    h1: "Boucles d'Oreilles pour Femme au Maroc",
    intro:
      "Illuminez votre visage avec nos boucles d'oreilles \u00e9l\u00e9gantes. Cr\u00e9oles, puces d'oreilles, boucles pendantes ou clips : trouvez le style qui vous correspond dans notre collection DAHAB. Qualit\u00e9 garantie avec livraison dans tout le Maroc et paiement \u00e0 la livraison.",
    keywords: [
      "boucles d'oreilles femme maroc",
      "boucles d'oreilles or maroc",
      "boucles d'oreilles argent maroc",
      "creoles or maroc",
      "puces d'oreilles maroc",
      "boucles d'oreilles fantaisie maroc",
      "boucles d'oreilles pas cher maroc",
      "achat boucles d'oreilles en ligne maroc",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map((category) => ({
    category,
  }));
}

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const config = CATEGORY_CONFIG[params.category];
  if (!config) return {};

  return {
    title: config.metaTitle,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: `${siteUrl}/boutique/${config.slug}`,
    },
    openGraph: {
      title: `${config.title} | DAHAB Bijoux Maroc`,
      description: config.description,
      url: `${siteUrl}/boutique/${config.slug}`,
      siteName: "DAHAB Bijoux",
      locale: "fr_MA",
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${config.title} - DAHAB Bijoux Maroc`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.title} | DAHAB Bijoux Maroc`,
      description: config.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const config = CATEGORY_CONFIG[params.category];
  if (!config) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      category: config.dbCategory,
      active: true,
    },
    orderBy: { createdAt: "desc" },
  });

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
        name: config.label,
        item: `${siteUrl}/boutique/${config.slug}`,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.title,
    description: config.description,
    url: `${siteUrl}/boutique/${config.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "DAHAB Bijoux",
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: config.label,
    },
    numberOfItems: products.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd),
        }}
      />
      <CategoryPageClient
        products={products}
        config={{
          label: config.label,
          h1: config.h1,
          intro: config.intro,
          slug: config.slug,
        }}
      />
    </>
  );
}
