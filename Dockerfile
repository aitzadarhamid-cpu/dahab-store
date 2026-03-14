# =============================================================
# DAHAB — Multi-stage Docker build for Hugging Face Spaces
# Port: 7860 (required by HF Spaces)
# Base: node:18-alpine (smallest stable Node.js image)
# Output: Next.js standalone (self-contained, no node_modules)
# =============================================================

# ---------------------------------------------------------------
# Stage 1: deps
# Install ALL node_modules + generate Prisma client + sharp
# ---------------------------------------------------------------
FROM node:18-alpine AS deps

# libc6-compat: required for some Node.js native binaries on Alpine
# openssl: required by Prisma query engine
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package manifests for layer caching
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install all dependencies (postinstall triggers prisma generate)
# sharp is now in dependencies so npm ci installs it automatically
RUN npm ci

# ---------------------------------------------------------------
# Stage 2: builder
# Build Next.js with output: standalone
# ---------------------------------------------------------------
FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* variables are baked into the JS bundle at build time.
# They must be passed as Docker build arguments from HF Space Build Args.
# Safe placeholder defaults allow the image to compile even without them.
ARG NEXT_PUBLIC_SITE_URL=https://placeholder.hf.space
ARG NEXT_PUBLIC_META_PIXEL_ID=""
ARG NEXT_PUBLIC_GA_ID=""
ARG NEXT_PUBLIC_WHATSAPP_PHONE=""

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_WHATSAPP_PHONE=$NEXT_PUBLIC_WHATSAPP_PHONE

# Disable Next.js telemetry during CI/CD build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Increase Node heap for constrained HF Spaces build (2GB free tier)
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Build the app — next.config.mjs must have output: "standalone"
# Output errors explicitly for HF build log visibility
RUN npm run build 2>&1 || { echo "=== BUILD FAILED ==="; exit 1; }

# ---------------------------------------------------------------
# Stage 3: runner
# Minimal production image — only what is needed to run the app
# ---------------------------------------------------------------
FROM node:18-alpine AS runner

RUN apk add --no-cache libc6-compat openssl wget

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Hugging Face Spaces requires port 7860
ENV PORT=7860
ENV HOSTNAME="0.0.0.0"

# Create a non-root user for security best practices
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# ---- Copy standalone Next.js output ----
# The standalone directory contains server.js + minimal node_modules
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# ---- Copy Prisma engine binaries ----
# CRITICAL: standalone output does NOT auto-include Prisma native binaries.
# Without these copies the app crashes with "PrismaClientInitializationError".
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# ---- Copy Prisma schema + migrations ----
# Required for "prisma migrate deploy" in entrypoint.sh
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# ---- Copy sharp native bindings ----
# CRITICAL: sharp is needed by Next.js Image Optimization at runtime.
# It was in devDependencies before — must be in dependencies AND copied here.
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp

# ---- Copy entrypoint script ----
COPY --chown=nextjs:nodejs scripts/entrypoint.sh ./scripts/entrypoint.sh
RUN chmod +x ./scripts/entrypoint.sh

USER nextjs

EXPOSE 7860

# Health check using the /api/health endpoint (built in Phase 3)
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:7860/api/health || exit 1

ENTRYPOINT ["./scripts/entrypoint.sh"]
