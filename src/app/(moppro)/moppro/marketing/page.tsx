'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Copy,
  Check,
  Instagram,
  Play,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

const INSTAGRAM_CAPTIONS = [
  {
    id: 1,
    tag: 'Lifestyle',
    text: `✨ Fini les serpillières qui mouillent les mains !

Le MopPro Elite change TOUT.
→ Essorage automatique en 1 seconde ⚡
→ Tête rotative 360° pour les coins 🔄
→ Compatible parquet, carrelage, béton ciré 🏠

Mes sols brillent et mes mains restent sèches 🙌

🛒 Commandez maintenant → lien en bio
📦 Livraison OFFERTE · ✅ Satisfait ou remboursé 30j

#nettoyage #menage #moppro #astucemaison #sols #propre #balai #serpilliere`,
  },
  {
    id: 2,
    tag: 'Urgence',
    text: `⏰ OFFRE FLASH — 40% de réduction ce soir seulement !

Le MopPro Elite à seulement 29,90€ au lieu de 49,90€

❌ Plus jamais de mains mouillées
❌ Plus de serpillières inefficaces
✅ Essorage automatique
✅ Double éponge PVA ultra-absorbante
✅ Tête 360° pour tous les coins

Il ne reste que quelques exemplaires 👇

#promoflash #bonplan #menage #moppro #nettoyage #maison`,
  },
  {
    id: 3,
    tag: 'Social Proof',
    text: `"Mes sols n'ont jamais été aussi propres !" ⭐⭐⭐⭐⭐

→ Marie L., Lyon

+12 000 clients ont déjà adopté le MopPro Elite 🧹

Ce qui les a convaincus :
→ Essorage sans se salir les mains
→ Tête rotative pour les coins difficiles
→ Livraison gratuite en 3-5 jours

Vous êtes prêt(e) à rejoindre la famille MopPro ? 👇

#avisclients #moppro #nettoyage #menage #sols`,
  },
  {
    id: 4,
    tag: 'Avant/Après',
    text: `AVANT le MopPro Elite 😩
→ 20 minutes pour nettoyer le salon
→ Genoux mouillés, dos en compote
→ Coins jamais propres

APRÈS le MopPro Elite 🤩
→ 8 minutes chrono ⏱️
→ Debout, sans effort
→ Chaque coin impeccable grâce au 360°

La différence ? Un balai qui VRAIMENT innove.

29,90€ · Livraison offerte · 30j remboursé 🔒

#avantapres #moppro #nettoyage #astuces #maison #menage #serpilliere`,
  },
  {
    id: 5,
    tag: 'Éducatif',
    text: `3 raisons pour lesquelles votre serpillière actuelle ne marche pas 🧵

1️⃣ Elle retient les microbes dans l'éponge
→ Le MopPro utilise une éponge PVA antibactérienne remplaçable

2️⃣ Elle ne tourne pas → zones oubliées
→ La tête 360° du MopPro atteint TOUS les coins

3️⃣ L'essorage vous salit les mains
→ Le levier automatique = mains toujours propres

Le MopPro Elite = la solution à tout ça ✅

29,90€ · Lien en bio 👆

#conseil #menage #nettoyage #moppro #astucemaison #serpilliere #hygiene`,
  },
];

