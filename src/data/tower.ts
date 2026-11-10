// Isometric tower: geometry as SVG path strings, generated at build time.
export type Pt = { x: number; y: number };
const C = 0.8660254;
const S = 0.5;
export const iso = (x: number, y: number, z: number): Pt => ({ x: (x - y) * C, y: (x + y) * S - z });
const f1 = (n: number) => n.toFixed(1);
const M = (p: Pt) => `${f1(p.x)} ${f1(p.y)}`;
const poly = (pts: Pt[]) => 'M' + pts.map(M).join('L') + 'Z';
const seg = (a: Pt, b: Pt) => `M${M(a)}L${M(b)}`;

export const AMAX = 240;
const GAP = 6;
const defs = [
  { id: 'base', a: 240, h: 38, label: 'Tu negocio' },
  { id: 'f1', a: 222, h: 46, label: 'Identidad y diseño' },
  { id: 'f2', a: 208, h: 46, label: 'Presencia digital' },
  { id: 'f3', a: 194, h: 46, label: 'Ventas y CRM' },
  { id: 'f4', a: 180, h: 46, label: 'Finanzas y administración' },
  { id: 'f5', a: 164, h: 46, label: 'Operaciones y datos' },
  { id: 'f6', a: 140, h: 40, label: 'IA y automatización' },
];
let z = 0;
export const floors = defs.map((f, i) => {
  const z0 = z;
  z += f.h + GAP;
  return { ...f, i, z0, z1: z0 + f.h, ox: (AMAX - f.a) / 2 };
});
export type Floor = (typeof floors)[number];
export const TOP = floors[floors.length - 1].z1;

type Face = 'L' | 'R';
const pt = (f: Floor, face: Face, u: number, v: number) =>
  face === 'L' ? iso(f.ox + u * f.a, f.ox + f.a, f.z0 + v * f.h) : iso(f.ox + f.a, f.ox + u * f.a, f.z0 + v * f.h);
const q = (f: Floor, face: Face, u0: number, v0: number, u1: number, v1: number) =>
  poly([pt(f, face, u0, v0), pt(f, face, u1, v0), pt(f, face, u1, v1), pt(f, face, u0, v1)]);
const ln = (f: Floor, face: Face, u0: number, v0: number, u1: number, v1: number) => seg(pt(f, face, u0, v0), pt(f, face, u1, v1));

function grid(f: Floor, face: Face, cols: number, rows: number, u0 = 0.08, u1 = 0.92, v0 = 0.14, v1 = 0.86, gap = 0.035) {
  const out: string[] = [];
  const cw = (u1 - u0) / cols, rh = (v1 - v0) / rows;
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows; r++)
      out.push(q(f, face, u0 + c * cw + gap / 2, v0 + r * rh + gap, u0 + (c + 1) * cw - gap / 2, v0 + (r + 1) * rh - gap));
  return out;
}

