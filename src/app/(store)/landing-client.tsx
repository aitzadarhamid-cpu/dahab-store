"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, Star, Clock } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { CountdownTimer } from "@/components/marketing/countdown-timer";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  images: string;
  category: string;
  stock: number;
}

const categories = [
  {
    name: "Bagues",
    slug: "BAGUE",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
  },
  {
    name: "Colliers",
    slug: "COLLIER",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
  },
  {
    name: "Bracelets",
    slug: "BRACELET",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
  },
  {
    name: "Boucles d'oreilles",
    slug: "BOUCLES_OREILLES",
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop",
  },
];

const testimonials = [
  {
    name: "Fatima Z.",
    city: "Casablanca",
    text: "Bijoux magnifiques et livraison rapide! La qualite est au rendez-vous.",
    rating: 5,
  },
  {
    name: "Amina B.",
    city: "Rabat",
    text: "J'adore mes boucles d'oreilles DAHAB. Le design est elegant et le prix tres abordable.",
    rating: 5,
  },
  {
    name: "Khadija M.",
    city: "Marrakech",
    text: "Service client exceptionnel via WhatsApp. Je recommande a 100%!",
    rating: 5,
  },
];

export function LandingClient({ products }: { products: Product[] }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1515562141589-67f0d569b34e?w=1200&h=800&fit=crop"
            alt="Bijoux DAHAB"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container-page relative z-20 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-brand-gold font-medium tracking-widest uppercase text-sm mb-4">
              Nouvelle Collection 2024
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              L&apos;Elegance
              <br />
              <span className="gold-gradient">Accessible</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Des bijoux raffines pour la femme marocaine moderne. De 99 a 299
              MAD, livres partout au Maroc.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/boutique">
                <Button size="lg" className="gap-2">
                  Decouvrir la collection
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-page py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                label: "Livraison partout",
                sub: "au Maroc",
              },
              {
                icon: Shield,
                label: "Paiement securise",
                sub: "a la livraison",
              },
              {
                icon: Star,
                label: "Qualite premium",
                sub: "garantie",
              },
              {
                icon: Clock,
                label: "Support WhatsApp",
                sub: "7j/7",
              },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 justify-center"
              >
                <badge.icon
                  size={24}
                  className="text-brand-gold flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-brand-black">
                    {badge.label}
                  </p>
                  <p className="text-xs text-gray-500">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container-page py-16">
        <div className="text-center mb-10">
          <h2 className="section-title mb-3">Nos Bestsellers</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Les pieces preferees de nos clientes, selectionnees pour vous
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/boutique">
            <Button variant="outline" size="lg" className="gap-2">
              Voir toute la collection
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Nos Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/boutique?category=${cat.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white font-display text-xl font-bold">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="container-page py-12">
        <CountdownTimer />
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Ce que disent nos clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-brand-cream rounded-xl p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="text-brand-gold fill-brand-gold"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-sm text-brand-black">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">{t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="bg-brand-black rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Envie de craquer ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Contactez-nous sur WhatsApp pour un conseil personnalise ou passez
            directement commande
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/boutique">
              <Button size="lg" className="gap-2">
                Commander maintenant
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
