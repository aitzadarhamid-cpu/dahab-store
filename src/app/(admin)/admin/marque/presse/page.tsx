export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  ExternalLink,
  Package,
  Truck,
  Star,
  Mail,
  MessageCircle,
  FileImage,
  FileCode,
  Newspaper,
  Download,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Data fetching — server component, runs at request time
// ---------------------------------------------------------------------------

async function getPressStats() {
  const [activeProducts, deliveredOrders, approvedReviews, newsletterSubs] =
    await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.order.count({ where: { status: "LIVREE" } }),
      prisma.review.count({ where: { approved: true } }),
      prisma.newsletter.count({ where: { active: true } }),
    ]);

  return { activeProducts, deliveredOrders, approvedReviews, newsletterSubs };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PressKitAdminPage() {
  const stats = await getPressStats();

  const liveStats = [
    {
      label: "Produits actifs",
      value: stats.activeProducts,
      icon: Package,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Commandes livrees",
      value: stats.deliveredOrders,
      icon: Truck,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Avis clients",
      value: stats.approvedReviews,
      icon: Star,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Abonnes newsletter",
      value: stats.newsletterSubs,
      icon: Mail,
      color: "bg-green-50 text-green-700",
    },
  ];

  const downloadableAssets = [
    {
      name: "Logo DAHAB (SVG)",
      path: "/logo.svg",
      format: "SVG",
      icon: FileCode,
    },
    {
      name: "Image Open Graph",
      path: "/og-image.jpg",
      format: "JPG",
      icon: FileImage,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-black">
            Press Kit
          </h1>
          <p className="text-gray-500 mt-1">
            Apercu du kit presse public et ressources media
          </p>
        </div>
        <Link
          href="/presse"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-brand-gold hover:text-brand-gold-dark transition-colors bg-brand-gold/10 px-4 py-2 rounded-lg"
        >
          Voir la page publique
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* ---------- Brand Story Preview ---------- */}
      <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="font-display text-lg font-bold text-brand-black mb-4">
          Histoire de Marque (apercu)
        </h2>
        <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
          <p>
            <strong className="text-brand-black">DAHAB</strong> (دهب) signifie
            &laquo;&nbsp;or&nbsp;&raquo; en arabe. Fondee en 2024 a Casablanca,
            la marque a pour mission de rendre les bijoux elegants accessibles a
            toutes les femmes au Maroc.
          </p>
          <p>
            Avec une gamme de prix de 99 a 299 MAD et la livraison a domicile
            dans tout le Royaume avec paiement a la livraison (COD), DAHAB
            democratise l&apos;elegance au quotidien.
          </p>
        </div>
      </section>

      {/* ---------- Chiffres cles en direct ---------- */}
      <section className="mb-8">
        <h2 className="font-display text-lg font-bold text-brand-black mb-4">
          Chiffres cles en direct
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {liveStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}
              >
                <stat.icon size={20} />
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-display font-bold text-brand-black">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Assets disponibles ---------- */}
      <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="font-display text-lg font-bold text-brand-black mb-4 flex items-center gap-2">
          <Download size={18} className="text-brand-gold" />
          Assets disponibles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {downloadableAssets.map((asset) => (
            <div
              key={asset.path}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50/50"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                <asset.icon size={18} className="text-brand-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brand-black">
                  {asset.name}
                </p>
                <p className="text-xs text-gray-400 font-mono truncate">
                  {asset.path}
                </p>
              </div>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-mono">
                {asset.format}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Ces fichiers sont accessibles depuis la page publique du press kit.
        </p>
      </section>

      {/* ---------- Mentions medias ---------- */}
      <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="font-display text-lg font-bold text-brand-black mb-4 flex items-center gap-2">
          <Newspaper size={18} className="text-brand-gold" />
          Mentions medias
        </h2>
        <div className="py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <Newspaper size={20} className="text-gray-400" />
          </div>
          <p className="text-gray-400 text-sm">
            Aucune mention presse pour le moment
          </p>
          <p className="text-gray-300 text-xs mt-1">
            Les articles et mentions media apparaitront ici
          </p>
        </div>
      </section>

      {/* ---------- Contact presse ---------- */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-brand-black mb-4">
          Contact presse
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
            <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
              <Mail size={16} className="text-brand-gold" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Email presse</p>
              <p className="text-sm font-medium text-brand-black">
                presse@dahab.ma
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400">WhatsApp</p>
              <p className="text-sm font-medium text-brand-black">
                +212 6 00 00 00 00
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
