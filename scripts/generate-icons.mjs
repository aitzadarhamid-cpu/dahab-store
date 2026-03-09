#!/usr/bin/env node

/**
 * Generate PWA icons and apple-touch-icon from the favicon SVG.
 *
 * Prerequisites:
 *   npm install -D sharp
 *
 * Usage:
 *   node scripts/generate-icons.mjs
 *
 * This generates:
 *   public/icon-192.png   — PWA icon (192x192)
 *   public/icon-512.png   — PWA icon (512x512)
 *   public/apple-touch-icon.png — iOS home screen icon (180x180)
 *   public/favicon.ico    — Classic favicon (32x32)
 *   public/og-image.jpg   — Open Graph image (1200x630)
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

// Brand colors
const GOLD = "#C9A84C";
const BLACK = "#1A1A1A";
const CREAM = "#FAF7F2";

// Icon SVG with padding for PWA
function createIconSvg(size) {
  const padding = Math.round(size * 0.15);
  const fontSize = Math.round(size * 0.45);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="${BLACK}"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" font-weight="700" fill="${GOLD}">D</text>
  </svg>`;
}

// OG Image SVG (1200x630)
function createOgImageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${BLACK}"/>
    <rect x="0" y="0" width="1200" height="4" fill="${GOLD}"/>
    <rect x="0" y="626" width="1200" height="4" fill="${GOLD}"/>
    <text x="600" y="250" text-anchor="middle" font-family="Georgia, serif" font-size="80" font-weight="700" fill="#FFFFFF" letter-spacing="10">DAHAB</text>
    <text x="600" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" fill="${GOLD}">&#1583;&#1607;&#1576;</text>
    <line x1="480" y1="360" x2="720" y2="360" stroke="${GOLD}" stroke-width="1" opacity="0.5"/>
    <text x="600" y="410" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#999999" letter-spacing="8">L'ELEGANCE ACCESSIBLE</text>
    <text x="600" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#666666">Bijoux raffines pour la femme marocaine moderne</text>
    <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#555555">dahab.ma  |  99 - 299 MAD  |  Livraison partout au Maroc</text>
  </svg>`;
}

async function main() {
  console.log("Generating DAHAB brand icons...\n");

  // Icon 192x192
  const svg192 = createIconSvg(192);
  await sharp(Buffer.from(svg192)).png().toFile(join(PUBLIC_DIR, "icon-192.png"));
  console.log("  ✓ icon-192.png");

  // Icon 512x512
  const svg512 = createIconSvg(512);
  await sharp(Buffer.from(svg512)).png().toFile(join(PUBLIC_DIR, "icon-512.png"));
  console.log("  ✓ icon-512.png");

  // Apple touch icon 180x180
  const svg180 = createIconSvg(180);
  await sharp(Buffer.from(svg180)).png().toFile(join(PUBLIC_DIR, "apple-touch-icon.png"));
  console.log("  ✓ apple-touch-icon.png");

  // Favicon ICO 32x32 (saved as PNG, browsers accept it)
  const svg32 = createIconSvg(32);
  await sharp(Buffer.from(svg32)).png().toFile(join(PUBLIC_DIR, "favicon.png"));
  console.log("  ✓ favicon.png (use alongside favicon.svg)");

  // OG Image 1200x630
  const ogSvg = createOgImageSvg();
  await sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 90 })
    .toFile(join(PUBLIC_DIR, "og-image.jpg"));
  console.log("  ✓ og-image.jpg");

  console.log("\n✅ All brand assets generated in public/");
  console.log("\nNote: For best favicon.ico support, convert favicon.png");
  console.log("using https://realfavicongenerator.net or similar tool.");
}

main().catch(console.error);
