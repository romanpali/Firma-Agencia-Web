// Obra en celular: «Ver más a fondo» abre el proyecto en una pantalla propia (como «Arma tu proyecto»).
// Abajo, una barra con las piezas (identidad, proyecto, sitio web, panel); el sitio web se recorre completo deslizando.
let ov: HTMLElement | null = null;

// Adapta el sitio (hecho para una página ancha) a la pantalla del celular: las rejillas pasan a pocas columnas y las filas se parten.
function adapt(root: HTMLElement) {
  const px = (v: string) => parseFloat(v) || 0;
  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    if (el.closest('svg')) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'grid' && cs.gridTemplateColumns.split(' ').length > 1 && !el.matches('.mw-book, .mw-cond, .tz-nav')) {
      const short = el.children.length >= 4 && [...el.children].every((c) => (c.textContent || '').length < 70);
      el.style.gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${short ? 7.5 : 11.5}em), 1fr))`; el.style.gridTemplateRows = 'none';
      [...el.children].forEach((c) => { (c as HTMLElement).style.gridColumn = 'auto'; (c as HTMLElement).style.gridRow = 'auto'; });
    } else if (cs.display === 'flex' && cs.flexDirection === 'row' && cs.animationName === 'none' && el.scrollWidth > el.clientWidth + 2) el.style.flexWrap = 'wrap';
    // márgenes laterales de página ancha: se reducen
    if (px(cs.paddingLeft) > 26) el.style.paddingLeft = '18px';
    if (px(cs.paddingRight) > 26) el.style.paddingRight = '18px';
    if (cs.position !== 'absolute') { if (px(cs.marginLeft) > 26) el.style.marginLeft = '18px'; if (px(cs.marginRight) > 26) el.style.marginRight = '18px'; }
  });
}
function close() {
  if (!ov) return;
  const o = ov; ov = null; o.classList.remove('on');
  document.documentElement.style.overflow = '';
  setTimeout(() => o.remove(), 450);
}

function show(o: HTMLElement, pieces: { t: string; el: HTMLElement; site: boolean }[], k: number) {
  const stage = o.querySelector<HTMLElement>('.obv-st')!;
  stage.innerHTML = ''; stage.dataset.site = pieces[k].site ? '1' : '';
  const node = pieces[k].el.cloneNode(true) as HTMLElement;
  node.querySelectorAll<HTMLElement>('[data-ready], [data-tready]').forEach((e) => { delete e.dataset.ready; delete e.dataset.tready; });
  delete node.dataset.ready; delete node.dataset.tready;
  if (pieces[k].site) {
    stage.appendChild(node); node.classList.add('live');
    stage.style.fontSize = '17px';
  } else {
    const w = document.createElement('div'); w.className = 'obv-pg live';
    const fit = (innerWidth - 24) / 40, zoom = /panel/i.test(pieces[k].t), fs = zoom ? Math.max(15, fit) : fit; w.style.fontSize = `${fs}px`;
    w.appendChild(node); stage.appendChild(w);
    const hint = document.createElement('p'); hint.className = 'obv-hint'; hint.textContent = fs > fit + 0.5 ? 'Desliza hacia los lados para ver todo' : '';
    stage.appendChild(hint);
  }
  stage.scrollTop = 0; stage.scrollLeft = 0;
  o.querySelectorAll<HTMLElement>('.obv-tb button').forEach((b, i) => b.classList.toggle('on', i === k));
  o.querySelector<HTMLElement>('.obv-tt')!.textContent = pieces[k].t;
  dispatchEvent(new Event('mw-boot'));
  if (pieces[k].site) {
    const root = node.classList.contains('mr-web') ? node : node.querySelector<HTMLElement>('.mr-web')!;
    const run = () => requestAnimationFrame(() => adapt(root));
    run(); new MutationObserver(run).observe(root, { attributes: true, attributeFilter: ['data-tab'] });
  }
  requestAnimationFrame(() => stage.querySelectorAll('.rv').forEach((e) => e.classList.remove('in')));
}

function open(i: number) {
  if (ov) return;
  const card = document.getElementById(`obra-${i + 1}`)!;
  const name = card.querySelector('.obm-name')?.textContent?.split(' · ')[0] || '';
  const pieces = [...card.querySelectorAll<HTMLElement>('.obm-pc')].map((f) => {
    const el = f.querySelector<HTMLElement>('.obm-pg > *')!;
    return { t: f.querySelector(':scope > figcaption')!.textContent || '', el, site: !!el.querySelector('.mw-scroll') || el.classList.contains('mr-web') };
  });
  const first = Math.max(0, pieces.findIndex((p) => p.site));
  const o = document.createElement('div');
  o.className = 'obv'; o.dataset.th = String(i);
  o.innerHTML = `<header class="obv-bar"><button type="button" class="obv-back" aria-label="Volver"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><div><b>${name}</b><small class="obv-tt"></small></div><em>0${i + 1} / 05</em></header>
<div class="obv-st"></div>
<nav class="obv-tb">${pieces.map((p) => `<button type="button">${p.t}</button>`).join('')}</nav>
<i class="obv-ln"></i>`;
  document.body.appendChild(o);
  document.documentElement.style.overflow = 'hidden';
  show(o, pieces, first);
  o.querySelectorAll<HTMLElement>('.obv-tb button').forEach((b, k) => b.addEventListener('click', () => show(o, pieces, k)));
  o.querySelector('.obv-back')!.addEventListener('click', close);
  addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); removeEventListener('keydown', esc); } });
  ov = o; requestAnimationFrame(() => requestAnimationFrame(() => o.classList.add('on')));
}

document.addEventListener('click', (ev) => {
  const b = (ev.target as HTMLElement).closest<HTMLElement>('[data-obm-open]');
  if (b && !b.closest('.obv')) { ev.preventDefault(); open(+b.dataset.obmOpen!); }
});
