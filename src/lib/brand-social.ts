// ---------------------------------------------------------------------------
// Social Media Kit — Data constants for DAHAB brand social strategy
// ---------------------------------------------------------------------------

export interface PostTemplate {
  id: string;
  name: string;
  category: "produit" | "contenu" | "engagement" | "promo";
  captionFr: string;
  captionDarija: string;
  imageGuidelines: string;
  bestTime: string;
  platform: "instagram" | "tiktok" | "all" | "stories";
}

export const POST_TEMPLATES: PostTemplate[] = [
  {
    id: "tpl-nouveau-produit",
    name: "Nouveau produit",
    category: "produit",
    captionFr:
      "Nouveau chez DAHAB \u2728 [PRODUIT] \u2014 l\u2019\u00e9l\u00e9gance \u00e0 port\u00e9e de main.\n\n\ud83d\udcb0 [PRIX] MAD\n\ud83d\ude9a Livraison partout au Maroc\n\n\ud83d\udc49 Lien en bio pour commander",
    captionDarija:
      "\u062c\u062f\u064a\u062f \u0641 DAHAB \u2728 [PRODUIT] \u2014 \u0627\u0644\u0623\u0646\u0627\u0642\u0629 \u0641 \u0645\u062a\u0646\u0627\u0648\u0644 \u064a\u062f\u0643.\n\n\ud83d\udcb0 [PRIX] \u062f\u0631\u0647\u0645\n\ud83d\ude9a \u062a\u0648\u0635\u064a\u0644 \u0644\u0643\u0627\u0645\u0644 \u0627\u0644\u0645\u063a\u0631\u0628\n\n\ud83d\udc49 \u0627\u0644\u0644\u064a\u0646\u0643 \u0641 \u0627\u0644\u0628\u064a\u0648",
    imageGuidelines:
      "Photo produit sur fond marbre cr\u00e8me, lumi\u00e8re chaude dor\u00e9e, ratio 4:5",
    bestTime: "12h-14h",
    platform: "instagram",
  },
  {
    id: "tpl-unboxing",
    name: "Unboxing",
    category: "contenu",
    captionFr:
      "Le moment qu\u2019on pr\u00e9f\u00e8re... \ud83d\udce6\u2728 [PRODUIT] dans son \u00e9crin DAHAB.\n\nChaque pi\u00e8ce est emball\u00e9e avec soin pour vous offrir une exp\u00e9rience unique.\n\n#UnboxingDAHAB #DAHAB",
    captionDarija:
      "\u0623\u062d\u0633\u0646 \u0644\u062d\u0638\u0629... \ud83d\udce6\u2728 [PRODUIT] \u0641 \u0639\u0644\u0628\u062a\u0648 \u062f\u064a\u0627\u0644 DAHAB.\n\n\u0643\u0644 \u0642\u0637\u0639\u0629 \u0645\u063a\u0644\u0641\u0629 \u0628\u0639\u0646\u0627\u064a\u0629 \u0628\u0627\u0634 \u0646\u0639\u0637\u064a\u0648\u0643 \u062a\u062c\u0631\u0628\u0629 \u0641\u0631\u064a\u062f\u0629.",
    imageGuidelines:
      "Vid\u00e9o unboxing mains f\u00e9minines, fond neutre, \u00e9clairage doux, format Reels vertical 9:16",
    bestTime: "20h-22h",
    platform: "tiktok",
  },
  {
    id: "tpl-temoignage",
    name: "T\u00e9moignage client",
    category: "engagement",
    captionFr:
      "\u201c[PRODUIT] est magnifique, je ne le quitte plus !\u201d \u2014 [NOM], [VILLE] \u2764\ufe0f\n\nMerci pour votre confiance \ud83d\ude4f\n\nVous aussi, partagez votre exp\u00e9rience DAHAB avec #MonDAHAB",
    captionDarija:
      "\u201c[PRODUIT] \u0631\u0627\u0626\u0639(\u0629)\u060c \u0645\u0627 \u0643\u0646\u062d\u064a\u062f\u0647\u0627 \u0645\u0646 \u0639\u0644\u064a\u0627!\u201d \u2014 [NOM], [VILLE] \u2764\ufe0f\n\n\u0634\u0643\u0631\u0627 \u0639\u0644\u0649 \u062b\u0642\u062a\u0643\u0645 \ud83d\ude4f\n\n\u062d\u062a\u0627 \u0646\u062a\u064a \u0634\u0627\u0631\u0643\u064a \u062a\u062c\u0631\u0628\u062a\u0643 \u0645\u0639 DAHAB \u0628 #MonDAHAB",
    imageGuidelines:
      "Screenshot t\u00e9moignage ou photo cliente portant le bijou, cadrage portrait, fond l\u00e9ger flou",
    bestTime: "20h-22h",
    platform: "stories",
  },
  {
    id: "tpl-promo",
    name: "Promotion",
    category: "promo",
    captionFr:
      "\ud83d\udd25 OFFRE SP\u00c9CIALE DAHAB \ud83d\udd25\n\n-[REDUCTION]% avec le code [CODE]\n\nValable sur toute la boutique, pour une dur\u00e9e limit\u00e9e !\n\n\ud83d\udc49 Lien en bio | Livraison gratuite d\u00e8s 299 MAD",
    captionDarija:
      "\ud83d\udd25 \u0639\u0631\u0636 \u062e\u0627\u0635 DAHAB \ud83d\udd25\n\n-[REDUCTION]% \u0628\u0627\u0644\u0643\u0648\u062f [CODE]\n\n\u0639\u0644\u0649 \u0643\u0627\u0645\u0644 \u0627\u0644\u0645\u0627\u063a\u0627\u0632\u0629\u060c \u0645\u062f\u0629 \u0645\u062d\u062f\u0648\u062f\u0629!\n\n\ud83d\udc49 \u0627\u0644\u0644\u064a\u0646\u0643 \u0641 \u0627\u0644\u0628\u064a\u0648 | \u062a\u0648\u0635\u064a\u0644 \u0645\u062c\u0627\u0646\u064a \u0645\u0646 299 \u062f\u0631\u0647\u0645",
    imageGuidelines:
      "Visuel promo avec badge r\u00e9duction, couleurs or/noir, texte lisible, ratio 1:1",
    bestTime: "10h-12h",
    platform: "all",
  },
  {
    id: "tpl-lifestyle",
    name: "Lifestyle",
    category: "contenu",
    captionFr:
      "L\u2019\u00e9l\u00e9gance au quotidien \u2728 [PRODUIT] pour sublimer chaque moment.\n\nDu bureau au caf\u00e9, DAHAB vous accompagne partout.\n\n#DAHABLifestyle #\u00c9l\u00e9ganceAccessible",
    captionDarija:
      "\u0627\u0644\u0623\u0646\u0627\u0642\u0629 \u0643\u0644 \u064a\u0648\u0645 \u2728 [PRODUIT] \u0628\u0627\u0634 \u062a\u062a\u0623\u0644\u0642\u064a \u0641 \u0643\u0644 \u0644\u062d\u0638\u0629.\n\n\u0645\u0646 \u0627\u0644\u062e\u062f\u0645\u0629 \u0644\u0644\u0642\u0647\u0648\u0629\u060c DAHAB \u0645\u0639\u0627\u0643 \u0641\u064a\u0646 \u0645\u0627 \u0645\u0634\u064a\u062a\u064a.",
    imageGuidelines:
      "Sc\u00e8ne lifestyle: caf\u00e9, bureau, sortie. Lumi\u00e8re naturelle chaude, mise en sc\u00e8ne f\u00e9minine, 4:5",
    bestTime: "14h-16h",
    platform: "instagram",
  },
  {
    id: "tpl-collection",
    name: "Collection",
    category: "produit",
    captionFr:
      "Nouvelle collection [COLLECTION] \ud83c\udf1f D\u00e9couvrez les pi\u00e8ces qui sublimeront votre style cette saison.\n\nBagues, colliers, bracelets \u2014 chaque pi\u00e8ce raconte une histoire.\n\n\ud83d\udc49 Explorez la collection compl\u00e8te sur dahab.ma",
    captionDarija:
      "\u0643\u0648\u0644\u0643\u0633\u064a\u0648\u0646 \u062c\u062f\u064a\u062f\u0629 [COLLECTION] \ud83c\udf1f \u0627\u0643\u062a\u0634\u0641\u064a \u0627\u0644\u0642\u0637\u0639 \u0644\u064a \u063a\u0627\u062f\u064a \u062a\u0632\u064a\u062f \u0641 \u0623\u0646\u0627\u0642\u062a\u0643 \u0647\u0627\u062f \u0627\u0644\u0645\u0648\u0633\u0645.\n\n\u062e\u0648\u0627\u062a\u0645\u060c \u0639\u0642\u0648\u062f\u060c \u0623\u0633\u0627\u0648\u0631 \u2014 \u0643\u0644 \u0642\u0637\u0639\u0629 \u0643\u062a\u062d\u0643\u064a \u0642\u0635\u0629.\n\n\ud83d\udc49 \u0634\u0648\u0641\u064a \u0627\u0644\u0643\u0648\u0644\u0643\u0633\u064a\u0648\u0646 \u0643\u0627\u0645\u0644\u0629 \u0641 dahab.ma",
    imageGuidelines:
      "Flat lay de 3-5 pi\u00e8ces, fond marbre ou tissu satin dor\u00e9, \u00e9clairage studio, 1:1 ou carrousel",
    bestTime: "12h-14h",
    platform: "instagram",
  },
];

