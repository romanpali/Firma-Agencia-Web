// Interactividad del sitio web de «Marea» (dentro del libro, en el carrusel de celular y en la vista ampliada):
// pestañas, carrito, reserva con total, aparición al desplazar y botón para ampliar el sitio.
// Los clics se delegan por data-int; el estado vive en data-* de la raíz .mr-web, así que se copia con la hoja (versión curva y vista ampliada).
import { svg } from './marea-ico';

const tgt = new WeakMap<HTMLElement, number>(), anim = new WeakSet<HTMLElement>();
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NIVEL: Record<string, { n: string; p: number }> = { principiante: { n: 'Principiante', p: 650 }, intermedio: { n: 'Intermedio', p: 750 }, ninos: { n: 'Niños', p: 550 }, privada: { n: 'Clase privada', p: 1200 } };
const DIAS = ['Sáb 14', 'Dom 15', 'Lun 16', 'Mar 17', 'Mié 18', 'Jue 19', 'Vie 20'];
const peso = (n: number) => `$${n.toLocaleString('es-MX')}`;
const setAll = (root: HTMLElement, sel: string, v: string) => root.querySelectorAll(sel).forEach((e) => { if (e.textContent !== v) e.textContent = v; });
// avisa al libro que la hoja cambió: su versión curva (si existe) se descarta y se vuelve a crear con el estado actual
const dirty = (root: HTMLElement) => root.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));

function sync(root: HTMLElement) {
  const d = root.dataset, lv = NIVEL[d.nivel || 'principiante'], pax = +(d.pax || 2);
  setAll(root, '[data-sum=clase]', lv.n); setAll(root, '[data-sum=dia]', DIAS[+(d.dia || 0)]); setAll(root, '[data-sum=hora]', d.hora || '07:00');
  setAll(root, '[data-sum=pax]', String(pax)); setAll(root, '[data-sum=pax2]', String(pax)); setAll(root, '[data-sum=total]', peso(lv.p * pax));
  root.querySelectorAll<HTMLElement>('[data-g]').forEach((b) => b.classList.toggle('on', d[b.dataset.g!] === b.dataset.v));
  root.querySelectorAll<HTMLElement>('[data-f]').forEach((b) => b.classList.toggle('on', (d.fil || 'todo') === b.dataset.f));
  setAll(root, '[data-cart-n]', d.cart || '0'); setAll(root, '[data-cart-t]', peso(+(d.total || 0)));
}

function init(root: HTMLElement) {
  const sc = root.querySelector<HTMLElement>('.mw-scroll'); if (!sc) return;
  const show = (e: Element) => e.classList.add('in');
  if (reduced || !('IntersectionObserver' in window)) root.querySelectorAll('.rv').forEach(show);
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { root: sc, threshold: 0.12 });
    root.querySelectorAll('.rv').forEach((e) => io.observe(e));
  }
  let raf = 0, t = 0;
  sc.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; root.style.setProperty('--sy', String(Math.round(sc.scrollTop))); });
    clearTimeout(t); t = window.setTimeout(() => dirty(root), 350);
  }, { passive: true });
  root.addEventListener('input', (ev) => { const i = ev.target as HTMLInputElement; if (i.tagName === 'INPUT') i.setAttribute('value', i.value); });
}

function expand(root: HTMLElement) {
  if (document.querySelector('.mr-ex')) return;
  const ex = document.createElement('div'); ex.className = 'mr-ex live';
  ex.innerHTML = `<button type="button" class="mr-exx" aria-label="Cerrar">${svg('x')}</button><div class="mr-exw">${root.outerHTML}</div><p class="mr-exh">${innerWidth < innerHeight ? 'Gira tu teléfono para verlo más grande' : 'Desplázate dentro del sitio · Esc para cerrar'}</p>`;
  const box = ex.querySelector<HTMLElement>('.mr-exw')!, site = box.querySelector<HTMLElement>('.mr-web')!;
  site.querySelectorAll('.rv').forEach((e) => e.classList.remove('in'));
  const fit = () => { const w = Math.min(innerWidth * 0.97, innerHeight * 0.95 * 1.5); box.style.width = `${w}px`; box.style.height = `${w / 1.5}px`; box.style.fontSize = `${w / 40}px`; };
  const key = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
  const close = () => { ex.remove(); removeEventListener('resize', fit); removeEventListener('keydown', key); document.documentElement.style.overflow = ''; };
  fit(); addEventListener('resize', fit); addEventListener('keydown', key);
  ex.addEventListener('click', (e) => { if (e.target === ex || (e.target as HTMLElement).closest('.mr-exx')) close(); });
  document.documentElement.style.overflow = 'hidden';
  document.body.appendChild(ex);
  init(site); sync(site);
}

