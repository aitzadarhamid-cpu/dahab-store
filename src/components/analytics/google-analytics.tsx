"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { hasAnalyticsConsent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// ---------------------------------------------------------------------------
// Automatic page view tracking on route changes
// ---------------------------------------------------------------------------

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || !hasAnalyticsConsent()) return;
    if (typeof window === "undefined" || !window.gtag) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window.gtag("config", GA_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

// ---------------------------------------------------------------------------
// Google Analytics component — only renders scripts after cookie consent
// ---------------------------------------------------------------------------

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: true,
            currency: 'MAD'
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
