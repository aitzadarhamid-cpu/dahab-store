"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { orderFormSchema, type OrderFormValues } from "@/lib/validations";
import { formatPrice } from "@/lib/utils";
import {
  MOROCCAN_CITIES,
  getDeliveryEstimate,
  FREE_SHIPPING_THRESHOLD,
  getShippingInfo,
} from "@/lib/moroccan-cities";
import { gaBeginCheckout } from "@/lib/analytics";
import {
  ShoppingBag,
  MapPin,
  Phone,
  User,
  FileText,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  Tag,
  Check,
  X,
  Loader2,
  Clock,
  ChevronDown,
  Package,
} from "lucide-react";

// ---------- Progress bar steps ----------
const STEPS = [
  { label: "Panier", icon: ShoppingBag },
  { label: "Informations", icon: User },
  { label: "Confirmation", icon: Check },
];

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, i) => {
          const StepIcon = step.icon;
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={step.label} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center w-full">
                {i > 0 && (
                  <div
                    className={`absolute left-0 right-1/2 h-0.5 top-4 -translate-y-1/2 transition-colors duration-300 ${
                      isCompleted ? "bg-brand-gold" : "bg-gray-200"
                    }`}
                  />
                )}
                {i < STEPS.length - 1 && (
                  <div
                    className={`absolute left-1/2 right-0 h-0.5 top-4 -translate-y-1/2 transition-colors duration-300 ${
                      isCompleted ? "bg-brand-gold" : "bg-gray-200"
                    }`}
                  />
                )}
                <div
                  className={`relative z-10 mx-auto w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-brand-gold text-white"
                      : isCurrent
                      ? "bg-brand-gold text-white ring-4 ring-brand-gold/20"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={14} />
                  ) : (
                    <StepIcon size={14} />
                  )}
                </div>
              </div>
              <span
                className={`mt-1.5 text-[10px] font-medium transition-colors ${
                  isCurrent || isCompleted
                    ? "text-brand-gold"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Trust Badges ----------
function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      label: `Livraison gratuite des ${FREE_SHIPPING_THRESHOLD} MAD`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: CreditCard,
      label: "Paiement a la livraison",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: RotateCcw,
      label: "Retour gratuit 7 jours",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: ShieldCheck,
      label: "Paiement 100% securise",
      color: "text-brand-gold",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`${badge.bg} rounded-lg p-2.5 flex items-center gap-2`}
        >
          <badge.icon size={16} className={`${badge.color} flex-shrink-0`} />
          <span className="text-[11px] font-medium text-gray-700 leading-tight">
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------- Promo Code Input ----------
interface PromoResult {
  valid: boolean;
  code: string;
  type: string;
  value: number;
  discount: number;
  message: string;
}

function PromoCodeInput({
  subtotal,
  onApply,
  onRemove,
  appliedPromo,
}: {
  subtotal: number;
  onApply: (promo: PromoResult) => void;
  onRemove: () => void;
  appliedPromo: PromoResult | null;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const validatePromo = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/promos/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), subtotal }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Code invalide");
      } else {
        onApply(data);
        setCode("");
        setIsOpen(false);
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  if (appliedPromo) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-green-600" />
          <span className="text-sm font-medium text-green-700">
            {appliedPromo.code}
          </span>
          <span className="text-sm text-green-600">
            {appliedPromo.message}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-green-600 hover:text-red-500 transition-colors p-1"
          type="button"
        >
          <X size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-dark font-medium transition-colors"
      >
        <Tag size={14} />
        Vous avez un code promo ?
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), validatePromo())}
                placeholder="Entrez votre code"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold uppercase"
              />
              <Button
                type="button"
                onClick={validatePromo}
                disabled={!code.trim() || loading}
                size="sm"
                className="px-4"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Appliquer"
                )}
              </Button>
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-1.5">{error}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Delivery Estimate Badge ----------
function DeliveryEstimate({ city }: { city: string }) {
  if (!city) return null;

  const estimate = getDeliveryEstimate(city);

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mt-2"
    >
      <Clock size={14} className="text-blue-600 flex-shrink-0" />
      <span className="text-xs text-blue-700">
        Livraison estimee a <strong>{city}</strong> : <strong>{estimate}</strong>
      </span>
    </motion.div>
  );
}

