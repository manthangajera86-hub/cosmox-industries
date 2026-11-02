/**
 * Builds every logo file from the supplied artwork, `assets/brand/logo-original.jpeg` (the logo on
 * black). Run `node scripts/build-logo.mjs` again after replacing that file.
 *
 *   assets/brand/logo-dark.png             full logo for dark backgrounds (original colours)
 *   assets/brand/logo-light.png            full logo for light backgrounds (deeper gold wordmark)
 *   assets/brand/logo-horizontal-*.png     mark beside the wordmark, used in the header and footer
 *
 * The supplied artwork reads "COSMOX" only. The script sets "INDUSTRIES" under the wordmark, in
 * Montserrat SemiBold (assets/fonts), spaced out to the wordmark's exact width like its own wide
 * letters: black on light backgrounds and white on dark ones, the two colours of the orbit ring.
 *   assets/brand/logo-mark.png             the mark alone, used on the sharing cards
 *   app/icon.png, app/apple-icon.png       favicon and home-screen icon
 */
import { readFileSync } from "node:fs";
import opentype from "opentype.js";
import sharp from "sharp";

const SOURCE = "assets/brand/logo-original.jpeg";
const OUT = "assets/brand";

// A pixel whose brightest channel is at or below this is the black backdrop. JPEG noise stays
// under ~12 and the darkest shade on the planet is ~25, so the two separate cleanly.
const BLACK = 12;
// Width in px of the anti-aliased rim that is un-blended from the black.
const EDGE = 3;
// Wordmark and subline heights, and the space between them, as shares of the mark height in the
// horizontal lockup. The two lines together are centred on the mark.
const WORD_SCALE = 0.36;
const SUBLINE_SCALE = 0.15;
const SUBLINE_GAP = 0.085;
// The line set under the wordmark, its typeface and its colour on each background.
const SUBLINE = "INDUSTRIES";
const SUBLINE_FONT = opentype.parse(readFileSync("assets/fonts/Montserrat-SemiBold.ttf").buffer);
const SUBLINE_COLOUR = { dark: "#ffffff", light: "#000000" };
// On light backgrounds the bright gold wordmark is too pale, so its shading is remapped onto
// this deeper ramp (dark → light) while keeping the metallic gradient.
const LIGHT_WORDMARK_RAMP = ["#5e3d0a", "#8c5c14", "#b98a36"];

// The artwork touches the edges of the source (top of the planet, the C), so pad it with black to
// give those edges a rim like every other edge.
const { data: rgb, info } = await sharp(SOURCE)
  .removeAlpha()
  .extend({ top: 8, bottom: 8, left: 8, right: 8, background: "#000" })
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const N = W * H;

const peak = new Uint8Array(N);
for (let p = 0; p < N; p++) peak[p] = Math.max(rgb[p * 3], rgb[p * 3 + 1], rgb[p * 3 + 2]);

const queue = new Int32Array(N);
const neighbours = (p) => {
  const x = p % W;
  const y = (p - x) / W;
  const out = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if ((dx || dy) && x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < H) out.push(p + dy * W + dx);
    }
  }
  return out;
};

// 1. Split the mark from the wordmark at the widest band of all-black rows between them.
const rowBlack = (y) => {
  for (let x = 0; x < W; x++) if (peak[y * W + x] > BLACK) return false;
  return true;
};
let gap = { start: 0, length: 0 };
for (let y = Math.floor(H * 0.4), run = 0; y < H * 0.8; y++) {
  run = rowBlack(y) ? run + 1 : 0;
  if (run > gap.length) gap = { start: y - run + 1, length: run };
}
if (gap.length < 10) throw new Error("Could not find the space between the mark and the wordmark.");
const split = gap.start + Math.floor(gap.length / 2);

// 2. The backdrop is the black connected to the image border, plus all black in the wordmark (the
//    insides of the O's). Black enclosed by the mark (the band inside the orbit ring) is part of
//    the design and stays.
const backdrop = new Uint8Array(N);
let head = 0;
let tail = 0;
const seed = (p) => {
  if (!backdrop[p] && peak[p] <= BLACK) {
    backdrop[p] = 1;
    queue[tail++] = p;
  }
};
for (let x = 0; x < W; x++) {
  seed(x);
  seed((H - 1) * W + x);
}
for (let y = 0; y < H; y++) {
  seed(y * W);
  seed(y * W + W - 1);
}
for (let p = split * W; p < N; p++) seed(p);
while (head < tail) {
  const p = queue[head++];
  const x = p % W;
  if (x > 0) seed(p - 1);
  if (x < W - 1) seed(p + 1);
  if (p >= W) seed(p - W);
  if (p < N - W) seed(p + W);
}

