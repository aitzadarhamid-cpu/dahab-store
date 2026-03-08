import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://dahab.ma" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://dahab.ma${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-brand-gold transition-colors flex-shrink-0">
          <Home size={14} />
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5 flex-shrink-0">
            <ChevronRight size={12} className="text-gray-300" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-black font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