// ---------------------------------------------------------------------------
// Hashtag library
// ---------------------------------------------------------------------------

export const HASHTAG_SETS: Record<string, { label: string; tags: string[] }> = {
  marque: {
    label: "Marque",
    tags: [
      "#DAHAB",
      "#DAHABBijoux",
      "#BijouxDAHAB",
      "#\u062f\u0647\u0628",
      "#DAHABMaroc",
    ],
  },
  produit: {
    label: "Produit",
    tags: [
      "#BaguesMaroc",
      "#ColliersMaroc",
      "#BraceletsMaroc",
      "#BouclesDOreilles",
      "#BijouxOr",
    ],
  },
  lifestyle: {
    label: "Lifestyle",
    tags: [
      "#FemmeMarocaine",
      "#StyleMarocain",
      "#LuxeAccessible",
      "#\u00c9l\u00e9ganceMarocaine",
      "#ModeMaroc",
    ],
  },
  villes: {
    label: "Villes",
    tags: [
      "#CasablancaStyle",
      "#MarrakechFashion",
      "#RabatChic",
      "#TangerMode",
    ],
  },
  darija: {
    label: "Darija",
    tags: [
      "#\u0627\u0644\u062d\u0644\u064a_\u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629",
      "#\u062a\u0623\u0644\u0642\u064a",
      "#\u062c\u0645\u0627\u0644\u0643",
      "#\u062f\u0647\u0628_\u0627\u0644\u0645\u063a\u0631\u0628",
    ],
  },
  engagement: {
    label: "Engagement",
    tags: [
      "#BijouxDuJour",
      "#OOTD",
      "#JewelryLovers",
      "#AccessoiresMode",
    ],
  },
};

