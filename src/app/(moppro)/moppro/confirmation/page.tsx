'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Truck,
  Package,
  RotateCcw,
  ArrowLeft,
  Share2,
  MessageCircle,
  Loader2,
} from 'lucide-react';

interface OrderInfo {
  orderNumber: string;
  total: string;
  waLink?: string;
}

function ConfirmationContent() {
  const router = useRouter();
  const params = useSearchParams();

  const sessionId = params.get('session_id');
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(!!sessionId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      // Stripe flow: verify session
      fetch(`/api/moppro/verify-payment?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setOrderInfo({
              orderNumber: data.order.orderNumber,
              total: data.order.total.toFixed(2),
              waLink: data.waLink,
            });
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Erreur de vérification. Contactez le support.');
          setLoading(false);
        });
    } else {
      // Simulated flow
      const order = params.get('order') ?? 'MP-000000';
      const total = params.get('total') ?? '29.90';
      const wa = params.get('wa') ?? '';
      setOrderInfo({ orderNumber: order, total, waLink: wa ? decodeURIComponent(wa) : undefined });
    }
  }, [sessionId, params]);

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const dateStr = estimatedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
        <p className="text-gray-400">Confirmation du paiement en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <button
          onClick={() => router.push('/moppro')}
          className="bg-cyan-500 text-[#0a0f1e] font-bold py-3 px-8 rounded-xl"
        >
          Retour au site
        </button>
      </div>
    );
  }

  if (!orderInfo) return null;

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-10 flex flex-col items-center justify-center">
      {/* Confetti dots */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-bounce"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 13 + 5) % 35}%`,
              backgroundColor: ['#00d4ff', '#fbbf24', '#34d399', '#f472b6'][i % 4],
              animationDelay: `${(i * 0.12) % 0.6}s`,
              animationDuration: `${0.6 + (i % 3) * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full relative">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(52,211,153,0.2)]">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Commande confirmée !</h1>
          <p className="text-gray-400">
            Merci ! Votre MopPro Elite est en cours de préparation.
          </p>
        </div>

        {/* Order details */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-5">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
            <div>
              <p className="text-gray-400 text-xs">N° de commande</p>
              <p className="text-cyan-400 font-black text-lg">{orderInfo.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Total payé</p>
              <p className="text-white font-black text-xl">
                {parseFloat(orderInfo.total).toFixed(2)} €
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Paiement reçu</p>
                <p className="text-gray-500 text-xs">Confirmation par email envoyée</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Préparation en cours</p>
                <p className="text-gray-500 text-xs">Expédition sous 24h ouvrées</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Livraison estimée</p>
                <p className="text-gray-500 text-xs capitalize">{dateStr}</p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp confirm button */}
        {orderInfo.waLink && (
          <a
            href={orderInfo.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-600/20 border border-green-500/40 hover:bg-green-600/30 transition-colors rounded-2xl p-4 mb-5"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Confirmer via WhatsApp</p>
              <p className="text-gray-400 text-xs">
                Envoyez votre confirmation directement au vendeur
              </p>
            </div>
          </a>
        )}

        {/* Guarantee */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">Satisfait ou remboursé 30 jours</p>
              <p className="text-gray-400 text-xs mt-0.5">
                Le MopPro Elite ne vous convient pas ? Retournez-le gratuitement.
              </p>
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6 text-center">
          <p className="text-gray-400 text-sm mb-3">Partagez le MopPro Elite avec vos proches !</p>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'MopPro Elite',
                  text: "J'ai trouvé un balai serpillière incroyable ! Essorage automatique, tête 360°, 29,90€ avec livraison offerte.",
                  url: window.location.origin + '/moppro',
                });
              } else {
                navigator.clipboard.writeText(window.location.origin + '/moppro');
                alert('Lien copié !');
              }
            }}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white mx-auto transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Partager le produit
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/moppro')}
            className="flex-1 flex items-center justify-center gap-2 bg-white/[0.05] border border-white/[0.1] text-white font-bold py-3 rounded-xl hover:bg-white/[0.08] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour boutique
          </button>
          <button
            onClick={() => router.push('/moppro/admin')}
            className="flex-1 flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold py-3 rounded-xl hover:bg-cyan-500/20 transition-colors text-sm"
          >
            Voir l'admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
