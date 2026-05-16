'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Star,
  Check,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Droplets,
  Zap,
  Wind,
  Layers,
  ArrowRight,
  Package,
  Users,
  Award,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCart } from '@/components/moppro/CartContext';

const Countdown = dynamic(() => import('@/components/moppro/Countdown'), { ssr: false });

const REVIEWS = [
  {
    name: 'Marie L.',
    city: 'Lyon',
    rating: 5,
    date: 'il y a 3 jours',
    text: "Incroyable ! Mes sols n'ont jamais été aussi propres. L'essorage automatique change vraiment la vie, plus besoin de se salir les mains. Je recommande à 100% !",
  },
  {
    name: 'Thomas B.',
    city: 'Paris',
    rating: 5,
    date: 'il y a 1 semaine',
    text: "J'avais des doutes au départ mais ce balai est vraiment top. La tête rotative à 360° atteint tous les coins facilement. Livraison ultra rapide en plus !",
  },
  {
    name: 'Sophie R.',
    city: 'Bordeaux',
    rating: 4,
    date: 'il y a 2 semaines',
    text: "Très bon produit, robuste et efficace. Mon seul bémol est que la première éponge a mis un peu de temps à absorber optimalement. Après ça, nickel !",
  },
  {
    name: 'Jean-Marc D.',
    city: 'Nice',
    rating: 5,
    date: 'il y a 2 semaines',
    text: "Ma femme est conquise ! On a du carrelage partout et ça nettoie en un rien de temps. Le manche télescopique est parfait pour adapter la hauteur.",
  },
  {
    name: 'Isabelle K.',
    city: 'Marseille',
    rating: 5,
    date: 'il y a 3 semaines',
    text: "Parfait pour mon grand appartement. L'éponge double rouleau absorbe vraiment beaucoup plus qu'un serpillière classique. Très satisfaite de mon achat !",
  },
];

const ADVANTAGES = [
  {
    icon: Zap,
    title: 'Essorage automatique sans les mains',
    desc: "Un simple appui sur le levier et l'éponge est parfaitement essorée. Fini les mains mouillées !",
  },
  {
    icon: RotateCcw,
    title: 'Tête rotative 360°',
    desc: 'Atteint tous les coins et recoins difficiles. Passe sous les meubles avec une facilité déconcertante.',
  },
  {
    icon: Layers,
    title: 'Compatible toutes surfaces',
    desc: 'Parquet, carrelage, béton ciré, marbre... Nettoyage parfait sans rayure ni résidu.',
  },
  {
    icon: Wind,
    title: 'Manche télescopique 90–130 cm',
    desc: "En aluminium léger, il s'adapte à votre taille pour une posture idéale. Plus de mal de dos !",
  },
  {
    icon: Droplets,
    title: 'Double éponge PVA ultra-absorbante',
    desc: "Deux rouleaux éponge qui absorbent 2× plus qu'une serpillière classique. Sol séché en 2 minutes.",
  },
  {
    icon: Package,
    title: 'Éponge remplaçable — zéro gaspillage',
    desc: 'Les éponges sont remplaçables individuellement. Économique et écologique sur le long terme.',
  },
];

const STEPS = [
  {
    num: '01',
    icon: Droplets,
    title: 'Plongez',
    desc: "Trempez la tête dans un seau d'eau propre. L'éponge PVA absorbe instantanément.",
  },
  {
    num: '02',
    icon: Zap,
    title: 'Essorez',
    desc: 'Pressez le levier central. Essorage automatique parfait, mains propres et sèches.',
  },
  {
    num: '03',
    icon: RotateCcw,
    title: 'Nettoyez',
    desc: 'La tête rotative 360° glisse partout. Coins, bords, sous les meubles — tout y passe.',
  },
  {
    num: '04',
    icon: Package,
    title: 'Rangez',
    desc: 'Compact, léger et facile à ranger. Prêt pour la prochaine utilisation.',
  },
];

const SPECS = [
  { label: 'Matière éponge', value: 'PVA antibactérienne haute densité' },
  { label: 'Longueur du manche', value: '90–130 cm (télescopique)' },
  { label: 'Rotation de la tête', value: '360°' },
  { label: 'Largeur de la tête', value: '28 cm' },
  { label: 'Matière du manche', value: 'Aluminium léger' },
  { label: 'Surfaces compatibles', value: 'Parquet, carrelage, béton ciré, marbre' },
  { label: 'Essorage', value: 'Automatique par levier central' },
  { label: 'Contenu du pack', value: '1 balai + 2 éponges PVA + 1 seau' },
  { label: 'Garantie', value: 'Satisfait ou remboursé 30 jours' },
  { label: 'Livraison', value: 'Offerte — 3 à 5 jours ouvrés' },
];

