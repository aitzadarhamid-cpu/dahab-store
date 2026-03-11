"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, getCategoryLabel } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  category: string;
  images: string;
  active: boolean;
  featured: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?limit=100");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleActive = async (id: string, active: boolean) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Desactiver ce produit ?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Produits</h1>
        <Link href="/admin/products/new">
          <Button size="sm" className="gap-2">
            <Plus size={16} />
            Nouveau Produit
          </Button>
        </Link>
      </div>

      {/* Low stock alert */}
      {!loading && (() => {
        const lowStockProducts = products.filter(p => p.active && p.stock <= 3);
        if (lowStockProducts.length === 0) return null;
        return (
          <div className="mb-4 bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-orange-500 mt-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-orange-800 text-sm">
                  {lowStockProducts.length} produit{lowStockProducts.length > 1 ? "s" : ""} en stock bas
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  {lowStockProducts.map(p => `${p.name} (${p.stock})`).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Produit</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Prix</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Stock</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Categorie</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => {
                  const images: string[] = JSON.parse(product.images);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={images[0] || "/placeholder.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-brand-gold">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">
                        <span
                          className={`${
                            product.stock <= 3
                              ? "text-red-600 font-medium"
                              : ""
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">
                        {getCategoryLabel(product.category)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            product.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {product.active ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <Edit size={16} className="text-gray-600" />
                          </Link>
                          <button
                            onClick={() =>
                              toggleActive(product.id, product.active)
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title={
                              product.active ? "Desactiver" : "Activer"
                            }
                          >
                            {product.active ? (
                              <EyeOff size={16} className="text-gray-600" />
                            ) : (
                              <Eye size={16} className="text-gray-600" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
