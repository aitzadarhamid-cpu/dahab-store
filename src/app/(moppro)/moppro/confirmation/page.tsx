'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Truck, Package, RotateCcw, ArrowLeft, Share2 } from 'lucide-react';
import { Suspense } from 'react';

function ConfirmationContent() {
  const router = useRouter();
  const params = useSearchParams();
  const orderNumber = params.get('order') ?? 'MP-000000';
  const total = params.get('total') ?? '29.90';
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
    const t = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const dateStr = estimatedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-10 flex flex-col items-center justify-center">
      {/* Confetti effect */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`,
                backgroundColor: ['#00d4ff', '#fbbf24', '#34d399', '#f472b6'][i % 4],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-md w-full">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(52,211,153,0.2)]">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Commande confirmée !</h1>
          <p className="text-gray-400">
            Merci pour votre confiance. Votre MopPro Elite est en préparation.
          </p>
        </div>

        {/* Order details card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
            <div>
              <p className="text-gray-400 text-xs">Numéro de commande</p>
              <p className="text-cyan-400 font-black text-lg">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Total payé</p>
              <p className="text-white font-black text-xl">{parseFloat(total).toFixed(2)} €</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Commande reçue</p>
                <p className="text-gray-500 text-xs">Confirmation envoyée par email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Préparation en cours</p>
                <p className="text-gray-500 text-xs">Expédition sous 24h</p>
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

        {/* Satisfaction guarantee */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">Satisfait ou remboursé 30 jours</p>
              <p className="text-gray-400 text-xs mt-0.5">
                Si le MopPro Elite ne vous convient pas, retournez-le gratuitement sous 30 jours.
              </p>
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6 text-center">
          <p className="text-gray-400 text-sm mb-3">
            Vous aimez le MopPro Elite ? Partagez avec vos proches !
          </p>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'MopPro Elite',
                  text: 'J\'ai trouvé un balai serpillière incroyable ! Essorage automatique, tête 360°... et seulement 29,90€ avec livraison offerte.',
                  url: window.location.origin + '/moppro',
                });
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
            Voir les commandes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
