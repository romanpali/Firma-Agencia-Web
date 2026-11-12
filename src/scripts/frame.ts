// One animation loop for the whole page, cached section measures and write-only-on-change styles.
// Scroll-driven code reads scrollY once per frame and never touches layout (no getBoundingClientRect per frame).
export type Frame = (t: number, y: number, vh: number) => void;

const subs: Frame[] = [];
let running = false;
const tick = (t: number) => {
  const y = scrollY, vh = innerHeight;
  for (const f of subs) f(t, y, vh);
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
  requestAnimationFrame(() => { pending = false; readers.forEach((r) => r()); });
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
