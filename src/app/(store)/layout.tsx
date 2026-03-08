"use client";

import { CartProvider } from "@/hooks/useCart";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/marketing/whatsapp-fab";
import { SocialProofTicker } from "@/components/marketing/social-proof-ticker";
import { ExitIntentPopup } from "@/components/marketing/exit-intent-popup";
import { MetaPixel } from "@/components/marketing/meta-pixel";
import { GoogleAnalytics } from "@/components/marketing/google-analytics";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ToastProvider>
        <MetaPixel />
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <SocialProofTicker />
        <ExitIntentPopup />
      </ToastProvider>
    </CartProvider>
  );
}
