import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, Clock, MapPin, Instagram } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "212600000000";

export const metadata: Metadata = {
  title: "Contactez-Nous | DAHAB Bijoux Maroc",
  description:
    "Contactez DAHAB Bijoux par WhatsApp, email ou Instagram. Service client reactif 7j/7 pour toutes vos questions sur nos bijoux, commandes et livraisons au Maroc.",
  keywords: [
    "contact dahab",
    "service client bijoux maroc",
    "whatsapp dahab bijoux",
    "contacter dahab",
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contactez-Nous | DAHAB Bijoux Maroc",
    description: "Service client DAHAB reactif 7j/7 par WhatsApp, email et Instagram.",
    url: `${siteUrl}/contact`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Reponse en moins de 30 min",
    detail: "Notre moyen de contact principal",
    action: `https://wa.me/${whatsappPhone}?text=Bonjour%20DAHAB%20!%20J'ai%20une%20question.`,
    actionLabel: "Envoyer un message",
    color: "bg-green-500 hover:bg-green-600",
    highlight: true,
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "contact@dahab.ma",
    detail: "Reponse sous 24h",
    action: "mailto:contact@dahab.ma",
    actionLabel: "Envoyer un email",
    color: "bg-brand-gold hover:bg-brand-gold/90",
    highlight: false,
  },
  {
    icon: Instagram,
    title: "Instagram",
    subtitle: "@dahab.ma",
    detail: "DM ou commentaires",
    action: "https://instagram.com/dahab.ma",
    actionLabel: "Suivez-nous",
    color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Ou est ma commande ?",
    a: "Suivez votre commande en temps reel sur notre page",
    link: "/suivi",
    linkText: "Suivi de commande",
  },
  {
    q: "Comment faire un retour ?",
    a: "Consultez notre politique de retour pour connaitre les etapes",
    link: "/politique-retour",
    linkText: "Politique de retour",
  },
  {
    q: "Quels sont les frais de livraison ?",
    a: "Livraison gratuite des 299 MAD, sinon 29 MAD partout au Maroc",
    link: "/livraison",
    linkText: "Infos livraison",
  },
];

export default function ContactPage() {
  return (
    <div className="container-page py-8 md:py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <p className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-2">
          Service Client
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Contactez-Nous
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Notre equipe est a votre disposition 7 jours sur 7 pour repondre a
          toutes vos questions
        </p>
      </header>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
        {contactMethods.map((method) => (
          <div
            key={method.title}
            className={`bg-white rounded-2xl p-6 shadow-sm border ${
              method.highlight ? "border-green-200 ring-2 ring-green-100" : "border-gray-100"
            } text-center`}
          >
            {method.highlight && (
              <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                Recommande
              </span>
            )}
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${
                method.highlight ? "bg-green-100" : "bg-brand-cream"
              } mb-4`}
            >
              <method.icon
                className={`w-7 h-7 ${
                  method.highlight ? "text-green-600" : "text-brand-gold"
                }`}
              />
            </div>
            <h2 className="font-display text-xl font-bold text-brand-black mb-1">
              {method.title}
            </h2>
            <p className="text-brand-gold font-medium text-sm mb-1">{method.subtitle}</p>
            <p className="text-gray-400 text-sm mb-5">{method.detail}</p>
            <a
              href={method.action}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors ${method.color}`}
            >
              {method.actionLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Horaires */}
      <div className="bg-brand-cream rounded-2xl p-8 max-w-2xl mx-auto mb-16 text-center">
        <Clock className="w-8 h-8 text-brand-gold mx-auto mb-3" />
        <h2 className="font-display text-xl font-bold text-brand-black mb-4">
          Horaires du Service Client
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm max-w-xs mx-auto">
          <div className="text-right text-gray-500">Lun - Ven</div>
          <div className="text-left font-medium text-brand-black">9h - 21h</div>
          <div className="text-right text-gray-500">Sam - Dim</div>
          <div className="text-left font-medium text-brand-black">10h - 18h</div>
        </div>
        <p className="text-gray-400 text-xs mt-4">
          WhatsApp disponible 24h/24 — reponse garantie sous 30 min pendant les heures d&apos;ouverture
        </p>
      </div>

      {/* Quick FAQ */}
      <div className="max-w-2xl mx-auto mb-12">
        <h2 className="font-display text-2xl font-bold text-brand-black text-center mb-8">
          Questions Frequentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-medium text-brand-black mb-1">{faq.q}</h3>
              <p className="text-gray-500 text-sm">
                {faq.a}{" "}
                <Link href={faq.link} className="text-brand-gold hover:underline font-medium">
                  {faq.linkText} &rarr;
                </Link>
              </p>
            </div>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link
            href="/faq"
            className="text-brand-gold hover:underline font-medium text-sm"
          >
            Voir toutes les FAQ &rarr;
          </Link>
        </p>
      </div>

      {/* Location */}
      <div className="text-center text-gray-400 text-sm">
        <MapPin className="w-4 h-4 inline-block mr-1" />
        Casablanca, Maroc — Livraison dans tout le Royaume
      </div>
    </div>
  );
}
