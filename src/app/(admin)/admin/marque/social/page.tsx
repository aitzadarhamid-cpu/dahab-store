import {
  Share2,
  Hash,
  Calendar,
  MessageCircle,
  FileText,
  Clock,
  Smartphone,
  Globe,
  Sparkles,
} from "lucide-react";
import {
  POST_TEMPLATES,
  HASHTAG_SETS,
  WEEKLY_CALENDAR,
  WHATSAPP_TEMPLATES,
} from "@/lib/brand-social";

// ---------------------------------------------------------------------------
// Shared constants
// ---------------------------------------------------------------------------

const GOLD_GRADIENT =
  "linear-gradient(135deg, #B8963A 0%, #C9A84C 25%, #E8D48B 50%, #C9A84C 75%, #B8963A 100%)";

const CATEGORY_COLORS: Record<string, string> = {
  produit: "bg-brand-gold/10 text-brand-gold",
  contenu: "bg-blue-50 text-blue-700",
  engagement: "bg-pink-50 text-pink-700",
  promo: "bg-red-50 text-red-700",
};

const PLATFORM_BADGES: Record<string, { label: string; color: string }> = {
  instagram: { label: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white" },
  tiktok: { label: "TikTok", color: "bg-black text-white" },
  all: { label: "Toutes", color: "bg-brand-gold text-white" },
  stories: { label: "Stories", color: "bg-gradient-to-r from-orange-400 to-pink-500 text-white" },
};

// ---------------------------------------------------------------------------
// Section wrapper (same pattern as brand guide page)
// ---------------------------------------------------------------------------

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-10 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
          <Icon size={20} className="text-brand-gold" />
        </div>
        <h2 className="font-display text-2xl font-bold text-brand-black">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500 ml-[52px] mb-8">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-8" />}
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Placeholder highlight helper
// ---------------------------------------------------------------------------

