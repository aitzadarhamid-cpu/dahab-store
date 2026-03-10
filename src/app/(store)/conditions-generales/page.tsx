import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Conditions Generales de Vente | DAHAB Bijoux",
  description:
    "Consultez les conditions generales de vente de DAHAB Bijoux. Informations sur les commandes, paiement, livraison et retours.",
  keywords: ["CGV dahab", "conditions generales vente bijoux maroc", "dahab conditions"],
  alternates: { canonical: `${siteUrl}/conditions-generales` },
  openGraph: {
    title: "Conditions Generales de Vente | DAHAB Bijoux",
    description: "Conditions generales de vente de DAHAB. Commandes, paiement, livraison et retours.",
    url: `${siteUrl}/conditions-generales`,
    siteName: "DAHAB Bijoux",
    locale: "fr_MA",
    type: "website",
  },
};

export default function CGVPage() {
  return (
    <div className="container-page py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Conditions G&eacute;n&eacute;rales de Vente
        </h1>
        <p className="text-gray-500 text-sm">
          Derni&egrave;re mise &agrave; jour : Mars 2025
        </p>
      </header>

      <div className="max-w-3xl mx-auto prose prose-gray">
        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            1. Pr&eacute;sentation
          </h2>
          <p className="text-gray-600 leading-relaxed">
            DAHAB est une boutique en ligne sp&eacute;cialis&eacute;e dans la
            vente de bijoux au Maroc. Les pr&eacute;sentes conditions
            g&eacute;n&eacute;rales de vente (CGV) r&eacute;gissent les
            relations entre DAHAB et ses clients.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            2. Produits et Prix
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            Les prix sont indiqu&eacute;s en Dirhams Marocains (MAD) toutes
            taxes comprises. DAHAB se r&eacute;serve le droit de modifier ses
            prix &agrave; tout moment, les produits &eacute;tant factur&eacute;s
            au prix en vigueur lors de la validation de la commande.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Les photographies des produits sont les plus fid&egrave;les
            possible mais ne peuvent assurer une similitude parfaite avec le
            produit offert.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            3. Commandes
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Toute commande pass&eacute;e sur le site implique l&apos;acceptation
            des pr&eacute;sentes CGV. La validation de la commande vaut
            conclusion du contrat de vente. DAHAB se r&eacute;serve le droit
            d&apos;annuler toute commande en cas d&apos;indisponibilit&eacute;
            du produit ou de probl&egrave;me li&eacute; aux informations
            fournies par le client.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            4. Paiement
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Le paiement s&apos;effectue &agrave; la livraison (COD - Cash on
            Delivery). Le client r&egrave;gle le montant total de sa commande au
            livreur lors de la r&eacute;ception du colis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            5. Livraison
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            La livraison est effectu&eacute;e dans tout le Maroc sous 2 &agrave;
            5 jours ouvrables. La livraison est gratuite pour toute commande
            &eacute;gale ou sup&eacute;rieure &agrave; 299 MAD. En dessous de ce
            montant, des frais de livraison de 29 MAD sont appliqu&eacute;s.
          </p>
          <p className="text-gray-600 leading-relaxed">
            DAHAB ne peut &ecirc;tre tenue responsable des retards de livraison
            li&eacute;s au transporteur ou &agrave; des &eacute;v&eacute;nements
            de force majeure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            6. Retours et &Eacute;changes
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Le client dispose de 7 jours &agrave; compter de la r&eacute;ception
            pour demander un retour ou un &eacute;change. Le produit doit
            &ecirc;tre retourn&eacute; dans son &eacute;tat d&apos;origine, non
            port&eacute; et dans son emballage d&apos;origine. Pour toute
            demande, contactez-nous via WhatsApp.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            7. Propri&eacute;t&eacute; intellectuelle
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L&apos;ensemble du contenu du site DAHAB (textes, images, logos) est
            prot&eacute;g&eacute; par le droit de la propri&eacute;t&eacute;
            intellectuelle. Toute reproduction est interdite sans autorisation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-bold text-brand-black mb-3">
            8. Contact
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Pour toute question concernant ces CGV, contactez-nous via WhatsApp
            ou consultez notre{" "}
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
