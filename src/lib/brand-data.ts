import {
  Palette,
  Share2,
  Mail,
  Newspaper,
  BookImage,
  Gift,
  TrendingUp,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "DAHAB",
  nameArabic: "دهب",
  tagline: "L'élégance accessible",
  mission: "Rendre les bijoux élégants accessibles à toutes les femmes au Maroc",
  founded: "2024",
  location: "Casablanca, Maroc",
  priceRange: { min: 99, max: 299, currency: "MAD" },

  colors: {
    primary: {
      name: "Or DAHAB",
      hex: "#C9A84C",
      usage: "CTA, accents, logo, éléments principaux",
      tailwind: "brand-gold",
    },
    primaryLight: {
      name: "Or Clair",
      hex: "#D4B85E",
      usage: "Hover states, accents secondaires",
      tailwind: "brand-gold-light",
    },
    primaryDark: {
      name: "Or Foncé",
      hex: "#B8963A",
      usage: "Active states, texte sur fond clair",
      tailwind: "brand-gold-dark",
    },
    secondary: {
      name: "Noir DAHAB",
      hex: "#1A1A1A",
      usage: "Texte, fonds, navigation",
      tailwind: "brand-black",
    },
    background: {
      name: "Crème",
      hex: "#FAF7F2",
      usage: "Fond de page, cards",
      tailwind: "brand-cream",
    },
    backgroundDark: {
      name: "Crème Foncé",
      hex: "#F0EBE1",
      usage: "Sections alternées",
      tailwind: "brand-cream-dark",
    },
  },

  gradients: {
    gold: "linear-gradient(135deg, #B8963A 0%, #C9A84C 25%, #E8D48B 50%, #C9A84C 75%, #B8963A 100%)",
    goldShimmer: "CSS class 'gold-shimmer' in globals.css",
  },

  typography: {
    display: {
      family: "Playfair Display",
      weights: ["400 (Regular)", "700 (Bold)"],
      usage: "Titres, nom de marque, prix, sections",
      cssClass: "font-display",
    },
    body: {
      family: "Inter",
      weights: ["400 (Regular)", "500 (Medium)", "600 (Semibold)"],
      usage: "Texte courant, boutons, UI",
      cssClass: "font-body",
    },
  },

  tone: {
    personality: ["Élégante", "Accessible", "Chaleureuse", "Confiante"],
    doSay: [
      "Bijoux élégants",
      "Pour chaque femme",
      "Qualité garantie",
      "Livraison partout au Maroc",
      "L'or de la femme marocaine",
      "Luxe accessible",
    ],
    dontSay: [
      "Cheap / pas cher",
      "Imitation / faux",
      "Low cost",
      "Copie de...",
      "Comparable à...",
    ],
    languages: {
      primary: "Français (fr-MA)",
      secondary: "Arabe dialectal marocain (darija)",
    },
    examples: {
      good: [
        "Découvrez notre collection de bagues en or plaqué, conçue pour sublimer chaque moment.",
        "Livraison gratuite à Casablanca — votre bijou arrive en 24h.",
        "Votre satisfaction est notre engagement. Retour gratuit sous 7 jours.",
      ],
      bad: [
        "Bijoux pas chers en promo !",
        "Imitation or à prix cassé",
        "Comparez nos prix avec le souk",
      ],
    },
  },

  photography: {
    lighting: "Lumière chaude dorée, naturelle, douce",
    backgrounds: [
      "Marbre crème",
      "Tissu doré / satin",
      "Bois clair",
      "Fond neutre blanc cassé",
    ],
    subjects: [
      "Mains/poignets portant les bijoux",
      "Cou/décolleté pour colliers",
      "Close-up détails ciselures",
      "Flat lay sur fond neutre",
    ],
    mood: "Luxe accessible, féminin, marocain contemporain",
    aspectRatios: {
      productCard: "1:1 (carré)",
      hero: "16:9",
      detail: "4:5 (portrait)",
    },
    dontDo: [
      "Fonds colorés vifs",
      "Filtres excessifs",
      "Photos floues / basse résolution",
      "Mannequins masculins",
    ],
  },

  uiComponents: {
    buttons: [
      {
        name: "Primaire",
        class: "btn-primary",
        description: "Fond doré, texte blanc, utilisé pour CTA principaux",
      },
      {
        name: "Secondaire",
        class: "btn-secondary",
        description: "Fond noir, texte blanc, actions secondaires",
      },
      {
        name: "Outline",
        class: "btn-outline",
        description:
          "Bordure dorée, fond transparent, liens et actions tertiaires",
      },
    ],
    cards: { class: "bg-white rounded-xl shadow-sm", padding: "p-5 ou p-6" },
    sectionTitle: {
      class: "section-title",
      description:
        "font-display text-3xl md:text-4xl font-bold text-brand-black",
    },
    containerPage: {
      class: "container-page",
      description: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    },
  },

  social: {
    instagram: "https://instagram.com/dahab.bijoux",
    tiktok: "https://tiktok.com/@dahab.bijoux",
    whatsapp: "+212600000000",
  },

  delivery: {
    freeThreshold: 299,
    standardCost: 29,
    zones: {
      A: {
        name: "Zone A",
        delay: "24h",
        cities: [
          "Casablanca",
          "Rabat",
          "Marrakech",
          "Fès",
          "Tanger",
          "Meknès",
        ],
      },
      B: {
        name: "Zone B",
        delay: "24-48h",
        cities: [
          "Agadir",
          "Oujda",
          "Kénitra",
          "Tétouan",
          "Safi",
          "El Jadida",
        ],
      },
      C: {
        name: "Zone C",
        delay: "48-72h",
        cities: ["Autres villes"],
      },
    },
  },
} as const;

