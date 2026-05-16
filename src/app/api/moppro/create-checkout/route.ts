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

function makeOrderNumber() {
  return `MP-${Date.now().toString().slice(-6)}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  // ── Stripe path ───────────────────────────────────────────
  if (process.env.STRIPE_SECRET_KEY) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { default: Stripe } = await import('stripe') as any;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

    const orderNumber = makeOrderNumber();

    const lineItems = body.items.map(
      (item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(item.price * 100),
          product_data: { name: item.name },
        },
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ['FR', 'BE', 'CH', 'LU'] },
      success_url: `${origin}/moppro/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/moppro/panier`,
      metadata: {
        orderNumber,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        customerAddress: body.customerAddress,
        customerCity: body.customerCity,
        withUpsell: body.withUpsell ? 'true' : 'false',
        items: JSON.stringify(body.items),
      },
    });

    return NextResponse.json({ url: session.url, orderNumber });
  }

  // ── Fallback : paiement simulé ────────────────────────────
  const db = readDB();
  const orderNumber = makeOrderNumber();
  const order = {
    id: Date.now().toString(),
    orderNumber,
    ...body,
    status: 'EN_ATTENTE',
    createdAt: new Date().toISOString(),
  };

  db.stock = Math.max(0, db.stock - 1);
  db.orders = [order, ...db.orders];
  writeDB(db);

  // WhatsApp + email (best-effort, non-bloquant)
  const waLink = sellerOrderLink({
    orderNumber,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    customerAddress: body.customerAddress,
    total: body.total,
    withUpsell: body.withUpsell,
    items: body.items,
  });

  if (body.customerEmail) {
    sendOrderConfirmation({ ...body, orderNumber }).catch(() => {});
  }

  return NextResponse.json({ fallback: true, order, waLink });
}
