"use client";

import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">
        Nouveau Produit
      </h1>
      <ProductForm />
    </div>
  );
}
