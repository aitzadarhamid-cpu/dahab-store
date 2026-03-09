import Link from "next/link";
import { NewsletterFooter } from "@/components/store/newsletter-footer";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <NewsletterFooter />
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-3xl font-bold text-white">
                DAHAB
              </span>
              <span className="font-display text-xl text-brand-gold">
                دهب
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Bijoux elegants et accessibles pour la femme marocaine moderne.
              Livraison partout au Maroc avec paiement a la livraison.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-brand-gold mb-4">
              Boutique
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/boutique?category=BAGUE"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Bagues
                </Link>
              </li>
              <li>
                <Link
                  href="/boutique?category=COLLIER"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Colliers
                </Link>
              </li>
              <li>
                <Link
                  href="/boutique?category=BRACELET"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Bracelets
                </Link>
              </li>
              <li>
                <Link
                  href="/boutique?category=BOUCLES_OREILLES"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Boucles d&apos;oreilles
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-display font-bold text-brand-gold mb-4">
              Informations
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/a-propos"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  A propos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-retour"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Retours &amp; &Eacute;changes
                </Link>
              </li>
              <li>
                <Link
                  href="/mes-commandes"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Suivre ma commande
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DAHAB. Tous droits reserves.
          </p>
          <div className="flex gap-4">
            <Link
              href="/conditions-generales"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Confidentialit&eacute;
            </Link>
            <Link
              href="/politique-retour"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Retours
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
