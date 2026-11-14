// Libro 3D de proyectos: páginas apaisadas con curvatura, escritorio en perspectiva y fotos que se «pixelan» al abrirse.
// Se usa en /obra y en la plantilla Galería del configurador. Funciona del lado del servidor (HTML) y del cliente (animación).

export const SEG = 8;
export type Proj = { n: string; cat: string; y: number; d: string; tags: string[]; hl: string; href?: string; img?: string; art: number; dark?: boolean; layout?: number };
export type PageOpts = { brand: string; mail: string; mailHref?: string; year: number; endTitle: string; contentsTitle: string };

const esc = (t: string) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));

// Una hoja: cadena de franjas anidadas (se curva girando cada franja un poco respecto a la anterior).
export function leafHTML(front: string, back: string, S = SEG): string {
  const seg = (i: number): string =>
    `<div class="sg" style="width:calc(var(--pw)/${S})"><div class="sf"><div class="sc" style="margin-left:calc(var(--pw)/${S}*${-i})">${front}</div><i class="shd"></i></div><div class="sb"><div class="sc" style="margin-left:calc(var(--pw)/${S}*${-(S - 1 - i)})">${back}</div><i class="shd"></i></div>${i < S - 1 ? seg(i + 1) : ''}</div>`;
  return seg(0);
}

const pn = (n: number) => `<span class="bk-pn">${String(n).padStart(2, '0')}</span>`;
const bar = (brand: string) => `<div class="pg-bar"><b>${esc(brand)}</b><span>Inicio</span><span>Obra</span><span>Estudio</span><i>Contacto</i></div>`;

const hero = (p: Proj, i: number, brand: string) => {
  const lay = p.layout ?? i % 3;
  const ph = p.img ? `<div class="pg-ph photo"></div>` : `<div class="pg-ph pa${p.art % 8}"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div>`;
  return `<div class="pg ${p.dark ? 'dk' : 'lt'} v${lay}">${ph}${bar(p.n)}<div class="pg-txt"><p class="pg-k">${esc(p.cat)}</p><h4>${esc(p.hl)}</h4><p class="pg-s">${esc(p.d)}</p><span class="pg-btn">Ver proyecto →</span></div><span class="pg-pct"></span>${pn(3 + i * 2)}</div>`;
};
const details = (p: Proj, i: number) =>
  `<div class="pg ${p.dark ? 'lt' : 'dk'} pd">${bar(p.n)}<div class="pd-txt"><span class="pd-no">0${i + 1}</span><h5>${esc(p.n)}</h5><p class="pg-k">${esc(p.cat)} · ${p.y}</p><p class="pg-s">${esc(p.d)}</p><ul class="pg-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div><div class="pd-grid"><div class="pg-tile pa${(p.art + 1) % 8}"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div><div class="pg-tile pa${(p.art + 3) % 8}"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div><div class="pg-tile pa${(p.art + 5) % 8}"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div></div>${pn(4 + i * 2)}</div>`;

export function pagesFor(projs: Proj[], o: PageOpts) {
  const five = projs.slice(0, 5);
  const cover = `<div class="bw-cover"><b>${esc(o.brand)}</b><span>Obra selecta · ${o.year}</span></div>`;
  const contents = `<div class="pg lt pc"><div class="pc-l"><h4>${esc(o.contentsTitle)}</h4><p>${five.length} obras</p></div><ul class="pc-r">${five.map((p, i) => `<li><button type="button" data-bk-go="${i + 1}"><em>0${i + 1}</em><b>${esc(p.n)}</b><i></i><span>${esc(p.cat)}</span></button></li>`).join('')}</ul><p class="pc-f">Elige una obra para saltar a ella</p>${pn(2)}</div>`;
  const leaves: { f: string; b: string; img?: string }[] = [{ f: cover, b: contents }];
  five.forEach((p, i) => leaves.push({ f: hero(p, i, o.brand), b: details(p, i), img: p.img }));
  const end = `<div class="pg dk pe"><i class="hm">${esc(o.brand[0] || 'H')}</i><b>${esc(o.endTitle)}</b><a href="${o.mailHref || '/contacto'}">${esc(o.mail)}</a>${pn(leaves.length * 2 + 2)}</div>`;
  return { leaves, end };
}

