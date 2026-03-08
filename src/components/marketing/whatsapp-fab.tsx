"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { getSupportWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  const [isHovered, setIsHovered] = useState(false);
  const url = getSupportWhatsAppLink();

  const handleClick = () => {
    // Track WhatsApp support click
    fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "whatsapp_support_click",
        page: typeof window !== "undefined" ? window.location.pathname : "",
      }),
    }).catch(() => {
      // Silently fail - tracking should not block the user
    });
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-3">
      {/* Tooltip - "Besoin d'aide?" */}
      <div
        className={`bg-white rounded-lg shadow-lg px-3 py-2 text-sm font-medium text-gray-700 whitespace-nowrap transition-all duration-300 pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        Besoin d&apos;aide ?
        {/* Arrow pointing right */}
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
      </div>

      {/* WhatsApp Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#20BD5A] hover:scale-110 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Contactez-nous sur WhatsApp"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-30" />

        {/* Icon */}
        <MessageCircle
          size={28}
          className="relative z-10 text-white"
          fill="white"
        />
      </a>
    </div>
  );
}
