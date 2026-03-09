import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-brand-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
          Page introuvable
        </p>
        <h1 className="font-display text-6xl md:text-8xl font-bold text-brand-black mb-4">
          404
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Cette page n&apos;existe pas ou a ete deplacee.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-white font-medium px-6 py-3 rounded-xl hover:bg-brand-gold/90 transition-colors"
          >
            Retour a l&apos;accueil
          </Link>
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 border border-brand-black/20 text-brand-black font-medium px-6 py-3 rounded-xl hover:bg-white transition-colors"
          >
            Voir la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
