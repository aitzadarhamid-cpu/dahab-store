/**
 * POST /api/admin/upload
 *
 * Admin-only endpoint for uploading product images to Cloudflare R2.
 *
 * - Auth   : requireAdmin() — 401/403 if not authenticated admin
 * - MIME   : jpg, jpeg, png, webp, avif only
 * - Size   : max 5 MB
 * - Key    : products/<sha256-hex>.<ext>  (content-addressed → natural dedup)
 * - Cache  : immutable (set by uploadToR2)
 *
 * Response: { url, key, size, type }
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { requireAdmin } from "@/lib/auth";
import { uploadToR2 } from "@/lib/storage";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // 1. Auth check
  const authError = await requireAdmin();
  if (authError) return authError;

  // 2. Parse multipart form
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data — expected multipart/form-data" },
      { status: 400 }
    );
  }

  const file = formData.get("file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: "Missing required field: file" },
      { status: 400 }
    );
  }

  // 3. MIME type validation
  const contentType = file.type || "";
  const ext = ALLOWED_MIME[contentType];

  if (!ext) {
    return NextResponse.json(
      {
        error: `Unsupported file type: ${contentType || "(unknown)"}. Allowed: jpg, png, webp, avif`,
      },
      { status: 415 }
    );
  }

  // 4. Size validation
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      {
        error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)} MB. Maximum: 5 MB`,
      },
      { status: 413 }
    );
  }

  // 5. Read buffer + compute SHA-256 key
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  const key = `products/${sha256}.${ext}`;

  // 6. Upload to R2
  try {
    const result = await uploadToR2(buffer, key, contentType);

    return NextResponse.json({
      url: result.url,
      key: result.key,
      size: result.size,
      type: result.contentType,
    });
  } catch (err) {
    console.error("[upload] R2 upload failed:", err);
    return NextResponse.json(
      { error: "Upload failed — check R2 configuration and credentials" },
      { status: 500 }
    );
  }
}
