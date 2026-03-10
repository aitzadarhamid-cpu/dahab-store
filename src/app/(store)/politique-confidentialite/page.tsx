import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Politique de Confidentialite | DAHAB Bijoux",
  description:
    "Decouvrez comment DAHAB protege vos donnees personnelles. Politique de confidentialite et protection des donnees.",
  keywords: ["confidentialite dahab", "protection donnees bijoux maroc", "RGPD maroc"],
  alternates: { canonical: `${siteUrl}/politique-confidentialite` },
  openGraph: {
    title: "Politique de Confidentialite | DAHAB Bijoux",
    description: "Comment DAHAB protege vos donnees personnelles. Loi 09-08 Maroc.",
    url: `${siteUrl}/politique-confidentialite`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container-page py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Politique de Confidentialit&eacute;
        </h1>
        <p className="text-gray-500 text-sm">
          Derni&egrave;re mise &agrave; jour : Mars 2025
        </p>
      </header>

      <div className="max-w-3xl mx-auto prose prose-gray">
        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            1. Donn&eacute;es collect&eacute;es
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            DAHAB collecte les donn&eacute;es suivantes lors de vos commandes :
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Nom et pr&eacute;nom</li>
            <li>Num&eacute;ro de t&eacute;l&eacute;phone</li>
            <li>Adresse de livraison et ville</li>
            <li>Adresse email (si fournie)</li>
            <li>Historique des commandes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            2. Utilisation des donn&eacute;es
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            Vos donn&eacute;es personnelles sont utilis&eacute;es pour :
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Traiter et livrer vos commandes</li>
            <li>Vous contacter concernant votre commande (WhatsApp, SMS)</li>
            <li>Am&eacute;liorer nos services et votre exp&eacute;rience</li>
            <li>
              Vous envoyer des offres promotionnelles (uniquement si vous
              &ecirc;tes inscrit(e) &agrave; la newsletter)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            3. Protection des donn&eacute;es
          </h2>
          <p className="text-gray-600 leading-relaxed">
            DAHAB met en oeuvre des mesures de s&eacute;curit&eacute;
            techniques et organisationnelles pour prot&eacute;ger vos
            donn&eacute;es contre tout acc&egrave;s non autoris&eacute;,
            modification ou destruction. Vos donn&eacute;es sont stock&eacute;es
            de mani&egrave;re s&eacute;curis&eacute;e et ne sont jamais vendues
            &agrave; des tiers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            4. Cookies
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Notre site utilise des cookies pour am&eacute;liorer votre
            exp&eacute;rience de navigation, analyser le trafic et
            personnaliser le contenu. Vous pouvez accepter ou refuser les
            cookies non essentiels lors de votre premi&egrave;re visite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            5. Vos droits
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            Conform&eacute;ment &agrave; la loi 09-08 relative &agrave; la
            protection des personnes physiques &agrave; l&apos;&eacute;gard du
            traitement des donn&eacute;es &agrave; caract&egrave;re personnel,
            vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Droit d&apos;acc&egrave;s &agrave; vos donn&eacute;es</li>
            <li>
              Droit de rectification des donn&eacute;es inexactes
            </li>
            <li>Droit de suppression de vos donn&eacute;es</li>
            <li>
              Droit de vous d&eacute;sinscrire de la newsletter &agrave; tout
              moment
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            6. Contact
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Pour exercer vos droits ou pour toute question relative &agrave; la
            protection de vos donn&eacute;es, contactez-nous via WhatsApp ou
            consultez notre{" "}
            <Link href="/faq" className="text-brand-gold hover:underline">
              page FAQ
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
