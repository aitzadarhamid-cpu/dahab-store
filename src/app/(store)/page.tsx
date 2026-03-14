export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { LandingClient } from "./landing-client";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { active: true, featured: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return <LandingClient products={featuredProducts} />;
}
