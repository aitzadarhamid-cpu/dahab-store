"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavorisPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <Heart size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">
          Aucun favori
        </h1>
        <p className="text-gray-500 mb-6">
          Ajoutez des bijoux a vos favoris pour les retrouver facilement
        </p>
        <Link href="/boutique">
          <Button>Decouvrir la boutique</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="section-title mb-8">
        Mes favoris ({items.length})
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={{
              ...item,
              images: JSON.stringify([item.image]),
              stock: 10,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
