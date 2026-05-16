import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/moppro-db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data: Record<string, unknown>) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.orders);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = readDB();

  const orderNumber = `MP-${Date.now().toString().slice(-6)}`;

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

  return NextResponse.json({ success: true, order });
}

export async function PATCH(request: NextRequest) {
  const { id, status } = await request.json();
  const db = readDB();
  db.orders = db.orders.map((o: Record<string, unknown>) =>
    o.id === id ? { ...o, status } : o
  );
  writeDB(db);
  return NextResponse.json({ success: true });
}
