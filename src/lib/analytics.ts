// Meta Pixel Events
export const pixelEvent = (
  name: string,
  options: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && window.fbq) {
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

// Google Analytics 4 Events
const gaEvent = (eventName: string, params: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
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
