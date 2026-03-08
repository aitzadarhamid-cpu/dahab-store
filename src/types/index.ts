export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  slug: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; selectedSize?: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: string; selectedSize?: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

export type OrderStatus =
  | "EN_ATTENTE"
  | "CONFIRMEE"
  | "EN_PREPARATION"
  | "EXPEDIEE"
  | "LIVREE"
  | "ANNULEE";

export type ProductCategory =
  | "BAGUE"
  | "COLLIER"
  | "BRACELET"
  | "BOUCLES_OREILLES";

export type ProductMaterial =
  | "OR_PLAQUE"
  | "ARGENT_925"
  | "OR_ROSE"
  | "ACIER_INOXYDABLE"
  | "CRISTAL";

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  category: ProductCategory;
  material: ProductMaterial;
  stock: number;
  sizes: string[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  customerNote?: string | null;
  whatsappSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItemData[];
}

export interface OrderItemData {
  id: string;
  quantity: number;
  priceAtOrder: number;
  selectedSize?: string | null;
  productName: string;
  productImage: string;
}

export interface StatsData {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  activeProducts: number;
  revenueByDay: { date: string; revenue: number }[];
  ordersByDay: { date: string; count: number }[];
  topProducts: { name: string; totalSold: number; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
}

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  customerNote?: string;
}

// Window augmentation for analytics
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
