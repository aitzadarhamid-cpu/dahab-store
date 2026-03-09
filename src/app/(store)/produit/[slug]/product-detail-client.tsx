"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Truck, Shield, Ruler } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { StockBadge } from "@/components/marketing/stock-badge";
import { ProductCard } from "@/components/store/product-card";
import { ProductReviews } from "@/components/store/reviews";
import { SizeGuide } from "@/components/store/size-guide";
import { WhatsAppOrderButton } from "@/components/store/whatsapp-order-button";
import {
  formatPrice,
  getCategoryLabel,
  getMaterialLabel,
} from "@/lib/utils";
import { pixelViewContent, pixelAddToCart, gaViewItem, gaAddToCart } from "@/lib/analytics";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  images: string;
  category: string;
  material: string;
  stock: number;
  sizes: string;
}

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const images: string[] = JSON.parse(product.images);
  const sizes: string[] = JSON.parse(product.sizes);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  useEffect(() => {
    pixelViewContent({ id: product.id, name: product.name, price: product.price });
    gaViewItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
  }, [product]);

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    if (sizes.length > 0 && !selectedSize) {
      showToast("Veuillez selectionner une taille", "error");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0] || "",
      quantity,
      selectedSize: selectedSize || undefined,
      slug: product.slug,
    });

    pixelAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
    gaAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      category: product.category,
    });

    showToast(`${product.name} ajoute au panier`);
  };

  return (
    <div className="container-page py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4">
            <Image
              src={images[selectedImage] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i
                      ? "border-brand-gold"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-brand-gold font-medium uppercase tracking-wide mb-1">
                {getCategoryLabel(product.category)}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-brand-gold">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <StockBadge stock={product.stock} />

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="text-sm text-gray-500">
              Materiau: <span className="font-medium text-brand-black">{getMaterialLabel(product.material)}</span>
            </div>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    Taille
                  </p>
                  {(product.category === "BAGUE" || product.category === "BRACELET" || product.category === "COLLIER") && (
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      className="inline-flex items-center gap-1 text-xs text-brand-gold hover:text-brand-gold-dark font-medium transition-colors"
                    >
                      <Ruler size={12} aria-hidden="true" />
                      Guide des tailles
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Taille ${size}`}
                      aria-pressed={selectedSize === size}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-brand-gold bg-brand-gold text-white"
                          : "border-gray-300 hover:border-brand-gold text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Quantite
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Diminuer la quantite"
                >
                  <Minus size={16} aria-hidden="true" />
                </button>
                <span className="font-medium text-lg w-8 text-center" aria-live="polite">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Augmenter la quantite"
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full gap-2"
              disabled={product.stock <= 0}
            >
              <ShoppingBag size={20} />
              {product.stock <= 0
                ? "Rupture de stock"
                : "Ajouter au panier"}
            </Button>

            {/* WhatsApp Order Button */}
            {product.stock > 0 && (
              <WhatsAppOrderButton
                productName={product.name}
                productPrice={product.price}
                selectedSize={selectedSize || undefined}
                quantity={quantity}
              />
            )}

            {/* Trust */}
            <div className="flex flex-col gap-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck size={18} className="text-brand-gold" />
                Livraison gratuite a partir de 299 MAD
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield size={18} className="text-brand-gold" />
                Paiement a la livraison (COD)
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <ProductReviews productId={product.id} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title mb-6">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        defaultTab={
          product.category === "COLLIER"
            ? "collier"
            : product.category === "BRACELET"
            ? "bracelet"
            : "bague"
        }
      />
    </div>
  );
}
