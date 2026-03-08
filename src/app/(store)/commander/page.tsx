"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { orderFormSchema, type OrderFormValues } from "@/lib/validations";
import { formatPrice, getShippingCost } from "@/lib/utils";
import { ALL_CITIES } from "@/data/cities";
import { gaBeginCheckout } from "@/lib/analytics";
import { ShoppingBag, MapPin, Phone, User, FileText } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const shipping = getShippingCost(total);
  const grandTotal = total + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
  });

  // Track begin_checkout
  useState(() => {
    if (items.length > 0) {
      gaBeginCheckout(
        items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        total
      );
    }
  });

  const onSubmit = async (data: OrderFormValues) => {
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            image: item.image,
          })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erreur lors de la commande");
      }

      const order = await res.json();
      clearCart();
      router.push(
        `/confirmation?order=${order.orderNumber}&total=${order.total}`
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue"
      );
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">
          Votre panier est vide
        </h1>
        <p className="text-gray-500 mb-6">
          Ajoutez des articles pour passer commande
        </p>
        <Button onClick={() => router.push("/boutique")}>
          Voir la boutique
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="section-title mb-8">Passer commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <User size={20} className="text-brand-gold" />
                Informations de livraison
              </h2>

              <Input
                label="Nom complet"
                placeholder="Votre nom complet"
                error={errors.customerName?.message}
                {...register("customerName")}
              />

              <div className="relative">
                <Input
                  label="Telephone"
                  placeholder="06XXXXXXXX"
                  type="tel"
                  error={errors.customerPhone?.message}
                  {...register("customerPhone")}
                />
                <Phone
                  size={16}
                  className="absolute right-3 top-9 text-gray-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Ville
                </label>
                <div className="relative">
                  <select
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 bg-white text-brand-black appearance-none cursor-pointer ${
                      errors.customerCity
                        ? "border-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                    }`}
                    {...register("customerCity")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selectionner votre ville
                    </option>
                    {ALL_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <MapPin
                    size={16}
                    className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                  />
                </div>
                {errors.customerCity && (
                  <p className="text-sm text-red-600">
                    {errors.customerCity.message}
                  </p>
                )}
              </div>

              <Input
                label="Adresse complete"
                placeholder="Numero, rue, quartier..."
                error={errors.customerAddress?.message}
                {...register("customerAddress")}
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  <FileText size={14} className="inline mr-1" />
                  Note (optionnel)
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-white text-brand-black placeholder-gray-400 min-h-[80px] resize-none"
                  placeholder="Instructions speciales pour la livraison..."
                  {...register("customerNote")}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Confirmer la commande - {formatPrice(grandTotal)}
            </Button>

            <p className="text-center text-xs text-gray-400">
              Paiement a la livraison (COD) - Aucun paiement en ligne requis
            </p>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="font-display text-lg font-bold mb-4">
              Recapitulatif
            </h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-3"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    {item.selectedSize && (
                      <p className="text-xs text-gray-500">
                        Taille: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      x{item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-brand-gold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Livraison</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Gratuite</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between font-display text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-brand-gold">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