export function leavesMarkup(leaves: { f: string; b: string; img?: string }[]) {
  return leaves.map((l, k) => `<div class="bw-leaf" data-k="${k}"${l.img ? ` data-img="${l.img}"` : ''}><div class="lf">${leafHTML(l.f, l.b, 1)}</div></div>`).join('');
}

// ---------------------------------------------------------------- cliente
type Mount = { sec: HTMLElement; scrollY: () => number; secTop: () => number; viewH: () => number; scrollTo: (y: number) => void; reduced?: boolean };
const cl = (x: number) => Math.max(0, Math.min(1, x));
const sm = (x: number) => x * x * (3 - 2 * x);
// Niveles de pixelado ya horneados (foto.webp → foto-1…4.webp): no se calcula nada en el navegador.
const levelsOf = (url: string) => [1, 2, 3, 4].map((i) => url.replace(/\.webp$/, `-${i}.webp`)).concat(url);

const cache = new WeakMap<Element, Record<string, string>>();
const put = (el: HTMLElement, prop: 'transform' | 'opacity' | 'height' | 'width' | 'left' | 'display' | 'visibility', v: string) => {
  let c = cache.get(el); if (!c) cache.set(el, (c = {}));
  if (c[prop] === v) return;
  c[prop] = v; el.style[prop as 'opacity'] = v;
};