const TIKTOK_SCRIPTS = [
  {
    duration: '15s',
    title: 'Hook choc — 15 secondes',
    script: [
      { time: '0s–2s', action: 'HOOK', text: '"POV : ta serpillière te mouille les mains depuis 10 ans…"' },
      { time: '2s–5s', action: 'PROBLÈME', text: 'Montre mains mouillées, grimace dégoûtée' },
      { time: '5s–10s', action: 'SOLUTION', text: 'Révèle le MopPro Elite — essorage automatique en live' },
      { time: '10s–13s', action: 'PREUVE', text: 'Sol impeccable en 3 secondes, mains sèches' },
      { time: '13s–15s', action: 'CTA', text: '"Lien en bio — Livraison gratuite 🎁" + son trending' },
    ],
  },
  {
    duration: '30s',
    title: 'Démonstration produit — 30 secondes',
    script: [
      { time: '0s–3s', action: 'HOOK', text: '"Regardez comment ce balai change TOUT au nettoyage…" (regard caméra)' },
      { time: '3s–8s', action: 'PROBLÈME', text: 'Before : serpillière classique, eau partout, mains dégoulinantes' },
      { time: '8s–15s', action: 'DEMO 1', text: 'Trempe le MopPro dans le seau → levier → ESSORAGE AUTOMATIQUE. Texte : "0 contact avec l\'eau sale"' },
      { time: '15s–22s', action: 'DEMO 2', text: 'Nettoyage coins grâce 360° → zoom → "même sous le meuble !"' },
      { time: '22s–27s', action: 'RÉSULTAT', text: 'Sol brillant, mains sèches, sourire. Texte overlay : "⭐⭐⭐⭐⭐ +12 000 clients"' },
      { time: '27s–30s', action: 'CTA', text: '"29,90€ livraison offerte — Lien en bio !" + musique montante' },
    ],
  },
  {
    duration: '60s',
    title: 'Storytelling complet — 60 secondes',
    script: [
      { time: '0s–5s', action: 'HOOK FORT', text: '"J\'ai dépensé 200€ en serpillières en 2 ans… JUSQU\'À CE QUE…" (cut dramatique)' },
      { time: '5s–15s', action: 'PROBLÈME VÉCU', text: 'Montre les vieilles serpillières ratées, les mains rouges, les coins jamais propres. Ton authentique, frustré.' },
      { time: '15s–20s', action: 'DÉCOUVERTE', text: '"Puis quelqu\'un m\'a recommandé le MopPro Elite..." — déballage du colis en live' },
      { time: '20s–35s', action: 'DEMO COMPLÈTE', text: '1. Trempé → levier → essoré sans les mains. 2. Tête 360° dans les coins. 3. Sous le canapé sans effort. 4. Résultat : sol impeccable' },
      { time: '35s–45s', action: 'RÉACTION', text: '"Je n\'en revenais pas. En 10 minutes, tout l\'appartement." Sourire authentique, gros plan mains sèches.' },
      { time: '45s–52s', action: 'SPECS CLÉS', text: 'Overlay texte rapide : "Éponge PVA · Tête 360° · Manche 90-130cm · Livraison gratuite · 30j remboursé"' },
      { time: '52s–60s', action: 'CTA FORT', text: '"Franchement si vous nettoyez encore à l\'ancienne c\'est dommage. 29,90€ lien en bio. Vous me remercierez 🙏" + son viral' },
    ],
  },
];

const STORIES_SLIDES = [
  {
    id: 1,
    title: 'Slide 1 — Accroche',
    bg: 'from-[#00d4ff]/20 to-[#0a0f1e]',
    border: 'border-cyan-500/40',
    content: {
      badge: '🔥 TENDANCE',
      headline: 'TOI AUSSI TU EN AS MARRE ?',
      subhead: 'Des mains mouillées après la serpillière',
      cta: 'Swipe pour la solution 👉',
      visual: '😤',
    },
  },
  {
    id: 2,
    title: 'Slide 2 — Solution',
    bg: 'from-cyan-600/20 to-[#0a0f1e]',
    border: 'border-cyan-400/40',
    content: {
      badge: '✨ NOUVEAU',
      headline: 'MopPro Elite',
      subhead: 'Essorage automatique · Tête 360° · Double éponge PVA',
      cta: 'Voir le produit 👇',
      visual: '🧹',
    },
  },
  {
    id: 3,
    title: 'Slide 3 — Avantages',
    bg: 'from-purple-600/15 to-[#0a0f1e]',
    border: 'border-purple-500/30',
    content: {
      badge: '💡 LES PLUS',
      headline: '6 RAISONS DE CRAQUER',
      list: [
        '⚡ Essorage auto sans les mains',
        '🔄 Tête rotative 360°',
        '🏠 Compatible toutes surfaces',
        '📏 Manche 90–130 cm',
        '💧 Double éponge ultra-absorbante',
        '♻️ Éponge remplaçable',
      ],
      visual: '',
    },
  },
  {
    id: 4,
    title: 'Slide 4 — Offre + CTA',
    bg: 'from-green-600/15 to-[#0a0f1e]',
    border: 'border-green-500/30',
    content: {
      badge: '⏰ OFFRE LIMITÉE',
      headline: '29,90€',
      subhead: '~~49,90€~~ · Économisez 20€ ce soir',
      extras: ['🚚 Livraison OFFERTE', '✅ Satisfait ou remboursé 30j', '🔒 Paiement sécurisé'],
      cta: 'Commander maintenant →',
      visual: '🎁',
    },
  },
];

