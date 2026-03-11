import Link from "next/link";
import {
  Sparkles,
  Sun,
  Gift,
  PartyPopper,
  ExternalLink,
  Package,
  BarChart3,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, getCategoryLabel } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Collection definitions
// ---------------------------------------------------------------------------

const COLLECTIONS = [
  {
    id: "soiree",
    name: "Soiree",
    description: "Bijoux pour soirees et evenements",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-700",
    borderColor: "border-purple-200",
  },
  {
    id: "quotidien",
    name: "Quotidien",
    description: "Elegance de tous les jours",
    icon: Sun,
    color: "bg-amber-50 text-amber-700",
    borderColor: "border-amber-200",
  },
  {
    id: "cadeau",
    name: "Cadeau",
    description: "Idees cadeaux parfaites",
    icon: Gift,
    color: "bg-rose-50 text-rose-700",
    borderColor: "border-rose-200",
  },
  {
    id: "mariage",
    name: "Mariage & Fete",
    description: "Celebrations et occasions speciales",
    icon: PartyPopper,
    color: "bg-blue-50 text-blue-700",
    borderColor: "border-blue-200",
  },
] as const;

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getLookbookData() {
  const [soireeProducts, quotidienProducts, cadeauProducts, mariageProducts] =
    await Promise.all([
      // Soiree: featured colliers + boucles d'oreilles
      prisma.product.findMany({
        where: {
          active: true,
          featured: true,
          category: { in: ["COLLIER", "BOUCLES_OREILLES"] },
        },
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, slug: true, price: true, category: true, images: true },
      }),
      // Quotidien: bagues + bracelets, price <= 199
      prisma.product.findMany({
        where: {
          active: true,
          category: { in: ["BAGUE", "BRACELET"] },
          price: { lte: 199 },
        },
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, slug: true, price: true, category: true, images: true },
      }),
      // Cadeau: featured products, all categories
      prisma.product.findMany({
        where: {
          active: true,
          featured: true,
        },
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, slug: true, price: true, category: true, images: true },
      }),
      // Mariage & Fete: highest priced
      prisma.product.findMany({
        where: { active: true },
        orderBy: { price: "desc" },
        select: { id: true, name: true, slug: true, price: true, category: true, images: true },
      }),
    ]);

  // Stats
  const [totalProducts, bagues, colliers, bracelets, boucles] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { active: true, category: "BAGUE" } }),
    prisma.product.count({ where: { active: true, category: "COLLIER" } }),
    prisma.product.count({ where: { active: true, category: "BRACELET" } }),
    prisma.product.count({ where: { active: true, category: "BOUCLES_OREILLES" } }),
  ]);

  return {
    collections: {
      soiree: soireeProducts,
      quotidien: quotidienProducts,
      cadeau: cadeauProducts,
      mariage: mariageProducts,
    },
    stats: {
      total: totalProducts,
      byCategory: { BAGUE: bagues, COLLIER: colliers, BRACELET: bracelets, BOUCLES_OREILLES: boucles },
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AdminLookbookPage() {
  const data = await getLookbookData();

  const collectionProducts: Record<string, typeof data.collections.soiree> = {
    soiree: data.collections.soiree,
    quotidien: data.collections.quotidien,
    cadeau: data.collections.cadeau,
    mariage: data.collections.mariage,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-black">
            Lookbook
          </h1>
          <p className="text-gray-500 mt-1">
            Collections thematiques et curation de produits
          </p>
        </div>
        <Link
          href="/lookbook"
          target="_blank"
          className="flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-dark transition-colors font-medium"
        >
          Voir la page publique
          <ExternalLink size={16} />
        </Link>
      </div>

      {/* Collections Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {COLLECTIONS.map((col) => {
          const products = collectionProducts[col.id];
          return (
            <div
              key={col.id}
              className={`bg-white rounded-xl p-5 shadow-sm border ${col.borderColor}`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${col.color} flex items-center justify-center mb-3`}
              >
                <col.icon size={20} />
              </div>
              <h3 className="font-display font-bold text-brand-black">
                {col.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{col.description}</p>
              <p className="text-sm font-medium text-brand-gold mt-3">
                {products.length} produit{products.length !== 1 ? "s" : ""}
              </p>
            </div>
          );
        })}
      </div>

      {/* Products per Collection */}
      <div className="space-y-10 mb-10">
        {COLLECTIONS.map((col) => {
          const products = collectionProducts[col.id];
          return (
            <section key={col.id}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-8 h-8 rounded-lg ${col.color} flex items-center justify-center`}
                >
                  <col.icon size={16} />
                </div>
                <h2 className="font-display text-lg font-bold text-brand-black">
                  {col.name}
                </h2>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {products.length} produit{products.length !== 1 ? "s" : ""}
                </span>
              </div>

              {products.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <p className="text-sm text-gray-400">
                    Aucun produit ne correspond aux criteres de cette collection.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left px-4 py-3 font-medium text-gray-500">
                          Produit
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">
                          Categorie
                        </th>
                        <th className="text-right px-4 py-3 font-medium text-gray-500">
                          Prix
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 8).map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                        >
                          <td className="px-4 py-3">
                            <Link
                              href={`/produit/${product.slug}`}
                              className="font-medium text-brand-black hover:text-brand-gold transition-colors"
                            >
                              {product.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {getCategoryLabel(product.category)}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-brand-gold">
                            {formatPrice(product.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {products.length > 8 && (
                    <div className="px-4 py-3 bg-gray-50/50 text-center">
                      <p className="text-xs text-gray-400">
                        + {products.length - 8} autre{products.length - 8 > 1 ? "s" : ""} produit{products.length - 8 > 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
            <BarChart3 size={20} className="text-brand-gold" />
          </div>
          <h2 className="font-display text-lg font-bold text-brand-black">
            Statistiques Produits
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Package size={16} className="text-gray-400" />
              <p className="text-xs text-gray-500">Total actifs</p>
            </div>
            <p className="text-2xl font-display font-bold text-brand-black">
              {data.stats.total}
            </p>
          </div>
          {Object.entries(data.stats.byCategory).map(([cat, count]) => (
            <div key={cat} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">
                {getCategoryLabel(cat)}
              </p>
              <p className="text-2xl font-display font-bold text-brand-black">
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
