"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";

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

interface CategoryConfig {
  label: string;
  h1: string;
  intro: string;
  slug: string;
}

interface Props {
  products: Product[];
  config: CategoryConfig;
}

export function CategoryPageClient({ products, config }: Props) {
  return (
    <div className="container-page py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Accueil
            </Link>
          </li>
          <li>
            <ChevronRight size={14} />
          </li>
          <li>
            <Link
              href="/boutique"
              className="hover:text-brand-gold transition-colors"
            >
              Boutique
            </Link>
          </li>
          <li>
            <ChevronRight size={14} />
          </li>
          <li className="text-brand-gold font-medium">{config.label}</li>
        </ol>
      </nav>

      {/* SEO Header */}
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          {config.h1}
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          {config.intro}
        </p>
        <p className="text-sm text-gray-500 mt-3">
          {products.length} produit{products.length !== 1 ? "s" : ""}{" "}
          disponible{products.length !== 1 ? "s" : ""}
        </p>
      </header>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-2">
            Aucun produit disponible dans cette cat&eacute;gorie
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Revenez bient&ocirc;t pour d&eacute;couvrir nos nouvelles cr&eacute;ations
          </p>
          <Link
            href="/boutique"
            className="inline-block bg-brand-gold text-white px-6 py-3 rounded-lg hover:bg-brand-gold-dark transition-colors"
          >
            Voir toute la boutique
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* SEO Bottom Content */}
      <section className="mt-16 prose prose-gray max-w-3xl">
        <h2 className="font-display text-xl font-bold text-brand-black">
          Acheter des {config.label.toLowerCase()} en ligne au Maroc
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          DAHAB est votre destination pour acheter des{" "}
          {config.label.toLowerCase()} de qualit&eacute; en ligne au Maroc. Notre
          collection propose des pi&egrave;ces &eacute;l&eacute;gantes en or plaqu&eacute;, argent 925,
          or rose et acier inoxydable, &agrave; des prix allant de 99 &agrave; 299 MAD.
          Profitez de la livraison partout au Maroc &mdash; Casablanca, Rabat,
          Marrakech, Tanger, F&egrave;s, Agadir et toutes les autres villes &mdash;
          avec paiement &agrave; la livraison.
        </p>
      </section>
    </div>
  );
}