// 3. Distance (up to EDGE) from the backdrop: the rim where artwork was blended with black.
const dist = new Uint8Array(N).fill(255);
head = tail = 0;
for (let p = 0; p < N; p++) {
  if (!backdrop[p]) continue;
  dist[p] = 0;
  queue[tail++] = p;
}
while (head < tail) {
  const p = queue[head++];
  if (dist[p] >= EDGE) continue;
  for (const q of neighbours(p)) {
    if (dist[q] !== 255) continue;
    dist[q] = dist[p] + 1;
    queue[tail++] = q;
  }
}

// 4. Each rim pixel takes its true colour from the solid artwork just inside it, and its opacity
//    from how much darker than that colour it is (rim = colour × opacity over black).
const rgba = Buffer.alloc(N * 4);
const known = new Uint8Array(N);
for (let p = 0; p < N; p++) {
  if (dist[p] !== 255) continue;
  rgba.set([rgb[p * 3], rgb[p * 3 + 1], rgb[p * 3 + 2], 255], p * 4);
  known[p] = 1;
}
for (let d = EDGE; d >= 1; d--) {
  for (let p = 0; p < N; p++) {
    if (dist[p] !== d) continue;
    let r = 0, g = 0, b = 0, n = 0;
    for (const q of neighbours(p)) {
      if (known[q] !== 1 || dist[q] <= d) continue;
      r += rgba[q * 4];
      g += rgba[q * 4 + 1];
      b += rgba[q * 4 + 2];
      n++;
    }
    // Specks with no solid artwork behind them are JPEG noise in the backdrop.
    if (!n) continue;
    const colour = [r / n, g / n, b / n];
    const alpha = Math.min(1, peak[p] / Math.max(1, ...colour));
    rgba.set([...colour.map(Math.round), Math.round(alpha * 255)], p * 4);
    known[p] = 2;
  }
  for (let p = 0; p < N; p++) if (known[p] === 2) known[p] = 1;
}

function bounds(top, bottom) {
  let left = W, right = -1, first = H, last = -1;
  for (let y = top; y < bottom; y++) {
    for (let x = 0; x < W; x++) {
      if (rgba[(y * W + x) * 4 + 3] <= 8) continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      first = Math.min(first, y);
      last = Math.max(last, y);
    }
  }
  return { left, top: first, width: right - left + 1, height: last - first + 1 };
}
const markBox = bounds(0, split);
const wordBox = bounds(split, H);

