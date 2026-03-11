"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Tag,
  Star,
  Mail,
  Crown,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingCart },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/promos", label: "Promos", icon: Tag },
  { href: "/admin/reviews", label: "Avis", icon: Star },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/marque", label: "Marque", icon: Crown },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show admin layout on login or password reset pages
  if (pathname === "/admin/login" || pathname === "/admin/reset-password") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-black text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold">DAHAB</span>
            <span className="text-brand-gold text-sm">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                (item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href))
                  ? "bg-brand-gold text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 w-full transition-colors"
          >
            <LogOut size={18} />
            Deconnexion
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-brand-black text-white z-30 px-4 py-3 flex items-center justify-between">
        <span className="font-display text-xl font-bold">DAHAB Admin</span>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded-lg ${
                (item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href))
                  ? "bg-brand-gold"
                  : "hover:bg-gray-800"
              }`}
            >
              <item.icon size={18} />
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8 mt-14 md:mt-0">{children}</div>
      </main>
    </div>
  );
}
