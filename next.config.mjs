/** @type {import('next').NextConfig} */

// Cloudflare R2 public domain for image allowlist + CSP
// Supports both custom domain (images.dahab.ma) and r2.dev default
const r2PublicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || "";
let r2Hostname = "";
try {
  if (r2PublicUrl) r2Hostname = new URL(r2PublicUrl).hostname;
} catch {
  // ignore — var not set in this build context
}

const nextConfig = {
  // -----------------------------------------------------------------------
  // CRITICAL for Docker / HF Spaces deployment
  // Generates .next/standalone — a self-contained server.js with minimal deps
  // -----------------------------------------------------------------------
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      // Cloudflare R2 custom domain (e.g. images.dahab.ma)
      ...(r2Hostname ? [{ protocol: "https", hostname: r2Hostname }] : []),
      // R2 default .r2.dev domains (fallback / dev)
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  async headers() {
    // Content-Security-Policy — permissive enough for Next.js inline scripts
    // but blocks common XSS vectors
    const cspDirectives = [
      "default-src 'self'",
      // Next.js requires unsafe-inline and unsafe-eval in dev; in prod only unsafe-inline
      `script-src 'self' 'unsafe-inline' ${
        process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""
      } https://www.googletagmanager.com https://www.google-analytics.com`.trim(),
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://www.google-analytics.com${r2Hostname ? ` https://${r2Hostname}` : ""} https://*.r2.dev`,
      "font-src 'self' https://fonts.gstatic.com",
      `connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com${r2Hostname ? ` https://${r2Hostname}` : ""} https://*.r2.dev`,
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ];

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspDirectives.join("; "),
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
