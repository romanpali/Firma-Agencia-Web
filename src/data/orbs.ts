// Creative orbs: only design/creative artwork (flowers, type, colour, marks, strokes).
const svg = (inner: string) => `<svg viewBox="0 0 100 100" class="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;

const flower = (bg: string, c1: string, c2: string, core: string, n = 8) => {
  const petals = (rx: number, ry: number, cy: number, col: string, off = 0) =>
    Array.from({ length: n }, (_, i) => `<ellipse cx="50" cy="${cy}" rx="${rx}" ry="${ry}" fill="${col}" transform="rotate(${(360 / n) * i + off} 50 50)"/>`).join('');
  return svg(`<rect width="100" height="100" fill="${bg}"/>${petals(11, 21, 27, c1)}${petals(7, 14, 33, c2, 360 / n / 2)}<circle cx="50" cy="50" r="9" fill="${core}"/>`);
};

export const arts: Record<string, string> = {
  flowerPink: flower('#c9ecff', '#ff4d98', '#ff9ec7', '#ffd23f'),
  flowerWarm: flower('#ffe3c2', '#ff7a2f', '#ffc247', '#c2185b', 10),
  flowerCool: flower('#ffd1e6', '#2ec8ff', '#a8efff', '#ff4d98', 6),
  blobs: svg(`<rect width="100" height="100" fill="#fff4d6"/><circle cx="36" cy="40" r="26" fill="#ff4d98" fill-opacity=".85"/><circle cx="64" cy="42" r="24" fill="#2ec8ff" fill-opacity=".85" style="mix-blend-mode:multiply"/><circle cx="50" cy="66" r="24" fill="#ffd23f" fill-opacity=".9" style="mix-blend-mode:multiply"/>`),
  rings: svg(`<rect width="100" height="100" fill="#2b0a3a"/>${[44, 34, 24, 14].map((r, i) => `<circle cx="50" cy="50" r="${r}" fill="none" stroke="${['#ff4d98', '#ff9a3d', '#ffd23f', '#fff'][i]}" stroke-width="6"/>`).join('')}`),
  mark: svg(`<rect width="100" height="100" fill="#ff3d8f"/><circle cx="50" cy="56" r="22" fill="none" stroke="#fff" stroke-width="4"/><circle cx="50" cy="26" r="6" fill="#fff"/>`),
  type: svg(`<defs><linearGradient id="gA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4d98"/><stop offset="1" stop-color="#ffb347"/></linearGradient></defs><rect width="100" height="100" fill="url(#gA)"/><text x="50" y="66" text-anchor="middle" font-family="Inter Tight Variable, sans-serif" font-weight="700" font-size="52" letter-spacing="-3" fill="#fff">Aa</text>`),
  sphere: svg(`<defs><radialGradient id="gS" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff2c4"/><stop offset=".35" stop-color="#ff9a3d"/><stop offset=".75" stop-color="#e0186c"/><stop offset="1" stop-color="#5a0a3a"/></radialGradient></defs><rect width="100" height="100" fill="#ffe4ef"/><circle cx="50" cy="50" r="36" fill="url(#gS)"/>`),
  tiles: svg(`<rect width="100" height="100" fill="#fff"/>${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => {
    const x = c * 33.4, y = r * 33.4, k = (r + c) % 3;
    const col = ['#ff4d98', '#2ec8ff', '#ffd23f'][k];
    const rot = ((r * 3 + c) % 4) * 90;
    return `<path d="M${x} ${y}h33.4a33.4 33.4 0 0 1 -33.4 33.4z" fill="${col}" transform="rotate(${rot} ${x + 16.7} ${y + 16.7})"/>`;
  })).join('')}`),
  bezier: svg(`<rect width="100" height="100" fill="#1c0a2e"/><path d="M12 72 C 30 10, 70 10, 88 60" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 72 L30 22 M88 60 L70 22" stroke="#ff7ab5" stroke-width="1.6"/>${[[12, 72], [88, 60]].map(([x, y]) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="#fff"/>`).join('')}${[[30, 22], [70, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#ff4d98"/>`).join('')}`),
  halftone: svg(`<rect width="100" height="100" fill="#fff6e8"/>${Array.from({ length: 36 }, (_, i) => {
    const c = i % 6, r = Math.floor(i / 6);
    return `<circle cx="${12 + c * 15.2}" cy="${12 + r * 15.2}" r="${1.2 + ((c + r) / 10) * 6.2}" fill="#e0186c"/>`;
  }).join('')}`),
  palette: svg(`<rect width="100" height="100" fill="#fff"/>${['#ff4d98', '#ff9a3d', '#ffd23f', '#2ec8ff', '#1c0a2e'].map((c, i) => `<rect x="${8 + i * 17.4}" y="14" width="14" height="72" rx="7" fill="${c}"/>`).join('')}`),
  brush: svg(`<defs><linearGradient id="gB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff3d8f"/><stop offset="1" stop-color="#ffb347"/></linearGradient></defs><rect width="100" height="100" fill="#e7f6ff"/><path d="M14 70 C 30 20, 50 90, 86 28" fill="none" stroke="url(#gB)" stroke-width="16" stroke-linecap="round"/>`),
  stripes: svg(`<rect width="100" height="100" fill="#ff4d98"/>${Array.from({ length: 8 }, (_, i) => `<rect x="${-40 + i * 24}" y="-10" width="11" height="130" fill="#ffd23f" transform="rotate(35 50 50)"/>`).join('')}`),
  burst: svg(`<rect width="100" height="100" fill="#e0186c"/>${Array.from({ length: 12 }, (_, i) => `<path d="M50 50 L44 8 L56 8Z" fill="#ffd23f" transform="rotate(${i * 30} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="12" fill="#fff"/>`),
};

// s: size in vw (desktop). x/y: position in %. d: depth (parallax strength). b: blur px. m: show on mobile.
export const orbs: { art: string; s: number; x: number; y: number; d: number; b?: number; m?: boolean; dur: number }[] = [
  { art: 'flowerPink', s: 9.5, x: 5, y: 68, d: 0.7, m: true, dur: 9 },
  { art: 'blobs', s: 6.4, x: 14, y: 84, d: 0.5, dur: 11 },
  { art: 'rings', s: 3.4, x: 21, y: 66, d: 0.25, b: 1.5, dur: 8 },
  { art: 'mark', s: 8, x: 29, y: 87, d: 0.65, m: true, dur: 10 },
  { art: 'type', s: 12.5, x: 41, y: 79, d: 1, m: true, dur: 12 },
  { art: 'sphere', s: 5, x: 51, y: 93, d: 0.45, dur: 9.5 },
  { art: 'tiles', s: 9, x: 61, y: 76, d: 0.8, m: true, dur: 11 },
  { art: 'bezier', s: 6, x: 70, y: 90, d: 0.55, dur: 10.5 },
  { art: 'halftone', s: 3.6, x: 77, y: 67, d: 0.3, b: 1.5, dur: 8.5 },
  { art: 'flowerWarm', s: 9.5, x: 84, y: 81, d: 0.75, m: true, dur: 12 },
  { art: 'palette', s: 5.4, x: 93, y: 68, d: 0.5, dur: 9 },
  { art: 'brush', s: 11, x: 97, y: 91, d: 0.95, dur: 11.5 },
  { art: 'flowerCool', s: 3.4, x: 10, y: 52, d: 0.3, b: 2, dur: 8 },
  { art: 'burst', s: 3.2, x: 88, y: 54, d: 0.3, b: 2, dur: 9 },
  { art: 'stripes', s: 4.6, x: 59, y: 97, d: 0.35, b: 1, dur: 10 },
];
