"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Store, Heart, ShoppingBag, Package } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const navItems = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/boutique", icon: Store, label: "Boutique" },
  { href: "/favoris", icon: Heart, label: "Favoris" },
  { href: "/mes-commandes", icon: Package, label: "Commandes" },
  { href: "/commander", icon: ShoppingBag, label: "Panier" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 lg:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 relative transition-colors ${
                isActive
                  ? "text-brand-gold"
                  : "text-gray-400 hover:text-brand-black"
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} aria-hidden="true" />
                {item.href === "/commander" && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-brand-gold text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
