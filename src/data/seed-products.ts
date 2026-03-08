export const seedProducts = [
  // BAGUES (Rings)
  {
    name: "Bague Sultane Or",
    slug: "bague-sultane-or",
    description:
      "Bague elegante en or plaque avec un design inspire des motifs traditionnels marocains. Parfaite pour les occasions speciales et le quotidien rafine.",
    price: 149,
    compareAtPrice: 199,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&h=600&fit=crop",
    ]),
    category: "BAGUE",
    material: "OR_PLAQUE",
    stock: 15,
    sizes: JSON.stringify(["16mm", "17mm", "18mm", "19mm"]),
    featured: true,
  },
  {
    name: "Bague Diamantine Argent",
    slug: "bague-diamantine-argent",
    description:
      "Bague en argent 925 ornee de zircons, un eclat subtil pour illuminer votre main. Design moderne et intemporel.",
    price: 199,
    compareAtPrice: 249,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
    ]),
    category: "BAGUE",
    material: "ARGENT_925",
    stock: 8,
    sizes: JSON.stringify(["16mm", "17mm", "18mm"]),
    featured: false,
  },
  {
    name: "Bague Rose Eternelle",
    slug: "bague-rose-eternelle",
    description:
      "Bague delicate en or rose avec un motif floral grave. Un bijou romantique qui ajoute une touche feminine a chaque tenue.",
    price: 179,
    compareAtPrice: null,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
    ]),
    category: "BAGUE",
    material: "OR_ROSE",
    stock: 12,
    sizes: JSON.stringify(["16mm", "17mm", "18mm", "19mm"]),
    featured: true,
  },

  // COLLIERS (Necklaces)
  {
    name: "Collier Medina Or",
    slug: "collier-medina-or",
    description:
      "Collier pendentif en or plaque inspire de l'architecture des medinas marocaines. Une piece unique qui raconte une histoire.",
    price: 249,
    compareAtPrice: 299,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b34e?w=600&h=600&fit=crop",
    ]),
    category: "COLLIER",
    material: "OR_PLAQUE",
    stock: 6,
    sizes: JSON.stringify(["40cm", "45cm", "50cm"]),
    featured: true,
  },
  {
    name: "Collier Chaine Argent Pur",
    slug: "collier-chaine-argent-pur",
    description:
      "Chaine fine en argent 925, parfaite seule ou avec un pendentif. La base ideale de votre collection de bijoux.",
    price: 129,
    compareAtPrice: null,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
    ]),
    category: "COLLIER",
    material: "ARGENT_925",
    stock: 20,
    sizes: JSON.stringify(["40cm", "45cm", "50cm", "55cm"]),
    featured: false,
  },
  {
    name: "Collier Etoile du Sahara",
    slug: "collier-etoile-du-sahara",
    description:
      "Collier en cristal avec pendentif etoile, inspire des nuits du desert marocain. Brillance exceptionnelle sous toutes les lumieres.",
    price: 199,
    compareAtPrice: 259,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop",
    ]),
    category: "COLLIER",
    material: "CRISTAL",
    stock: 4,
    sizes: JSON.stringify(["45cm"]),
    featured: true,
  },

  // BRACELETS
  {
    name: "Bracelet Amazigh Dore",
    slug: "bracelet-amazigh-dore",
    description:
      "Bracelet large en or plaque avec des motifs berberes graves. Un hommage a l'heritage amazigh du Maroc.",
    price: 169,
    compareAtPrice: 219,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop",
    ]),
    category: "BRACELET",
    material: "OR_PLAQUE",
    stock: 10,
    sizes: JSON.stringify(["S", "M", "L"]),
    featured: false,
  },
  {
    name: "Bracelet Jonc Argent",
    slug: "bracelet-jonc-argent",
    description:
      "Jonc elegant en argent 925, design epure et moderne. Se porte seul ou en accumulation pour un look tendance.",
    price: 139,
    compareAtPrice: null,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&h=600&fit=crop",
    ]),
    category: "BRACELET",
    material: "ARGENT_925",
    stock: 18,
    sizes: JSON.stringify(["S", "M", "L"]),
    featured: false,
  },
  {
    name: "Bracelet Cascade Or Rose",
    slug: "bracelet-cascade-or-rose",
    description:
      "Bracelet multi-rangs en or rose avec petites perles. Un bijou fluide et feminin qui danse a votre poignet.",
    price: 189,
    compareAtPrice: 239,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
    ]),
    category: "BRACELET",
    material: "OR_ROSE",
    stock: 7,
    sizes: JSON.stringify(["S", "M", "L"]),
    featured: true,
  },

  // BOUCLES D'OREILLES (Earrings)
  {
    name: "Boucles Zellige Or",
    slug: "boucles-zellige-or",
    description:
      "Boucles d'oreilles pendantes inspirees des mosaiques zellige du Maroc. Un chef-d'oeuvre miniature a vos oreilles.",
    price: 159,
    compareAtPrice: 199,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop",
    ]),
    category: "BOUCLES_OREILLES",
    material: "OR_PLAQUE",
    stock: 11,
    sizes: JSON.stringify([]),
    featured: false,
  },
  {
    name: "Boucles Perle Argent",
    slug: "boucles-perle-argent",
    description:
      "Puces d'oreilles en argent 925 avec perle centrale. Elegance discrete pour tous les jours, du bureau aux soirees.",
    price: 99,
    compareAtPrice: null,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
    ]),
    category: "BOUCLES_OREILLES",
    material: "ARGENT_925",
    stock: 25,
    sizes: JSON.stringify([]),
    featured: false,
  },
  {
    name: "Boucles Croissant Dore",
    slug: "boucles-croissant-dore",
    description:
      "Creoles en forme de croissant en acier inoxydable dore. Design audacieux et moderne, resistant a l'eau.",
    price: 119,
    compareAtPrice: 149,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop",
    ]),
    category: "BOUCLES_OREILLES",
    material: "ACIER_INOXYDABLE",
    stock: 14,
    sizes: JSON.stringify([]),
    featured: true,
  },
];