const TIKTOK_SHOP_DESC = `🧹 MopPro Elite — Balai Serpillière Double Rouleau Essorage Automatique

✨ POURQUOI LE MOPPRO ELITE ?
Le premier balai serpillière avec essorage automatique SANS les mains. Fini les contacts avec l'eau sale !

⚡ CARACTÉRISTIQUES :
✅ Essorage automatique par levier central — mains 100% sèches
✅ Double rouleau éponge PVA haute densité ultra-absorbante
✅ Tête rotative 360° — atteint tous les coins et sous les meubles
✅ Manche en aluminium télescopique 90–130 cm — adapté à votre taille
✅ Compatible : parquet, carrelage, béton ciré, marbre, vinyle
✅ Éponge remplaçable — économique et écologique

📦 CONTENU DU PACK :
• 1 balai MopPro Elite
• 2 éponges PVA de rechange
• 1 seau avec indicateur de volume

⭐ +12 000 CLIENTS SATISFAITS · Note moyenne 4,9/5

🚚 LIVRAISON OFFERTE
✅ SATISFAIT OU REMBOURSÉ 30 JOURS
🔒 PAIEMENT 100% SÉCURISÉ

#MopProElite #Nettoyage #Ménage #Balai #Serpilliere #Maison #Propre #TikTokShop`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
        copied
          ? 'bg-green-500/20 border-green-500/40 text-green-400'
          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copié !' : 'Copier'}
    </button>
  );
}

