import Image from "next/image";
import {
  Palette,
  Type,
  Camera,
  MessageSquare,
  Paintbrush,
  Component,
  Check,
  X,
  Copy,
  Crown,
  Eye,
  Sparkles,
  Layout,
  Monitor,
  Smartphone,
  Square,
  RectangleHorizontal,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Brand constants (inline — no brand-data.ts exists yet)
// ---------------------------------------------------------------------------

const COLORS = [
  { name: "Or DAHAB", hex: "#C9A84C", role: "Primaire", textDark: true },
  { name: "Or Clair", hex: "#D4B85E", role: "Accent clair", textDark: true },
  { name: "Or Fonce", hex: "#B8963A", role: "Accent fonce", textDark: false },
  { name: "Noir DAHAB", hex: "#1A1A1A", role: "Texte", textDark: false },
  { name: "Creme", hex: "#FAF7F2", role: "Fond clair", textDark: true },
  { name: "Creme Fonce", hex: "#F0EBE1", role: "Fond secondaire", textDark: true },
] as const;

const GOLD_GRADIENT =
  "linear-gradient(135deg, #B8963A 0%, #C9A84C 25%, #E8D48B 50%, #C9A84C 75%, #B8963A 100%)";

const PERSONALITY_TRAITS = [
  { label: "Elegante", desc: "Raffinement sans pretention" },
  { label: "Accessible", desc: "Luxe pour toutes les femmes" },
  { label: "Chaleureuse", desc: "Ton amical et bienveillant" },
  { label: "Confiante", desc: "Expertise assumee sans arrogance" },
];

const GOOD_COPY = [
  { good: "Decouvrez votre eclat interieur", bad: "ACHETEZ MAINTENANT !!!" },
  { good: "Fabriquee main, pour sublimer vos moments", bad: "Pas cher et de bonne qualite" },
  { good: "Livraison gratuite, parce que vous le meritez", bad: "PROMO FLASH DERNIERE CHANCE" },
];

const PHOTO_GUIDELINES = [
  {
    title: "Eclairage",
    desc: "Lumiere chaude doree, naturelle. Eviter les neons et la lumiere froide.",
    icon: Sparkles,
  },
  {
    title: "Fonds",
    desc: "Marbre creme, tissu dore, bois clair. Surfaces mates et elegantes.",
    icon: Layout,
  },
  {
    title: "Sujets",
    desc: "Mains/poignets, cou/decollete, close-up details des pieces.",
    icon: Eye,
  },
  {
    title: "Mood",
    desc: "Luxe accessible, feminin, marocain contemporain.",
    icon: Crown,
  },
];

const ASPECT_RATIOS = [
  { ratio: "1:1", usage: "Fiches produit", icon: Square },
  { ratio: "16:9", usage: "Banniere hero", icon: RectangleHorizontal },
  { ratio: "4:5", usage: "Detail / Reels", icon: Smartphone },
];

// ---------------------------------------------------------------------------
// Inline ColorSwatch (no external component exists yet)
// ---------------------------------------------------------------------------

function ColorSwatch({
  name,
  hex,
  role,
  textDark,
}: {
  name: string;
  hex: string;
  role: string;
  textDark: boolean;
}) {
  return (
    <div className="group">
      <div
        className="aspect-square rounded-xl shadow-sm relative overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 ${
            textDark ? "text-brand-black" : "text-white"
          }`}
        >
          <p className="font-display font-bold text-sm leading-tight">{name}</p>
        </div>
      </div>
      <div className="mt-2 space-y-0.5">
        <div className="flex items-center gap-2">
          <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
            {hex}
          </code>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            title={`Copier ${hex}`}
          >
            <Copy size={12} className="text-gray-400" />
          </button>
        </div>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-10 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
          <Icon size={20} className="text-brand-gold" />
        </div>
        <h2 className="font-display text-2xl font-bold text-brand-black">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Do/Don't badge
// ---------------------------------------------------------------------------

function DoDont({
  type,
  label,
}: {
  type: "do" | "dont";
  label: string;
}) {
  const isDo = type === "do";
  return (
    <div
      className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
        isDo
          ? "bg-green-50 text-green-800"
          : "bg-red-50 text-red-800"
      }`}
    >
      {isDo ? (
        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
      ) : (
        <X size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
      )}
      <span>{label}</span>
    </div>
  );
}