/** Type helper for a single brand color entry */
export type BrandColor = (typeof BRAND.colors)[keyof typeof BRAND.colors];

/** Type helper for delivery zone keys */
export type DeliveryZone = keyof typeof BRAND.delivery.zones;

// Hub modules definition
// Uses actual Lucide icon components so they can be passed to HubCard directly

export interface BrandModule {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export const BRAND_MODULES: BrandModule[] = [
  {
    id: "guide",
    label: "Brand Guide",
    description: "Identité visuelle, couleurs, typo, tone of voice",
    icon: Palette,
    href: "/admin/marque/guide",
    color: "bg-amber-50 text-amber-700",
  },
  {
    id: "social",
    label: "Social Media Kit",
    description: "Templates Instagram, TikTok, WhatsApp, hashtags",
    icon: Share2,
    href: "/admin/marque/social",
    color: "bg-pink-50 text-pink-700",
  },
  {
    id: "emails",
    label: "Email Templates",
    description: "7 séquences emails prêtes à l'emploi",
    icon: Mail,
    href: "/admin/marque/emails",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: "presse",
    label: "Press Kit",
    description: "Assets médias, brand story, contacts presse",
    icon: Newspaper,
    href: "/admin/marque/presse",
    color: "bg-purple-50 text-purple-700",
  },
  {
    id: "lookbook",
    label: "Lookbook",
    description: "Collections visuelles et inspirations",
    icon: BookImage,
    href: "/admin/marque/lookbook",
    color: "bg-rose-50 text-rose-700",
  },
  {
    id: "packs",
    label: "Marketing Packs",
    description: "Bundles, coffrets cadeaux, QR packaging",
    icon: Gift,
    href: "/admin/marque/packs",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "strategie",
    label: "Stratégie",
    description: "KPIs avancés, performance, calendrier saisonnier",
    icon: TrendingUp,
    href: "/admin/marque/strategie",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    id: "villes",
    label: "Landing Villes",
    description: "Pages régionales SEO (Casa, Marrakech, Rabat)",
    icon: MapPin,
    href: "/admin/marque/villes",
    color: "bg-teal-50 text-teal-700",
  },
];
