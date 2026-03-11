import { type ReactNode } from "react";

interface BrandSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
}

export function BrandSection({ title, description, children, id }: BrandSectionProps) {
  return (
    <section id={id} className="py-10 md:py-14">
      <div className="mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black">
          {title}
        </h2>

        {/* Gold divider */}
        <div className="mt-3 h-0.5 w-16 bg-brand-gold rounded-full" />

        {description && (
          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