// 5. The light version: the same artwork with the wordmark shaded on the deeper gold ramp.
const hex = (value) => [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
const ramp = LIGHT_WORDMARK_RAMP.map(hex);
const luma = (p) => 0.2126 * rgba[p] + 0.7152 * rgba[p + 1] + 0.0722 * rgba[p + 2];
const wordLumas = [];
for (let p = split * W; p < N; p++) if (rgba[p * 4 + 3] === 255) wordLumas.push(luma(p * 4));
wordLumas.sort((a, b) => a - b);
const lo = wordLumas[Math.floor(wordLumas.length * 0.02)];
const hi = wordLumas[Math.floor(wordLumas.length * 0.98)];
const light = Buffer.from(rgba);
for (let p = split * W; p < N; p++) {
  const i = p * 4;
  if (!light[i + 3]) continue;
  const t = Math.min(1, Math.max(0, (luma(i) - lo) / (hi - lo))) * (ramp.length - 1);
  const k = Math.min(ramp.length - 2, Math.floor(t));
  const f = t - k;
  for (let c = 0; c < 3; c++) light[i + c] = Math.round(ramp[k][c] + (ramp[k + 1][c] - ramp[k][c]) * f);
}

const raw = { raw: { width: W, height: H, channels: 4 } };
const crop = (pixels, box) => sharp(pixels, raw).extract(box).png().toBuffer();
const full = { left: Math.min(markBox.left, wordBox.left), top: markBox.top };
Object.assign(full, {
  width: Math.max(markBox.left + markBox.width, wordBox.left + wordBox.width) - full.left,
  height: wordBox.top + wordBox.height - full.top,
});

const mark = await crop(rgba, markBox);
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

/**
 * The subline as a PNG: capital letters `capHeight` px tall, the first starting at 0 and the last
 * ending at `width`, with equal space between the letters.
 */
function subline(width, capHeight, colour) {
  const font = SUBLINE_FONT;
  const size = (capHeight * font.unitsPerEm) / font.tables.os2.sCapHeight;
  const letters = [...SUBLINE].map((char) => {
    const box = font.charToGlyph(char).getPath(0, 0, size).getBoundingBox();
    return { char, left: box.x1, width: box.x2 - box.x1 };
  });
  const space = (width - letters.reduce((sum, letter) => sum + letter.width, 0)) / (letters.length - 1);
  let x = 0;
  const paths = letters.map((letter) => {
    const d = font.charToGlyph(letter.char).getPath(x - letter.left, capHeight, size).toPathData(3);
    x += letter.width + space;
    return `<path d="${d}"/>`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${capHeight}" fill="${colour}">${paths.join("")}</svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/** Mark with the wordmark and subline beside it, `height` px tall. */
async function horizontal(pixels, colour, height) {
  const wordHeight = Math.round(height * WORD_SCALE);
  const subHeight = Math.round(height * SUBLINE_SCALE);
  const lineGap = Math.round(height * SUBLINE_GAP);
  const gapWidth = Math.round(height * 0.16);
  const markImage = await sharp(mark).resize({ height }).toBuffer({ resolveWithObject: true });
  const wordImage = await sharp(await crop(pixels, wordBox)).resize({ height: wordHeight }).toBuffer({ resolveWithObject: true });
  const top = Math.round((height - wordHeight - lineGap - subHeight) / 2);
  const left = markImage.info.width + gapWidth;
  return sharp({
    create: {
      width: left + wordImage.info.width,
      height,
      channels: 4,
      background: transparent,
    },
  }).composite([
    { input: markImage.data, left: 0, top: 0 },
    { input: wordImage.data, left, top },
    { input: await subline(wordImage.info.width, subHeight, colour), left, top: top + wordHeight + lineGap },
  ]);
}

/** The full stacked logo (mark over wordmark) with the subline under the wordmark, 800 px tall. */
async function stacked(pixels, colour) {
  const subHeight = Math.round(wordBox.height * (SUBLINE_SCALE / WORD_SCALE));
  const lineGap = Math.round(wordBox.height * (SUBLINE_GAP / WORD_SCALE));
  const image = sharp(await crop(pixels, full))
    .extend({ bottom: lineGap + subHeight, background: transparent })
    .composite([
      {
        input: await subline(wordBox.width, subHeight, colour),
        left: wordBox.left - full.left,
        top: full.height + lineGap,
      },
    ]);
  return sharp(await image.png().toBuffer()).resize({ height: 800 }).png();
}

/** The mark centred on a square canvas, `inset` px from each edge. */
async function square(size, inset, background = transparent) {
  const fitted = await sharp(mark)
    .resize(size - inset * 2, size - inset * 2, { fit: "contain", background: transparent })
    .extend({ top: inset, bottom: inset, left: inset, right: inset, background: transparent })
    .toBuffer();
  const image = sharp(fitted);
  return background.alpha ? image.flatten({ background }) : image;
}

const outputs = {
  [`${OUT}/logo-dark.png`]: await stacked(rgba, SUBLINE_COLOUR.dark),
  [`${OUT}/logo-light.png`]: await stacked(light, SUBLINE_COLOUR.light),
  [`${OUT}/logo-horizontal-dark.png`]: (await horizontal(rgba, SUBLINE_COLOUR.dark, 360)).png(),
  [`${OUT}/logo-horizontal-light.png`]: (await horizontal(light, SUBLINE_COLOUR.light, 360)).png(),
  [`${OUT}/logo-mark.png`]: sharp(mark).resize({ height: 256 }).png(),
  "app/icon.png": (await square(512, 12)).png({ palette: true, compressionLevel: 9 }),
  // iOS home screens need an opaque icon; black matches the original artwork.
  "app/apple-icon.png": (await square(180, 20, { r: 0, g: 0, b: 0, alpha: 1 })).png({ palette: true, compressionLevel: 9 }),
};
for (const [file, image] of Object.entries(outputs)) {
  const { width, height, size } = await image.toFile(file);
  console.log(`${file}  ${width}×${height}  ${(size / 1024).toFixed(1)} KB`);
}