// ---------- Shipping Progress Bar ----------
function ShippingProgressBar({ subtotal }: { subtotal: number }) {
  const info = getShippingInfo(subtotal);

  if (info.isFree) {
    return (
      <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 text-xs text-green-700">
        <Truck size={14} />
        <span className="font-medium">Livraison gratuite !</span>
      </div>
    );
  }

  const progress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  return (
    <div className="bg-amber-50 rounded-lg px-3 py-2.5">
      <div className="flex items-center justify-between text-xs text-amber-800 mb-1.5">
        <span className="flex items-center gap-1">
          <Truck size={12} />
          Plus que <strong>{formatPrice(info.remaining)}</strong> pour la
          livraison gratuite
        </span>
      </div>
      <div className="w-full h-1.5 bg-amber-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-brand-gold rounded-full"
        />
      </div>
    </div>
  );
}

// ---------- Main Checkout Page ----------
export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoResult | null>(null);

  const shippingInfo = getShippingInfo(total);
  const discount = appliedPromo?.discount || 0;
  const grandTotal = total - discount + shippingInfo.cost;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
  });

  const selectedCity = useWatch({ control, name: "customerCity" });

  // Track begin_checkout
  const trackCheckout = useCallback(() => {
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
  }, [items, total]);

  useEffect(() => {
    trackCheckout();
  }, [trackCheckout]);

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
          promoCode: appliedPromo?.code || null,
          discount: discount,
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
        `/confirmation?order=${order.orderNumber}&total=${order.total}&city=${encodeURIComponent(data.customerCity)}&name=${encodeURIComponent(data.customerName)}`
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-page py-6 md:py-8">
      {/* Progress Bar */}
      <ProgressBar currentStep={1} />

      <h1 className="section-title mb-6">Finaliser ma commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Delivery Info Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-5 md:p-6 shadow-sm space-y-5"
            >
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
                  placeholder="06XXXXXXXX ou +212XXXXXXXXX"
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
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} - Livraison {city.deliveryDays}
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
                <AnimatePresence>
                  {selectedCity && <DeliveryEstimate city={selectedCity} />}
                </AnimatePresence>
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
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-5 md:p-6 shadow-sm"
            >
              <h2 className="font-display text-lg font-bold flex items-center gap-2 mb-4">
                <CreditCard size={20} className="text-brand-gold" />
                Mode de paiement
              </h2>
              <div className="border-2 border-brand-gold bg-brand-gold/5 rounded-lg p-4 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-brand-gold flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                </div>
                <div>
                  <p className="font-medium text-sm text-brand-black">
                    Paiement a la livraison (COD)
                  </p>
                  <p className="text-xs text-gray-500">
                    Payez en especes quand vous recevez votre colis
                  </p>
                </div>
                <Package size={20} className="text-brand-gold ml-auto" />
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button - Mobile only */}
            <div className="lg:hidden">
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full"
              >
                Confirmer la commande - {formatPrice(grandTotal)}
              </Button>
            </div>

            {/* Submit Button - Desktop (inside form for form submission) */}
            <div className="hidden lg:block">
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full"
              >
                Confirmer la commande - {formatPrice(grandTotal)}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Paiement a la livraison (COD) - Aucun paiement en ligne requis
              </p>
            </div>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-first lg:order-last">
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm sticky top-24 space-y-4">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <ShoppingBag size={18} className="text-brand-gold" />
              Recapitulatif ({items.length}{" "}
              {items.length > 1 ? "articles" : "article"})
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-3"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    {item.quantity > 1 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.quantity}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    {item.selectedSize && (
                      <p className="text-xs text-gray-500">
                        Taille: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {item.quantity > 1 && `${item.quantity} x ${formatPrice(item.price)}`}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-brand-gold whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Shipping Progress */}
            <ShippingProgressBar subtotal={total} />

            {/* Promo Code */}
            <PromoCodeInput
              subtotal={total}
              onApply={setAppliedPromo}
              onRemove={() => setAppliedPromo(null)}
              appliedPromo={appliedPromo}
            />

            {/* Totals */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <AnimatePresence>
                {discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-sm text-green-600"
                  >
                    <span>Remise ({appliedPromo?.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Livraison</span>
                <span>
                  {shippingInfo.isFree ? (
                    <span className="text-green-600 font-medium">
                      Gratuite
                    </span>
                  ) : (
                    formatPrice(shippingInfo.cost)
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

            {/* Trust Badges */}
            <TrustBadges />
          </div>
        </div>
      </div>
    </div>
  );
}
