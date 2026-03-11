import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Truck, Clock, Shield, MapPin, Star, Gem } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bijoux Marrakech | Bagues, Colliers & Bracelets — DAHAB",
  description:
    "Achetez vos bijoux en ligne à Marrakech avec livraison rapide en 24h. Bagues, colliers, bracelets et boucles d'oreilles de 99 à 299 MAD. Paiement à la livraison. DAHAB, votre bijouterie en ligne à Marrakech.",
  keywords: [
    "bijoux marrakech",
    "bijouterie marrakech",
    "bagues marrakech",
    "colliers marrakech",
    "bracelets marrakech",
    "bijoux livraison marrakech",
    "acheter bijoux marrakech",
    "dahab marrakech",
    "bijoux en ligne marrakech",
  ],
  alternates: {
    canonical: `${siteUrl}/boutique/marrakech`,
  },
  openGraph: {
    title: "Bijoux Marrakech | Bagues, Colliers & Bracelets — DAHAB",
    description:
      "Bijoux élégants livrés en 24h à Marrakech. Bagues, colliers, bracelets de 99 à 299 MAD. Paiement à la livraison.",
    url: `${siteUrl}/boutique/marrakech`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

export default async function MarrakechPage() {
  const [featuredProducts, orderCount] = await Promise.all([
    prisma.product.findMany({
      where: { active: true, featured: true },
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        compareAtPrice: true,
        images: true,
        category: true,
      },
    }),
    prisma.order.count({
      where: {
        customerCity: {
          contains: "marrakech",
          mode: "insensitive",
        },
      },
    }),
  ]);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DAHAB Bijoux Marrakech",
    url: `${siteUrl}/boutique/marrakech`,
    logo: `${siteUrl}/logo.svg`,
    description:
      "Bijouterie en ligne à Marrakech. Bijoux élégants de 99 à 299 MAD avec livraison en 24h.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakech",
      addressRegion: "Marrakech-Safi",
      addressCountry: "MA",
    },
    areaServed: "Marrakech",
    priceRange: "99 MAD - 299 MAD",
  };

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
        name: "Marrakech",
        item: `${siteUrl}/boutique/marrakech`,
      },
    ],
  };

  const clientCount = orderCount > 10 ? orderCount : 120;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="container-page py-8 md:py-12">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <p className="text-brand-gold font-medium tracking-wide uppercase text-sm mb-3">
            La Ville Ocre
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-6">
            Bijoux &agrave; Marrakech
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            L&apos;&eacute;l&eacute;gance orientale rencontre le raffinement moderne.
            D&eacute;couvrez la collection DAHAB, inspir&eacute;e par la beaut&eacute;
            de Marrakech. Livraison en{" "}
            <strong className="text-brand-black">24h</strong> dans toute la
            ville.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Truck className="text-brand-gold" size={18} />
              Livraison 24h &agrave; Marrakech
            </span>
            <span className="flex items-center gap-2">
              <Shield className="text-brand-gold" size={18} />
              Paiement &agrave; la livraison
            </span>
            <span className="flex items-center gap-2">
              <Gem className="text-brand-gold" size={18} />
              99 &mdash; 299 MAD
            </span>
          </div>
        </header>

        {/* Featured Products Grid */}
        {featuredProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-2 text-center">
              Nos Bijoux Populaires &agrave; Marrakech
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Bijoux inspir&eacute;s par l&apos;&eacute;l&eacute;gance orientale de la
              ville ocre
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => {
                const images: string[] = JSON.parse(product.images);
                const mainImage = images[0] || "/placeholder.jpg";
                const discount = product.compareAtPrice
                  ? Math.round(
                      ((product.compareAtPrice - product.price) /
                        product.compareAtPrice) *
                        100
                    )
                  : 0;

                return (
                  <Link
                    key={product.id}
                    href={`/produit/${product.slug}`}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={mainImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-medium text-brand-black text-sm line-clamp-2 mb-1 group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-gold">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-gray-400 text-xs line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/boutique"
                className="inline-block bg-brand-gold text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-gold-dark transition-colors shadow-md"
              >
                Voir Toute la Collection
              </Link>
            </div>
          </section>
        )}

        {/* Delivery Info Section */}
        <section className="mb-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-8 text-center">
            Livraison Rapide &agrave; Marrakech
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-2">
                Zone A &mdash; 24h
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Marrakech fait partie de la Zone A. Votre commande est
                livr&eacute;e en 24 heures ouvr&eacute;es, directement chez vous.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-2">
                Paiement &agrave; la Livraison
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Payez uniquement lorsque vous recevez votre colis. Z&eacute;ro
                risque, 100% confiance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-brand-gold" size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-black mb-2">
                Livraison Gratuite
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Livraison offerte &agrave; Marrakech d&egrave;s 299 MAD d&apos;achat.
                Emballage soign&eacute; et &eacute;crin cadeau inclus.
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="mb-16 bg-brand-cream rounded-2xl p-8 md:p-12 text-center">
          <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="text-brand-gold" size={28} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-4">
            {clientCount}+ clientes &agrave; Marrakech nous font confiance
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            De Gu&eacute;liz &agrave; l&apos;Hivernage, de la M&eacute;dina au
            quartier de la Palmeraie, les Marrakchies choisissent DAHAB pour
            sublimer leur &eacute;l&eacute;gance au quotidien.
          </p>
        </section>

        {/* Category Links */}
        <section className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-6 text-center">
            Nos Cat&eacute;gories de Bijoux
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Trouvez le bijou parfait parmi nos collections
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Bagues",
                href: "/boutique/bagues",
                desc: "Bagues en or, argent et fantaisie",
              },
              {
                name: "Colliers",
                href: "/boutique/colliers",
                desc: "Colliers et pendentifs \u00e9l\u00e9gants",
              },
              {
                name: "Bracelets",
                href: "/boutique/bracelets",
                desc: "Bracelets et joncs raffin\u00e9s",
              },
              {
                name: "Boucles d'oreilles",
                href: "/boutique/boucles-oreilles",
                desc: "Cr\u00e9oles, puces et pendantes",
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="bg-white rounded-xl p-6 shadow-sm text-center group hover:shadow-md transition-shadow"
              >
                <h3 className="font-display text-lg font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Marrakech-specific SEO content */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-6 text-center">
              Votre Bijouterie en Ligne &agrave; Marrakech
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Marrakech, la ville ocre, est un carrefour d&apos;&eacute;l&eacute;gance
                o&ugrave; les traditions orientales se m&ecirc;lent &agrave; la
                modernit&eacute;. DAHAB s&apos;inspire de cette richesse
                culturelle pour proposer des bijoux qui capturent
                l&apos;essence de l&apos;&eacute;l&eacute;gance marrakchie.
              </p>
              <p>
                Que vous flaniez dans les souks de la M&eacute;dina, que vous
                d&icirc;niez dans un riad de charme, ou que vous profitiez de la
                douceur de vivre marrakchie, nos bagues, colliers, bracelets et
                boucles d&apos;oreilles ajoutent une touche de raffinement
                &agrave; chaque moment.
              </p>
              <p>
                Avec la livraison en 24h et le paiement &agrave; la livraison,
                commander vos bijoux DAHAB &agrave; Marrakech est un plaisir
                sans contrainte. Des prix de 99 &agrave; 299 MAD pour des
                pi&egrave;ces qui allient tradition et modernit&eacute;.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-4">
            Pr&ecirc;te &agrave; Briller &agrave; Marrakech ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            D&eacute;couvrez notre collection compl&egrave;te et recevez vos bijoux
            en 24h. Paiement &agrave; la livraison.
          </p>
          <Link
            href="/boutique"
            className="inline-block bg-brand-gold text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-gold-dark transition-colors shadow-md"
          >
            D&eacute;couvrir la Boutique
          </Link>
        </section>
      </div>
    </>
  );
}
