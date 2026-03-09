"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Truck, Shield, Star, Clock, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
  {
    name: "Sara L.",
    city: "Tanger",
    text: "La qualite des bracelets est incroyable pour ce prix. Je suis une cliente fidele maintenant.",
    rating: 5,
  },
  {
    name: "Nadia R.",
    city: "Fes",
    text: "Mes collegues me demandent toujours ou j'achete mes bijoux. DAHAB est mon secret!",
    rating: 5,
  },
];

/* Staggered container + child variants */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function LandingClient({ products }: { products: Product[] }) {
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOverlayOpacity = useTransform(scrollY, [0, 400], [0.6, 0.9]);
  const heroTextY = useTransform(scrollY, [0, 400], [0, -40]);

  /* Testimonial carousel state */
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [autoplay, nextTestimonial]);

  return (
    <div className="overflow-hidden">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-brand-black min-h-[85vh] flex items-center">
        {/* Parallax background image */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute right-0 top-0 w-full md:w-3/5 h-[120%] -top-[10%] hidden md:block"
        >
          <Image
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&h=800&fit=crop"
            alt="Bijoux DAHAB"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Gradient overlay with parallax-driven opacity */}
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/95 to-brand-black/40 z-10"
        />

        {/* Decorative gold line accents */}
        <div className="absolute left-0 top-1/4 w-24 h-px bg-gradient-to-r from-brand-gold to-transparent z-20 hidden md:block" />
        <div className="absolute left-0 top-1/4 mt-3 w-16 h-px bg-gradient-to-r from-brand-gold/60 to-transparent z-20 hidden md:block" />

        <div className="container-page relative z-20 py-20 md:py-32">
          <motion.div style={{ y: heroTextY }} className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-brand-gold font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
            >
              Nouvelle Collection 2025
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              L&apos;Elegance
              <br />
              <span className="gold-shimmer">Accessible</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
            >
              Des bijoux raffines pour la femme marocaine moderne. De 99 a 299
              MAD, livres partout au Maroc.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/boutique">
                <Button size="lg" className="gap-2 text-base px-8 py-4 shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 transition-shadow duration-300">
                  Decouvrir la collection
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-16 hidden md:flex items-center gap-2 text-gray-500 text-xs tracking-widest uppercase"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 border border-gray-500 rounded-full flex items-start justify-center p-1"
              >
                <motion.div className="w-1 h-1.5 bg-brand-gold rounded-full" />
              </motion.div>
              Defilez pour decouvrir
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== TRUST BADGES ===================== */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-page py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
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
                variants={fadeUpItem}
                className="flex items-center gap-3 justify-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors duration-300">
                  <badge.icon
                    size={22}
                    className="text-brand-gold flex-shrink-0"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">
                    {badge.label}
                  </p>
                  <p className="text-xs text-gray-500">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== BESTSELLERS ===================== */}
      <section className="container-page py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-brand-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Les plus populaires
          </p>
          <h2 className="section-title mb-3">Nos Bestsellers</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Les pieces preferees de nos clientes, selectionnees pour vous
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUpItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/boutique">
            <Button variant="outline" size="lg" className="gap-2 hover:shadow-lg transition-shadow duration-300">
              Voir toute la collection
              <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ===================== CATEGORIES ===================== */}
      <section className="bg-white py-20">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-brand-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Explorer
            </p>
            <h2 className="section-title mb-3">Nos Categories</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {categories.map((cat) => (
              <motion.div key={cat.slug} variants={fadeUpItem}>
                <Link
                  href={`/boutique?category=${cat.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-md group-hover:shadow-2xl group-hover:shadow-brand-gold/10 transition-all duration-500">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/20 to-transparent group-hover:from-brand-black/60 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
                      <h3 className="text-white font-display text-xl font-bold mb-1">
                        {cat.name}
                      </h3>
                      <span className="text-brand-gold text-xs font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Decouvrir
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== COUNTDOWN ===================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="container-page py-12"
      >
        <CountdownTimer />
      </motion.section>

      {/* ===================== TESTIMONIAL CAROUSEL ===================== */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-brand-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Temoignages
            </p>
            <h2 className="section-title mb-3">Ce que disent nos clientes</h2>
          </motion.div>

          {/* Carousel */}
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="relative min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-brand-cream rounded-2xl p-8 md:p-10 text-center w-full"
                >
                  <Quote size={32} className="text-brand-gold/30 mx-auto mb-4" />
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({
                      length: testimonials[currentTestimonial].rating,
                    }).map((_, j) => (
                      <Star
                        key={j}
                        size={18}
                        className="text-brand-gold fill-brand-gold"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg md:text-xl mb-6 italic leading-relaxed font-display">
                    &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-brand-black">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].city}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-14 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-cream transition-colors border border-gray-100"
              aria-label="Temoignage precedent"
            >
              <ChevronLeft size={20} className="text-brand-black" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-14 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-cream transition-colors border border-gray-100"
              aria-label="Temoignage suivant"
            >
              <ChevronRight size={20} className="text-brand-black" />
            </button>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentTestimonial
                      ? "w-8 bg-brand-gold"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Temoignage ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="container-page py-20"
      >
        <div className="relative bg-brand-black rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          {/* Decorative gold accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          <div className="absolute top-8 right-8 w-20 h-20 border border-brand-gold/10 rounded-full hidden md:block" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border border-brand-gold/10 rounded-full hidden md:block" />

          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 relative">
            Envie de craquer ?
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg relative">
            Contactez-nous sur WhatsApp pour un conseil personnalise ou passez
            directement commande
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative">
            <Link href="/boutique">
              <Button size="lg" className="gap-2 text-base px-8 py-4 shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 transition-shadow duration-300">
                Commander maintenant
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
