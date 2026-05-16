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
  return NextResponse.json({ stock: db.stock });
}

export async function PUT(request: NextRequest) {
  const { stock } = await request.json();
  const db = readDB();
  db.stock = Math.max(0, Number(stock));
  writeDB(db);
  return NextResponse.json({ stock: db.stock });
}