export function floorGeom(f: Floor) {
  const x0 = f.ox, x1 = f.ox + f.a, z0 = f.z0, z1 = f.z1;
  const top = poly([iso(x0, x0, z1), iso(x1, x0, z1), iso(x1, x1, z1), iso(x0, x1, z1)]);
  const right = poly([iso(x1, x0, z0), iso(x1, x1, z0), iso(x1, x1, z1), iso(x1, x0, z1)]);
  const left = poly([iso(x0, x1, z0), iso(x1, x1, z0), iso(x1, x1, z1), iso(x0, x1, z1)]);
  const wins: string[] = [];
  const lines: string[] = [];
  const solids: string[] = [];
  switch (f.id) {
    case 'base':
      wins.push(...grid(f, 'L', 2, 1, 0.06, 0.38, 0.3, 0.7, 0.02), ...grid(f, 'L', 2, 1, 0.62, 0.94, 0.3, 0.7, 0.02), ...grid(f, 'R', 2, 1, 0.06, 0.38, 0.3, 0.7, 0.02), ...grid(f, 'R', 2, 1, 0.62, 0.94, 0.3, 0.7, 0.02));
      solids.push(q(f, 'L', 0.42, 0, 0.58, 0.74));
      break;
    case 'f1':
      for (let i = 1; i < 14; i++) lines.push(ln(f, 'L', i / 14, 0.08, i / 14, 0.92), ln(f, 'R', i / 14, 0.08, i / 14, 0.92));
      break;
    case 'f2':
      wins.push(...grid(f, 'L', 4, 2), ...grid(f, 'R', 4, 2));
      break;
    case 'f3':
      wins.push(q(f, 'L', 0.06, 0.18, 0.94, 0.42), q(f, 'L', 0.06, 0.58, 0.94, 0.82), q(f, 'R', 0.06, 0.18, 0.94, 0.42), q(f, 'R', 0.06, 0.58, 0.94, 0.82));
      for (let i = 1; i < 8; i++) lines.push(ln(f, 'L', i / 8, 0.18, i / 8, 0.42), ln(f, 'R', i / 8, 0.18, i / 8, 0.42));
      break;
    case 'f4':
      for (let i = 0; i < 6; i++) lines.push(ln(f, 'L', 0.1 + i * 0.16, 0.06, 0.1 + i * 0.16, 0.94), ln(f, 'R', 0.1 + i * 0.16, 0.06, 0.1 + i * 0.16, 0.94));
      lines.push(ln(f, 'L', 0, 0.1, 1, 0.1), ln(f, 'R', 0, 0.1, 1, 0.1));
      break;
    case 'f5':
      wins.push(...grid(f, 'L', 5, 2, 0.07, 0.93, 0.16, 0.84, 0.03), ...grid(f, 'R', 5, 2, 0.07, 0.93, 0.16, 0.84, 0.03));
      break;
    case 'f6':
      wins.push(...grid(f, 'L', 3, 1, 0.1, 0.9, 0.22, 0.78, 0.04), ...grid(f, 'R', 3, 1, 0.1, 0.9, 0.22, 0.78, 0.04));
      break;
  }
  return { top, right, left, wins, lines, solids };
}

// Reference points
export const mid = (f: Floor) => (f.z0 + f.z1) / 2;
export const rightMost = (f: Floor) => iso(f.ox + f.a, f.ox, mid(f));
export const leftMost = (f: Floor) => iso(f.ox, f.ox + f.a, mid(f));
export const roofTop = iso(AMAX / 2, AMAX / 2, TOP);
export const baseCenter = iso(AMAX / 2, AMAX / 2, 0);

// Bounds
const all: Pt[] = floors.flatMap((f) => [
  iso(f.ox, f.ox, f.z1), iso(f.ox + f.a, f.ox, f.z1), iso(f.ox + f.a, f.ox + f.a, f.z1), iso(f.ox, f.ox + f.a, f.z1),
  iso(f.ox + f.a, f.ox, f.z0), iso(f.ox + f.a, f.ox + f.a, f.z0), iso(f.ox, f.ox + f.a, f.z0),
]);
export const bounds = {
  minX: Math.min(...all.map((p) => p.x)),
  maxX: Math.max(...all.map((p) => p.x)),
  minY: Math.min(...all.map((p) => p.y)) - 70,
  maxY: Math.max(...all.map((p) => p.y)),
};

// Ground grid (z = 0)
export const groundLines: string[] = [];
for (let v = -120; v <= 360; v += 40) {
  groundLines.push(seg(iso(v, -120, 0), iso(v, 360, 0)), seg(iso(-120, v, 0), iso(360, v, 0)));
}
export const plot = poly([iso(0, 0, 0), iso(AMAX, 0, 0), iso(AMAX, AMAX, 0), iso(0, AMAX, 0)]);

// Scattered "tools" of the business today (step 0)
export const scatter = [
  { x: -120, y: 30, label: 'Hojas de cálculo' },
  { x: 300, y: -30, label: 'Redes sociales' },
  { x: -70, y: 300, label: 'Facturas' },
  { x: 320, y: 250, label: 'Contactos' },
].map((s) => {
  const a = 34, h = 20;
  const c = (x: number, y: number, zz: number) => iso(s.x + x, s.y + y, zz);
  return {
    label: s.label,
    at: c(a / 2, a / 2, h + 10),
    top: poly([c(0, 0, h), c(a, 0, h), c(a, a, h), c(0, a, h)]),
    right: poly([c(a, 0, 0), c(a, a, 0), c(a, a, h), c(a, 0, h)]),
    left: poly([c(0, a, 0), c(a, a, 0), c(a, a, h), c(0, a, h)]),
  };
});
