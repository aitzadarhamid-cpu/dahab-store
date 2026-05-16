'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Package,
} from 'lucide-react';
import { useCart } from '@/components/moppro/CartContext';

const UPSELL = {
  id: 'moppro-eponge',
  name: 'Pack 2 éponges de rechange PVA',
  price: 4.9,
  quantity: 1,
  desc: 'Prolongez la durée de vie de votre MopPro Elite. Les mêmes éponges ultra-absorbantes.',
};

export default function PanierPage() {
  const router = useRouter();
  const { items, addItem, removeItem, updateQuantity, total, itemCount } = useCart();
  const [upsellAdded, setUpsellAdded] = useState(
    items.some((i) => i.id === UPSELL.id)
  );

  const handleUpsell = () => {
    addItem(UPSELL);
    setUpsellAdded(true);
  };

  const shipping = 0;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center px-4">
        <ShoppingCart className="w-16 h-16 text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Votre panier est vide</h1>
        <p className="text-gray-400 mb-6">Découvrez le MopPro Elite !</p>
        <button
          onClick={() => router.push('/moppro')}
          className="bg-cyan-500 text-[#0a0f1e] font-bold py-3 px-8 rounded-xl hover:bg-cyan-400 transition-colors"
        >
          Voir le produit
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.push('/moppro')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-black text-white">
            Mon panier <span className="text-cyan-400">({itemCount})</span>
          </h1>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {['Panier', 'Commande', 'Confirmation'].map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i === 0 ? 'bg-cyan-500 text-[#0a0f1e]' : 'bg-white/10 text-gray-500'
              }`}>
                {i + 1}
              </div>
              <span className={`text-xs ${i === 0 ? 'text-white font-semibold' : 'text-gray-600'}`}>{step}</span>
              {i < 2 && <div className="flex-1 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        {/* Cart items */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4"
            >
              <div className="flex items-start gap-4">
                {/* Product visual */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  {item.id === 'moppro-elite' ? (
                    <Package className="w-7 h-7 text-cyan-400" />
                  ) : (
                    <Star className="w-7 h-7 text-yellow-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-snug">{item.name}</p>
                  <p className="text-cyan-400 font-black mt-1">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  {item.id === 'moppro-elite' && (
                    <p className="text-gray-500 text-xs mt-1">Livraison offerte incluse</p>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-600 hover:text-red-400 transition-colors mt-0.5 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {/* Quantity */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-gray-500">Qté :</span>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-white text-sm font-bold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* UPSELL */}
        {!upsellAdded && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-yellow-400 text-xs font-black uppercase tracking-wider">
                    Offre exclusive
                  </span>
                </div>
                <p className="text-white font-bold text-sm">{UPSELL.name}</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{UPSELL.desc}</p>
                <button
                  onClick={handleUpsell}
                  className="mt-3 flex items-center gap-1.5 bg-yellow-400 text-[#0a0f1e] font-black text-sm px-4 py-2 rounded-xl hover:bg-yellow-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter pour seulement +{UPSELL.price.toFixed(2)} €
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order summary */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-6">
          <h3 className="text-white font-bold mb-4">Récapitulatif</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-white">{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Livraison</span>
              <span className="text-green-400 font-semibold">Gratuite</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between">
              <span className="text-white font-bold">Total</span>
              <span className="text-2xl font-black text-white">{grandTotal.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="flex items-center justify-center gap-5 mb-6 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Truck className="w-3.5 h-3.5 text-cyan-400" /> Livraison offerte
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Shield className="w-3.5 h-3.5 text-cyan-400" /> Paiement sécurisé
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> 30j remboursé
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/moppro/commande')}
          className="w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a0f1e] shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Commander — {grandTotal.toFixed(2)} €
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
