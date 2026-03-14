export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Gift, Package, QrCode, Sparkles, Tag, ShoppingBag } from "lucide-react";
import Image from "next/image";

// Predefined bundle templates for different occasions
const OCCASION_BUNDLES = [
  {
    id: "anniversaire",
    name: "Coffret Anniversaire",
    emoji: "🎂",
    description: "La combinaison parfaite pour un anniversaire inoubliable",
    suggestion: "1 collier + 1 paire de boucles d'oreilles",
    categories: ["COLLIER", "BOUCLES_OREILLES"],
    discountPercent: 10,
    color: "bg-pink-50 border-pink-200 text-pink-700",
  },
  {
    id: "fete-meres",
    name: "Coffret Fête des Mères",
    emoji: "💐",
    description: "Pour la femme la plus importante de votre vie",
    suggestion: "1 bracelet + 1 bague + 1 collier",
    categories: ["BRACELET", "BAGUE", "COLLIER"],
    discountPercent: 15,
    color: "bg-rose-50 border-rose-200 text-rose-700",
  },
  {
    id: "mariage",
    name: "Coffret Mariage & Fête",
    emoji: "💍",
    description: "Brillez lors de vos plus belles célébrations",
    suggestion: "1 parure complète (collier + boucles + bracelet + bague)",
    categories: ["COLLIER", "BOUCLES_OREILLES", "BRACELET", "BAGUE"],
    discountPercent: 20,
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    id: "cadeau-amie",
    name: "Coffret Cadeau Amie",
    emoji: "🎁",
    description: "Un cadeau qui fera plaisir à coup sûr",
    suggestion: "1 bracelet + 1 paire de boucles d'oreilles",
    categories: ["BRACELET", "BOUCLES_OREILLES"],
    discountPercent: 10,
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    id: "eid",
    name: "Coffret Eid",
    emoji: "🌙",
    description: "Célébrez l'Eid avec élégance et raffinement",
    suggestion: "2 bracelets + 1 collier",
    categories: ["BRACELET", "COLLIER"],
    discountPercent: 15,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    id: "saint-valentin",
    name: "Coffret Saint-Valentin",
    emoji: "❤️",
    description: "L'amour mérite de l'or",
    suggestion: "1 collier coeur + 1 bague",
    categories: ["COLLIER", "BAGUE"],
    discountPercent: 10,
    color: "bg-red-50 border-red-200 text-red-700",
  },
];

const QR_CODES = [
  {
    id: "soin",
    label: "Guide d'entretien bijoux",
    description:
      "QR code vers la page de conseils d'entretien pour prolonger la durée de vie des bijoux",
    targetUrl: "/guide-tailles",
    icon: Sparkles,
  },
  {
    id: "reorder",
    label: "Re-commander facilement",
    description:
      "QR code vers la boutique pour faciliter les achats répétés",
    targetUrl: "/boutique",
    icon: ShoppingBag,
  },
  {
    id: "avis",
    label: "Laisser un avis",
    description:
      "QR code vers la page produit pour laisser un avis après réception",
    targetUrl: "/boutique",
    icon: Tag,
  },
];

