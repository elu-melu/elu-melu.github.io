/** Pixel alpha below which a pixel is treated as background. */
const MIN_ALPHA = 32;
/** Saturation below which a pixel is too grey to tint anything. */
const MIN_SATURATION = 0.15;

/** Keep the shade in family with --color-accent (hsl(268 25% 43%)). */
const SATURATION_RANGE = [30, 60] as const;
const LIGHTNESS_RANGE = [40, 54] as const;

const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));

/** Hue in degrees, from the dominant channel and the spread between the other two. */
function hueOf(r: number, g: number, b: number, max: number, delta: number): number {
  if (max === r) return ((g - b) / delta) % 6;
  if (max === g) return (b - r) / delta + 2;
  return (r - g) / delta + 4;
}

/** RGB (0-255) to a clamped `hsl(H S% L%)` string. */
function toHsl(r: number, g: number, b: number): string {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 510;
  // delta is the saturation numerator; the denominator flips once l passes 0.5.
  const saturation = delta === 0 ? 0 : delta / (255 - Math.abs(max + min - 255));
  const hue = delta === 0 ? 0 : (hueOf(r, g, b, max, delta) * 60 + 360) % 360;

  const h = Math.round(hue);
  const s = Math.round(clamp(saturation * 100, ...SATURATION_RANGE));
  const l = Math.round(clamp(lightness * 100, ...LIGHTNESS_RANGE));

  return `hsl(${h} ${s}% ${l}%)`;
}

/** Coarse bucket for a colour, keeping only the top 4 bits of each channel. */
const bucketOf = (r: number, g: number, b: number) =>
  (r >> 4) * 256 + (g >> 4) * 16 + (b >> 4);

type Bucket = { count: number; r: number; g: number; b: number };

/** The dominant non-grey colour in RGBA bytes, as a CSS colour, or null when there is none. */
export function shadeFromPixels(data: Uint8ClampedArray): string | null {
  const buckets = new Map<number, Bucket>();

  for (let i = 0; i + 3 < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (data[i + 3] < MIN_ALPHA) continue;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max === 0 || (max - min) / max < MIN_SATURATION) continue;

    const key = bucketOf(r, g, b);
    const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
    bucket.count += 1;
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    buckets.set(key, bucket);
  }

  let winner: Bucket | null = null;
  for (const bucket of buckets.values()) {
    if (!winner || bucket.count > winner.count) winner = bucket;
  }
  if (!winner) return null;

  return toHsl(winner.r / winner.count, winner.g / winner.count, winner.b / winner.count);
}

/**
 * The dominant shade of an image, read through a 16x16 canvas (downscaling
 * averages the cover and keeps the read cheap). Rejects on decode errors and
 * on tainted canvases; the caller decides what to fall back to.
 */
export async function accentFromImage(url: string): Promise<string | null> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  context.drawImage(img, 0, 0, 16, 16);
  return shadeFromPixels(context.getImageData(0, 0, 16, 16).data);
}
