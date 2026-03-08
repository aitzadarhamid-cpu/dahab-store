"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { getOrderShareMessage, getWhatsAppLink } from "@/lib/whatsapp";
import { pixelPurchase, gaPurchase } from "@/lib/analytics";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "DAH-XXXX";
  const total = parseFloat(searchParams.get("total") || "0");

  const shareMessage = getOrderShareMessage({ orderNumber, total });
  const shareLink = getWhatsAppLink(shareMessage);

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

  return (
    <div className="container-page py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-green-600" />
        </motion.div>

        <h1 className="font-display text-3xl font-bold text-brand-black mb-2">
          Merci pour votre commande !
        </h1>
        <p className="text-gray-600 mb-6">
          Votre commande a ete enregistree avec succes
        </p>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-1">Numero de commande</p>
          <p className="font-display text-2xl font-bold text-brand-gold mb-4">
            {orderNumber}
          </p>
          <p className="text-sm text-gray-500 mb-1">Total</p>
          <p className="font-display text-xl font-bold text-brand-black mb-4">
            {formatPrice(total)}
          </p>
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <p>Paiement a la livraison (COD)</p>
            <p>Livraison estimee: 2-5 jours ouvrables</p>
            <p>
              Notre equipe vous contactera par WhatsApp pour confirmer votre
              commande
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <a href={shareLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="secondary"
              size="lg"
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A]"
            >
              <MessageCircle size={20} />
              Partager sur WhatsApp
            </Button>
          </a>

          <Link href="/boutique">
            <Button variant="outline" size="lg" className="w-full gap-2 mt-2">
              Continuer mes achats
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-12 text-center">
          <p>Chargement...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
