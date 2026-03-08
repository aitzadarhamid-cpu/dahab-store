import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const seedProducts = [
  {
    name: "Bague Sultane Or",
    slug: "bague-sultane-or",
    description: "Bague elegante en or plaque avec un design inspire des motifs traditionnels marocains. Parfaite pour les occasions speciales et le quotidien rafine.",
    price: 149,
    compareAtPrice: 199,
    images: JSON.stringify(["https://images.unsplash.com/photo-1758995116142-c626a962a682?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1758995116121-60090f17ae20?w=600&h=600&fit=crop"]),
    category: "BAGUE",
    material: "OR_PLAQUE",
    stock: 15,
    sizes: JSON.stringify(["16mm", "17mm", "18mm", "19mm"]),
    featured: true,
  },
  {
    name: "Bague Diamantine Argent",
    slug: "bague-diamantine-argent",
    description: "Bague en argent 925 ornee de zircons, un eclat subtil pour illuminer votre main. Design moderne et intemporel.",
    price: 199,
    compareAtPrice: 249,
    images: JSON.stringify(["https://images.unsplash.com/photo-1675377294835-e71bdcd9850f?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1720103810809-f7adb3001678?w=600&h=600&fit=crop"]),
    category: "BAGUE",
    material: "ARGENT_925",
    stock: 8,
    sizes: JSON.stringify(["16mm", "17mm", "18mm"]),
    featured: false,
  },
  {
    name: "Bague Rose Eternelle",
    slug: "bague-rose-eternelle",
    description: "Bague delicate en or rose avec un motif floral grave. Un bijou romantique qui ajoute une touche feminine a chaque tenue.",
    price: 179,
    compareAtPrice: null,
    images: JSON.stringify(["https://images.unsplash.com/photo-1588909006332-2e30f95291bc?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1723522938769-4f26effdd1f1?w=600&h=600&fit=crop"]),
    category: "BAGUE",
    material: "OR_ROSE",
    stock: 12,
    sizes: JSON.stringify(["16mm", "17mm", "18mm", "19mm"]),
    featured: true,
  },
  {
    name: "Collier Medina Or",
    slug: "collier-medina-or",
    description: "Collier pendentif en or plaque inspire de l'architecture des medinas marocaines. Une piece unique qui raconte une histoire.",
    price: 249,
    compareAtPrice: 299,
    images: JSON.stringify(["https://images.unsplash.com/photo-1758995115560-59c10d6cc28f?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1758995115518-26f90aa61b97?w=600&h=600&fit=crop"]),
    category: "COLLIER",
    material: "OR_PLAQUE",
    stock: 6,
    sizes: JSON.stringify(["40cm", "45cm", "50cm"]),
    featured: true,
  },
  {
    name: "Collier Chaine Argent Pur",
    slug: "collier-chaine-argent-pur",
    description: "Chaine fine en argent 925, parfaite seule ou avec un pendentif. La base ideale de votre collection de bijoux.",
    price: 129,
    compareAtPrice: null,
    images: JSON.stringify(["https://images.unsplash.com/photo-1605884878538-6468614df578?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1676329945867-01c9975aa9d1?w=600&h=600&fit=crop"]),
    category: "COLLIER",
    material: "ARGENT_925",
    stock: 20,
    sizes: JSON.stringify(["40cm", "45cm", "50cm", "55cm"]),
    featured: false,
  },
  {
    name: "Collier Etoile du Sahara",
    slug: "collier-etoile-du-sahara",
    description: "Collier en cristal avec pendentif etoile, inspire des nuits du desert marocain. Brillance exceptionnelle sous toutes les lumieres.",
    price: 199,
    compareAtPrice: 259,
    images: JSON.stringify(["https://images.unsplash.com/photo-1585506172580-9564a524231f?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1554917442-1899751d9286?w=600&h=600&fit=crop"]),
    category: "COLLIER",
    material: "CRISTAL",
    stock: 4,
    sizes: JSON.stringify(["45cm"]),
    featured: true,
  },
  {
    name: "Bracelet Amazigh Dore",
    slug: "bracelet-amazigh-dore",
    description: "Bracelet large en or plaque avec des motifs berberes graves. Un hommage a l'heritage amazigh du Maroc.",
    price: 169,
    compareAtPrice: 219,
    images: JSON.stringify(["https://images.unsplash.com/photo-1728381031272-ba3f537feadd?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1611598935678-c88dca238fce?w=600&h=600&fit=crop"]),
    category: "BRACELET",
    material: "OR_PLAQUE",
    stock: 10,
    sizes: JSON.stringify(["S", "M", "L"]),
    featured: false,
  },
  {
    name: "Bracelet Jonc Argent",
    slug: "bracelet-jonc-argent",
    description: "Jonc elegant en argent 925, design epure et moderne. Se porte seul ou en accumulation pour un look tendance.",
    price: 139,
    compareAtPrice: null,
    images: JSON.stringify(["https://images.unsplash.com/photo-1590703160323-ac5d3fc14089?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1562710003-9622671a348a?w=600&h=600&fit=crop"]),
    category: "BRACELET",
    material: "ARGENT_925",
    stock: 18,
    sizes: JSON.stringify(["S", "M", "L"]),
    featured: false,
  },
  {
    name: "Bracelet Cascade Or Rose",
    slug: "bracelet-cascade-or-rose",
    description: "Bracelet multi-rangs en or rose avec petites perles. Un bijou fluide et feminin qui danse a votre poignet.",
    price: 189,
    compareAtPrice: 239,
    images: JSON.stringify(["https://images.unsplash.com/photo-1721034909472-390b9325f415?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1720528347585-02ae5d2504bf?w=600&h=600&fit=crop"]),
    category: "BRACELET",
    material: "OR_ROSE",
    stock: 7,
    sizes: JSON.stringify(["S", "M", "L"]),
    featured: true,
  },
  {
    name: "Boucles Zellige Or",
    slug: "boucles-zellige-or",
    description: "Boucles d'oreilles pendantes inspirees des mosaiques zellige du Maroc. Un chef-d'oeuvre miniature a vos oreilles.",
    price: 159,
    compareAtPrice: 199,
    images: JSON.stringify(["https://images.unsplash.com/photo-1758995115555-766abbd9a491?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1722410180687-b05b50922362?w=600&h=600&fit=crop"]),
    category: "BOUCLES_OREILLES",
    material: "OR_PLAQUE",
    stock: 11,
    sizes: JSON.stringify([]),
    featured: false,
  },
  {
    name: "Boucles Perle Argent",
    slug: "boucles-perle-argent",
    description: "Puces d'oreilles en argent 925 avec perle centrale. Elegance discrete pour tous les jours, du bureau aux soirees.",
    price: 99,
    compareAtPrice: null,
    images: JSON.stringify(["https://images.unsplash.com/photo-1682822801057-d05f74a07a2f?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1699894717164-e2a77d30a6fd?w=600&h=600&fit=crop"]),
    category: "BOUCLES_OREILLES",
    material: "ARGENT_925",
    stock: 25,
    sizes: JSON.stringify([]),
    featured: false,
  },
  {
    name: "Boucles Croissant Dore",
    slug: "boucles-croissant-dore",
    description: "Creoles en forme de croissant en acier inoxydable dore. Design audacieux et moderne, resistant a l'eau.",
    price: 119,
    compareAtPrice: 149,
    images: JSON.stringify(["https://images.unsplash.com/photo-1689777238216-a966d57939c5?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1708389828544-b394501c5700?w=600&h=600&fit=crop"]),
    category: "BOUCLES_OREILLES",
    material: "ACIER_INOXYDABLE",
    stock: 14,
    sizes: JSON.stringify([]),
    featured: true,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.admin.deleteMany();

  // Create products
  for (const product of seedProducts) {
    await prisma.product.create({ data: product });
  }
  console.log(`Created ${seedProducts.length} products`);

  // Create admin user
  const email = process.env.ADMIN_EMAIL || "admin@dahab.ma";
  const password = process.env.ADMIN_PASSWORD || "Dahab2024!";
  const passwordHash = await hash(password, 12);

  await prisma.admin.create({
    data: { email, passwordHash },
  });

  // Create promo codes
  await prisma.promoCode.create({
    data: {
      code: "BIENVENUE10",
      type: "PERCENTAGE",
      value: 10,
      minOrder: 0,
      maxUses: 0,
      active: true,
    },
  });
  await prisma.promoCode.create({
    data: {
      code: "DAHAB25",
      type: "FIXED",
      value: 25,
      minOrder: 150,
      maxUses: 100,
      active: true,
    },
  });
  console.log("Created 2 promo codes: BIENVENUE10 (10%), DAHAB25 (25 MAD off min 150)");

  // Create sample reviews
  const products = await prisma.product.findMany({ take: 4 });
  const reviewsData = [
    { customerName: "Fatima Z.", rating: 5, comment: "Tres belle bague, exactement comme sur la photo. Livraison rapide a Casablanca!" },
    { customerName: "Amina B.", rating: 4, comment: "Collier magnifique, bonne qualite. Je recommande DAHAB." },
    { customerName: "Sara M.", rating: 5, comment: "J'ai commande 3 bijoux, tous superbes. Le bracelet amazigh est mon prefere!" },
    { customerName: "Nadia K.", rating: 5, comment: "Rapport qualite prix imbattable. Les boucles d'oreilles sont elegantes." },
  ];
  for (let i = 0; i < products.length && i < reviewsData.length; i++) {
    await prisma.review.create({
      data: { productId: products[i].id, ...reviewsData[i], approved: true },
    });
  }
  console.log("Created 4 sample reviews");

  console.log("\n========================================");
  console.log("  DAHAB Admin Credentials");
  console.log("========================================");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log("========================================");
  console.log("  Promo Codes: BIENVENUE10, DAHAB25");
  console.log("  IMPORTANT: Change password in production!");
  console.log("========================================\n");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