function highlightPlaceholders(text: string): React.ReactNode {
  const parts = text.split(/(\[[A-ZÉÈ_]+\])/g);
  return parts.map((part, i) =>
    /^\[[A-ZÉÈ_]+\]$/.test(part) ? (
      <span
        key={i}
        className="inline-block bg-brand-gold/15 text-brand-gold font-bold px-1 rounded text-xs"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// ===========================================================================
// Page
// ===========================================================================

export default function SocialMediaKitPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* ---------- Page header ---------- */}
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-brand-black">
          Social Media Kit
        </h1>
        <p className="text-gray-500 mt-1">
          Templates, hashtags, calendrier et messages pour la strategie sociale
          de DAHAB.
        </p>
        <div
          className="h-1 w-24 rounded-full mt-4"
          style={{ background: GOLD_GRADIENT }}
        />
      </div>

      {/* ================================================================= */}
      {/* SECTION 1 — Templates Posts                                       */}
      {/* ================================================================= */}
      <Section
        id="templates"
        icon={FileText}
        title="Templates Posts"
        subtitle="6 modeles de publications prets a l'emploi pour Instagram, TikTok et Stories"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {POST_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Header: name + badges */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-bold text-brand-black text-base">
                    {tpl.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        CATEGORY_COLORS[tpl.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tpl.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        PLATFORM_BADGES[tpl.platform]?.color ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {PLATFORM_BADGES[tpl.platform]?.label ?? tpl.platform}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>{tpl.bestTime}</span>
                </div>
              </div>

              {/* Caption FR */}
              <div className="mb-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Francais
                </p>
                <div className="bg-brand-cream/50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {highlightPlaceholders(tpl.captionFr)}
                </div>
              </div>

              {/* Caption Darija */}
              <div className="mb-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Darija
                </p>
                <div
                  className="bg-brand-cream/50 rounded-lg p-3 text-sm text-gray-600 leading-relaxed whitespace-pre-line"
                  dir="rtl"
                >
                  {tpl.captionDarija}
                </div>
              </div>

              {/* Image guidelines */}
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-2.5">
                <Sparkles size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span>{tpl.imageGuidelines}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 2 — Bibliotheque Hashtags                                 */}
      {/* ================================================================= */}
      <Section
        id="hashtags"
        icon={Hash}
        title="Bibliotheque Hashtags"
        subtitle="Selectionnez et copiez les hashtags par categorie. Combinez 2-3 groupes par post (max 30)."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(HASHTAG_SETS).map(([key, group]) => (
            <div
              key={key}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
                <h3 className="font-display font-bold text-sm text-brand-black uppercase tracking-wider">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-brand-gold/8 text-brand-gold border border-brand-gold/20 px-2.5 py-1 rounded-full text-xs font-medium select-all cursor-pointer hover:bg-brand-gold/15 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Copy hint */}
        <div className="mt-4 bg-brand-cream/60 rounded-lg p-3 flex items-center gap-2 text-xs text-gray-500">
          <Smartphone size={14} className="text-gray-400 flex-shrink-0" />
          <span>
            Astuce : selectionnez les hashtags ci-dessus et copiez-les
            directement dans votre publication.
          </span>
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 3 — Calendrier Hebdomadaire                               */}
      {/* ================================================================= */}
      <Section
        id="calendrier"
        icon={Calendar}
        title="Calendrier Hebdomadaire"
        subtitle="Planning de contenu type pour une semaine de publications DAHAB"
      >
        {/* Desktop: table-like grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-7 gap-3">
            {WEEKLY_CALENDAR.map((day) => (
              <div
                key={day.day}
                className={`bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow ${
                  day.day === "friday"
                    ? "ring-2 ring-brand-gold/30"
                    : ""
                }`}
              >
                <div className="text-center mb-3">
                  <p className="font-display font-bold text-brand-black text-sm">
                    {day.dayFr}
                  </p>
                  <div className="h-0.5 w-8 bg-brand-gold/30 rounded-full mx-auto mt-1" />
                </div>

                <p className="text-xs font-bold text-brand-gold mb-2 leading-tight">
                  {day.postType}
                </p>

                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {day.description}
                </p>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={10} />
                    <span>{day.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Globe size={10} />
                    <span>{day.platform}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-3">
          {WEEKLY_CALENDAR.map((day) => (
            <div
              key={day.day}
              className={`bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex gap-4 ${
                day.day === "friday"
                  ? "ring-2 ring-brand-gold/30"
                  : ""
              }`}
            >
              <div className="flex-shrink-0 w-16 text-center">
                <p className="font-display font-bold text-brand-black text-sm">
                  {day.dayFr}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{day.bestTime}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-gold mb-1">
                  {day.postType}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {day.description}
                </p>
                <p className="text-xs text-gray-400 mt-1.5">{day.platform}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 4 — Templates WhatsApp                                    */}
      {/* ================================================================= */}
      <Section
        id="whatsapp"
        icon={MessageCircle}
        title="Templates WhatsApp"
        subtitle="Messages de diffusion pour WhatsApp Business. Personnalisez les champs entre crochets."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WHATSAPP_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card header */}
              <div className="bg-[#075E54]/5 px-5 py-3 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tpl.emoji}</span>
                  <h3 className="font-display font-bold text-brand-black text-sm">
                    {tpl.name}
                  </h3>
                </div>
                <span className="text-xs bg-[#25D366]/10 text-[#075E54] px-2 py-0.5 rounded-full font-medium">
                  WhatsApp
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Trigger */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Sparkles size={12} className="text-brand-gold flex-shrink-0" />
                  <span>
                    Declencheur : <strong className="text-gray-700">{tpl.trigger}</strong>
                  </span>
                </div>

                {/* Message FR */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Francais
                  </p>
                  <div className="bg-[#DCF8C6]/30 rounded-xl rounded-tl-none p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line border border-[#DCF8C6]/60">
                    {highlightPlaceholders(tpl.messageFr)}
                  </div>
                </div>

                {/* Message Darija */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Darija
                  </p>
                  <div
                    className="bg-[#DCF8C6]/30 rounded-xl rounded-tr-none p-3 text-sm text-gray-600 leading-relaxed whitespace-pre-line border border-[#DCF8C6]/60"
                    dir="rtl"
                  >
                    {tpl.messageDarija}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ================================================================= */}
      {/* SECTION 5 — Generateur Captions                                   */}
      {/* ================================================================= */}
      <Section
        id="generateur"
        icon={Share2}
        title="Generateur Captions"
        subtitle="Remplissez les champs en or pour generer vos captions personnalisees"
      >
        <div className="space-y-4">
          {POST_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      CATEGORY_COLORS[tpl.category] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tpl.category}
                  </span>
                  <h3 className="font-display font-bold text-brand-black text-sm">
                    {tpl.name}
                  </h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    PLATFORM_BADGES[tpl.platform]?.color ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {PLATFORM_BADGES[tpl.platform]?.label ?? tpl.platform}
                </span>
              </div>
              <div className="bg-brand-cream/40 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line font-mono">
                {highlightPlaceholders(tpl.captionFr)}
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={11} />
                  <span>Meilleur horaire : {tpl.bestTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles size={11} />
                  <span>{tpl.imageGuidelines.split(",")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-brand-gold/5 rounded-xl p-4 border border-brand-gold/10">
          <h4 className="font-display font-bold text-sm text-brand-black mb-2">
            Legende des placeholders
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              ["[PRODUIT]", "Nom du produit"],
              ["[PRIX]", "Prix en MAD"],
              ["[NOM]", "Prenom de la cliente"],
              ["[VILLE]", "Ville de la cliente"],
              ["[CODE]", "Code promo"],
              ["[REDUCTION]", "Pourcentage remise"],
              ["[COLLECTION]", "Nom de la collection"],
            ].map(([placeholder, desc]) => (
              <div key={placeholder} className="flex items-center gap-2">
                <span className="inline-block bg-brand-gold/15 text-brand-gold font-bold px-1.5 py-0.5 rounded text-xs">
                  {placeholder}
                </span>
                <span className="text-xs text-gray-500">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Footer note ---------- */}
      <div className="py-8 text-center">
        <div
          className="h-0.5 w-16 rounded-full mx-auto mb-4"
          style={{ background: GOLD_GRADIENT }}
        />
        <p className="text-xs text-gray-400">
          DAHAB Social Media Kit — Document interne. Derniere mise a jour : Mars
          2026.
        </p>
      </div>
    </div>
  );
}
