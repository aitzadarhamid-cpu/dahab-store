"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, CheckCircle, Truck, MapPin, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface OrderTrackResult {
  orderNumber: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  customerName: string;
  customerCity: string;
  createdAt: string;
  items: {
    name: string;
    image: string;
    quantity: number;
    price: number;
    size: string | null;
  }[];
}

const statusSteps = [
  { key: "EN_ATTENTE", label: "En attente", icon: Clock, color: "text-yellow-500" },
  { key: "CONFIRMEE", label: "Confirmee", icon: CheckCircle, color: "text-blue-500" },
  { key: "EXPEDIEE", label: "Expediee", icon: Truck, color: "text-indigo-500" },
  { key: "LIVREE", label: "Livree", icon: MapPin, color: "text-green-500" },
];

function getStatusIndex(status: string) {
  if (status === "ANNULEE") return -1;
  return statusSteps.findIndex((s) => s.key === status);
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<OrderTrackResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: orderNumber.trim(), phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Erreur de connexion");
    }
    setLoading(false);
  };

  const activeIndex = result ? getStatusIndex(result.status) : -1;
  const isCancelled = result?.status === "ANNULEE";

  return (
    <div className="container-page py-8 max-w-2xl mx-auto">
      <h1 className="section-title mb-2">Suivre ma commande</h1>
      <p className="text-gray-500 text-center mb-8">
        Entrez votre numero de commande et telephone pour suivre votre colis
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="space-y-4">
          <Input
            label="Numero de commande"
            placeholder="DAH-XXXX"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
            required
          />
          <Input
            label="Telephone"
            placeholder="06XXXXXXXX"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
          )}
          <Button type="submit" loading={loading} className="w-full gap-2">
            <Search size={16} /> Rechercher
          </Button>
        </div>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Status timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg">
                Commande {result.orderNumber}
              </h2>
              <span className="text-xs text-gray-400">
                {new Date(result.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>

            {isCancelled ? (
              <div className="flex items-center gap-3 bg-red-50 p-4 rounded-xl">
                <XCircle size={24} className="text-red-500" />
                <div>
                  <p className="font-bold text-red-700">Commande annulee</p>
                  <p className="text-sm text-red-600">Cette commande a ete annulee</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="flex justify-between">
                  {statusSteps.map((step, i) => {
                    const StepIcon = step.icon;
                    const isActive = i <= activeIndex;
                    const isCurrent = i === activeIndex;

                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                            isActive
                              ? isCurrent
                                ? "bg-brand-gold text-white scale-110 shadow-lg"
                                : "bg-brand-gold/20 text-brand-gold"
                              : "bg-gray-100 text-gray-300"
                          }`}
                        >
                          <StepIcon size={18} />
                        </div>
                        <span
                          className={`text-[10px] md:text-xs text-center ${
                            isActive ? "font-bold text-brand-black" : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Progress bar */}
                <div className="absolute top-5 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10">
                  <div
                    className="h-full bg-brand-gold transition-all duration-500"
                    style={{
                      width: `${activeIndex >= 0 ? (activeIndex / (statusSteps.length - 1)) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-display font-bold mb-4">Details</h3>
            <div className="space-y-3">
              {result.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      x{item.quantity} {item.size && `• Taille: ${item.size}`}
                    </p>
                  </div>
                  <span className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Sous-total</span>
                <span>{formatPrice(result.subtotal)}</span>
              </div>
              {result.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Remise</span>
                  <span>-{formatPrice(result.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Livraison</span>
                <span>{result.shipping === 0 ? "Gratuite" : formatPrice(result.shipping)}</span>
              </div>
              <div className="flex justify-between font-display font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-brand-gold">{formatPrice(result.total)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
