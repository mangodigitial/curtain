import sharp from "sharp";
import { put } from "@vercel/blob";
import { encode } from "blurhash";

interface ProcessedImage {
  url: string;
  width: number;
  height: number;
  sizeBytes: number;
  blurhash: string;
  dominantColor: string;
}

const BREAKPOINTS = [640, 1024, 1920] as const;

/**
 * Extract the dominant colour from an image buffer using Sharp.
 */
async function getDominantColor(buffer: Buffer): Promise<string> {
  const { dominant } = await sharp(buffer).stats();
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(dominant.r)}${toHex(dominant.g)}${toHex(dominant.b)}`;
}

/**
 * Generate a blurhash string from an image buffer.
 */
async function generateBlurhash(buffer: Buffer): Promise<string> {
  const { data, info } = await sharp(buffer)
    .resize(32, 32, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3);
}

/**
 * Process an uploaded image:
 * - Resize to max 1920w
 * - Convert to WebP
 * - Generate blurhash
 * - Extract dominant colour
 * - Strip EXIF
 * - Upload to Vercel Blob
 */
export async function processAndUploadImage(
  fileBuffer: Buffer,
  filename: string
): Promise<ProcessedImage> {
  // Strip EXIF and get metadata
  const stripped = sharp(fileBuffer).rotate(); // .rotate() auto-orients and strips EXIF

  const metadata = await stripped.metadata();
  const originalWidth = metadata.width || 1920;
  const originalHeight = metadata.height || 1080;

  // Resize to max 1920w, convert to WebP
  const maxWidth = Math.min(originalWidth, 1920);
  const webpBuffer = await stripped
    .resize(maxWidth, undefined, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  // Get final dimensions
  const finalMeta = await sharp(webpBuffer).metadata();
  const width = finalMeta.width || maxWidth;
  const height =
    finalMeta.height || Math.round((maxWidth / originalWidth) * originalHeight);

  // Generate blurhash and dominant colour in parallel
  const [blurhash, dominantColor] = await Promise.all([
    generateBlurhash(webpBuffer),
    getDominantColor(webpBuffer),
  ]);

  // Upload to Vercel Blob
  const cleanName = filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-");
  const blobPath = `images/${cleanName}.webp`;

  const blob = await put(blobPath, webpBuffer, {
    access: "public",
    contentType: "image/webp",
  });

  return {
    url: blob.url,
    width,
    height,
    sizeBytes: webpBuffer.length,
    blurhash,
    dominantColor,
  };
}

/**
 * Process image at multiple breakpoints and upload all versions.
 * Returns the largest version's metadata plus URLs for all sizes.
 */
export async function processImageMultiSize(
  fileBuffer: Buffer,
  filename: string
): Promise<
  ProcessedImage & {
    sizes: { width: number; url: string }[];
  }
> {
  const stripped = sharp(fileBuffer).rotate();
  const metadata = await stripped.metadata();
  const originalWidth = metadata.width || 1920;

  const cleanName = filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-");

  // Generate all sizes in parallel
  const sizeResults = await Promise.all(
    BREAKPOINTS.filter((bp) => bp <= originalWidth).map(async (targetWidth) => {
      const buffer = await sharp(fileBuffer)
        .rotate()
        .resize(targetWidth, undefined, { withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();

      const blob = await put(`images/${cleanName}-${targetWidth}w.webp`, buffer, {
        access: "public",
        contentType: "image/webp",
      });

      return { width: targetWidth, url: blob.url };
    })
  );

  // Upload the full-size version as the primary
  const primary = await processAndUploadImage(fileBuffer, filename);

  return {
    ...primary,
    sizes: sizeResults,
  };
}