function act(t: HTMLElement, root: HTMLElement) {
  const d = root.dataset, k = t.dataset.int, sc = root.querySelector<HTMLElement>('.mw-scroll');
  if (k === 'wtab') { if (sc) toSection(sc, t.dataset.t!); }
  else if (k === 'wbook') { d.nivel = t.dataset.nivel!; if (sc) toSection(sc, 'reservar'); }
  else if (k === 'wfil') { d.fil = t.dataset.f!; }
  else if (k === 'wpick') { if (t.classList.contains('full')) return; d[t.dataset.g!] = t.dataset.v!; }
  else if (k === 'wpax') d.pax = String(Math.max(1, Math.min(6, +(d.pax || 2) + +t.dataset.d!)));
  else if (k === 'wadd') {
    d.cart = String(+(d.cart || 0) + 1); d.total = String(+(d.total || 0) + +t.dataset.p!);
    const old = t.textContent; t.textContent = 'Añadido'; t.classList.add('added');
    setTimeout(() => { t.textContent = old; t.classList.remove('added'); dirty(root); }, 1300);
  } else if (k === 'wconfirm') {
    const nm = root.querySelector<HTMLInputElement>('.wfld input')?.value.trim();
    setAll(root, '[data-sum=done]', `${nm ? `${nm}, t` : 'T'}e esperamos el ${DIAS[+(d.dia || 0)]} a las ${d.hora}. Llega 15 minutos antes.`);
    setAll(root, '[data-sum=code]', `MAR-${100 + Math.floor(Math.random() * 900)}`);
    d.done = '1';
  } else if (k === 'wreset') { root.removeAttribute('data-done'); }
  else if (k === 'wex') { expand(root); return; }
  sync(root); dirty(root);
}

document.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-int^=w]');
  const root = t?.closest<HTMLElement>('.mr-web');
  if (!t || !root || t.closest('.lc')) return;
  ev.stopPropagation(); act(t, root);
});

// Desplazamiento con inercia suave hacia una posición (rueda del ratón y botones que llevan a otra sección)
function glide(sc: HTMLElement, y: number) {
  const to = Math.max(0, Math.min(sc.scrollHeight - sc.clientHeight, y)); tgt.set(sc, to);
  if (reduced) { sc.scrollTop = to; return; }
  if (anim.has(sc)) return; anim.add(sc);
  let last = performance.now(), still = 0;
  const step = (now: number) => {
    const goal = tgt.get(sc); if (goal === undefined) { anim.delete(sc); return; }
    const before = sc.scrollTop, d = goal - before, dt = Math.min(64, now - last); last = now;
    // el navegador redondea scrollTop a píxeles: se termina al llegar o cuando ya no avanza
    if (Math.abs(d) < 1.2 || still > 3) { sc.scrollTop = goal; anim.delete(sc); tgt.delete(sc); return; }
    sc.scrollTop = before + d * (1 - Math.exp(-dt / 130));
    still = Math.abs(sc.scrollTop - before) < 0.3 ? still + 1 : 0;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
// El sitio es una sola página larga: los botones llevan a su sección
function toSection(sc: HTMLElement, name: string) {
  const el = sc.querySelector<HTMLElement>(`.wv-${name}`); if (el) glide(sc, el.offsetTop);
}

// Rueda del ratón sobre el sitio (dentro del libro): el navegador no desplaza contenedores dentro de una escena 3D, así que se hace a mano,
// con inercia suave. Si el sitio ya llegó a su inicio o a su fin, la rueda sigue de largo y pasa la hoja del libro.
document.addEventListener('wheel', (ev) => {
  const sc = (ev.target as HTMLElement).closest?.<HTMLElement>('.mw-scroll');
  if (!sc || ev.ctrlKey || sc.closest('.mr-ex') || sc.closest('.lc')) return;
  const max = sc.scrollHeight - sc.clientHeight, dy = ev.deltaMode === 1 ? ev.deltaY * 16 : ev.deltaY;
  const cur = tgt.get(sc) ?? sc.scrollTop;
  if (!((dy > 0 && cur < max - 1) || (dy < 0 && cur > 1))) return;
  ev.preventDefault();
  glide(sc, cur + dy);
}, { passive: false });

const boot = () => document.querySelectorAll<HTMLElement>('.mr-web').forEach((r) => { if (!r.closest('.lc') && !r.dataset.ready) { r.dataset.ready = '1'; init(r); sync(r); } });
boot(); addEventListener('load', boot);
