// =============================================================================
// DAHAB Analytics — Centralized tracking system
// Supports: Google Analytics 4, Meta Pixel, Server-side logging
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AnalyticsEventName =
  | "page_view"
  | "product_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase"
  | "promo_applied"
  | "whatsapp_click"
  | "wishlist_add"
  | "search";

interface ProductPayload {
  id: string;
  name: string;
  price: number;
  category?: string;
  quantity?: number;
}

interface PurchasePayload {
  transactionId: string;
  value: number;
  shipping: number;
  items: { id: string; name: string; price: number; quantity: number }[];
  promoCode?: string;
}

interface PromoPayload {
  code: string;
  discountType: string;
  discountValue: number;
}

// ---------------------------------------------------------------------------
// Cookie consent helper
// ---------------------------------------------------------------------------

const CONSENT_KEY = "dahab-cookie-consent";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function setAnalyticsConsent(accepted: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "refused");
}

export function getConsentStatus(): "accepted" | "refused" | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "refused") return value;
  return null;
}

// ---------------------------------------------------------------------------
// Core: trackEvent — sends to GA4 + Meta Pixel + server
// ---------------------------------------------------------------------------

export function trackEvent(
  eventName: AnalyticsEventName,
  data: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const consent = hasAnalyticsConsent();

  // Always log to server (server-side is not subject to cookie consent)
  sendToServer(eventName, data);

  // Only send to 3rd party if consent was given
  if (!consent) return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", eventName, data);
  }

  // Meta Pixel — map our event names to FB standard events
  if (window.fbq) {
    const fbEventName = mapToFbEvent(eventName);
    if (fbEventName) {
      window.fbq("track", fbEventName, data);
    }
  }
}

// ---------------------------------------------------------------------------
// Map internal event names to Meta Pixel standard events
// ---------------------------------------------------------------------------

function mapToFbEvent(eventName: AnalyticsEventName): string | null {
  const mapping: Record<string, string> = {
    page_view: "PageView",
    product_view: "ViewContent",
    add_to_cart: "AddToCart",
    begin_checkout: "InitiateCheckout",
    purchase: "Purchase",
    search: "Search",
    wishlist_add: "AddToWishlist",
  };
  return mapping[eventName] || null;
}

// ---------------------------------------------------------------------------
// Server-side logging
// ---------------------------------------------------------------------------

function sendToServer(
  eventName: string,
  data: Record<string, unknown>
): void {
  try {
    const payload = {
      event: eventName,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Use sendBeacon for reliability (works even when page is unloading)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silently fail — analytics should never block UI
      });
    }
  } catch {
    // Silently fail
  }
}

// ---------------------------------------------------------------------------
// Helper: trackProductView
// ---------------------------------------------------------------------------

export function trackProductView(product: ProductPayload): void {
  // GA4 view_item
  trackEvent("product_view", {
    currency: "MAD",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      },
    ],
  });

  // Also fire raw GA4 event for e-commerce reports
  if (typeof window !== "undefined" && window.gtag && hasAnalyticsConsent()) {
    window.gtag("event", "view_item", {
      currency: "MAD",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
    });
  }

  // Meta Pixel ViewContent
  if (typeof window !== "undefined" && window.fbq && hasAnalyticsConsent()) {
    window.fbq("track", "ViewContent", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "MAD",
    });
  }
}

// ---------------------------------------------------------------------------
// Helper: trackAddToCart
// ---------------------------------------------------------------------------

export function trackAddToCart(product: ProductPayload): void {
  const qty = product.quantity || 1;

  trackEvent("add_to_cart", {
    currency: "MAD",
    value: product.price * qty,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: qty,
      },
    ],
  });

  // Meta Pixel AddToCart
  if (typeof window !== "undefined" && window.fbq && hasAnalyticsConsent()) {
    window.fbq("track", "AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price * qty,
      currency: "MAD",
      num_items: qty,
    });
  }
}

// ---------------------------------------------------------------------------
// Helper: trackRemoveFromCart
// ---------------------------------------------------------------------------

export function trackRemoveFromCart(product: ProductPayload): void {
  trackEvent("remove_from_cart", {
    currency: "MAD",
    value: product.price * (product.quantity || 1),
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
      },
    ],
  });
}

// ---------------------------------------------------------------------------
// Helper: trackBeginCheckout
// ---------------------------------------------------------------------------