// ---------------------------------------------------------------------------
// Weekly content calendar
// ---------------------------------------------------------------------------

export interface CalendarDay {
  day: string;
  dayFr: string;
  postType: string;
  description: string;
  bestTime: string;
  platform: string;
}

export const WEEKLY_CALENDAR: CalendarDay[] = [
  {
    day: "monday",
    dayFr: "Lundi",
    postType: "Motivation + Produit star",
    description:
      "Post motivationnel avec mise en avant du produit phare de la semaine",
    bestTime: "12h-14h",
    platform: "Instagram",
  },
  {
    day: "tuesday",
    dayFr: "Mardi",
    postType: "T\u00e9moignage client",
    description:
      "Story ou carrousel avec t\u00e9moignage client r\u00e9el et photo portant le bijou",
    bestTime: "20h-22h",
    platform: "Instagram Stories",
  },
  {
    day: "wednesday",
    dayFr: "Mercredi",
    postType: "Behind the scenes",
    description:
      "Coulisses : emballage, pr\u00e9paration commandes, atelier, vie d\u2019\u00e9quipe",
    bestTime: "12h-14h",
    platform: "TikTok",
  },
  {
    day: "thursday",
    dayFr: "Jeudi",
    postType: "Produit zoom / d\u00e9tail",
    description:
      "Close-up d\u2019une pi\u00e8ce : d\u00e9tails ciselures, reflets, texture or",
    bestTime: "20h-22h",
    platform: "Instagram",
  },
  {
    day: "friday",
    dayFr: "Vendredi",
    postType: "Promo vendredi",
    description:
      "Offre sp\u00e9ciale du vendredi : code promo, livraison gratuite, ou vente flash",
    bestTime: "10h-12h",
    platform: "Toutes les plateformes",
  },
  {
    day: "saturday",
    dayFr: "Samedi",
    postType: "Lifestyle / Inspiration",
    description:
      "Mise en sc\u00e8ne lifestyle : bijoux port\u00e9s au caf\u00e9, en sortie, au quotidien",
    bestTime: "14h-16h",
    platform: "Instagram",
  },
  {
    day: "sunday",
    dayFr: "Dimanche",
    postType: "Teaser semaine",
    description:
      "Teaser de la semaine \u00e0 venir : nouveau produit, collection, ou \u00e9v\u00e9nement",
    bestTime: "20h-22h",
    platform: "Stories",
  },
];