export function mountBook(o: Mount) {
  const sec = o.sec;
  const book = sec.querySelector<HTMLElement>('[data-bk]')!;
  const world = sec.querySelector<HTMLElement>('[data-bw]')!;
  const fs = sec.querySelector<HTMLElement>('.bw-fs');
  const intros = [...sec.querySelectorAll<HTMLElement>('.bw-intro')];
  const baseL = sec.querySelector<HTMLElement>('.bw-base.l');
  const shL = sec.querySelector<HTMLElement>('.bw-sh.l');
  const edgeR = sec.querySelector<HTMLElement>('.bw-edge.r');
  const edgeL = sec.querySelector<HTMLElement>('.bw-edge.l');
  let gutter: HTMLElement | null = null;
  const count = sec.querySelector<HTMLElement>('[data-bk-count]');
  const barEl = sec.querySelector<HTMLElement>('[data-bk-bar]');
  type L = { el: HTMLElement; flat: HTMLElement; curved: HTMLElement | null; segs: HTMLElement[]; shds: HTMLElement[]; flatShds: HTMLElement[]; vis: boolean; mode: 'flat' | 'curved' };
  let L: L[] = [];
  let N = 0, active = -1, pw = 1, ph = 1, lastKey = '', props: HTMLElement[] = [], curNear = -2, lite = false, lastT = 0; const dts: number[] = [];
  const timers = new Map<HTMLElement, number>();

  const runPix = (leaf: HTMLElement) => {
    const url = leaf.dataset.img; if (!url) return;
    const lv = levelsOf(url);
    clearTimeout(timers.get(leaf));
    const full = new Image(); full.src = url;
    let i = 0;
    const step = () => {
      leaf.style.setProperty('--pix', `url("${lv[i]}")`);
      leaf.style.setProperty('--pcts', `"${[10, 30, 55, 80, 100][i]}%"`);
      leaf.classList.toggle('pixing', i < lv.length - 1);
      i++;
      if (i < lv.length) timers.set(leaf, window.setTimeout(step, o.reduced ? 0 : 200));
    };
    step();
  };
  const measure = () => { pw = book.offsetWidth / 2 || 1; ph = book.offsetHeight || 1; lastKey = ''; };
  // La versión curva (franjas) se construye solo para la hoja que se mueve y sus vecinas, y se descarta al alejarse.
  const ensureCurved = (l: L) => {
    if (l.curved) return;
    const fh = l.flat.querySelector('.sf .sc')!.innerHTML, bh = l.flat.querySelector('.sb .sc')!.innerHTML;
    const d = document.createElement('div');
    d.className = 'lc'; d.style.display = 'none';
    d.innerHTML = leafHTML(fh, bh, SEG);
    l.el.appendChild(d);
    l.curved = d;
    l.segs = [...d.querySelectorAll<HTMLElement>('.sg')].slice(1);
    l.shds = [...d.querySelectorAll<HTMLElement>('.shd')];
  };
  const dropCurved = (l: L) => {
    if (!l.curved) return;
    l.curved.remove(); l.curved = null; l.segs = []; l.shds = [];
    if (l.mode === 'curved') { l.mode = 'flat'; put(l.flat, 'display', ''); }
  };
  const idle = (f: () => void) => (window.requestIdleCallback ? window.requestIdleCallback(f, { timeout: 300 }) : setTimeout(f, 80));
  const refresh = () => {
    L = [...sec.querySelectorAll<HTMLElement>('.bw-leaf')].map((el) => ({ el, flat: el.querySelector<HTMLElement>('.lf')!, curved: null, segs: [], shds: [], flatShds: [...el.querySelectorAll<HTMLElement>('.lf .shd')], vis: true, mode: 'flat' as const }));
    N = L.length; active = -1; lastKey = '';
    L.forEach(({ el }) => { if (el.dataset.img) el.style.setProperty('--pix', `url("${levelsOf(el.dataset.img)[2]}")`); });
    if (!book.querySelector('.bw-ribbon')) book.insertAdjacentHTML('beforeend', '<i class="bw-ribbon"></i><i class="bw-gutter"></i>');
    gutter = book.querySelector<HTMLElement>('.bw-gutter');
    props = [...sec.querySelectorAll<HTMLElement>('.bw-prop')];
    measure();
  };
  const update = () => {
    if (!N) return;
    const range = Math.max(1, sec.offsetHeight - o.viewH());
    const p = cl((o.scrollY() - o.secTop()) / range);
    const key = p.toFixed(4);
    if (key === lastKey) return;
    lastKey = key;
    const t = cl((p - 0.05) / 0.88) * N;
    const cur = Math.floor(Math.min(t, N - 0.001));
    if (cur !== curNear) {
      curNear = cur;
      L.forEach((l, k) => { if (Math.abs(k - cur) > 2) dropCurved(l); });
      idle(() => { for (const k of [cur, cur + 1, cur - 1]) if (L[k]) ensureCurved(L[k]); });
    }
    // vigilante de rendimiento: si el equipo no sostiene los fotogramas, se activa el modo ligero
    const now = performance.now();
    if (!lite && lastT && now - lastT < 120) { dts.push(now - lastT); if (dts.length > 36) { dts.shift(); const m = [...dts].sort((a, b) => a - b)[18]; if (m > 34) { lite = true; sec.classList.add('bw-lite'); } } }
    lastT = now;
    let shadowA = 0, shadowF = 0;
    L.forEach((l, k) => {
      const show = k >= cur - 1 && k <= cur + 1;
      if (show !== l.vis) { l.vis = show; put(l.el, 'display', show ? '' : 'none'); }
      if (!show) return;
      const f = cl(t - k), a = sm(f) * 180;
      const turning = f > 0.002 && f < 0.998;
      if (turning) ensureCurved(l);
      const want = turning && l.curved ? 'curved' : 'flat';
      if (want !== l.mode) { l.mode = want; put(l.flat, 'display', want === 'flat' ? '' : 'none'); if (l.curved) put(l.curved, 'display', want === 'curved' ? '' : 'none'); }
      put(l.el, 'transform', `translateZ(${((a > 90 ? k : N - k) * 1.4).toFixed(1)}px) rotateY(${(-a).toFixed(1)}deg)`);
      if (l.mode === 'curved') {
        const bend = (Math.min(0.95 * a, 1.1 * a * (1 - f)) / (SEG - 1)).toFixed(2);
        for (const sg of l.segs) put(sg, 'transform', `rotateY(${bend}deg)`);
      }
      const sh = (Math.sin((a * Math.PI) / 180) * 0.42).toFixed(2);
      for (const d of l.mode === 'curved' ? l.shds : l.flatShds) put(d, 'opacity', sh);
      if (f > 0 && f < 1) { shadowA = a; shadowF = f; }
    });
    const e = sm(cl(p / 0.28)), tt = sm(cl(t));
    const rx = 44 - 15 * e, rz = -6 * (1 - e);
    put(world, 'transform', `rotateX(${rx.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${(0.9 + 0.1 * e).toFixed(3)})`);
    for (const pr of props) put(pr, 'transform', `translateZ(-33px) rotateZ(${(-rz).toFixed(1)}deg) rotateX(${(-rx).toFixed(1)}deg)`);
    const wide = sec.clientWidth > 760;
    put(book, 'transform', `translateX(${((wide ? -0.05 : -0.5) * pw * (1 - tt)).toFixed(1)}px)`);
    if (gutter) put(gutter, 'opacity', (tt * 0.9).toFixed(2));
    const lb = cl(t * 1.5).toFixed(2);
    if (baseL) put(baseL, 'opacity', lb);
    if (shL) put(shL, 'opacity', (+lb * 0.7).toFixed(2));
    if (edgeR) put(edgeR, 'height', `${(ph * 0.052 * (1 - t / N)).toFixed(1)}px`);
    if (edgeL) put(edgeL, 'height', `${(ph * 0.052 * (t / N)).toFixed(1)}px`);
    { const op = cl(1 - p * 12); for (const it of intros) { put(it, 'opacity', op.toFixed(2)); put(it, 'display', op < 0.04 ? 'none' : ''); } }
    if (fs) {
      const x = pw * Math.cos((shadowA * Math.PI) / 180);
      put(fs, 'left', `calc(50% + ${Math.min(0, x).toFixed(0)}px)`);
      put(fs, 'width', `${(Math.abs(x) + pw * 0.04).toFixed(0)}px`);
      put(fs, 'opacity', shadowF > 0 ? (Math.sin(Math.PI * shadowF) * 0.7).toFixed(2) : '0');
    }
    const pg = Math.round(t);
    if (count) { const txt = pg < 1 ? 'Cubierta' : pg > N - 1 ? `Obra ${N - 1} de ${N - 1}` : `Obra ${pg} de ${N - 1}`; if (count.textContent !== txt) count.textContent = txt; }
    if (barEl) put(barEl, 'transform', `scaleX(${(t / N).toFixed(3)})`);
    const act = pg >= 1 && pg <= N - 1 ? pg : -1;
    if (act !== active) { active = act; if (act > 0) runPix(L[act].el); }
  };
  const go = (t: number) => {
    const range = Math.max(1, sec.offsetHeight - o.viewH());
    o.scrollTo(o.secTop() + (0.05 + (t / N) * 0.88) * range + (t > 0 && t < N ? 2 : 0));
  };
  book.addEventListener('click', (ev) => {
    const el = ev.target as HTMLElement;
    if (el.closest('a')) return;
    const g = el.closest<HTMLElement>('[data-bk-go]');
    if (g) { go(+g.dataset.bkGo!); return; }
    const leaf = el.closest<HTMLElement>('.bw-leaf');
    if (!leaf) return;
    const k = +leaf.dataset.k!, a = L[k] ? (leaf.style.transform.match(/rotateY\((-?[\d.]+)deg\)/)?.[1] ?? '0') : '0';
    go(Math.abs(parseFloat(a)) > 90 ? k : k + 1);
  });
  new ResizeObserver(() => { measure(); update(); }).observe(sec);
  refresh();
  return { update, refresh, go };
}