function Stars({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-${size} h-${size} ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

export default function MopProPage() {
  const router = useRouter();
  const { addItem, itemCount } = useCart();
  const [stock, setStock] = useState(47);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch('/api/moppro/stock')
      .then((r) => r.json())
      .then((d) => setStock(d.stock))
      .catch(() => {});
  }, []);

  const handleBuy = () => {
    addItem({ id: 'moppro-elite', name: 'MopPro Elite', price: 29.9, quantity: 1 });
    setAdded(true);
    setTimeout(() => {
      router.push('/moppro/panier');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 py-2 px-4 text-center">
        <p className="text-white text-sm font-medium">
          🚚 LIVRAISON OFFERTE &nbsp;|&nbsp; ✅ Satisfait ou remboursé 30 jours &nbsp;|&nbsp; 🔒 Paiement sécurisé
        </p>
      </div>

      {/* Sticky cart badge */}
      {itemCount > 0 && (
        <button
          onClick={() => router.push('/moppro/panier')}
          className="fixed top-4 right-4 z-50 bg-cyan-500 hover:bg-cyan-400 text-[#0a0f1e] font-bold rounded-full p-3 shadow-lg shadow-cyan-500/30 transition-transform hover:scale-110 flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm">{itemCount}</span>
        </button>
      )}

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-10 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,212,255,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-md mx-auto relative">
          {/* Product visual */}
          <div className="relative mx-auto mb-8 w-64 h-72">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-3xl border border-cyan-500/20 shadow-[0_0_60px_rgba(0,212,255,0.12)]" />
            {/* Mop SVG illustration */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative">
                {/* Handle */}
                <div className="w-3 h-40 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full mx-auto mb-0 shadow-md" />
                {/* Lever */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-10 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.6)]" />
                {/* Wringer */}
                <div className="w-14 h-4 bg-gray-700 border border-gray-600 rounded-sm mx-auto" />
                {/* Sponge head */}
                <div className="w-28 h-8 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg mx-auto mt-0.5 shadow-[0_4px_15px_rgba(0,212,255,0.4)] flex items-center justify-center gap-1">
                  <div className="w-12 h-6 bg-cyan-300/30 rounded border border-cyan-400/50" />
                  <div className="w-12 h-6 bg-cyan-300/30 rounded border border-cyan-400/50" />
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <span className="absolute top-3 left-3 bg-yellow-400 text-[#0a0f1e] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              Best Seller
            </span>
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              −40%
            </span>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#0a0f1e]/80 backdrop-blur text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
              ⭐ 4.9 / 5 · 1 247 avis
            </span>
          </div>

          {/* Name & price */}
          <h1 className="text-3xl font-black text-white text-center leading-tight mb-1">
            MopPro Elite
          </h1>
          <p className="text-cyan-400 text-center text-sm font-medium mb-4">
            Balai serpillière double rouleau — essorage automatique
          </p>

          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-gray-500 line-through text-xl">49,90 €</span>
            <span className="text-4xl font-black text-white">29,90 €</span>
          </div>
          <p className="text-center text-green-400 text-sm font-medium mb-6">
            Vous économisez <strong>20,00 €</strong> aujourd'hui !
          </p>

          {/* Stock urgency */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6 text-center">
            <p className="text-red-400 text-sm font-semibold">
              🔥 Plus que <strong>{stock} exemplaires</strong> en stock — Commandez vite !
            </p>
            <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all"
                style={{ width: `${Math.min(100, (stock / 60) * 100)}%` }}
              />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleBuy}
            disabled={added || stock === 0}
            className="w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a0f1e] shadow-[0_0_30px_rgba(0,212,255,0.35)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {added ? (
              <>
                <Check className="w-5 h-5" />
                Ajouté — Redirection...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Acheter maintenant — 29,90 €
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Truck className="w-3.5 h-3.5 text-cyan-400" /> Livraison offerte
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> Paiement sécurisé
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> 30j remboursé
            </span>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ───────────────────────────────── */}
      <div className="bg-[#050810] border-y border-white/5 py-3 px-4">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <span className="flex items-center gap-2 text-xs text-gray-300">
            <Users className="w-4 h-4 text-cyan-400" /> +12 000 clients satisfaits
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-300">
            <Award className="w-4 h-4 text-yellow-400" /> Note moyenne 4,9/5
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-300">
            <Truck className="w-4 h-4 text-green-400" /> Expédition en 24h
          </span>
        </div>
      </div>

      {/* ─── ADVANTAGES ─────────────────────────────────────── */}
      <section className="px-4 py-12 max-w-lg mx-auto">
        <h2 className="text-2xl font-black text-white text-center mb-2">
          Pourquoi choisir le <span className="text-cyan-400">MopPro Elite</span> ?
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">
          Tout ce que vous avez toujours voulu dans un balai serpillière
        </p>
        <div className="space-y-4">
          {ADVANTAGES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:border-cyan-500/20 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────────────── */}
      <section className="px-4 py-12 bg-[#050810]">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-2">
            Comment ça fonctionne ?
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10">
            4 étapes simples pour des sols impeccables
          </p>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent hidden sm:block" />
            <div className="space-y-6">
              {STEPS.map(({ num, icon: Icon, title, desc }) => (
                <div key={num} className="flex gap-5 items-start relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
                    <span className="text-cyan-500/60 text-xs font-mono font-bold">{num}</span>
                    <h3 className="text-white font-bold mb-1">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECS ──────────────────────────────────────────── */}
      <section className="px-4 py-12 max-w-lg mx-auto">
        <h2 className="text-2xl font-black text-white text-center mb-8">
          Fiche technique complète
        </h2>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          {SPECS.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex justify-between items-start gap-4 px-5 py-3.5 ${
                i % 2 === 0 ? 'bg-white/[0.02]' : ''
              } ${i < SPECS.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
            >
              <span className="text-gray-400 text-sm">{label}</span>
              <span className="text-white text-sm font-medium text-right max-w-[55%]">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── REVIEWS ────────────────────────────────────────── */}
      <section className="px-4 py-12 bg-[#050810]">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Ce que disent nos clients</h2>
            <div className="flex items-center justify-center gap-3">
              <Stars rating={5} size={5} />
              <span className="text-white font-bold">4,9/5</span>
              <span className="text-gray-400 text-sm">· 1 247 avis vérifiés</span>
            </div>
          </div>
          <div className="space-y-4">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-cyan-500/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-bold text-sm">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.city} · {r.date}</p>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{r.text}</p>
                <div className="mt-2 flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">Achat vérifié</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COUNTDOWN + FINAL CTA ──────────────────────────── */}
      <section className="px-4 py-12 bg-gradient-to-b from-[#0a0f1e] to-[#050810]">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">
              Offre limitée — Expire ce soir
            </span>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">
            Profitez de <span className="text-cyan-400">−40%</span> maintenant
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Cette offre spéciale se termine à minuit. Ne passez pas à côté !
          </p>

          <Countdown />

          <div className="mt-8 mb-6 p-5 bg-white/[0.03] border border-cyan-500/20 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Prix normal</span>
              <span className="text-gray-500 line-through">49,90 €</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Remise ce soir</span>
              <span className="text-green-400 font-bold">− 20,00 €</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Livraison</span>
              <span className="text-green-400 font-bold">OFFERTE</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between items-center">
              <span className="text-white font-bold">Total</span>
              <span className="text-2xl font-black text-white">29,90 €</span>
            </div>
          </div>

          <button
            onClick={handleBuy}
            disabled={added || stock === 0}
            className="w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a0f1e] shadow-[0_0_30px_rgba(0,212,255,0.35)] hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 animate-pulse-slow"
          >
            <ShoppingCart className="w-5 h-5" />
            Commander maintenant — 29,90 €
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Truck className="w-3.5 h-3.5 text-cyan-400" /> Livraison offerte
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> Paiement SSL
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> 30j remboursé
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-4 py-8 text-center">
        <p className="text-gray-600 text-xs">
          © 2025 MopPro Elite · Tous droits réservés ·{' '}
          <a href="/moppro/admin" className="hover:text-gray-400 transition-colors">
            Admin
          </a>
          {' · '}
          <a href="/moppro/marketing" className="hover:text-gray-400 transition-colors">
            Contenu marketing
          </a>
        </p>
      </footer>
    </div>
  );
}