// ---------------------------------------------------------------------------
// WhatsApp broadcast templates
// ---------------------------------------------------------------------------

export interface WhatsAppTemplate {
  id: string;
  name: string;
  messageFr: string;
  messageDarija: string;
  trigger: string;
  emoji: string;
}

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "wa-nouvelle-collection",
    name: "Nouvelle collection",
    messageFr:
      "Bonjour ! \u2728\n\nLa nouvelle collection DAHAB est arriv\u00e9e !\nD\u00e9couvrez nos derni\u00e8res cr\u00e9ations en or plaqu\u00e9, d\u00e8s 99 MAD.\n\n\ud83d\udc49 Voir la collection : dahab.ma/nouveau\n\nLivraison gratuite d\u00e8s 299 MAD \ud83d\ude9a",
    messageDarija:
      "\u0633\u0644\u0627\u0645! \u2728\n\n\u0627\u0644\u0643\u0648\u0644\u0643\u0633\u064a\u0648\u0646 \u0627\u0644\u062c\u062f\u064a\u062f\u0629 \u062f\u064a\u0627\u0644 DAHAB \u0648\u0635\u0644\u0627\u062a!\n\u0627\u0643\u062a\u0634\u0641\u064a \u0622\u062e\u0631 \u0627\u0644\u0625\u0628\u062f\u0627\u0639\u0627\u062a \u0641 \u0627\u0644\u062f\u0647\u0628 \u0627\u0644\u0645\u0637\u0644\u064a\u060c \u0645\u0646 99 \u062f\u0631\u0647\u0645.\n\n\ud83d\udc49 \u0634\u0648\u0641\u064a \u0627\u0644\u0643\u0648\u0644\u0643\u0633\u064a\u0648\u0646: dahab.ma/nouveau\n\n\u062a\u0648\u0635\u064a\u0644 \u0628\u0627\u0644\u0645\u062c\u0627\u0646 \u0645\u0646 299 \u062f\u0631\u0647\u0645 \ud83d\ude9a",
    trigger: "Lancement nouvelle collection",
    emoji: "\u2728",
  },
  {
    id: "wa-stock-limite",
    name: "Stock limit\u00e9",
    messageFr:
      "Attention ! \u26a0\ufe0f\n\nIl ne reste que quelques pi\u00e8ces de [PRODUIT] !\n\nNe ratez pas cette occasion \u2014 une fois \u00e9puis\u00e9, c\u2019est fini.\n\n\ud83d\udc49 Commander maintenant : dahab.ma\n\nBisous dor\u00e9s \ud83d\udc9b DAHAB",
    messageDarija:
      "\u0627\u0646\u062a\u0628\u0647\u064a! \u26a0\ufe0f\n\n\u0628\u0642\u0627\u0648 \u063a\u064a\u0631 \u0634\u064a \u0642\u0637\u0639 \u0645\u0646 [PRODUIT]!\n\n\u0645\u0627 \u062a\u0641\u0648\u062a\u064a\u0634 \u0647\u0627\u062f \u0627\u0644\u0641\u0631\u0635\u0629 \u2014 \u0625\u064a\u0644\u0627 \u0633\u0627\u0644\u0627\u062a\u060c \u0633\u0627\u0644\u0627\u062a.\n\n\ud83d\udc49 \u0637\u0644\u0628\u064a \u062f\u0627\u0628\u0627: dahab.ma\n\n\u0628\u0648\u0633\u0627\u062a \u062f\u0647\u0628\u064a\u0629 \ud83d\udc9b DAHAB",
    trigger: "Stock faible (<10 pi\u00e8ces)",
    emoji: "\u26a0\ufe0f",
  },
  {
    id: "wa-post-livraison",
    name: "Post-livraison",
    messageFr:
      "Bonjour [NOM] ! \ud83d\ude0a\n\nVotre commande DAHAB a \u00e9t\u00e9 livr\u00e9e !\n\nOn esp\u00e8re que votre bijou vous plaira \u2764\ufe0f\n\nUn petit retour sur votre exp\u00e9rience nous ferait tr\u00e8s plaisir :\n\ud83d\udc49 dahab.ma/avis\n\nMerci pour votre confiance \ud83d\ude4f\n\u2014 L\u2019\u00e9quipe DAHAB",
    messageDarija:
      "\u0633\u0644\u0627\u0645 [NOM]! \ud83d\ude0a\n\n\u0627\u0644\u0643\u0648\u0645\u0627\u0646\u062f \u062f\u064a\u0627\u0644\u0643 \u0645\u0646 DAHAB \u0648\u0635\u0644\u0627\u062a!\n\n\u0643\u0646\u062a\u0645\u0646\u0627\u0648 \u064a\u0639\u062c\u0628\u0643 \u0627\u0644\u0628\u064a\u062c\u0648 \u062f\u064a\u0627\u0644\u0643 \u2764\ufe0f\n\n\u0634\u064a \u0631\u0623\u064a \u0639\u0644\u0649 \u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u063a\u0627\u062f\u064a \u064a\u0641\u0631\u062d\u0646\u0627 \u0628\u0632\u0627\u0641:\n\ud83d\udc49 dahab.ma/avis\n\n\u0634\u0643\u0631\u0627 \u0639\u0644\u0649 \u062b\u0642\u062a\u0643 \ud83d\ude4f\n\u2014 \u0641\u0631\u064a\u0642 DAHAB",
    trigger: "Commande livr\u00e9e (J+1)",
    emoji: "\ud83d\ude0a",
  },
  {
    id: "wa-fidelite-vip",
    name: "Fid\u00e9lit\u00e9 VIP",
    messageFr:
      "Bonjour [NOM] \ud83d\udc51\n\nVous faites partie de nos clientes VIP DAHAB !\n\nEn exclusivit\u00e9, profitez de -15% sur votre prochaine commande avec le code VIP15.\n\n\ud83d\udc49 dahab.ma | Code : VIP15\n\nMerci pour votre fid\u00e9lit\u00e9 \ud83d\udc9b\n\u2014 DAHAB",
    messageDarija:
      "\u0633\u0644\u0627\u0645 [NOM] \ud83d\udc51\n\n\u0646\u062a\u064a \u0645\u0646 \u0627\u0644\u0632\u0628\u0648\u0646\u0627\u062a VIP \u062f\u064a\u0627\u0644 DAHAB!\n\n\u062d\u0635\u0631\u064a\u0627\u060c \u0627\u0633\u062a\u0627\u0641\u062f\u064a \u0645\u0646 -15% \u0639\u0644\u0649 \u0627\u0644\u0643\u0648\u0645\u0627\u0646\u062f \u0627\u0644\u062c\u0627\u064a\u0629 \u0628\u0627\u0644\u0643\u0648\u062f VIP15.\n\n\ud83d\udc49 dahab.ma | \u0627\u0644\u0643\u0648\u062f: VIP15\n\n\u0634\u0643\u0631\u0627 \u0639\u0644\u0649 \u0627\u0644\u0648\u0641\u0627\u0621 \u062f\u064a\u0627\u0644\u0643 \ud83d\udc9b\n\u2014 DAHAB",
    trigger: "Clientes avec 3+ commandes",
    emoji: "\ud83d\udc51",
  },
  {
    id: "wa-panier-abandonne",
    name: "Panier abandonn\u00e9",
    messageFr:
      "Bonjour ! \ud83d\udc4b\n\nVous avez oubli\u00e9 quelque chose de magnifique dans votre panier DAHAB...\n\nVotre [PRODUIT] vous attend encore ! Ne le laissez pas s\u2019\u00e9chapper.\n\n\ud83d\udc49 Finaliser ma commande : dahab.ma/panier\n\nBesoin d\u2019aide ? R\u00e9pondez \u00e0 ce message \ud83d\ude4f",
    messageDarija:
      "\u0633\u0644\u0627\u0645! \ud83d\udc4b\n\n\u0646\u0633\u064a\u062a\u064a \u0634\u064a \u062d\u0627\u062c\u0629 \u0632\u0648\u064a\u0646\u0629 \u0641 \u0627\u0644\u0628\u0627\u0646\u064a\u064a \u062f\u064a\u0627\u0644\u0643 \u0641 DAHAB...\n\n[PRODUIT] \u0645\u0627\u0632\u0627\u0644(\u0629) \u0643\u062a\u0633\u0646\u0627\u0643! \u0645\u0627 \u062a\u062e\u0644\u064a\u0647\u0627\u0634 \u062a\u0641\u0648\u062a\u0643.\n\n\ud83d\udc49 \u0643\u0645\u0644\u064a \u0627\u0644\u0643\u0648\u0645\u0627\u0646\u062f: dahab.ma/panier\n\n\u0645\u062d\u062a\u0627\u062c\u0629 \u0645\u0633\u0627\u0639\u062f\u0629? \u062c\u0627\u0648\u0628\u064a \u0639\u0644\u0649 \u0647\u0627\u062f \u0627\u0644\u0645\u064a\u0633\u0627\u062c \ud83d\ude4f",
    trigger: "Panier abandonn\u00e9 (J+1, >150 MAD)",
    emoji: "\ud83d\udc4b",
  },
];
