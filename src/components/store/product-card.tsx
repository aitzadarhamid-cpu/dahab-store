"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/utils";
import { pixelAddToCart, gaAddToCart } from "@/lib/analytics";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    images: string;
    category: string;
    stock: number;
    featured?: boolean;
    createdAt?: string | Date;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const images: string[] = JSON.parse(product.images);
  const mainImage = images[0] || "/placeholder.jpg";
  const secondImage = images[1] || null;
  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  // Check if product is "new" (created within last 14 days)
  const isNew = product.createdAt
    ? Date.now() - new Date(product.createdAt).getTime() <
      14 * 24 * 60 * 60 * 1000
    : false;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock <= 0) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      quantity: 1,
      slug: product.slug,
    });

    pixelAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    gaAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category,
    });

    showToast(`${product.name} ajoute au panier`);
  };

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-3">
        {/* Primary image */}
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-500 ${
            secondImage
              ? "group-hover:opacity-0"
              : "group-hover:scale-105"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Secondary image — hover swap (desktop only) */}
        {secondImage && (
          <Image
            src={secondImage}
            alt={`${product.name} - vue 2`}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Badges — top left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {isNew && discount === 0 && (
            <span className="bg-brand-gold text-white text-xs font-bold px-2 py-1 rounded-full">
              Nouveau
            </span>
          )}
          {product.featured && !isNew && discount === 0 && (
            <span className="bg-brand-black text-white text-xs font-bold px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
        </div>

        {/* Low stock badge — top right */}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Derniers!
          </span>
        )}

        {/* Quick add button */}
        <button
          onClick={handleQuickAdd}
          disabled={product.stock <= 0}
          className="absolute bottom-3 right-3 bg-brand-gold text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-gold-dark disabled:opacity-50 shadow-lg"
          aria-label={`Ajouter ${product.name} au panier`}
        >
          <ShoppingBag size={18} aria-hidden="true" />
        </button>
      </div>
      <h3 className="font-medium text-sm md:text-base text-brand-black group-hover:text-brand-gold transition-colors line-clamp-1">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-display font-bold text-brand-gold">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>
      {product.stock <= 0 && (
        <p className="text-xs text-red-500 mt-1">Rupture de stock</p>
      )}
    </Link>
  );
}
