"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormValues } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";

const CATEGORIES = [
  { value: "BAGUE", label: "Bagues" },
  { value: "COLLIER", label: "Colliers" },
  { value: "BRACELET", label: "Bracelets" },
  { value: "BOUCLES_OREILLES", label: "Boucles d'oreilles" },
];

const MATERIALS = [
  { value: "OR_PLAQUE", label: "Or plaque" },
  { value: "ARGENT_925", label: "Argent 925" },
  { value: "OR_ROSE", label: "Or rose" },
  { value: "ACIER_INOXYDABLE", label: "Acier inoxydable" },
  { value: "CRISTAL", label: "Cristal" },
];

interface Props {
  initialData?: {
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
  };
}

export function ProductForm({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData ? JSON.parse(initialData.images) : []
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          slug: initialData.slug,
          description: initialData.description,
          price: initialData.price,
          compareAtPrice: initialData.compareAtPrice,
          category: initialData.category,
          material: initialData.material,
          stock: initialData.stock,
          sizes: JSON.parse(initialData.sizes).join(", "),
          images: JSON.parse(initialData.images).join("\n"),
          featured: initialData.featured,
        }
      : { featured: false },
  });

  const nameValue = watch("name");

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    setError("");

    try {
      const slug = data.slug || slugify(data.name);
      const sizes = data.sizes
        ? JSON.stringify(
            data.sizes
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        : "[]";
      const images = JSON.stringify(imageUrls.filter(Boolean));

      const body = {
        name: data.name,
        slug,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice || null,
        category: data.category,
        material: data.material,
        stock: data.stock,
        sizes,
        images,
        featured: data.featured || false,
      };

      const url = isEdit
        ? `/api/products/${initialData!.id}`
        : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
        <h2 className="font-display text-lg font-bold border-b pb-3">
          Informations du produit
        </h2>

        <Input
          label="Nom du produit"
          placeholder="ex: Bague Sultane Or"
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-sm bg-gray-50 text-gray-500"
            placeholder={nameValue ? slugify(nameValue) : "auto-genere"}
            {...register("slug")}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold min-h-[100px] text-sm"
            placeholder="Description du produit..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Prix (MAD)"
            type="number"
            placeholder="149"
            error={errors.price?.message}
            {...register("price")}
          />
          <Input
            label="Ancien prix (MAD)"
            type="number"
            placeholder="199"
            error={errors.compareAtPrice?.message}
            {...register("compareAtPrice")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Categorie
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white"
              {...register("category")}
            >
              <option value="">Selectionner</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Materiau
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white"
              {...register("material")}
            >
              <option value="">Selectionner</option>
              {MATERIALS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            {errors.material && (
              <p className="text-sm text-red-600">
                {errors.material.message}
              </p>
            )}
          </div>
        </div>

        <Input
          label="Stock"
          type="number"
          placeholder="10"
          error={errors.stock?.message}
          {...register("stock")}
        />

        <Input
          label="Tailles (separees par des virgules)"
          placeholder="16mm, 17mm, 18mm, 19mm"
          {...register("sizes")}
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Images du produit
          </label>

          {/* Image preview grid */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <Image src={url} alt={`Image ${idx + 1}`} fill className="object-cover" sizes="120px" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = imageUrls.filter((_, i) => i !== idx);
                        setImageUrls(updated);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1.5 rounded-full"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-brand-gold text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      Principal
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add image URL */}
          <div className="flex gap-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
            />
            <button
              type="button"
              onClick={() => {
                if (newImageUrl.trim()) {
                  setImageUrls([...imageUrls, newImageUrl.trim()]);
                  setNewImageUrl("");
                }
              }}
              className="flex items-center gap-1 px-4 py-2.5 bg-brand-gold text-white text-sm font-medium rounded-lg hover:bg-brand-gold/90 transition-colors"
            >
              <Plus size={16} /> Ajouter
            </button>
          </div>
          <p className="text-xs text-gray-400">La premiere image sera l&apos;image principale du produit</p>

          {/* Hidden field for form */}
          <input type="hidden" {...register("images")} value={imageUrls.join("\n")} />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
            {...register("featured")}
          />
          <span className="text-sm font-medium text-gray-700">
            Produit mis en avant (bestseller)
          </span>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" loading={loading}>
          {isEdit ? "Mettre a jour" : "Creer le produit"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/products")}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