export default function MarketingPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('instagram');

  const sections = [
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'tiktok', label: 'TikTok Scripts', icon: Play },
    { id: 'stories', label: 'Stories', icon: Sparkles },
    { id: 'shop', label: 'TikTok Shop', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => router.push('/moppro')} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white">Contenu Marketing</h1>
            <p className="text-xs text-gray-500">MopPro Elite — Prêt à publier</p>
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6 mt-6 scrollbar-hide">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0 transition-all ${
                activeSection === id
                  ? 'bg-cyan-500 text-[#0a0f1e]'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ─── INSTAGRAM CAPTIONS ─── */}
        {activeSection === 'instagram' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Instagram className="w-5 h-5 text-pink-400" />
              <h2 className="text-white font-bold">5 Captions Instagram</h2>
              <span className="text-xs text-gray-500">Prêtes à publier</span>
            </div>
            {INSTAGRAM_CAPTIONS.map((cap) => (
              <div key={cap.id} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-pink-400 bg-pink-400/10 border border-pink-400/20 rounded-full px-3 py-1">
                    #{cap.id} · {cap.tag}
                  </span>
                  <CopyButton text={cap.text} />
                </div>
                <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {cap.text}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* ─── TIKTOK SCRIPTS ─── */}
        {activeSection === 'tiktok' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-5 h-5 text-red-400" />
              <h2 className="text-white font-bold">3 Scripts TikTok</h2>
              <span className="text-xs text-gray-500">Timecoded</span>
            </div>
            {TIKTOK_SCRIPTS.map((script) => (
              <div key={script.duration} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 text-xs font-black border border-red-500/30 rounded-full px-3 py-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {script.duration}
                      </span>
                    </div>
                    <p className="text-white font-bold mt-2">{script.title}</p>
                  </div>
                  <CopyButton text={script.script.map(s => `[${s.time}] ${s.action}: ${s.text}`).join('\n\n')} />
                </div>
                <div className="p-4 space-y-3">
                  {script.script.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 text-right w-20">
                        <span className="text-xs text-cyan-500 font-mono">{step.time}</span>
                      </div>
                      <div className="flex-shrink-0 w-20">
                        <span className="text-xs font-bold text-gray-500 uppercase">{step.action}</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── INSTAGRAM STORIES ─── */}
        {activeSection === 'stories' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-white font-bold">4 Slides Instagram Stories</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STORIES_SLIDES.map((slide) => (
                <div key={slide.id} className="space-y-2">
                  <p className="text-xs text-gray-500">{slide.title}</p>
                  {/* Story mockup */}
                  <div className={`bg-gradient-to-b ${slide.bg} border ${slide.border} rounded-2xl p-4 aspect-[9/16] flex flex-col justify-between relative overflow-hidden`}>
                    {/* Top bar */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className={`flex-1 h-0.5 rounded-full ${n === slide.id ? 'bg-white' : 'bg-white/30'}`} />
                      ))}
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center text-center px-1 py-4">
                      {slide.content.visual && (
                        <div className="text-5xl mb-3">{slide.content.visual}</div>
                      )}
                      {slide.content.badge && (
                        <span className="text-[10px] font-black bg-white/20 backdrop-blur rounded-full px-2 py-0.5 text-white mb-2">
                          {slide.content.badge}
                        </span>
                      )}
                      <p className="text-white font-black text-base leading-tight mb-1">
                        {slide.content.headline}
                      </p>
                      {slide.content.subhead && (
                        <p className="text-white/70 text-[10px] leading-snug">
                          {slide.content.subhead.replace('~~', '').replace('~~', '')}
                        </p>
                      )}
                      {slide.content.list && (
                        <div className="mt-2 space-y-1 text-left w-full">
                          {slide.content.list.map((item) => (
                            <p key={item} className="text-white text-[9px] leading-snug">{item}</p>
                          ))}
                        </div>
                      )}
                      {slide.content.extras && (
                        <div className="mt-2 space-y-1">
                          {slide.content.extras.map((extra) => (
                            <p key={extra} className="text-white/80 text-[9px]">{extra}</p>
                          ))}
                        </div>
                      )}
                    </div>

                    {slide.content.cta && (
                      <div className="bg-white rounded-xl py-2 px-3 text-center">
                        <p className="text-[#0a0f1e] font-black text-[10px]">{slide.content.cta}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {slide.id === 1 && 'Fond sombre · Texte blanc · Emoji expressif'}
                    {slide.id === 2 && 'Couleur cyan · Logo produit · Bullet points'}
                    {slide.id === 3 && 'Liste avantages · Style clean'}
                    {slide.id === 4 && 'Prix barré · Badge urgence · CTA fort'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TIKTOK SHOP DESC ─── */}
        {activeSection === 'shop' && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="w-5 h-5 text-red-400" />
              <h2 className="text-white font-bold">Description TikTok Shop</h2>
              <span className="text-xs text-gray-500">Optimisée SEO</span>
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-400">{TIKTOK_SHOP_DESC.length} caractères</span>
                <CopyButton text={TIKTOK_SHOP_DESC} />
              </div>
              <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {TIKTOK_SHOP_DESC}
              </pre>
            </div>

            {/* SEO tips */}
            <div className="mt-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4">
              <h3 className="text-cyan-400 font-bold text-sm mb-3">💡 Conseils TikTok Shop</h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>• Mettez les <strong className="text-white">emojis en début de ligne</strong> — ils augmentent le CTR de 23%</li>
                <li>• Incluez les <strong className="text-white">hashtags à la fin</strong> pour le référencement interne</li>
                <li>• Le <strong className="text-white">mot "OFFERTE"</strong> en majuscules augmente la conversion</li>
                <li>• Ajoutez des <strong className="text-white">photos lifestyle</strong> + 1 vidéo de démo minimum</li>
                <li>• Prix psychologique : <strong className="text-white">29,90€ &gt; 30€</strong> (testé et approuvé)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
