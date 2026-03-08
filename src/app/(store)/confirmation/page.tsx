"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Package,
  MapPin,
  Clock,
  ShoppingBag,
  Share2,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  getOrderShareMessage,
  getOrderConfirmationWhatsAppMessage,
  getWhatsAppLink,
} from "@/lib/whatsapp";
import { getDeliveryEstimate } from "@/lib/moroccan-cities";
import { pixelPurchase, gaPurchase } from "@/lib/analytics";

// ---------- Animated Checkmark ----------
function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      className="relative w-24 h-24 mx-auto mb-6"
    >
      {/* Outer ring pulse */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 0 }}
        transition={{ delay: 0.5, duration: 1, repeat: 2 }}
        className="absolute inset-0 rounded-full bg-green-200"
      />
      {/* Inner circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 250 }}
        className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-200"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
        </motion.div>
      </motion.div>
      {/* Confetti particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 10)],
            y: [0, -(20 + i * 8)],
          }}
          transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
          className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
            [
              "bg-brand-gold",
              "bg-green-400",
              "bg-purple-400",
              "bg-blue-400",
              "bg-pink-400",
              "bg-amber-400",
            ][i]
          }`}
        />
      ))}
    </motion.div>
  );
}

// ---------- Progress Steps (completed state) ----------
function CompletedSteps() {
  const steps = [
    { label: "Panier", icon: ShoppingBag },
    { label: "Informations", icon: MapPin },
    { label: "Confirmation", icon: Check },
  ];

  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div
              key={step.label}
              className="flex flex-col items-center flex-1"
            >
              <div className="relative flex items-center w-full">
                {i > 0 && (
                  <div className="absolute left-0 right-1/2 h-0.5 top-4 -translate-y-1/2 bg-green-400" />
                )}
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 right-0 h-0.5 top-4 -translate-y-1/2 bg-green-400" />
                )}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className={`relative z-10 mx-auto w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 2
                      ? "bg-green-500 text-white ring-4 ring-green-100"
                      : "bg-green-400 text-white"
                  }`}
                >
                  {i < 2 ? (
                    <Check size={14} />
                  ) : (
                    <StepIcon size={14} />
                  )}
                </motion.div>
              </div>
              <span
                className={`mt-1.5 text-[10px] font-medium ${
                  i === 2 ? "text-green-600" : "text-green-500"
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

// ---------- Social Share ----------
function SocialShare({
  orderNumber,
  total,
}: {
  orderNumber: string;
  total: number;
}) {
  const [copied, setCopied] = useState(false);
  const shareMessage = getOrderShareMessage({ orderNumber, total });
  const whatsappLink = getWhatsAppLink(shareMessage);
  const siteUrl = "https://dahab.ma";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Decouvrez DAHAB, de magnifiques bijoux faits main ! ${siteUrl}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    siteUrl
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Je viens de commander de magnifiques bijoux chez DAHAB ! ${siteUrl}`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-xl p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={18} className="text-brand-gold" />
        <h3 className="font-display font-bold text-sm">
          Partagez avec vos amies
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg py-2.5 px-3 text-sm font-medium transition-colors"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg py-2.5 px-3 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </a>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white rounded-lg py-2.5 px-3 text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X (Twitter)
        </a>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2.5 px-3 text-sm font-medium transition-colors"
        >
          {copied ? (
            <Check size={16} className="text-green-600" />
          ) : (
            <Copy size={16} />
          )}
          {copied ? "Copie !" : "Copier le lien"}
        </button>
      </div>
    </motion.div>
  );
}

// ---------- Main Content ----------
function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "DAH-XXXX";
  const total = parseFloat(searchParams.get("total") || "0");
  const city = searchParams.get("city") || "";
  const customerName = searchParams.get("name") || "";
  const deliveryEstimate = city ? getDeliveryEstimate(city) : "2-5 jours";

  // WhatsApp confirmation link
  const confirmationMessage = getOrderConfirmationWhatsAppMessage({
    orderNumber,
    customerName,
    customerCity: city,
    total,
  });
  const confirmationLink = getWhatsAppLink(confirmationMessage);

  useEffect(() => {
    pixelPurchase({
      orderId: orderNumber,
      value: total,
      items: [],
    });
    gaPurchase({
      transactionId: orderNumber,
      value: total,
      shipping: 0,
      items: [],
    });
  }, [orderNumber, total]);

  const handleConfirmClick = () => {
    fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "whatsapp_order_confirmation",
        orderNumber,
        total,
      }),
    }).catch(() => {
      // Silently fail
    });
  };

  return (
    <div className="container-page py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto"
      >
        {/* Progress Steps */}
        <CompletedSteps />

        {/* Animated Checkmark */}
        <AnimatedCheckmark />

        {/* Thank You Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-3xl font-bold text-brand-black mb-2">
            {customerName
              ? `Merci ${customerName.split(" ")[0]} !`
              : "Merci pour votre commande !"}
          </h1>
          <p className="text-gray-600">
            Votre commande a ete enregistree avec succes
          </p>
        </motion.div>

        {/* Order Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-4"
        >
          {/* Order number */}
          <div className="text-center mb-4 pb-4 border-b border-dashed">
            <p className="text-sm text-gray-500 mb-1">Numero de commande</p>
            <p className="font-display text-2xl font-bold text-brand-gold tracking-wide">
              {orderNumber}
            </p>
          </div>

          {/* Order details grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <Package size={18} className="text-brand-gold mx-auto mb-1" />
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-display font-bold text-brand-black">
                {formatPrice(total)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <Clock size={18} className="text-brand-gold mx-auto mb-1" />
              <p className="text-xs text-gray-500">Livraison estimee</p>
              <p className="font-display font-bold text-brand-black">
                {deliveryEstimate}
              </p>
            </div>
          </div>

          {/* Info items */}
          <div className="space-y-2.5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={12} className="text-blue-600" />
              </div>
              <span>
                {city
                  ? `Livraison a ${city}`
                  : "Paiement a la livraison (COD)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle size={12} className="text-green-600" />
              </div>
              <span>Paiement a la livraison en especes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={12} className="text-amber-600" />
              </div>
              <span>
                Notre equipe vous contactera par WhatsApp pour confirmer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Confirm on WhatsApp - Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-4"
        >
          <a
            href={confirmationLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleConfirmClick}
            className="group flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl font-bold text-lg text-white bg-[#25D366] hover:bg-[#20BD5A] active:bg-[#1DA851] transition-all duration-200 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <Send
              size={24}
              className="transition-transform duration-200 group-hover:scale-110 group-hover:translate-x-0.5"
            />
            Confirmer sur WhatsApp
          </a>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Envoyez les details de votre commande pour une confirmation rapide
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 mb-4"
        >
          <Link href="/suivi">
            <Button variant="outline" size="lg" className="w-full gap-2">
              <Package size={18} />
              Suivre ma commande
            </Button>
          </Link>

          <Link href="/boutique">
            <Button
              variant="ghost"
              size="lg"
              className="w-full gap-2 mt-2"
            >
              <ShoppingBag size={18} />
              Continuer mes achats
              <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>

        {/* Social Share */}
        <SocialShare orderNumber={orderNumber} total={total} />
      </motion.div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-12 text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2" />
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
