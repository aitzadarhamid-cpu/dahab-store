"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-gold transition-colors focus:outline-none focus:text-brand-gold"
      title={`Copier${label ? ` ${label}` : ""}`}
      aria-label={copied ? "Copié !" : `Copier${label ? ` ${label}` : ""}`}
    >
      {copied ? (
        <>
          <Check size={14} className="text-green-500" />
          <span className="text-green-500 text-xs font-medium">Copié !</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          {label && <span className="text-xs">{label}</span>}
        </>
      )}
    </button>
  );
}
