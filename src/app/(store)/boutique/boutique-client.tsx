"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/store/product-card";
import { getCategoryLabel } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  images: string;
  category: string;
  stock: number;
}

const CATEGORIES = ["BAGUE", "COLLIER", "BRACELET", "BOUCLES_OREILLES"];

interface Props {
  products: Product[];
  currentCategory?: string;
  currentSort?: string;
}

export function BoutiqueClient({
  products,
  currentCategory,
  currentSort,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/boutique?${params.toString()}`);
  };

  return (
    <div className="container-page py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="section-title mb-2">
          {currentCategory
            ? getCategoryLabel(currentCategory)
            : "Notre Collection"}
        </h1>
        <p className="text-gray-600">
          {products.length} produit{products.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => updateFilter("category", null)}
                  className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !currentCategory
                      ? "bg-brand-gold text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Toutes les categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilter("category", cat)}
                    className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentCategory === cat
                        ? "bg-brand-gold text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
                Prix
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Tous les prix", min: null, max: null },
                  { label: "Moins de 150 MAD", min: null, max: "150" },
                  { label: "150 - 200 MAD", min: "150", max: "200" },
                  { label: "Plus de 200 MAD", min: "200", max: null },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      if (range.min) params.set("minPrice", range.min);
                      else params.delete("minPrice");
                      if (range.max) params.set("maxPrice", range.max);
                      else params.delete("maxPrice");
                      router.push(`/boutique?${params.toString()}`);
                    }}
                    className="block text-sm w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
                Trier par
              </h3>
              <select
                value={currentSort || "newest"}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="newest">Plus recents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix decroissant</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-2">
                Aucun produit trouve
              </p>
              <p className="text-gray-400 text-sm">
                Essayez de modifier vos filtres
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
