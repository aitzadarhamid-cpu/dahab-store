"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  const phone = (
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+212600000000"
  ).replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Bonjour, je souhaite des informations sur vos bijoux DAHAB."
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-bounce-gentle"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
    </a>
  );
}
