import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/moppro-db.json');

export async function GET() {
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

  const today = new Date().toDateString();
  const todayOrders = db.orders.filter(
    (o: Record<string, unknown>) => new Date(o.createdAt as string).toDateString() === today
  );

  const totalRevenue = db.orders.reduce(
    (sum: number, o: Record<string, unknown>) => sum + (o.total as number),
    0
  );
  const todayRevenue = todayOrders.reduce(
    (sum: number, o: Record<string, unknown>) => sum + (o.total as number),
    0
  );

  const upsellCount = db.orders.filter(
    (o: Record<string, unknown>) => o.withUpsell
  ).length;
  const upsellRate =
    db.orders.length > 0
      ? ((upsellCount / db.orders.length) * 100).toFixed(1)
      : 0;

  return NextResponse.json({
    totalOrders: db.orders.length,
    todayOrders: todayOrders.length,
    totalRevenue: totalRevenue.toFixed(2),
    todayRevenue: todayRevenue.toFixed(2),
    stock: db.stock,
    upsellRate,
    recentOrders: db.orders.slice(0, 10),
  });
}
