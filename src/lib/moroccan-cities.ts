export interface CityData {
  name: string;
  deliveryDays: string;
  zone: "A" | "B" | "C";
}

// Zone A: Grandes villes (24h), Zone B: Villes moyennes (24-48h), Zone C: Autres (48-72h)
export const MOROCCAN_CITIES: CityData[] = [
  // Zone A - Livraison 24h
  { name: "Casablanca", deliveryDays: "24h", zone: "A" },
  { name: "Rabat", deliveryDays: "24h", zone: "A" },
  { name: "Marrakech", deliveryDays: "24h", zone: "A" },
  { name: "Fes", deliveryDays: "24h", zone: "A" },
  { name: "Tanger", deliveryDays: "24h", zone: "A" },
  { name: "Agadir", deliveryDays: "24h", zone: "A" },
  { name: "Mohammedia", deliveryDays: "24h", zone: "A" },
  { name: "Sale", deliveryDays: "24h", zone: "A" },
  { name: "Temara", deliveryDays: "24h", zone: "A" },

  // Zone B - Livraison 24-48h
  { name: "Meknes", deliveryDays: "24-48h", zone: "B" },
  { name: "Oujda", deliveryDays: "24-48h", zone: "B" },
  { name: "Kenitra", deliveryDays: "24-48h", zone: "B" },
  { name: "Tetouan", deliveryDays: "24-48h", zone: "B" },
  { name: "Nador", deliveryDays: "24-48h", zone: "B" },
  { name: "Safi", deliveryDays: "24-48h", zone: "B" },
  { name: "El Jadida", deliveryDays: "24-48h", zone: "B" },
  { name: "Beni Mellal", deliveryDays: "24-48h", zone: "B" },
  { name: "Khouribga", deliveryDays: "24-48h", zone: "B" },
  { name: "Settat", deliveryDays: "24-48h", zone: "B" },
  { name: "Berrechid", deliveryDays: "24-48h", zone: "B" },
  { name: "Khemisset", deliveryDays: "24-48h", zone: "B" },
  { name: "Inezgane", deliveryDays: "24-48h", zone: "B" },
  { name: "Essaouira", deliveryDays: "24-48h", zone: "B" },

  // Zone C - Livraison 48-72h
  { name: "Al Hoceima", deliveryDays: "48-72h", zone: "C" },
  { name: "Taza", deliveryDays: "48-72h", zone: "C" },
  { name: "Errachidia", deliveryDays: "48-72h", zone: "C" },
  { name: "Ouarzazate", deliveryDays: "48-72h", zone: "C" },
  { name: "Guelmim", deliveryDays: "48-72h", zone: "C" },
  { name: "Laayoune", deliveryDays: "48-72h", zone: "C" },
  { name: "Dakhla", deliveryDays: "48-72h", zone: "C" },
  { name: "Ifrane", deliveryDays: "48-72h", zone: "C" },
  { name: "Midelt", deliveryDays: "48-72h", zone: "C" },
  { name: "Taroudannt", deliveryDays: "48-72h", zone: "C" },
  { name: "Tiznit", deliveryDays: "48-72h", zone: "C" },
  { name: "Chefchaouen", deliveryDays: "48-72h", zone: "C" },
  { name: "Zagora", deliveryDays: "48-72h", zone: "C" },
  { name: "Tinghir", deliveryDays: "48-72h", zone: "C" },
  { name: "Azrou", deliveryDays: "48-72h", zone: "C" },
  { name: "Sefrou", deliveryDays: "48-72h", zone: "C" },
  { name: "Berkane", deliveryDays: "48-72h", zone: "C" },
  { name: "Tan-Tan", deliveryDays: "48-72h", zone: "C" },
];

export const CITY_NAMES = MOROCCAN_CITIES.map((c) => c.name).sort();

export function getCityData(cityName: string): CityData | undefined {
  return MOROCCAN_CITIES.find(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );
}

export function getDeliveryEstimate(cityName: string): string {
  const city = getCityData(cityName);
  if (!city) return "2-5 jours";
  switch (city.zone) {
    case "A":
      return "24h";
    case "B":
      return "24-48h";
    case "C":
      return "48-72h";
    default:
      return "2-5 jours";
  }
}

import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "./utils";

// Re-export for convenience
export { FREE_SHIPPING_THRESHOLD, SHIPPING_COST };

export function getShippingInfo(subtotal: number): {
  cost: number;
  isFree: boolean;
  remaining: number;
} {
  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  return {
    cost: isFree ? 0 : SHIPPING_COST,
    isFree,
    remaining: isFree ? 0 : FREE_SHIPPING_THRESHOLD - subtotal,
  };
}
