import Link from "next/link";
import { type LucideIcon, ArrowRight } from "lucide-react";

interface HubCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
  color: string;
}

export function HubCard({ icon: Icon, label, description, href, color }: HubCardProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group block relative overflow-hidden"
    >
      {/* Gold left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />

      <div className="flex items-start gap-4">
        {/* Icon in colored circle */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}
        >
          <Icon size={22} />
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-brand-black text-lg group-hover:text-brand-gold transition-colors">
            {label}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Arrow on hover */}
        <ArrowRight
          size={18}
          className="text-gray-300 group-hover:text-brand-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
        />
      </div>
    </Link>
  );
}
