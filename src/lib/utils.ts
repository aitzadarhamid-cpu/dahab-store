import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `${price.toFixed(0)} MAD`;
}

export function generateOrderNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DAH-${code}`;
}

export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-().]/g, "");
  if (cleaned.startsWith("+212")) return cleaned.replace("+", "");
  if (cleaned.startsWith("00212")) return "212" + cleaned.slice(5);
  if (cleaned.startsWith("0") && cleaned.length === 10)
    return "212" + cleaned.slice(1);
  return cleaned;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const FREE_SHIPPING_THRESHOLD = 299;
export const SHIPPING_COST = 29;

export function getShippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    BAGUE: "Bagues",
    COLLIER: "Colliers",
    BRACELET: "Bracelets",
    BOUCLES_OREILLES: "Boucles d'oreilles",
  };
  return labels[category] || category;
}

export function getMaterialLabel(material: string): string {
  const labels: Record<string, string> = {
    OR_PLAQUE: "Or plaque",
    ARGENT_925: "Argent 925",
    OR_ROSE: "Or rose",
    ACIER_INOXYDABLE: "Acier inoxydable",
    CRISTAL: "Cristal",
  };
  return labels[material] || material;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    EN_ATTENTE: "En attente",
    CONFIRMEE: "Confirmee",
    EN_PREPARATION: "En preparation",
    EXPEDIEE: "Expediee",
    LIVREE: "Livree",
    ANNULEE: "Annulee",
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    EN_ATTENTE: "bg-yellow-100 text-yellow-800",
    CONFIRMEE: "bg-blue-100 text-blue-800",
    EN_PREPARATION: "bg-purple-100 text-purple-800",
    EXPEDIEE: "bg-indigo-100 text-indigo-800",
    LIVREE: "bg-green-100 text-green-800",
    ANNULEE: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "a l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}
