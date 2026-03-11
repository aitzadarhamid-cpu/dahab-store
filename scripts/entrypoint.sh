#!/bin/sh
# =============================================================
# DAHAB — Container entrypoint
# Runs on every container start (including restarts).
# 1. Apply any pending DB migrations
# 2. Start the Next.js standalone server
# =============================================================

set -e

echo "=== DAHAB Entrypoint ==="
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Migrations complete. Starting server on port ${PORT:-7860}..."
exec node server.js
