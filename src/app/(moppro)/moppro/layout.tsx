import type { Metadata } from 'next';
import { CartProvider } from '@/components/moppro/CartContext';

export const metadata: Metadata = {
  title: 'MopPro Elite — Balai Serpillière Double Rouleau Essorage Automatique',
  description:
    'Révolutionnez le nettoyage de vos sols avec le MopPro Elite. Éponge PVA double rouleau, essorage automatique sans les mains, tête rotative 360°. Livraison offerte. Satisfait ou remboursé 30 jours.',
};

export default function MopProLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0a0f1e] text-white">{children}</div>
    </CartProvider>
  );
}
