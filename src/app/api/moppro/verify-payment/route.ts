import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendOrderConfirmation } from '@/lib/moppro-email';
import { sellerOrderLink } from '@/lib/moppro-whatsapp';

const DB_PATH = path.join(process.cwd(), 'src/data/moppro-db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDB(data: Record<string, unknown>) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { default: Stripe } = await import('stripe') as any;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  });

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 402 });
  }

  const meta = session.metadata ?? {};
  const db = readDB();

  // Idempotency: skip if already created
  const existing = db.orders.find(
    (o: Record<string, unknown>) => o.orderNumber === meta.orderNumber
  );
  if (existing) {
    return NextResponse.json({ order: existing });
  }

  const items: { name: string; price: number; quantity: number }[] = JSON.parse(
    meta.items || '[]'
  );
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const order = {
    id: Date.now().toString(),
    orderNumber: meta.orderNumber,
    customerName: meta.customerName,
    customerEmail: meta.customerEmail,
    customerPhone: meta.customerPhone,
    customerAddress: meta.customerAddress,
    customerCity: meta.customerCity,
    items,
    subtotal: total,
    shipping: 0,
    total,
    withUpsell: meta.withUpsell === 'true',
    stripeSessionId: sessionId,
    status: 'EN_ATTENTE',
    createdAt: new Date().toISOString(),
  };

  db.stock = Math.max(0, db.stock - 1);
  db.orders = [order, ...db.orders];
  writeDB(db);

  const waLink = sellerOrderLink({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerAddress: order.customerAddress,
    total: order.total,
    withUpsell: order.withUpsell,
    items: order.items,
  });

  if (order.customerEmail) {
    sendOrderConfirmation({ ...order }).catch(() => {});
  }

  return NextResponse.json({ order, waLink });
}
