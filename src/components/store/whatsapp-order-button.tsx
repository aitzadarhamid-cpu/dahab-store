"use client";

import { MessageCircle } from "lucide-react";
import { getProductWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppOrderButtonProps {
  productName: string;
  productPrice: number;
  selectedSize?: string;
  quantity?: number;
}

export function WhatsAppOrderButton({
  productName,
  productPrice,
  selectedSize,
  quantity = 1,
}: WhatsAppOrderButtonProps) {
  const whatsappLink = getProductWhatsAppLink({
    name: productName,
    price: productPrice,
    selectedSize,
    quantity,
  });

  const handleClick = () => {
    // Track WhatsApp conversion event
    fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "whatsapp_product_click",
        productName,
        productPrice,
        selectedSize,
        quantity,
      }),
    }).catch(() => {
      // Silently fail - tracking should not block the user
    });
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium text-base text-white bg-[#25D366] hover:bg-[#20BD5A] active:bg-[#1DA851] transition-all duration-200 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle
        size={20}
        className="transition-transform duration-200 group-hover:scale-110"
        fill="white"
      />
      Commander via WhatsApp
    </a>
  );
}
