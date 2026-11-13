// Libro 3D de proyectos: páginas apaisadas con curvatura, escritorio en perspectiva y fotos que se «pixelan» al abrirse.
// Se usa en /obra y en la plantilla Galería del configurador. Funciona del lado del servidor (HTML) y del cliente (animación).

export const SEG = 8;
export type Proj = { n: string; cat: string; y: number; d: string; tags: string[]; hl: string; href?: string; img?: string; art: number; dark?: boolean; layout?: number };
export type PageOpts = { brand: string; mail: string; mailHref?: string; year: number; endTitle: string; contentsTitle: string };

const esc = (t: string) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));

// Una hoja: cadena de segmentos anidados. Cada segmento muestra su rebanada de la página y se puede girar un poco respecto al anterior.
export function leafHTML(front: string, back: string, S = SEG): string {
  const seg = (i: number): string =>
    `<div class="sg"><div class="sf"><div class="sc" style="margin-left:calc(var(--pw)/${S}*${-i})">${front}</div></div><div class="sb"><div class="sc" style="margin-left:calc(var(--pw)/${S}*${-(S - 1 - i)})">${back}</div></div>${i < S - 1 ? seg(i + 1) : ''}</div>`;
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
  const cover = `<div class="bw-cover"><i class="hm">${esc(o.brand[0] || 'H')}</i><b>${esc(o.brand)}</b><span>Obra selecta · ${o.year}</span></div>`;
  const contents = `<div class="pg lt pc"><div class="pc-l"><h4>${esc(o.contentsTitle)}</h4><p>${five.length} obras</p></div><ul class="pc-r">${five.map((p, i) => `<li><button type="button" data-bk-go="${i + 1}"><em>0${i + 1}</em><b>${esc(p.n)}</b><i></i><span>${esc(p.cat)}</span></button></li>`).join('')}</ul><p class="pc-f">Elige una obra para saltar a ella</p>${pn(2)}</div>`;
  const leaves: { f: string; b: string; img?: string }[] = [{ f: cover, b: contents }];
  five.forEach((p, i) => leaves.push({ f: hero(p, i, o.brand), b: details(p, i), img: p.img }));
  const end = `<div class="pg dk pe"><i class="hm">${esc(o.brand[0] || 'H')}</i><b>${esc(o.endTitle)}</b><a href="${o.mailHref || '/contacto'}">${esc(o.mail)}</a>${pn(leaves.length * 2 + 2)}</div>`;
  return { leaves, end };
}

export function leavesMarkup(leaves: { f: string; b: string; img?: string }[]) {
  return leaves.map((l, k) => `<div class="bw-leaf" data-k="${k}"${l.img ? ` data-img="${l.img}"` : ''}>${leafHTML(l.f, l.b)}</div>`).join('');
}

// ---------------------------------------------------------------- cliente
type Mount = { sec: HTMLElement; scrollY: () => number; secTop: () => number; viewH: () => number; scrollTo: (y: number) => void; reduced?: boolean };
const cl = (x: number) => Math.max(0, Math.min(1, x));
const sm = (x: number) => x * x * (3 - 2 * x);
const levels = new Map<string, Promise<string[]>>();
const prepare = (url: string) => {
  if (!levels.has(url)) {
    levels.set(url, new Promise((res) => {
      const im = new Image();
      im.onload = () => {
        const out: string[] = [];
        for (const w of [10, 20, 40, 90]) {
          const h = Math.max(1, Math.round((w * im.height) / im.width));
          const c = document.createElement('canvas'); c.width = w; c.height = h;
          c.getContext('2d')!.drawImage(im, 0, 0, w, h);
          out.push(c.toDataURL('image/png'));
        }
        out.push(url); res(out);
      };
      im.onerror = () => res([url]);
      im.src = url;
    }));
  }
  return levels.get(url)!;
};

