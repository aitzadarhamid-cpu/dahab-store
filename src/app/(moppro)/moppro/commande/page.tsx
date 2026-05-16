'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Lock, Truck, Shield, CreditCard, Check } from 'lucide-react';
import { useCart } from '@/components/moppro/CartContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

export default function CommandePage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'delivery' | 'payment'>('delivery');

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormData>();

  const withUpsell = items.some((i) => i.id === 'moppro-eponge');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/moppro/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: `${data.firstName} ${data.lastName}`,
          customerEmail: data.email,
          customerPhone: data.phone,
          customerAddress: `${data.address}, ${data.postalCode} ${data.city}`,
          customerCity: data.city,
          items: items.map((i) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal: total,
          shipping: 0,
          total: total,
          withUpsell,
        }),
      });
      const result = await res.json();
      clearCart();
      router.push(
        `/moppro/confirmation?order=${result.order.orderNumber}&total=${total.toFixed(2)}`
      );
    } catch {
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    const valid = await trigger(['firstName', 'lastName', 'email', 'phone', 'address', 'postalCode', 'city']);
    if (valid) setStep('payment');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center px-4">
        <p className="text-white mb-4">Votre panier est vide.</p>
        <button onClick={() => router.push('/moppro')} className="bg-cyan-500 text-[#0a0f1e] font-bold py-3 px-8 rounded-xl">
          Retour au produit
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/moppro/panier')} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-black text-white">Finaliser ma commande</h1>
          <Lock className="w-4 h-4 text-cyan-400 ml-auto" />
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {['Panier', 'Commande', 'Confirmation'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i <= 1 ? 'bg-cyan-500 text-[#0a0f1e]' : 'bg-white/10 text-gray-500'
              }`}>
                {i < 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs ${i === 1 ? 'text-white font-semibold' : i < 1 ? 'text-cyan-400' : 'text-gray-600'}`}>{s}</span>
              {i < 2 && <div className="flex-1 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* DELIVERY STEP */}
          {step === 'delivery' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-cyan-400" />
                <h2 className="text-white font-bold">Adresse de livraison</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Prénom *</label>
                  <input
                    {...register('firstName', { required: 'Requis' })}
                    placeholder="Marie"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Nom *</label>
                  <input
                    {...register('lastName', { required: 'Requis' })}
                    placeholder="Dupont"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                  />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email *</label>
                <input
                  {...register('email', {
                    required: 'Requis',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
                  })}
                  type="email"
                  placeholder="marie@exemple.com"
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Téléphone *</label>
                <input
                  {...register('phone', { required: 'Requis', minLength: { value: 10, message: 'Numéro invalide' } })}
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Adresse *</label>
                <input
                  {...register('address', { required: 'Requis' })}
                  placeholder="12 rue de la Paix"
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Code postal *</label>
                  <input
                    {...register('postalCode', { required: 'Requis', pattern: { value: /^\d{5}$/, message: '5 chiffres requis' } })}
                    placeholder="75001"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                  />
                  {errors.postalCode && <p className="text-red-400 text-xs mt-1">{errors.postalCode.message}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Ville *</label>
                  <input
                    {...register('city', { required: 'Requis' })}
                    placeholder="Paris"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>
              </div>

              {/* Delivery info */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-center gap-3">
                <Truck className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-bold text-sm">Livraison GRATUITE</p>
                  <p className="text-gray-400 text-xs">Estimée sous 3 à 5 jours ouvrés</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a0f1e] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                Continuer vers le paiement
              </button>
            </div>
          )}

          {/* PAYMENT STEP */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button type="button" onClick={() => setStep('delivery')} className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h2 className="text-white font-bold">Informations de paiement</h2>
                <Lock className="w-4 h-4 text-green-400 ml-auto" />
              </div>

              {/* Delivery recap */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-xs text-gray-400">
                <p className="font-semibold text-white mb-1">Livraison à :</p>
                <p>{getValues('firstName')} {getValues('lastName')} · {getValues('phone')}</p>
                <p>{getValues('address')}, {getValues('postalCode')} {getValues('city')}</p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-400 text-center">
                🔒 Paiement simulé — Aucune carte réellement débitée
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Nom sur la carte *</label>
                <input
                  {...register('cardName', { required: 'Requis' })}
                  placeholder="Marie Dupont"
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Numéro de carte *</label>
                <input
                  {...register('cardNumber', { required: 'Requis' })}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Expiration *</label>
                  <input
                    {...register('cardExpiry', { required: 'Requis' })}
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">CVV *</label>
                  <input
                    {...register('cardCvv', { required: 'Requis' })}
                    placeholder="123"
                    maxLength={3}
                    type="password"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm font-mono"
                  />
                </div>
              </div>

              {/* Order recap */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
                <h3 className="text-white font-bold text-sm mb-3">Votre commande</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.name} × {item.quantity}</span>
                    <span className="text-white">{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Livraison</span>
                  <span className="text-green-400">Gratuite</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white text-lg">{total.toFixed(2)} €</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a0f1e] shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0a0f1e]/30 border-t-[#0a0f1e] rounded-full animate-spin" />
                    Traitement...
                  </span>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Confirmer ma commande — {total.toFixed(2)} €
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Shield className="w-3 h-3" /> Paiement SSL 256-bit
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Shield className="w-3 h-3" /> Données chiffrées
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
