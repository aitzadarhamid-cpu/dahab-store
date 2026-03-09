"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Heart, Package, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "./cart-drawer";
import { SearchModal } from "./store/search-modal";

export function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut: Ctrl/Cmd + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container-page">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-2xl md:text-3xl font-bold text-brand-black">
                DAHAB
              </span>
              <span className="font-display text-lg text-brand-gold">دهب</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-brand-gold transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/boutique"
                className="text-sm font-medium text-gray-700 hover:text-brand-gold transition-colors"
              >
                Boutique
              </Link>
              <Link
                href="/boutique?category=BAGUE"
                className="text-sm font-medium text-gray-700 hover:text-brand-gold transition-colors"
              >
                Bagues
              </Link>
              <Link
                href="/boutique?category=COLLIER"
                className="text-sm font-medium text-gray-700 hover:text-brand-gold transition-colors"
              >
                Colliers
              </Link>
              <Link
                href="/mes-commandes"
                className="text-sm font-medium text-gray-700 hover:text-brand-gold transition-colors"
              >
                Mes commandes
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Rechercher"
              >
                <Search size={20} className="text-brand-black" aria-hidden="true" />
              </button>

              <Link
                href="/favoris"
                className="hidden md:flex relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Mes favoris"
              >
                <Heart size={20} className="text-brand-black" aria-hidden="true" />
              </Link>
              <Link
                href="/mes-commandes"
                className="hidden md:flex relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Mes commandes"
              >
                <Package size={20} className="text-brand-black" aria-hidden="true" />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={`Panier${itemCount > 0 ? ` (${itemCount} articles)` : ""}`}
              >
                <ShoppingBag size={22} className="text-brand-black" aria-hidden="true" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-brand-gold px-2 py-1"
                >
                  Accueil
                </Link>
                <Link
                  href="/boutique"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-brand-gold px-2 py-1"
                >
                  Boutique
                </Link>
                <Link
                  href="/boutique?category=BAGUE"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-brand-gold px-2 py-1"
                >
                  Bagues
                </Link>
                <Link
                  href="/boutique?category=COLLIER"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-brand-gold px-2 py-1"
                >
                  Colliers
                </Link>
                <Link
                  href="/mes-commandes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-brand-gold px-2 py-1"
                >
                  Mes commandes
                </Link>
                <Link
                  href="/favoris"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-brand-gold px-2 py-1"
                >
                  Favoris
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
