"use client";

import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { WhatsAppFAB } from "@/components/marketing/whatsapp-fab";
import { SocialProofTicker } from "@/components/marketing/social-proof-ticker";
import { ExitIntentPopup } from "@/components/marketing/exit-intent-popup";
import { UrgencyBar } from "@/components/marketing/urgency-bar";
import { AbandonedCartBar } from "@/components/marketing/abandoned-cart";
import { MetaPixel } from "@/components/marketing/meta-pixel";
import { GoogleAnalytics } from "@/components/marketing/google-analytics";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <MetaPixel />
          <GoogleAnalytics />
          <UrgencyBar />
          <Header />
          <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <WhatsAppFAB />
          <SocialProofTicker />
          <ExitIntentPopup />
          <AbandonedCartBar />
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
