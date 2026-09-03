/**
 * Generates a typographic placeholder tile for a project card.
 * Deliberately not a fake screenshot — swap it for a real one when you have it.
 *
 *   node scripts/make-placeholder.cjs <slug> "<Name>" "<Subtitle>"
 *   node scripts/make-placeholder.cjs hotel-key "Hotel Key" "Digital Room Key App"
 *
 * Writes public/images/<slug>.png at 1200x800.
 */
const sharp = require("sharp");
const path = require("path");

const [slug, name, subtitle] = process.argv.slice(2);

if (!slug || !name) {
  console.error(
    'Usage: node scripts/make-placeholder.cjs <slug> "<Name>" "<Subtitle>"',
  );
  process.exit(1);
}

const esc = (t = "") =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Shrink the display name if it would overflow the tile.
const fontSize = name.length > 16 ? 62 : name.length > 12 ? 72 : 82;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1a2b"/>
      <stop offset="55%" stop-color="#0e2338"/>
      <stop offset="100%" stop-color="#041018"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <circle cx="1010" cy="150" r="230" fill="#0788ff" opacity="0.13"/>
  <text x="90" y="390" font-family="Segoe UI, Arial, sans-serif"
        font-size="${fontSize}" font-weight="700" fill="#ffffff">${esc(name)}</text>
  <text x="90" y="452" font-family="Segoe UI, Arial, sans-serif"
        font-size="34" fill="#8fa3b3">${esc(subtitle)}</text>
  <rect x="90" y="500" width="120" height="4" rx="2" fill="#0788ff"/>
</svg>`;

const out = path.join("public", "images", `${slug}.png`);

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(out)
  .then(() => console.log("created", out))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