export function mountBook(o: Mount) {
  const sec = o.sec;
  const book = sec.querySelector<HTMLElement>('[data-bk]')!;
  const world = sec.querySelector<HTMLElement>('[data-bw]')!;
  const fs = sec.querySelector<HTMLElement>('.bw-fs');
  const count = sec.querySelector<HTMLElement>('[data-bk-count]');
  const barEl = sec.querySelector<HTMLElement>('[data-bk-bar]');
  let leaves: HTMLElement[] = [];
  let N = 0, active = -1;
  const timers = new Map<HTMLElement, number>();

  const runPix = (leaf: HTMLElement) => {
    const url = leaf.dataset.img; if (!url) return;
    prepare(url).then((lv) => {
      clearTimeout(timers.get(leaf)); let i = 0;
      const step = () => {
        leaf.style.setProperty('--pix', `url("${lv[i]}")`);
        leaf.style.setProperty('--pcts', `"${Math.min(100, Math.round((i / (lv.length - 1)) * 86 + (i === lv.length - 1 ? 14 : 0)))}%"`);
        leaf.classList.toggle('pixing', i < lv.length - 1);
        i++;
        if (i < lv.length) timers.set(leaf, window.setTimeout(step, o.reduced ? 0 : 190));
      };
      step();
    });
  };

  const refresh = () => {
    leaves = [...sec.querySelectorAll<HTMLElement>('.bw-leaf')]; N = leaves.length; active = -1;
    leaves.forEach((l) => { if (l.dataset.img) { l.style.setProperty('--pix', `url("${l.dataset.img}")`); prepare(l.dataset.img); } });
  };
  const update = () => {
    if (!N) return;
    const range = Math.max(1, sec.offsetHeight - o.viewH());
    const p = cl((o.scrollY() - o.secTop()) / range);
    const t = cl((p - 0.05) / 0.88) * N;
    const cur = Math.floor(Math.min(t, N - 0.001));
    const pw = leaves[0].offsetWidth || 1;
    let shadowA = 0, shadowF = 0;
    leaves.forEach((el, k) => {
      const f = cl(t - k), a = sm(f) * 180;
      el.style.setProperty('--ang', a.toFixed(2));
      el.style.setProperty('--z', `${((a > 90 ? k : N - k) * 1.4).toFixed(1)}px`);
      el.style.setProperty('--shade', (Math.sin((a * Math.PI) / 180) * 0.45).toFixed(3));
      el.style.setProperty('--bend', ((Math.sin(Math.PI * f) * 62) / (SEG - 1)).toFixed(2));
      el.style.visibility = k >= cur - 1 && k <= cur + 1 ? 'visible' : 'hidden';
      if (f > 0 && f < 1) { shadowA = a; shadowF = f; }
    });
    const e = sm(cl(p / 0.28));
    book.style.setProperty('--o', sm(cl(t)).toFixed(3));
    book.style.setProperty('--lb', cl(t * 1.5).toFixed(3));
    book.style.setProperty('--tr', `${(1 - t / N).toFixed(3)}`);
    book.style.setProperty('--tl', `${(t / N).toFixed(3)}`);
    world.style.setProperty('--rx', (50 + 9 * e).toFixed(2));
    world.style.setProperty('--rz', (-5 * (1 - e)).toFixed(2));
    world.style.setProperty('--bs', (0.86 + 0.14 * e).toFixed(3));
    sec.style.setProperty('--bp', p.toFixed(3));
    if (fs) {
      const x = pw * Math.cos((shadowA * Math.PI) / 180);
      fs.style.left = `calc(50% + ${Math.min(0, x).toFixed(1)}px)`;
      fs.style.width = `${(Math.abs(x) + pw * 0.04).toFixed(1)}px`;
      fs.style.opacity = shadowF > 0 ? (Math.sin(Math.PI * shadowF) * 0.7).toFixed(3) : '0';
    }
    const pg = Math.round(t);
    if (count) count.textContent = pg < 1 ? 'Cubierta' : pg > N - 1 ? `Obra ${N - 1} de ${N - 1}` : `Obra ${pg} de ${N - 1}`;
    if (barEl) barEl.style.transform = `scaleX(${(t / N).toFixed(3)})`;
    const act = pg >= 1 && pg <= N - 1 ? pg : -1;
    if (act !== active) { active = act; if (act > 0) runPix(leaves[act]); }
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
    const k = +leaf.dataset.k!, a = parseFloat(leaf.style.getPropertyValue('--ang')) || 0;
    go(a > 90 ? k : k + 1);
  });
  refresh();
  return { update, refresh, go };
}
