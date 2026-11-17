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
    } else if (cs.display === 'grid' && cs.gridTemplateColumns.split(' ').length > 1 && !el.matches('.mw-book, .mw-cond, .tz-nav, .tz-cl2 > li, .tz-mi > li, .tz-opt > button, .tz-st')) {
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

// Panel como una app: encabezado con la vista actual y barra de pestañas inferior con iconos
const ICON = { grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>', doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg>', ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>' };
// Chat de Marea (celular): saludo, atajos, campo de texto y respuestas que se escriben solas
const REPLIES: [RegExp, string, string[]?][] = [
  [/venta|ingreso|vend/i, 'Esta semana llevas $48,320 en estancias, 12 % más que la anterior. La Casa de cristal lidera con 9 noches reservadas. Tienes 3 reservas por confirmar.', ['$48,320|Ventas de la semana', '9 noches|Casa de cristal']],
  [/factura|cobr|emit/i, 'Tienes 4 facturas por emitir por $23,700 en total. Puedo prepararlas ahora y enviarlas a cada huésped.', ['4 facturas|Por emitir', '$23,700|Total']],
  [/aviso|recordat|automat|whats/i, 'Puedo enviar un recordatorio 24 horas antes del check-in por WhatsApp y correo. Quedaría activo para las ocho estancias.', ['24 h|Antes del check-in']],
  [/ocupa|reserva|noche/i, 'La ocupación de octubre va en 78 %. Los fines de semana están casi llenos; el martes y el miércoles tienen lugar.', ['78 %|Ocupación de octubre']],
];
function buildChat(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>('.mv-inicio'); if (!host || host.querySelector('.obv-chat')) return;
  const g = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>';
  const c = document.createElement('div'); c.className = 'obv-chat';
  c.innerHTML = `<div class="oc-msgs"><div class="oc-hi"><i>${g}</i><h3>Bienvenida, Sofía.</h3><p>¿En qué te ayudo hoy?</p></div><div class="oc-sg">${['Resumen de ventas|Cómo van las estancias', 'Facturas por emitir|Pendientes de cobro', 'Automatizar avisos|Recordatorios a huéspedes'].map((x) => { const [t, d] = x.split('|'); return `<button type="button" data-q="${t}"><b>${t}</b><span>${d}</span></button>`; }).join('')}</div></div>
<form class="oc-in"><input type="text" placeholder="Pregunta algo o escribe una instrucción…" aria-label="Mensaje" /><button type="submit" aria-label="Enviar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button></form>`;
  host.appendChild(c);
  const msgs = c.querySelector<HTMLElement>('.oc-msgs')!, input = c.querySelector<HTMLInputElement>('input')!;
  const ask = (q: string) => {
    if (!q.trim()) return; c.classList.add('talk');
    const me = document.createElement('div'); me.className = 'oc-me'; me.textContent = q; msgs.appendChild(me);
    const bot = document.createElement('div'); bot.className = 'oc-bot'; bot.innerHTML = `<i>${g}</i><div><span class="oc-dots"><u></u><u></u><u></u></span></div>`; msgs.appendChild(bot);
    const hit = REPLIES.find(([re]) => re.test(q)); const text = hit ? hit[1] : 'Lo reviso y te aviso en unos segundos. Mientras tanto, puedo prepararte un resumen de ventas, facturas o avisos a huéspedes.';
    const box = bot.querySelector('div')!; input.value = '';
    setTimeout(() => {
      box.innerHTML = '<p></p>'; const p = box.querySelector('p')!; let n = 0;
      const t = setInterval(() => { p.textContent = text.slice(0, ++n); msgs.scrollTop = msgs.scrollHeight; if (n >= text.length) { clearInterval(t); (hit?.[2] || []).forEach((k) => { const [a, b] = k.split('|'); box.insertAdjacentHTML('beforeend', `<div class="oc-card"><b>${a}</b><span>${b}</span></div>`); }); const st = c.closest<HTMLElement>('.obv-st'); if (st) st.scrollTop = st.scrollHeight; } }, 16);
    }, 900);
    const st = c.closest<HTMLElement>('.obv-st'); if (st) requestAnimationFrame(() => (st.scrollTop = st.scrollHeight));
  };
  c.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-q]'); if (b) ask(b.dataset.q!); });
  c.querySelector('form')!.addEventListener('submit', (e) => { e.preventDefault(); ask(input.value); });
}

function dashBar(stage: HTMLElement, w: HTMLElement, brand: string) {
  const root = w.querySelector<HTMLElement>('.pg'); if (!root) return;
  type It = { el: HTMLElement; label: string; icon: string; on: () => boolean };
  let items: It[] = [];
  if (root.classList.contains('mr-dash')) items = [...root.querySelectorAll<HTMLElement>('.md-side li')].map((el) => ({ el, label: el.querySelector('span')?.textContent || '', icon: el.querySelector('svg')?.outerHTML || '', on: () => el.classList.contains('on') }));
  else if (root.classList.contains('tz-dash')) items = [...root.querySelectorAll<HTMLElement>('.td-s button')].map((el) => ({ el, label: (el.textContent || '').trim(), icon: el.querySelector('svg')?.outerHTML || '', on: () => root.dataset.v === el.dataset.v }));
  else if (root.classList.contains('ab-dash')) items = [...root.querySelectorAll<HTMLElement>('header nav button')].map((el, i) => ({ el, label: (el.textContent || '').trim(), icon: [ICON.grid, ICON.doc, ICON.ok][i] || '', on: () => root.dataset.v === el.dataset.k }));
  const kind = root.classList.contains('mr-dash') ? 'marea' : root.classList.contains('tz-dash') ? 'trama' : root.classList.contains('ab-dash') ? 'abaco' : 'hikari';
  w.dataset.app = kind; stage.dataset.app = kind;
  // el chat va primero
  if (kind === 'trama') { const i = items.findIndex((it) => /asistente/i.test(it.label)); if (i > 0) items.unshift(items.splice(i, 1)[0]); items[0]?.el.click(); }
  if (kind === 'marea') { if (items[0]) items[0].label = 'Asistente'; buildChat(root); }
  const head = document.createElement('div'); head.className = 'obv-ah';
  head.innerHTML = `<div><small>${brand}</small><b></b></div><i>${brand[0]}</i>`;
  w.prepend(head);
  if (!items.length) { head.querySelector('b')!.textContent = 'Panel'; return; }
  const bar = document.createElement('nav'); bar.className = 'obv-app ic';
  items.forEach((it) => { const t = document.createElement('button'); t.type = 'button'; t.innerHTML = `${it.icon}<span>${it.label}</span>`; t.addEventListener('click', () => { it.el.click(); stage.scrollTop = 0; }); bar.appendChild(t); });
  stage.appendChild(bar);
  const sync = () => { const k = Math.max(0, items.findIndex((it) => it.on())); bar.querySelectorAll<HTMLElement>('button').forEach((b, i) => b.classList.toggle('on', i === k)); head.querySelector('b')!.textContent = items[k].label; const act = bar.querySelectorAll<HTMLElement>('button')[k]; act?.scrollIntoView({ inline: 'center', block: 'nearest' }); };
  sync(); new MutationObserver(sync).observe(root, { attributes: true, subtree: true, attributeFilter: ['class', 'data-v', 'data-view'] });
}

// Menú del sitio: icono de hamburguesa en su barra; abre una pantalla completa con los enlaces en grande (cada sitio con su estilo)
function siteMenu(stage: HTMLElement, root: HTMLElement, brand: string) {
  const nav = root.querySelector<HTMLElement>('.mw-nav, .tz-nav, .au-nav, .ab-nav');
  if (!nav) return;
  const kind = root.classList.contains('tz-web') ? 'trama' : root.classList.contains('au-web') ? 'hikari' : root.classList.contains('ab-web') ? 'abaco' : 'marea';
  const src = [...nav.querySelectorAll<HTMLElement>('nav button[data-int="wtab"]')];
  const home = nav.querySelector<HTMLElement>('[data-int="wtab"][data-t="inicio"]');
  type It = { label: string; run: () => void; t?: string; cta?: boolean };
  const items: It[] = [...(home ? [home] : []), ...src].map((b) => ({ label: b === home ? 'Inicio' : (b.textContent || '').trim(), t: b.dataset.t, run: () => b.click() }));
  if (kind === 'marea') { const c = nav.querySelector<HTMLElement>('.wn-cta'); if (c) items.push({ label: 'Reservar', run: () => c.click(), cta: true }); }
  if (kind === 'trama') { const c = root.querySelector<HTMLElement>('[data-int="tcart"]'); if (c) items.push({ label: 'Mi carrito', run: () => c.click(), cta: true }); }
  const foot: Record<string, string> = { marea: 'Check-in 15:00 · hola@marea.example', trama: 'Envío gratis desde $1,200 · Cambios en 30 días', hikari: 'hola@hikari.example · Ciudad de México', abaco: 'hola@abaco.example · Lun a vie, 9 a 18' };
  const hb = document.createElement('button'); hb.type = 'button'; hb.className = 'obv-hb'; hb.setAttribute('aria-label', 'Abrir menú'); hb.innerHTML = '<i></i><i></i><i></i>';
  nav.appendChild(hb); nav.classList.add('obv-nav');
  const menu = document.createElement('div'); menu.className = 'obv-menu'; menu.dataset.k = kind;
  menu.innerHTML = `<div class="obv-mt"><span>${brand}</span><button type="button" class="obv-mx" aria-label="Cerrar menú"><i></i><i></i></button></div>
<ol>${items.map((it, i) => `<li${it.cta ? ' class="cta"' : ''}><button type="button" data-i="${i}"><em>${String(i + 1).padStart(2, '0')}</em><b>${it.label}</b><u></u></button></li>`).join('')}</ol>
<p class="obv-mf">${foot[kind]}</p><div class="obv-mg" aria-hidden="true"><s></s><s></s><s></s></div>`;
  stage.appendChild(menu);
  const open = () => { const r = hb.getBoundingClientRect(), sr = stage.getBoundingClientRect(); menu.style.setProperty('--mx', `${r.left + r.width / 2 - sr.left}px`); menu.style.setProperty('--my', `${r.top + r.height / 2 - sr.top}px`); menu.classList.add('on'); };
  const shut = () => menu.classList.remove('on');
  hb.addEventListener('click', open); menu.querySelector('.obv-mx')!.addEventListener('click', shut);
  menu.querySelectorAll<HTMLElement>('ol button').forEach((b) => b.addEventListener('click', () => { const it = items[+b.dataset.i!]; shut(); setTimeout(() => it.run(), 250); }));
  const sync = () => menu.querySelectorAll<HTMLElement>('ol button').forEach((b) => b.classList.toggle('now', items[+b.dataset.i!].t === (root.dataset.tab || 'inicio')));
  sync(); new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-tab'] });
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
      dashBar(stage, w, (o.querySelector('.obv-bar b')?.textContent || '').trim());
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
    siteMenu(stage, root, (o.querySelector('.obv-bar b')?.textContent || '').trim());
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