// ===========================================================================
// Page
// ===========================================================================

export default function BrandGuidePage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* ---------- Page header ---------- */}
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-brand-black">
          Guide de Marque
        </h1>
        <p className="text-gray-500 mt-1">
          Reference visuelle et identitaire de la marque DAHAB.
        </p>
        <div
          className="h-1 w-24 rounded-full mt-4"
          style={{ background: GOLD_GRADIENT }}
        />
      </div>

      {/* ================================================================= */}
      {/* SECTION 1 — Logo                                                  */}
      {/* ================================================================= */}
      <Section id="logo" icon={Paintbrush} title="Logo">
        {/* Logo display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Principal */}
          <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center justify-center border border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
              Principal
            </p>
            <div className="relative w-[160px] h-[56px]">
              <Image
                src="/logo.svg"
                alt="Logo DAHAB principal"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Or sur fond blanc ou creme
            </p>
          </div>

          {/* Inverse */}
          <div className="bg-brand-black rounded-xl p-8 shadow-sm flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
              Inverse
            </p>
            <div className="relative w-[160px] h-[56px]">
              <Image
                src="/logo.svg"
                alt="Logo DAHAB inverse"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Blanc sur fond noir
            </p>
          </div>

          {/* Monochrome */}
          <div className="bg-gray-100 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
              Monochrome
            </p>
            <div className="relative w-[160px] h-[56px]">
              <Image
                src="/logo.svg"
                alt="Logo DAHAB monochrome"
                fill
                className="object-contain grayscale"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Noir et blanc uniquement
            </p>
          </div>
        </div>

        {/* Spacing rules */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h3 className="font-display font-bold text-lg mb-4">
            Zone de protection
          </h3>
          <div className="flex items-center justify-center py-8">
            <div className="relative border-2 border-dashed border-brand-gold/30 p-8 rounded-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-brand-gold font-mono">
                padding = h/4
              </div>
              <div className="relative w-[120px] h-[42px]">
                <Image
                  src="/logo.svg"
                  alt="Logo avec zone de protection"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Visual padding indicators */}
              <div className="absolute top-0 left-0 right-0 h-8 border-b border-dashed border-brand-gold/20" />
              <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-dashed border-brand-gold/20" />
              <div className="absolute top-0 left-0 bottom-0 w-8 border-r border-dashed border-brand-gold/20" />
              <div className="absolute top-0 right-0 bottom-0 w-8 border-l border-dashed border-brand-gold/20" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Monitor size={16} className="text-gray-400" />
              <span>
                Min. web :{" "}
                <strong className="text-brand-black">120px</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone size={16} className="text-gray-400" />
              <span>
                Min. mobile :{" "}
                <strong className="text-brand-black">40px</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Do / Don't grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <DoDont type="do" label="Sur fond blanc ou creme" />
          <DoDont type="do" label="Sur fond noir" />
          <DoDont type="dont" label="Sur fond colore" />
          <DoDont type="dont" label="Deforme ou tourne" />
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 2 — Palette de Couleurs                                   */}
      {/* ================================================================= */}
      <Section id="couleurs" icon={Palette} title="Palette de Couleurs">
        {/* Color swatches grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {COLORS.map((c) => (
            <ColorSwatch key={c.hex} {...c} />
          ))}
        </div>

        {/* Gold gradient bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-3">
            Degrade Or DAHAB
          </h3>
          <div
            className="h-16 rounded-lg shadow-inner"
            style={{ background: GOLD_GRADIENT }}
          />
          <code className="block mt-3 text-xs font-mono text-gray-500 bg-gray-50 p-3 rounded-lg break-all">
            linear-gradient(135deg, #B8963A 0%, #C9A84C 25%, #E8D48B 50%,
            #C9A84C 75%, #B8963A 100%)
          </code>
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 3 — Typographie                                           */}
      {/* ================================================================= */}
      <Section id="typographie" icon={Type} title="Typographie">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Playfair Display */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">
                Playfair Display
              </h3>
              <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-full font-medium">
                Titres
              </span>
            </div>
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <p className="font-display text-4xl font-bold text-brand-black">
                Titre Principal
              </p>
              <p className="font-display text-3xl text-brand-black">
                Sous-titre H2
              </p>
              <p className="font-display text-2xl text-brand-black">
                Section H3
              </p>
              <p className="font-display text-xl text-brand-black">
                Sous-section H4
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-mono">
                font-family: Playfair Display, serif
              </p>
              <p className="text-xs text-gray-400 font-mono">
                CSS: font-display / var(--font-playfair)
              </p>
            </div>
          </div>

          {/* Inter */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Inter</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                Corps de texte
              </span>
            </div>
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <p className="font-body text-base font-normal text-brand-black">
                Corps regulier (400) — 16px
              </p>
              <p className="font-body text-base font-medium text-brand-black">
                Corps medium (500) — 16px
              </p>
              <p className="font-body text-base font-semibold text-brand-black">
                Corps semibold (600) — 16px
              </p>
              <p className="font-body text-sm text-gray-600">
                Petit texte — 14px
              </p>
              <p className="font-body text-xs text-gray-500">
                Tres petit texte — 12px
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-mono">
                font-family: Inter, sans-serif
              </p>
              <p className="text-xs text-gray-400 font-mono">
                CSS: font-body / var(--font-inter)
              </p>
            </div>
          </div>
        </div>

        {/* Sample text */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-display font-bold text-lg mb-3">
            Specimen
          </h3>
          <p className="font-display text-3xl text-brand-black mb-2">
            L&apos;elegance accessible — DAHAB
          </p>
          <p className="font-display text-3xl text-brand-gold">
            دهب
          </p>
        </div>

        {/* Alphabet & numerals */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="space-y-2">
            <p className="font-display text-xl tracking-widest text-brand-black">
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
            </p>
            <p className="font-display text-xl tracking-widest text-gray-400">
              a b c d e f g h i j k l m n o p q r s t u v w x y z
            </p>
            <p className="font-display text-xl tracking-widest text-brand-gold">
              0 1 2 3 4 5 6 7 8 9
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 4 — Tone of Voice                                         */}
      {/* ================================================================= */}
      <Section id="tone" icon={MessageSquare} title="Ton de Voix">
        {/* Personality badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          {PERSONALITY_TRAITS.map((t) => (
            <div
              key={t.label}
              className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100 hover:border-brand-gold/30 transition-colors"
            >
              <p className="font-display font-bold text-brand-black text-sm">
                {t.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h3 className="font-display font-bold text-lg mb-3">Langues</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-lg text-sm font-medium">
              <span className="w-2 h-2 bg-brand-gold rounded-full" />
              Francais (principal)
            </div>
            <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
              <span className="w-2 h-2 bg-gray-400 rounded-full" />
              Darija (secondaire)
            </div>
          </div>
        </div>

        {/* Do / Don't copy table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Good examples */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Check size={18} className="text-green-600" />
              <h3 className="font-display font-bold text-sm text-green-700 uppercase tracking-wider">
                A faire
              </h3>
            </div>
            <div className="space-y-2">
              {GOOD_COPY.map((pair, i) => (
                <div
                  key={i}
                  className="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4"
                >
                  <p className="text-sm text-green-900">{pair.good}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bad examples */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <X size={18} className="text-red-500" />
              <h3 className="font-display font-bold text-sm text-red-600 uppercase tracking-wider">
                A eviter
              </h3>
            </div>
            <div className="space-y-2">
              {GOOD_COPY.map((pair, i) => (
                <div
                  key={i}
                  className="bg-red-50 border-l-4 border-red-300 rounded-r-lg p-4"
                >
                  <p className="text-sm text-red-800 line-through decoration-red-300">
                    {pair.bad}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 5 — Direction Photo                                       */}
      {/* ================================================================= */}
      <Section id="photo" icon={Camera} title="Direction Photo">
        {/* Guidelines grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {PHOTO_GUIDELINES.map((g) => (
            <div
              key={g.title}
              className="bg-white rounded-xl p-5 shadow-sm flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <g.icon size={18} className="text-brand-gold" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-brand-black mb-1">
                  {g.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Aspect ratios */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h3 className="font-display font-bold text-lg mb-4">
            Ratios d&apos;aspect
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {ASPECT_RATIOS.map((ar) => (
              <div
                key={ar.ratio}
                className="text-center p-4 rounded-lg bg-gray-50"
              >
                <ar.icon
                  size={28}
                  className="text-brand-gold mx-auto mb-2"
                />
                <p className="font-display font-bold text-lg text-brand-black">
                  {ar.ratio}
                </p>
                <p className="text-xs text-gray-500 mt-1">{ar.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo don'ts */}
        <div className="space-y-2">
          <h3 className="font-display font-bold text-sm text-red-600 uppercase tracking-wider flex items-center gap-2 mb-3">
            <X size={16} className="text-red-500" />
            A eviter en photo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <DoDont type="dont" label="Fonds colores vifs" />
            <DoDont type="dont" label="Filtres excessifs" />
            <DoDont type="dont" label="Photos floues ou basse resolution" />
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 6 — Composants UI                                         */}
      {/* ================================================================= */}
      <Section id="ui" icon={Component} title="Composants UI">
        {/* Buttons */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-display font-bold text-lg mb-4">Boutons</h3>
          <div className="space-y-6">
            {/* btn-primary */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="sm:w-48 flex-shrink-0">
                <button className="btn-primary w-full">Ajouter au panier</button>
              </div>
              <div className="flex-1">
                <code className="text-xs font-mono bg-gray-50 px-3 py-2 rounded-lg block text-gray-600">
                  .btn-primary — bg-brand-gold text-white, hover:bg-brand-gold-dark
                </code>
              </div>
            </div>

            {/* btn-secondary */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="sm:w-48 flex-shrink-0">
                <button className="btn-secondary w-full">Voir la boutique</button>
              </div>
              <div className="flex-1">
                <code className="text-xs font-mono bg-gray-50 px-3 py-2 rounded-lg block text-gray-600">
                  .btn-secondary — bg-brand-black text-white, hover:bg-gray-800
                </code>
              </div>
            </div>

            {/* btn-outline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="sm:w-48 flex-shrink-0">
                <button className="btn-outline w-full">En savoir plus</button>
              </div>
              <div className="flex-1">
                <code className="text-xs font-mono bg-gray-50 px-3 py-2 rounded-lg block text-gray-600">
                  .btn-outline — border-brand-gold text-brand-gold, hover:bg-brand-gold
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Card pattern */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-display font-bold text-lg mb-4">
            Carte (Card Pattern)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="w-full h-32 bg-brand-cream rounded-lg mb-3 flex items-center justify-center">
                <span className="text-sm text-gray-400">Image produit</span>
              </div>
              <p className="font-display font-bold text-brand-black">
                Collier Noor
              </p>
              <p className="text-sm text-brand-gold font-medium mt-1">
                349 MAD
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <code className="text-xs font-mono bg-gray-50 p-3 rounded-lg text-gray-600 block leading-relaxed">
                bg-white rounded-xl shadow-sm
                <br />
                border border-gray-100
                <br />
                hover:shadow-md transition
              </code>
              <p className="text-xs text-gray-500 mt-3">
                Utilise pour les fiches produit, articles, et tout conteneur de contenu.
              </p>
            </div>
          </div>
        </div>

        {/* Section title class */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-4">
            Titre de Section
          </h3>
          <div className="bg-brand-cream rounded-lg p-6 mb-3">
            <p className="section-title">Collection Printemps</p>
          </div>
          <code className="text-xs font-mono bg-gray-50 p-3 rounded-lg text-gray-600 block">
            .section-title — font-display text-3xl md:text-4xl font-bold
            text-brand-black
          </code>
        </div>
      </Section>

      {/* ---------- Footer note ---------- */}
      <div className="py-8 text-center">
        <div
          className="h-0.5 w-16 rounded-full mx-auto mb-4"
          style={{ background: GOLD_GRADIENT }}
        />
        <p className="text-xs text-gray-400">
          DAHAB Brand Guide — Document interne. Derniere mise a jour : Mars
          2026.
        </p>
      </div>
    </div>
  );
}
