"use client";

export function StockBadge({ stock }: { stock: number }) {
  if (stock > 10) return null;

  if (stock <= 0) {
    return (
      <p className="text-sm font-medium text-red-600">Rupture de stock</p>
    );
  }

  return (
    <p
      className={`text-sm font-medium ${
        stock <= 3
          ? "text-red-600 animate-pulse"
          : "text-orange-600"
      }`}
    >
      {stock <= 3
        ? `Plus que ${stock} en stock !`
        : `Seulement ${stock} articles restants`}
    </p>
  );
}