export default async function MarketingPacksPage() {
  const [products, categoryStats] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        images: true,
        category: true,
        featured: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.groupBy({
      by: ["category"],
      where: { active: true },
      _count: true,
      _avg: { price: true },
    }),
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-black mb-2">
          Marketing Packs
        </h1>
        <p className="text-gray-600">
          Coffrets cadeaux par occasion, bundles produits et QR codes packaging.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryStats.map((stat) => {
          const labels: Record<string, string> = {
            BAGUE: "Bagues",
            COLLIER: "Colliers",
            BRACELET: "Bracelets",
            BOUCLES_OREILLES: "Boucles d'oreilles",
          };
          return (
            <div
              key={stat.category}
              className="bg-white rounded-xl shadow-sm p-4 text-center"
            >
              <p className="font-display text-2xl font-bold text-brand-gold">
                {stat._count}
              </p>
              <p className="text-sm text-gray-600">
                {labels[stat.category] || stat.category}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Moy. {formatPrice(Math.round(stat._avg.price || 0))}
              </p>
            </div>
          );
        })}
      </div>

      {/* Coffrets par Occasion */}
      <section className="py-8 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
            <Gift className="text-brand-gold" size={20} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-black">
              Coffrets par Occasion
            </h2>
            <p className="text-sm text-gray-500">
              Templates de bundles prêts à assembler
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OCCASION_BUNDLES.map((bundle) => {
            // Calculate a sample bundle price
            const relevantProducts = products.filter((p) =>
              bundle.categories.includes(p.category)
            );
            const sampleProducts = bundle.categories
              .map((cat) => relevantProducts.find((p) => p.category === cat))
              .filter(Boolean);
            const totalPrice = sampleProducts.reduce(
              (sum, p) => sum + (p?.price || 0),
              0
            );
            const discountedPrice =
              totalPrice * (1 - bundle.discountPercent / 100);

            return (
              <div
                key={bundle.id}
                className={`rounded-xl border p-5 ${bundle.color}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{bundle.emoji}</span>
                  <h3 className="font-display text-lg font-bold">
                    {bundle.name}
                  </h3>
                </div>
                <p className="text-sm mb-3 opacity-80">{bundle.description}</p>
                <p className="text-sm font-medium mb-3">
                  💡 {bundle.suggestion}
                </p>

                {totalPrice > 0 && (
                  <div className="bg-white/60 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Prix estimé du bundle :</span>
                      <div className="text-right">
                        <span className="text-xs line-through text-gray-500">
                          {formatPrice(Math.round(totalPrice))}
                        </span>
                        <span className="font-display font-bold text-brand-gold ml-2">
                          {formatPrice(Math.round(discountedPrice))}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs mt-1 font-medium text-green-700">
                      Économie de {bundle.discountPercent}% (-
                      {formatPrice(Math.round(totalPrice - discountedPrice))})
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {bundle.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-white/50 px-2 py-0.5 rounded text-xs font-medium"
                    >
                      {cat === "BOUCLES_OREILLES"
                        ? "Boucles"
                        : cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Simulateur Bundle */}
      <section className="py-8 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
            <Package className="text-brand-gold" size={20} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-black">
              Produits Disponibles
            </h2>
            <p className="text-sm text-gray-500">
              {products.length} produits actifs pour composer vos bundles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.slice(0, 12).map((product) => {
            const images: string[] = JSON.parse(product.images);
            const mainImage = images[0] || "/placeholder.jpg";
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 16vw"
                  />
                  {product.featured && (
                    <span className="absolute top-1 right-1 bg-brand-gold text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      ★
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-brand-black line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-xs font-display font-bold text-brand-gold">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QR Codes Packaging */}
      <section className="py-8 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
            <QrCode className="text-brand-gold" size={20} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-black">
              QR Codes Packaging
            </h2>
            <p className="text-sm text-gray-500">
              QR codes à inclure dans l&apos;emballage de chaque commande
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QR_CODES.map((qr) => {
            const Icon = qr.icon;
            return (
              <div
                key={qr.id}
                className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-lg flex items-center justify-center">
                    <Icon className="text-brand-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-black">
                      {qr.label}
                    </h3>
                    <p className="text-xs text-gray-400">{qr.targetUrl}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{qr.description}</p>
                <div className="mt-4 bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-24 h-24 bg-white border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="text-gray-300" size={40} />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Générez via qr-code-generator.com
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Packaging Guidelines */}
      <section className="py-8 border-t border-gray-100">
        <h2 className="font-display text-2xl font-bold text-brand-black mb-6">
          Guidelines Packaging
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-display font-bold text-brand-black mb-4">
              ✅ À inclure dans chaque colis
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Bijou dans pochette en velours DAHAB</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Carte de remerciement personnalisée</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>QR code guide d&apos;entretien</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>QR code pour laisser un avis (-5% offert)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Autocollant DAHAB pour le colis extérieur</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-display font-bold text-brand-black mb-4">
              📦 Standards Emballage
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Boîte extérieure : kraft ou noire, logo DAHAB doré</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Papier de soie crème à l&apos;intérieur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Ruban doré pour coffrets cadeaux</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Protection anti-choc pour bijoux fragiles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">•</span>
                <span>Enveloppe COD propre et professionnelle</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
