import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Shield, Package, CheckCircle } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Livraison au Maroc | DAHAB Bijoux - Gratuite des 299 MAD",
  description:
    "Livraison partout au Maroc en 24h a 72h. Gratuite des 299 MAD. Paiement a la livraison (COD). Suivi en temps reel. DAHAB livre dans plus de 39 villes.",
  keywords: [
    "livraison bijoux maroc",
    "livraison gratuite maroc",
    "dahab livraison",
    "paiement a la livraison",
    "COD maroc",
  ],
  alternates: { canonical: `${siteUrl}/livraison` },
  openGraph: {
    title: "Livraison au Maroc | DAHAB Bijoux - Gratuite des 299 MAD",
    description: "Livraison partout au Maroc en 24-72h. Gratuite des 299 MAD. Paiement a la livraison.",
    url: `${siteUrl}/livraison`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

const zones = [
  {
    name: "Zone A",
    delay: "24h",
    color: "bg-green-100 text-green-700 border-green-200",
    cities: ["Casablanca", "Rabat", "Marrakech", "Fes", "Tanger", "Agadir", "Mohammedia", "Sale", "Temara"],
  },
  {
    name: "Zone B",
    delay: "24-48h",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    cities: ["Meknes", "Oujda", "Kenitra", "Tetouan", "Nador", "Safi", "El Jadida", "Beni Mellal", "Khouribga", "Settat"],
  },
  {
    name: "Zone C",
    delay: "48-72h",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    cities: ["Taza", "Berrechid", "Khemisset", "Larache", "Guelmim", "Errachidia", "Dakhla", "Laayoune", "et plus..."],
  },
];

const steps = [
  { icon: Package, title: "Commande confirmee", desc: "Votre commande est preparee sous 24h" },
  { icon: Truck, title: "Expedition", desc: "Confiee a notre partenaire logistique" },
  { icon: MapPin, title: "En route", desc: "Suivez votre colis en temps reel" },
  { icon: CheckCircle, title: "Livraison", desc: "Payez a la reception — 0 risque" },
];

export default function LivraisonPage() {
  return (
    <div className="container-page py-8 md:py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-2">
          Informations
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Livraison au Maroc
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Nous livrons partout au Maroc avec paiement a la livraison
        </p>
      </header>

      {/* Key Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
        {[
          { icon: Truck, label: "Gratuite", sub: "des 299 MAD" },
          { icon: Clock, label: "24h a 72h", sub: "selon votre ville" },
          { icon: Shield, label: "COD", sub: "payez a la livraison" },
          { icon: MapPin, label: "39+ villes", sub: "tout le Maroc" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <item.icon className="w-8 h-8 text-brand-gold mx-auto mb-2" />
            <p className="font-display font-bold text-brand-black">{item.label}</p>
            <p className="text-gray-400 text-xs">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Tarifs */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="font-display text-2xl font-bold text-brand-black text-center mb-6">
          Frais de Livraison
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-6 text-center bg-brand-cream">
              <p className="text-3xl font-bold text-brand-gold">GRATUIT</p>
              <p className="text-gray-500 text-sm mt-1">Commandes &ge; 299 MAD</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-brand-black">29 MAD</p>
              <p className="text-gray-500 text-sm mt-1">Commandes &lt; 299 MAD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-2xl font-bold text-brand-black text-center mb-8">
          Comment ca marche
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-cream mb-3">
                <step.icon className="w-6 h-6 text-brand-gold" />
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-medium text-brand-black text-sm mb-1">{step.title}</h3>
              <p className="text-gray-400 text-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Zones */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="font-display text-2xl font-bold text-brand-black text-center mb-8">
          Zones de Livraison
        </h2>
        <div className="space-y-6">
          {zones.map((zone) => (
            <div key={zone.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${zone.color}`}>
                  {zone.name}
                </span>
                <span className="text-sm font-medium text-brand-black">
                  Delai : {zone.delay}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {zone.cities.map((city) => (
                  <span key={city} className="bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-500 mb-4">
          Vous avez une question sur la livraison ?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-white font-medium px-6 py-3 rounded-full hover:bg-brand-gold/90 transition-colors"
          >
            Contactez-nous
          </Link>
          <Link
            href="/suivi"
            className="inline-flex items-center justify-center gap-2 border border-brand-gold text-brand-gold font-medium px-6 py-3 rounded-full hover:bg-brand-cream transition-colors"
          >
            Suivre ma commande
          </Link>
        </div>
      </div>
    </div>
  );
}
