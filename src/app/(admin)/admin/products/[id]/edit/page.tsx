"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { Spinner } from "@/components/ui/loading";

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<null | {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice: number | null;
    category: string;
    material: string;
    stock: number;
    sizes: string;
    images: string;
    featured: boolean;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );

  if (!product) return <p>Produit non trouve</p>;

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">
        Modifier: {product.name}
      </h1>
      <ProductForm initialData={product} />
    </div>
  );
}
