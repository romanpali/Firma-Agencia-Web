// Obra en celular: «Ver más a fondo» abre el proyecto en una pantalla propia (como «Arma tu proyecto»).
// Abajo, una barra con las piezas (identidad, proyecto, sitio web, panel); el sitio web se recorre completo deslizando.
let ov: HTMLElement | null = null;

// Adapta el sitio (hecho para una página ancha) a la pantalla del celular: las rejillas pasan a pocas columnas y las filas se parten.
const CAROUSEL = '.ab-svc, .ab-cs, .ab-tl, .ab-prin, .ab-team, .au-svc, .au-cs, .au-steps, .au-prin, .au-team, .wrev';
function adapt(root: HTMLElement) {
  const px = (v: string) => parseFloat(v) || 0;
  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    if (el.closest('svg') || el.closest('.obv-app')) return;
    const cs = getComputedStyle(el);
    if (el.matches(CAROUSEL)) {
      // fila de tarjetas: carrusel horizontal con imán, como en una app
      Object.assign(el.style, { display: 'grid', gridTemplateColumns: 'none', gridAutoFlow: 'column', gridAutoColumns: '78%', gap: '14px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', paddingBottom: '6px' });
      [...el.children].forEach((c) => { (c as HTMLElement).style.scrollSnapAlign = 'start'; });
    } else if (cs.display === 'grid' && cs.gridTemplateColumns.split(' ').length > 1 && !el.matches('.mw-book, .mw-cond, .tz-nav')) {
      const short = el.querySelector(':scope > .tz-p') !== null || (el.children.length >= 4 && [...el.children].every((c) => (c.textContent || '').length < 70));
      el.style.gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${short ? 7.5 : 11.5}em), 1fr))`; el.style.gridTemplateRows = 'none';
      [...el.children].forEach((c) => { (c as HTMLElement).style.gridColumn = 'auto'; (c as HTMLElement).style.gridRow = 'auto'; });
    } else if (cs.display === 'flex' && cs.flexDirection === 'row' && cs.animationName === 'none' && el.scrollWidth > el.clientWidth + 2) el.style.flexWrap = 'wrap';
    // márgenes y aire de página ancha: se reducen
    if (px(cs.paddingLeft) > 26) el.style.paddingLeft = '20px';
    if (px(cs.paddingRight) > 26) el.style.paddingRight = '20px';
    if (px(cs.paddingTop) > 70) el.style.paddingTop = '46px';
    if (px(cs.paddingBottom) > 70) el.style.paddingBottom = '46px';
    if (cs.position !== 'absolute') {
      if (px(cs.marginLeft) > 26) el.style.marginLeft = '20px'; if (px(cs.marginRight) > 26) el.style.marginRight = '20px';
      if (px(cs.marginTop) > 70) el.style.marginTop = '46px';
    }
    // texto legible en pantalla chica
    const fs = px(cs.fontSize);
    if (fs > 0 && fs < 11.5 && el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && (n.textContent || '').trim())) el.style.fontSize = '11.5px';
    else if (fs > 46 && !el.closest('.ab-big, .wf-big, .au-big')) el.style.fontSize = '40px';
  });
}

// Barra de pestañas inferior (como una app): replica los botones del menú del sitio
function appBar(stage: HTMLElement, root: HTMLElement) {
  const nav = root.querySelector<HTMLElement>('.mw-nav, .tz-nav, .au-nav, .ab-nav');
  if (!nav) return;
  const src = [...nav.querySelectorAll<HTMLElement>('nav button[data-int="wtab"]')];
  const home = nav.querySelector<HTMLElement>('[data-int="wtab"][data-t="inicio"]');
  const all = [...(home ? [home] : []), ...src];
  const bar = document.createElement('nav'); bar.className = 'obv-app';
  all.forEach((b) => {
    const t = document.createElement('button'); t.type = 'button'; t.dataset.t = b.dataset.t!;
    t.textContent = b === home ? 'Inicio' : (b.textContent || '').trim();
    t.addEventListener('click', () => { b.click(); });
    bar.appendChild(t);
  });
  stage.appendChild(bar);
  const sync = () => bar.querySelectorAll<HTMLElement>('button').forEach((x) => x.classList.toggle('on', x.dataset.t === (root.dataset.tab || 'inicio')));
  sync(); new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-tab'] });
  nav.classList.add('obv-nav');
}
function close() {
  if (!ov) return;
  const o = ov; ov = null; o.classList.remove('on');
  document.documentElement.style.overflow = '';
  setTimeout(() => o.remove(), 450);
}

function show(o: HTMLElement, pieces: { t: string; el: HTMLElement; site: boolean }[], k: number) {
  const stage = o.querySelector<HTMLElement>('.obv-st')!;
  stage.innerHTML = ''; stage.dataset.site = pieces[k].site ? '1' : ''; stage.dataset.dash = '';
  const node = pieces[k].el.cloneNode(true) as HTMLElement;
  node.querySelectorAll<HTMLElement>('[data-ready], [data-tready]').forEach((e) => { delete e.dataset.ready; delete e.dataset.tready; });
  delete node.dataset.ready; delete node.dataset.tready;
  if (pieces[k].site) {
    stage.appendChild(node); node.classList.add('live');
    stage.style.fontSize = '19px';
  } else {
    const zoom = /panel/i.test(pieces[k].t);
    const w = document.createElement('div');
    if (zoom) {
      // panel: diseño móvil (una columna, a todo el ancho, se desliza hacia abajo)
      stage.dataset.dash = '1'; w.className = 'obv-dashw live'; w.style.fontSize = '16px';
      w.appendChild(node); stage.appendChild(w);
      requestAnimationFrame(() => adapt(w));
    } else {
      stage.dataset.dash = ''; w.className = 'obv-pg live';
      const fit = (innerWidth - 24) / 40; w.style.fontSize = `${fit}px`;
      w.appendChild(node); stage.appendChild(w);
    }
  }
  stage.scrollTop = 0; stage.scrollLeft = 0;
  o.querySelectorAll<HTMLElement>('.obv-tb button').forEach((b, i) => b.classList.toggle('on', i === k));
  o.querySelector<HTMLElement>('.obv-tt')!.textContent = pieces[k].t;
  dispatchEvent(new Event('mw-boot'));
  if (pieces[k].site) {
    const root = node.classList.contains('mr-web') ? node : node.querySelector<HTMLElement>('.mr-web')!;
    const run = () => requestAnimationFrame(() => adapt(root));
    run(); new MutationObserver(run).observe(root, { attributes: true, attributeFilter: ['data-tab'] });
    appBar(stage, root);
  }
  requestAnimationFrame(() => stage.querySelectorAll('.rv').forEach((e) => e.classList.remove('in')));
}

const card = (i: number) => document.querySelector<HTMLElement>(`.obs-card[data-i="${i}"]`)!;
const origin = (o: HTMLElement, x: number, y: number) => { o.style.setProperty('--ox', `${x}px`); o.style.setProperty('--oy', `${y}px`); };
const wire = (o: HTMLElement) => {
  o.querySelector('.obv-back')!.addEventListener('click', close);
  addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); removeEventListener('keydown', esc); } });
  ov = o; requestAnimationFrame(() => requestAnimationFrame(() => o.classList.add('on')));
};
const bar = (i: number, name: string, sub: string) => `<header class="obv-bar"><button type="button" class="obv-back" aria-label="Volver"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><div><b>${name}</b><small class="obv-tt">${sub}</small></div><em>0${i + 1} / 0${document.querySelectorAll('.obs-card').length}</em></header>`;

function detail(c: HTMLElement, i: number, x: number, y: number) {
  const o = document.createElement('div');
  o.className = 'obv obv-dt'; o.dataset.th = c.dataset.th!; origin(o, x, y);
  const tags = (c.dataset.tags || '').split('|').map((t) => `<li>${t}</li>`).join('');
  o.innerHTML = `${bar(i, c.dataset.n!, c.dataset.cat!)}<div class="obv-st obv-dtb"><div class="obv-hero"><img src="${c.dataset.img}" alt="" /></div><div class="obv-tx"><h3>${c.dataset.hl}</h3><p>${c.dataset.d}</p><ul>${tags}</ul><a class="obv-cta" href="/contacto">Quiero algo así</a></div></div>`;
  document.body.appendChild(o); document.documentElement.style.overflow = 'hidden'; wire(o);
}

export function openProject(i: number, x = innerWidth / 2, y = innerHeight * 0.55) {
  if (ov) return;
  const c = card(i), tpl = document.querySelector<HTMLTemplateElement>(`template[data-p="${i}"]`)!;
  const pieces = [...tpl.content.querySelectorAll<HTMLElement>('.obm-pc')].map((f) => {
    const el = f.querySelector<HTMLElement>('.obm-pg > *')!;
    return { t: f.querySelector(':scope > figcaption')!.textContent || '', el, site: !!el.querySelector('.mw-scroll') || el.classList.contains('mr-web') };
  });
  if (!pieces.length) { detail(c, i, x, y); return; }
  const first = Math.max(0, pieces.findIndex((p) => p.site));
  const o = document.createElement('div');
  o.className = 'obv'; o.dataset.th = c.dataset.th!; origin(o, x, y);
  o.innerHTML = `${bar(i, c.dataset.n!, '')}<div class="obv-st"></div><nav class="obv-tb">${pieces.map((p) => `<button type="button">${p.t}</button>`).join('')}</nav>`;
  document.body.appendChild(o);
  document.documentElement.style.overflow = 'hidden';
  show(o, pieces, first);
  o.querySelectorAll<HTMLElement>('.obv-tb button').forEach((b, k) => b.addEventListener('click', () => show(o, pieces, k)));
  wire(o);
}
