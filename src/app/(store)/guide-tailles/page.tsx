import type { Metadata } from "next";
import Link from "next/link";
import { Ruler, Info, MessageCircle } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Guide des Tailles Bijoux | DAHAB - Bagues, Bracelets",
  description:
    "Trouvez votre taille de bague et bracelet avec le guide des tailles DAHAB. Methodes simples pour mesurer a la maison. Tableau complet des tailles marocaines et internationales.",
  keywords: [
    "guide taille bague",
    "taille bague maroc",
    "mesurer taille bague",
    "guide tailles bijoux",
    "taille bracelet",
  ],
  alternates: { canonical: `${siteUrl}/guide-tailles` },
  openGraph: {
    title: "Guide des Tailles Bijoux | DAHAB",
    description: "Trouvez votre taille de bague et bracelet facilement avec nos methodes de mesure simples.",
    url: `${siteUrl}/guide-tailles`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

const ringSizes = [
  { fr: "48", us: "4.5", diam: "15.3", circ: "48" },
  { fr: "50", us: "5.5", diam: "15.9", circ: "50" },
  { fr: "52", us: "6", diam: "16.5", circ: "52" },
  { fr: "54", us: "7", diam: "17.2", circ: "54" },
  { fr: "56", us: "7.5", diam: "17.8", circ: "56" },
  { fr: "58", us: "8.5", diam: "18.5", circ: "58" },
  { fr: "60", us: "9", diam: "19.1", circ: "60" },
  { fr: "62", us: "10", diam: "19.7", circ: "62" },
];

const braceletSizes = [
  { taille: "S", circ: "15-16 cm", desc: "Poignet fin" },
  { taille: "M", circ: "16-17 cm", desc: "Poignet moyen (le plus courant)" },
  { taille: "L", circ: "17-18 cm", desc: "Poignet large" },
  { taille: "XL", circ: "18-19 cm", desc: "Poignet tres large" },
];

const methods = [
  {
    title: "Methode du fil",
    steps: [
      "Prenez un fil ou une bande de papier",
      "Enroulez-le autour de votre doigt (ou poignet)",
      "Marquez le point ou le fil se croise",
      "Mesurez la longueur avec une regle en mm",
      "Consultez le tableau ci-dessous",
    ],
  },
  {
    title: "Methode de la bague existante",
    steps: [
      "Prenez une bague qui vous va bien",
      "Posez-la sur une regle",
      "Mesurez le diametre interieur en mm",
      "Reportez-vous au tableau ci-dessous",
    ],
  },
];

export default function GuideTaillesPage() {
  return (
    <div className="container-page py-8 md:py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-2">
          Guide Pratique
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Guide des Tailles
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Trouvez votre taille parfaite en quelques etapes simples
        </p>
      </header>

      {/* Methods */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        {methods.map((method) => (
          <div key={method.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center">
                <Ruler className="w-5 h-5 text-brand-gold" />
              </div>
              <h2 className="font-display text-lg font-bold text-brand-black">
                {method.title}
              </h2>
            </div>
            <ol className="space-y-2">
              {method.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Ring Sizes Table */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-2xl font-bold text-brand-black text-center mb-6">
          Tailles de Bagues
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-cream">
                  <th className="px-4 py-3 text-left font-medium text-brand-black">Taille FR</th>
                  <th className="px-4 py-3 text-left font-medium text-brand-black">Taille US</th>
                  <th className="px-4 py-3 text-left font-medium text-brand-black">Diametre (mm)</th>
                  <th className="px-4 py-3 text-left font-medium text-brand-black">Circonference (mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ringSizes.map((size) => (
                  <tr key={size.fr} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-brand-black">{size.fr}</td>
                    <td className="px-4 py-3 text-gray-600">{size.us}</td>
                    <td className="px-4 py-3 text-gray-600">{size.diam} mm</td>
                    <td className="px-4 py-3 text-gray-600">{size.circ} mm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-3">
          Les tailles les plus courantes au Maroc sont 52, 54 et 56
        </p>
      </div>

      {/* Bracelet Sizes */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="font-display text-2xl font-bold text-brand-black text-center mb-6">
          Tailles de Bracelets
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {braceletSizes.map((size) => (
            <div
              key={size.taille}
              className={`bg-white rounded-xl p-5 shadow-sm border text-center ${
                size.taille === "M" ? "border-brand-gold ring-2 ring-brand-gold/20" : "border-gray-100"
              }`}
            >
              {size.taille === "M" && (
                <span className="inline-block bg-brand-gold/10 text-brand-gold text-xs font-medium px-2 py-0.5 rounded-full mb-2">
                  Le + populaire
                </span>
              )}
              <p className="text-2xl font-bold text-brand-black">{size.taille}</p>
              <p className="text-brand-gold font-medium text-sm">{size.circ}</p>
              <p className="text-gray-400 text-xs mt-1">{size.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-brand-cream rounded-2xl p-6 md:p-8 max-w-3xl mx-auto mb-12">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-display font-bold text-brand-black mb-2">Conseils</h3>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li>&bull; Mesurez en fin de journee (les doigts gonflent legerement)</li>
              <li>&bull; Evitez de mesurer quand il fait tres froid ou tres chaud</li>
              <li>&bull; En cas de doute entre deux tailles, choisissez la plus grande</li>
              <li>&bull; La taille peut varier selon les doigts — mesurez le bon doigt</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-500 mb-4">
          Besoin d&apos;aide pour choisir votre taille ?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-brand-gold text-white font-medium px-6 py-3 rounded-full hover:bg-brand-gold/90 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Demandez conseil
        </Link>
      </div>
    </div>
  );
}
