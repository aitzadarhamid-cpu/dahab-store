import type { Metadata } from "next";
import Link from "next/link";
import { Truck, RefreshCw, MessageCircle, CheckCircle } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Politique de Retour et Echange | DAHAB Bijoux",
  description:
    "Decouvrez la politique de retour et d'echange de DAHAB. Retours sous 7 jours, echanges gratuits. Service client reactif via WhatsApp.",
  alternates: { canonical: `${siteUrl}/politique-retour` },
};

export default function PolitiqueRetourPage() {
  const steps = [
    {
      icon: MessageCircle,
      title: "1. Contactez-nous",
      desc: "Envoyez-nous un message via WhatsApp dans les 7 jours suivant la reception de votre commande.",
    },
    {
      icon: RefreshCw,
      title: "2. Pr\u00e9parez le retour",
      desc: "Remettez le bijou dans son emballage d'origine, non porte et en parfait etat.",
    },
    {
      icon: Truck,
      title: "3. Expediez le colis",
      desc: "Nous vous communiquerons l'adresse de retour. Les frais de retour sont a la charge du client.",
    },
    {
      icon: CheckCircle,
      title: "4. Echange ou remboursement",
      desc: "Une fois le produit recu et verifie, nous procedons a l'echange ou au remboursement sous 48h.",
    },
  ];

  return (
    <div className="container-page py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Politique de Retour et &Eacute;change
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Votre satisfaction est notre priorit&eacute;. Si vous n&apos;&ecirc;tes
          pas enti&egrave;rement satisfaite, nous sommes l&agrave; pour vous
          aider.
        </p>
      </header>

      {/* Key Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <p className="font-display text-3xl font-bold text-brand-gold mb-2">
            7 jours
          </p>
          <p className="text-gray-600 text-sm">
            Pour demander un retour ou un &eacute;change
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <p className="font-display text-3xl font-bold text-brand-gold mb-2">
            48h
          </p>
          <p className="text-gray-600 text-sm">
            Traitement de votre demande
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <p className="font-display text-3xl font-bold text-brand-gold mb-2">
            WhatsApp
          </p>
          <p className="text-gray-600 text-sm">
            Service client r&eacute;actif
          </p>
        </div>
      </div>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-brand-black mb-8 text-center">
          Comment faire un retour ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-xl p-6 shadow-sm text-center"
            >
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="text-brand-gold" size={24} />
              </div>
              <h3 className="font-display font-bold text-brand-black mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions */}
      <section className="max-w-3xl mx-auto mb-12">
        <h2 className="font-display text-2xl font-bold text-brand-black mb-6 text-center">
          Conditions de retour
        </h2>
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold mt-0.5">&#x2713;</span>
            <p className="text-gray-600">
              Le bijou doit &ecirc;tre retourn&eacute; dans les 7 jours
              suivant la r&eacute;ception
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold mt-0.5">&#x2713;</span>
            <p className="text-gray-600">
              Le produit doit &ecirc;tre non port&eacute;, non endommag&eacute;
              et dans son emballage d&apos;origine
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold mt-0.5">&#x2713;</span>
            <p className="text-gray-600">
              Les &eacute;changes sont possibles pour une taille
              diff&eacute;rente ou un autre produit de valeur &eacute;gale ou
              sup&eacute;rieure
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500 font-bold mt-0.5">&#x2717;</span>
            <p className="text-gray-600">
              Les bijoux personnalis&eacute;s ou grav&eacute;s ne sont ni
              repris ni &eacute;chang&eacute;s
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500 font-bold mt-0.5">&#x2717;</span>
            <p className="text-gray-600">
              Les frais de retour sont &agrave; la charge du client
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Besoin d&apos;aide ? Consultez notre FAQ ou contactez-nous.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/faq"
            className="inline-block bg-brand-gold text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-gold-dark transition-colors"
          >
            Consulter la FAQ
          </Link>
          <Link
            href="/boutique"
            className="inline-block border border-brand-gold text-brand-gold px-6 py-3 rounded-lg font-medium hover:bg-brand-gold/5 transition-colors"
          >
            Retour &agrave; la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
