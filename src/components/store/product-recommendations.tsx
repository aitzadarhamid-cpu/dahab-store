"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, Tag, Plus, Check } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

interface ProductRecommendationsProps {
  currentProduct?: Product;
  allProducts: Product[];
  variant?: "product-page" | "cart-drawer";
}

export function ProductRecommendations({
  currentProduct,
  allProducts,
  variant = "product-page",
}: ProductRecommendationsProps) {
  const { addItem, items: cartItems } = useCart();
  const { showToast } = useToast();
  const [bundleSelected, setBundleSelected] = useState<Set<string>>(new Set());

  // Get frequently bought together products (same category or complementary)
  const recommendations = useMemo(() => {
    if (!currentProduct) {
      // Cart drawer: recommend products not in cart
      const cartIds = new Set(cartItems.map((item) => item.id));
      return allProducts
        .filter((p) => !cartIds.has(p.id) && p.stock > 0)
        .slice(0, 4);
    }

    // Product page: show same category + complementary category
    const COMPLEMENTARY: Record<string, string[]> = {
      BAGUE: ["BRACELET", "BOUCLES_OREILLES"],
      COLLIER: ["BOUCLES_OREILLES", "BRACELET"],
      BRACELET: ["BAGUE", "COLLIER"],
      BOUCLES_OREILLES: ["COLLIER", "BAGUE"],
    };

    const complementaryCategories =
      COMPLEMENTARY[currentProduct.category] || [];

    const sameCategory = allProducts.filter(
      (p) =>
        p.category === currentProduct.category &&
        p.id !== currentProduct.id &&
        p.stock > 0
    );

    const complementary = allProducts.filter(
      (p) =>
        complementaryCategories.includes(p.category) &&
        p.id !== currentProduct.id &&
        p.stock > 0
    );

    // Mix: 1 same category + 2 complementary
    const result: Product[] = [];
    if (sameCategory.length > 0) result.push(sameCategory[0]);
    complementary.slice(0, 2).forEach((p) => result.push(p));

    // Fill to 3 if needed
    if (result.length < 3) {
      const remaining = allProducts.filter(
        (p) =>
          p.id !== currentProduct.id &&
          !result.find((r) => r.id === p.id) &&
          p.stock > 0
      );
      remaining.slice(0, 3 - result.length).forEach((p) => result.push(p));
    }

    return result.slice(0, 3);
  }, [currentProduct, allProducts, cartItems]);

  // Initialize bundle with current product
  useEffect(() => {
    if (currentProduct) {
      setBundleSelected(new Set([currentProduct.id]));
    }
  }, [currentProduct]);

  const toggleBundleItem = (productId: string) => {
    setBundleSelected((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        // Don't allow deselecting the current product
        if (productId === currentProduct?.id) return prev;
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const bundleProducts = useMemo(() => {
    const all = currentProduct
      ? [currentProduct, ...recommendations]
      : recommendations;
    return all.filter((p) => bundleSelected.has(p.id));
  }, [currentProduct, recommendations, bundleSelected]);

  const bundleTotal = bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = bundleProducts.length >= 2 ? 0.1 : 0; // 10% off for 2+
  const bundleFinalPrice = Math.round(bundleTotal * (1 - bundleDiscount));

  const handleAddBundle = () => {
    bundleProducts.forEach((product) => {
      const images: string[] = JSON.parse(product.images);
      addItem({
        id: product.id,
        name: product.name,
        price: Math.round(product.price * (1 - bundleDiscount)),
        image: images[0] || "",
        quantity: 1,
        slug: product.slug,
      });
    });
    showToast(
      `${bundleProducts.length} articles ajoutes au panier avec -10% !`
    );
  };

  const handleQuickAdd = (product: Product) => {
    const images: string[] = JSON.parse(product.images);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0] || "",
      quantity: 1,
      slug: product.slug,
    });
    showToast(`${product.name} ajoute au panier`);
  };

  if (recommendations.length === 0) return null;

  // Cart drawer variant: compact cross-sell
  if (variant === "cart-drawer") {
    return (
      <div className="border-t pt-4 mt-4">
        <h4 className="text-sm font-display font-bold text-brand-black mb-3 flex items-center gap-1.5">
          <Sparkles size={14} className="text-brand-gold" />
          Completez votre look
        </h4>
        <div className="space-y-2">
          {recommendations.slice(0, 2).map((product) => {
            const images: string[] = JSON.parse(product.images);
            return (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-brand-cream/50 rounded-lg p-2"
              >
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={images[0] || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{product.name}</p>
                  <p className="text-xs font-bold text-brand-gold">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <button
                  onClick={() => handleQuickAdd(product)}
                  className="bg-brand-gold text-white p-1.5 rounded-lg hover:bg-brand-gold-dark transition-colors flex-shrink-0"
                  title="Ajouter"
                >
                  <Plus size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Product page variant: full "Souvent achete ensemble" section
  return (
    <section className="mt-12 bg-brand-cream/50 rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-xl font-bold text-brand-black mb-1 flex items-center gap-2">
        <Sparkles size={20} className="text-brand-gold" />
        Souvent achete ensemble
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Achetez 2 articles ou plus et beneficiez de{" "}
        <span className="text-brand-gold font-bold">-10%</span> sur le lot
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Bundle items */}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            {currentProduct && (
              <BundleItem
                product={currentProduct}
                selected={true}
                isCurrent={true}
                onToggle={() => {}}
              />
            )}

            {recommendations.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <span className="text-brand-gold font-bold text-lg">+</span>
                <BundleItem
                  product={product}
                  selected={bundleSelected.has(product.id)}
                  isCurrent={false}
                  onToggle={() => toggleBundleItem(product.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bundle summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-64 bg-white rounded-xl p-5 shadow-sm"
        >
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {bundleProducts.length} article
                {bundleProducts.length > 1 ? "s" : ""}
              </span>
              <span className="line-through text-gray-400">
                {formatPrice(bundleTotal)}
              </span>
            </div>
            {bundleDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 flex items-center gap-1">
                  <Tag size={14} />
                  Remise -10%
                </span>
                <span className="text-green-600 font-medium">
                  -{formatPrice(Math.round(bundleTotal * bundleDiscount))}
                </span>
              </div>
            )}
            <div className="flex justify-between font-display font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-brand-gold">
                {formatPrice(bundleFinalPrice)}
              </span>
            </div>
          </div>

          <Button
            onClick={handleAddBundle}
            className="w-full gap-2"
            disabled={bundleProducts.length < 2}
          >
            <ShoppingBag size={18} />
            Ajouter le lot
          </Button>
          {bundleProducts.length < 2 && (
            <p className="text-xs text-gray-400 text-center mt-2">
              Selectionnez au moins 2 articles
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function BundleItem({
  product,
  selected,
  isCurrent,
  onToggle,
}: {
  product: Product;
  selected: boolean;
  isCurrent: boolean;
  onToggle: () => void;
}) {
  const images: string[] = JSON.parse(product.images);

  return (
    <button
      onClick={onToggle}
      disabled={isCurrent}
      className={`relative rounded-xl border-2 p-2 transition-all ${
        selected
          ? "border-brand-gold bg-white shadow-sm"
          : "border-gray-200 bg-white/50 opacity-60"
      } ${isCurrent ? "cursor-default" : "cursor-pointer hover:border-brand-gold/50"}`}
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden mb-2">
        <Image
          src={images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
        {/* Selection indicator */}
        <div
          className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center ${
            selected ? "bg-brand-gold" : "bg-gray-300"
          }`}
        >
          <Check size={12} className="text-white" />
        </div>
      </div>
      <p className="text-xs font-medium text-brand-black truncate w-20">
        {product.name}
      </p>
      <p className="text-xs font-bold text-brand-gold">
        {formatPrice(product.price)}
      </p>
      {isCurrent && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
          Ce produit
        </span>
      )}
    </button>
  );
}