export function trackBeginCheckout(
  items: { id: string; name: string; price: number; quantity: number }[],
  value: number
): void {
  trackEvent("begin_checkout", {
    currency: "MAD",
    value,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });

  // Meta Pixel InitiateCheckout
  if (typeof window !== "undefined" && window.fbq && hasAnalyticsConsent()) {
    window.fbq("track", "InitiateCheckout", {
      content_ids: items.map((i) => i.id),
      content_type: "product",
      value,
      currency: "MAD",
      num_items: items.reduce((sum, i) => sum + i.quantity, 0),
    });
  }
}

// ---------------------------------------------------------------------------
// Helper: trackPurchase
// ---------------------------------------------------------------------------

export function trackPurchase(order: PurchasePayload): void {
  trackEvent("purchase", {
    transaction_id: order.transactionId,
    value: order.value,
    tax: 0,
    shipping: order.shipping,
    currency: "MAD",
    items: order.items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });

  // Meta Pixel Purchase
  if (typeof window !== "undefined" && window.fbq && hasAnalyticsConsent()) {
    window.fbq("track", "Purchase", {
      content_ids: order.items.map((i) => i.id),
      content_type: "product",
      value: order.value,
      currency: "MAD",
      num_items: order.items.reduce((sum, i) => sum + i.quantity, 0),
    });
  }
}

// ---------------------------------------------------------------------------
// Helper: trackPromoApplied
// ---------------------------------------------------------------------------

export function trackPromoApplied(promo: PromoPayload): void {
  trackEvent("promo_applied", {
    coupon: promo.code,
    discount_type: promo.discountType,
    discount_value: promo.discountValue,
  });
}

// ---------------------------------------------------------------------------
// Helper: trackWhatsAppClick
// ---------------------------------------------------------------------------

export function trackWhatsAppClick(context?: string): void {
  trackEvent("whatsapp_click", {
    context: context || "fab",
  });
}

// ---------------------------------------------------------------------------
// Helper: trackWishlistAdd
// ---------------------------------------------------------------------------

export function trackWishlistAdd(product: { id: string; name: string; price: number }): void {
  trackEvent("wishlist_add", {
    currency: "MAD",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
      },
    ],
  });
}

// ---------------------------------------------------------------------------
// Helper: trackSearch
// ---------------------------------------------------------------------------

export function trackSearch(query: string, resultsCount: number): void {
  trackEvent("search", {
    search_term: query,
    results_count: resultsCount,
  });
}

// ---------------------------------------------------------------------------
// Legacy exports — backward-compatible with existing code that imports from
// @/lib/analytics. These wrap the new unified helpers so existing product
// pages, checkout, and confirmation pages keep working without any changes.
// ---------------------------------------------------------------------------

// Meta Pixel legacy
export const pixelEvent = (
  name: string,
  options: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && window.fbq && hasAnalyticsConsent()) {
    window.fbq("track", name, options);
  }
};

export const pixelViewContent = (product: {
  id: string;
  name: string;
  price: number;
}) =>
  pixelEvent("ViewContent", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: product.price,
    currency: "MAD",
  });

export const pixelAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) =>
  pixelEvent("AddToCart", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: product.price * product.quantity,
    currency: "MAD",
    num_items: product.quantity,
  });

export const pixelPurchase = (order: {
  orderId: string;
  value: number;
  items: { id: string; name: string; price: number; quantity: number }[];
}) =>
  pixelEvent("Purchase", {
    content_ids: order.items.map((i) => i.id),
    content_type: "product",
    value: order.value,
    currency: "MAD",
    num_items: order.items.reduce((sum, i) => sum + i.quantity, 0),
  });

// Google Analytics 4 legacy
const gaEvent = (eventName: string, params: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag && hasAnalyticsConsent()) {
    window.gtag("event", eventName, params);
  }
};

export const gaViewItem = (product: {
  id: string;
  name: string;
  price: number;
  category: string;
}) =>
  gaEvent("view_item", {
    currency: "MAD",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      },
    ],
  });

export const gaAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}) =>
  gaEvent("add_to_cart", {
    currency: "MAD",
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  });

export const gaBeginCheckout = (
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }[],
  value: number
) =>
  gaEvent("begin_checkout", {
    currency: "MAD",
    value,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });

export const gaPurchase = (order: {
  transactionId: string;
  value: number;
  shipping: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}) =>
  gaEvent("purchase", {
    transaction_id: order.transactionId,
    value: order.value,
    tax: 0,
    shipping: order.shipping,
    currency: "MAD",
    items: order.items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
