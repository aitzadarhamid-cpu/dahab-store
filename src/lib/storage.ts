/**
 * Cloudflare R2 Storage Client
 *
 * R2 is S3-compatible — we use @aws-sdk/client-s3 with a custom endpoint.
 * Endpoint format: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
 *
 * Lazy singleton: the client is only created on first use so the module
 * can be imported safely in edge/SSR contexts even if the vars are absent.
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// ---------------------------------------------------------------------------
// Env validation helpers
// ---------------------------------------------------------------------------

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) {
    throw new Error(
      `[R2] Missing required environment variable: ${key}. ` +
        "Add it to your .env file (local) or HF Space Secrets (production)."
    );
  }
  return val;
}

// ---------------------------------------------------------------------------
// Lazy singleton
// ---------------------------------------------------------------------------

let _client: S3Client | null = null;

function getClient(): S3Client {
  if (_client) return _client;

  const accountId = requireEnv("CLOUDFLARE_R2_ACCOUNT_ID");
  const accessKeyId = requireEnv("CLOUDFLARE_R2_ACCESS_KEY_ID");
  const secretAccessKey = requireEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY");

  _client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return _client;
}

function getBucketName(): string {
  return requireEnv("CLOUDFLARE_R2_BUCKET_NAME");
}

function getPublicUrl(): string {
  return requireEnv("CLOUDFLARE_R2_PUBLIC_URL").replace(/\/$/, "");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface UploadResult {
  url: string;
  key: string;
  size: number;
  contentType: string;
}

/**
 * Upload a buffer to R2 and return the public URL.
 *
 * @param buffer      File content
 * @param key         R2 object key — e.g. "products/abc123.webp"
 * @param contentType MIME type — e.g. "image/webp"
 */
export async function uploadToR2(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<UploadResult> {
  const client = getClient();
  const bucket = getBucketName();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      // Immutable: file key is content-addressed (SHA-256 based) so it never changes
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const url = `${getPublicUrl()}/${key}`;

  return {
    url,
    key,
    size: buffer.length,
    contentType,
  };
}

/**
 * Delete an object from R2 by its key.
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getClient();
  const bucket = getBucketName();

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}

/**
 * Extract the R2 object key from a public URL.
 *
 * Example:
 *   "https://images.dahab.ma/products/abc.webp"
 *   → "products/abc.webp"
 *
 * Returns null if the URL doesn't match the configured public URL base.
 */
export function getKeyFromUrl(url: string): string | null {
  try {
    const base = getPublicUrl();
    if (!url.startsWith(base + "/")) return null;
    return url.slice(base.length + 1);
  } catch {
    return null;
  }
}
