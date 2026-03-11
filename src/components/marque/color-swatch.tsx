"use client";

import { useState } from "react";

interface ColorSwatchProps {
  name: string;
  hex: string;
  usage: string;
  tailwind: string;
}

export function ColorSwatch({ name, hex, usage, tailwind }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = hex;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-start gap-4">
      {/* Color circle */}
      <button
        onClick={handleCopy}
        className="relative w-16 h-16 rounded-full flex-shrink-0 border-2 border-gray-100 shadow-sm cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
        style={{ backgroundColor: hex }}
        title={`Copier ${hex}`}
        aria-label={`Copier la couleur ${name}: ${hex}`}
      >
        {copied && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full text-white text-[10px] font-bold animate-fade-in">
            Copié !
          </span>
        )}
      </button>

      {/* Info */}
      <div className="min-w-0">
        <p className="font-display font-bold text-brand-black text-sm">
          {name}
        </p>
        <p className="text-xs text-gray-500 font-mono mt-0.5">{hex}</p>
        <p className="text-xs text-brand-gold font-mono mt-0.5">
          {tailwind}
        </p>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{usage}</p>
      </div>
    </div>
  );
}
