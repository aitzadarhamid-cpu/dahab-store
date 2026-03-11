"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Palette,
  Share2,
  Mail,
  Newspaper,
  BookImage,
  Gift,
  TrendingUp,
  MapPin,
} from "lucide-react";

const tabs = [
  { href: "/admin/marque", label: "Hub", icon: LayoutGrid },
  { href: "/admin/marque/guide", label: "Guide", icon: Palette },
  { href: "/admin/marque/social", label: "Social", icon: Share2 },
  { href: "/admin/marque/emails", label: "Emails", icon: Mail },
  { href: "/admin/marque/presse", label: "Presse", icon: Newspaper },
  { href: "/admin/marque/lookbook", label: "Lookbook", icon: BookImage },
  { href: "/admin/marque/packs", label: "Packs", icon: Gift },
  { href: "/admin/marque/strategie", label: "Stratégie", icon: TrendingUp },
  { href: "/admin/marque/villes", label: "Villes", icon: MapPin },
];

export default function MarqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      {/* Horizontal tab navigation */}
      <div className="bg-white border-b overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8">
        <nav className="flex gap-1 min-w-max">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/admin/marque"
                ? pathname === "/admin/marque"
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? "border-brand-gold text-brand-gold"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Module content */}
      <div className="mt-6">{children}</div>
    </div>
  );
}
