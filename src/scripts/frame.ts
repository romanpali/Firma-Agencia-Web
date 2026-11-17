// One animation loop for the whole page, cached section measures and write-only-on-change styles.
// Scroll-driven code reads scrollY once per frame and never touches layout (no getBoundingClientRect per frame).
export type Frame = (t: number, y: number, vh: number) => void;

const subs: Frame[] = [];
let gated = false;
let running = false;
const tick = (t: number) => {
  const d = document.documentElement;
  // Mientras corre la pantalla de entrada (o el menú está abierto) la página de abajo no se actualiza: así el logo anima sin tirones.
  if (!d.hasAttribute('data-menu-on') && !d.classList.contains('intro')) { const y = scrollY, vh = innerHeight; if (gated) { gated = false; remeasure(); } for (const f of subs) f(t, y, vh); }
  else gated = true;
  if (document.hidden) running = false;
  else requestAnimationFrame(tick);
};
const start = () => { if (!running && subs.length) { running = true; requestAnimationFrame(tick); } };
document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });

export const onFrame = (f: Frame) => { subs.push(f); start(); };

// Absolute page position of an element (top) and its height, refreshed on resize / load / layout changes.
const readers: (() => void)[] = [];
let pending = false;
const remeasure = () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => { pending = false; if (!document.documentElement.hasAttribute('data-menu-on')) readers.forEach((r) => r()); });
};
addEventListener('resize', remeasure);
addEventListener('load', remeasure);
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(remeasure).observe(document.documentElement);

export const measure = (el: Element) => {
  const m = { top: 0, height: 0 };
  const read = () => { const r = el.getBoundingClientRect(); m.top = r.top + scrollY; m.height = r.height; };
  read();
  readers.push(read);
  return m;
};

// Writes a style only when its value changed (skips needless style recalculation).
const cache = new WeakMap<Element, Record<string, string>>();
export const put = (el: HTMLElement | SVGElement, prop: string, v: string) => {
  let c = cache.get(el);
  if (!c) cache.set(el, (c = {}));
  if (c[prop] === v) return;
  c[prop] = v;
  if (prop.startsWith('--')) el.style.setProperty(prop, v);
  else (el.style as unknown as Record<string, string>)[prop] = v;
};

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => t * t * (3 - 2 * t);

// Animated numbers inside a panel ([data-count] with data-a / data-b window on the panel's --q, data-d = one decimal).
export type CountEl = { el: HTMLElement; v: number; a: number; b: number; d: number };
export const countsOf = (root: Element): CountEl[] =>
  [...root.querySelectorAll<HTMLElement>('[data-count]')].map((el) => ({ el, v: +el.dataset.count!, a: +el.dataset.a!, b: +el.dataset.b!, d: +(el.dataset.d || 0) }));
export const paintCounts = (list: CountEl[], q: number) =>
  list.forEach((c) => {
    const v = c.v * (1 - Math.pow(1 - clamp((q - c.a) / c.b), 3));
    c.el.textContent = c.d ? (v / 10).toFixed(1) : Math.round(v).toLocaleString('es-MX');
  });

// Same transition as hero → horizon: the pinned outgoing screen stays in place and dissolves (fade + slow zoom)
// while the next screen rises over it. `next` is measured once; progress follows the scroll.
export const dissolveOut = (stage: HTMLElement, next: HTMLElement, zoom = 0.06, lead = 1) => {
  const n = measure(next);
  onFrame((_t, y, vh) => {
    const t = clamp((y - (n.top - vh * lead)) / (vh * 0.85));
    if (t <= 0) { put(stage, 'opacity', '1'); put(stage, 'transform', 'none'); return; }
    const o = 1 - smooth(clamp((t - 0.3) / 0.7));
    put(stage, 'opacity', o.toFixed(3));
    put(stage, 'transform', `scale(${(1 + zoom * t).toFixed(4)})`);
  });
};

// Fundido cruzado limpio entre dos capítulos: el que sale baja de opacidad (con un acercamiento mínimo) mientras el siguiente sube.
// Solo toca opacidad y transform (se componen en la GPU), así que no repinta nada. Devuelve el avance 0–1 de la transición.
export const crossProgress = (y: number, top: number, vh: number) => clamp((y - top) / (vh * 0.9));
export const crossOut = (stage: HTMLElement, next: HTMLElement, zoom = 0.035) => {
  const n = measure(next);
  stage.style.willChange = 'opacity, transform';
  onFrame((_t, y, vh) => {
    const t = crossProgress(y, n.top, vh);
    if (t <= 0) { put(stage, 'opacity', '1'); put(stage, 'transform', 'none'); return; }
    put(stage, 'opacity', (1 - smooth(clamp((t - 0.15) / 0.6))).toFixed(3));
    put(stage, 'transform', `translate3d(0,0,0) scale(${(1 + zoom * t).toFixed(4)})`);
  });
};
