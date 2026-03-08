"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Truck,
  Wallet,
  RotateCcw,
  ShieldCheck,
  Users,
} from "lucide-react";

interface BadgeData {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  counterTarget?: number;
  counterSuffix?: string;
}

const badges: BadgeData[] = [
  {
    icon: Truck,
    title: "Livraison rapide",
    subtitle: "24-48h partout au Maroc",
  },
  {
    icon: Wallet,
    title: "Paiement a la livraison",
    subtitle: "Aucun paiement en ligne",
  },
  {
    icon: RotateCcw,
    title: "Satisfait ou rembourse",
    subtitle: "7 jours pour changer d'avis",
  },
  {
    icon: ShieldCheck,
    title: "100% bijoux garantis",
    subtitle: "Qualite premium certifiee",
  },
  {
    icon: Users,
    title: "Clientes satisfaites",
    subtitle: "Rejoignez notre communaute",
    counterTarget: 5000,
    counterSuffix: "+",
  },
];

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  inView,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, inView]);

  return (
    <span>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

interface TrustBadgesProps {
  variant?: "full" | "compact" | "checkout";
}

export function TrustBadges({ variant = "full" }: TrustBadgesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (variant === "checkout") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.slice(0, 4).map((badge, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2"
          >
            <badge.icon size={16} className="text-green-600 flex-shrink-0" />
            <span className="text-xs font-medium text-green-800">
              {badge.title}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {badges.slice(0, 4).map((badge, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 text-sm text-gray-600"
          >
            <badge.icon size={14} className="text-brand-gold" />
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  // Full variant
  return (
    <section ref={ref} className="bg-white py-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-2">
            Pourquoi choisir DAHAB ?
          </h2>
          <p className="text-gray-500 text-sm">
            La confiance de milliers de clientes au Maroc
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="bg-brand-cream/50 rounded-xl p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <badge.icon size={24} className="text-brand-gold" />
              </div>
              {badge.counterTarget ? (
                <p className="font-display text-2xl font-bold text-brand-gold mb-1">
                  <AnimatedCounter
                    target={badge.counterTarget}
                    suffix={badge.counterSuffix}
                    inView={isInView}
                  />
                </p>
              ) : null}
              <h3 className="font-display font-bold text-brand-black text-sm mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-gray-500">{badge.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
