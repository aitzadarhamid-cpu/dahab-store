"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-brand-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
          Oups !
        </p>
        <h2 className="font-display text-3xl font-bold text-brand-black mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-gray-500 mb-8">
          Nous nous excusons pour ce desagrement. Veuillez reessayer.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 bg-brand-gold text-white font-medium px-6 py-3 rounded-xl hover:bg-brand-gold/90 transition-colors"
        >
          Reessayer
        </button>
      </div>
    </div>
  );
}
