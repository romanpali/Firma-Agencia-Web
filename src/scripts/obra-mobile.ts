// Obra en celular: «Ver más a fondo» abre el proyecto en una pantalla propia (como «Arma tu proyecto»).
// Abajo, una barra con las piezas (identidad, proyecto, sitio web, panel); el sitio web se recorre completo deslizando.
let ov: HTMLElement | null = null;

// Adapta el sitio (hecho para una página ancha) a la pantalla del celular: las rejillas pasan a pocas columnas y las filas se parten.
const CAROUSEL = '.ab-svc, .ab-cs, .ab-tl, .ab-prin, .ab-team, .au-svc, .au-cs, .au-steps, .au-prin, .au-team, .wrev';
function adapt(root: HTMLElement) {
  const px = (v: string) => parseFloat(v) || 0;
  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    if (el.closest('svg') || el.closest('.obv-app') || el.closest('.obv-chat') || el.closest('.mr-dash')) return;
    const cs = getComputedStyle(el);
    if (el.matches(CAROUSEL)) {
      // fila de tarjetas: carrusel horizontal con imán, como en una app
      Object.assign(el.style, { display: 'grid', gridTemplateColumns: 'none', gridAutoFlow: 'column', gridAutoColumns: '78%', gap: '14px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', paddingBottom: '6px' });
      [...el.children].forEach((c) => { (c as HTMLElement).style.scrollSnapAlign = 'start'; });
    } else if (cs.display === 'grid' && cs.gridTemplateColumns.split(' ').length > 1 && !el.matches('.mw-book, .mw-cond, .tz-nav, .tz-cl2 > li, .tz-mi > li, .tz-opt > button, .tz-st, .td-inv li, .td-inv')) {
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

// Identidad: la portada vertical del proyecto a pantalla completa
function idScreen(stage: HTMLElement, o: HTMLElement) {
  const n = o.dataset.name || '', img = o.dataset.img || '', hl = o.dataset.hl || '';
  const own = /hikari|ábaco|abaco/i.test(n); // esas portadas ya traen su nombre y su texto
  stage.innerHTML = `<div class="idv"><img class="idv-i" src="${img}" alt="" /><i class="idv-s"></i>${own ? '' : `<div class="idv-t"><span>Manual de marca</span><span>Made by <b>HumanCorp</b></span></div><div class="idv-w"><b>${n.split(' ')[0].toLowerCase()}</b><span>${hl}</span></div>`}</div>`;
}

// Proyecto: «Lo que se hizo» como lista de entregables, a pantalla completa
function prScreen(stage: HTMLElement, o: HTMLElement, el: HTMLElement) {
  const rows = [...el.querySelectorAll<HTMLElement>('.pc-r li')].map((li) => ({ n: li.querySelector('em')?.textContent || '', t: li.querySelector('b')?.textContent || '', d: li.querySelector('span')?.textContent || '' }));
  const title = el.querySelector('.pc-l h4')?.textContent || 'Lo que se hizo', count = el.querySelector('.pc-l p')?.textContent || '', foot = el.querySelector('.pc-f')?.textContent || '';
  stage.innerHTML = `<div class="prv"><i class="prv-b"></i><p class="prv-k"><span>Proyecto</span><em>${o.dataset.name || ''}</em></p><h2>${title}</h2><p class="prv-c">${count}</p>
<ol>${rows.map((r, i) => `<li style="--i:${i}"><em>${r.n}</em><div><b>${r.t}</b><span>${r.d}</span></div><u></u></li>`).join('')}</ol><p class="prv-f">${foot}</p></div>`;
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
  const G = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>';
  const ic = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const I = { chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>', bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', img: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-8 9"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/>', clip: '<path d="M20 11 12 19a5 5 0 0 1-7-7l8-8a3.3 3.3 0 0 1 5 5l-8 8a1.7 1.7 0 0 1-2.5-2.5L15 7"/>' };
  const sug: [string, string][] = [['Resumen de ventas de la semana', I.chart], ['Facturas por emitir', I.doc], ['Automatizar avisos a huéspedes', I.bolt], ['Ocupación de octubre', I.cal]];
  const TOOLS: [string, string, string][] = [['Crear imagen', I.img, 'Genera una imagen para tus redes'], ['Investigar', I.search, 'Busca y resume información'], ['Escribir un informe', I.pen, 'Redacta un resumen con tus datos'], ['Analizar un archivo', I.clip, 'Sube una foto o documento y pregunta']];
  const c = document.createElement('div'); c.className = 'obv-chat';
  c.innerHTML = `<div class="oc-msgs"><div class="oc-hi"><h3><span>Hola, Sofía</span></h3><p>¿Por dónde empezamos?</p></div>
<div class="oc-sg">${sug.map(([t, d]) => `<button type="button" data-q="${t}"><b>${t}</b><i>${ic(d)}</i></button>`).join('')}</div></div>
<form class="oc-in"><div class="oc-ch"></div><input type="text" placeholder="Pregúntale a Marea IA" aria-label="Mensaje" />
<div class="oc-bar"><button type="button" class="oc-pl" aria-label="Subir imágenes">${ic('<path d="M12 5v14M5 12h14"/>')}</button><button type="button" class="oc-tool">${ic('<path d="M4 6h16M4 12h10M4 18h6"/>')}Herramientas</button><i></i><button type="button" class="oc-mic" aria-label="Voz">${ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>')}</button><button type="submit" class="oc-go" aria-label="Enviar">${ic('<path d="M12 19V5M5 12l7-7 7 7"/>')}</button></div>
<input type="file" accept="image/*" multiple hidden class="oc-file" />
<div class="oc-menu"><p>Herramientas</p>${TOOLS.map(([t, d, h], i) => `<button type="button" data-t="${i}">${ic(d)}<span><b>${t}</b><small>${h}</small></span></button>`).join('')}</div></form>
<p class="oc-fine">Marea IA puede equivocarse. Respuestas de ejemplo.</p>`;
  host.appendChild(c);
  const msgs = c.querySelector<HTMLElement>('.oc-msgs')!, input = c.querySelector<HTMLInputElement>('input[type=text]')!, form = c.querySelector<HTMLElement>('.oc-in')!;
  const file = c.querySelector<HTMLInputElement>('.oc-file')!, chips = c.querySelector<HTMLElement>('.oc-ch')!, menu = c.querySelector<HTMLElement>('.oc-menu')!;
  let imgs: string[] = [], tool = '';
  const draw = () => {
    chips.innerHTML = (tool ? `<span class="oc-tg">${tool}<u data-x="t">×</u></span>` : '') + imgs.map((u, i) => `<span class="oc-th"><img src="${u}" alt="" /><u data-x="${i}">×</u></span>`).join('');
    form.classList.toggle('has', !!(tool || imgs.length));
  };
  c.querySelector('.oc-pl')!.addEventListener('click', () => { menu.classList.remove('on'); file.click(); });
  file.addEventListener('change', () => { [...(file.files || [])].slice(0, 4 - imgs.length).forEach((f) => imgs.push(URL.createObjectURL(f))); file.value = ''; draw(); });
  c.querySelector('.oc-tool')!.addEventListener('click', () => menu.classList.toggle('on'));
  menu.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-t]'); if (!b) return; tool = TOOLS[+b.dataset.t!][0]; menu.classList.remove('on'); if (/imagen|archivo/i.test(tool) && !imgs.length) file.click(); draw(); input.focus(); });
  chips.addEventListener('click', (e) => { const x = (e.target as HTMLElement).closest<HTMLElement>('[data-x]'); if (!x) return; if (x.dataset.x === 't') tool = ''; else imgs.splice(+x.dataset.x!, 1); draw(); });
  const ask = (q: string) => {
    if (!q.trim() && !imgs.length) return; c.classList.add('talk'); menu.classList.remove('on');
    const used = tool, pics = imgs.slice(); imgs = []; tool = ''; draw();
    const me = document.createElement('div'); me.className = 'oc-me';
    me.innerHTML = `${pics.length ? `<div class="oc-ph">${pics.map((u) => `<img src="${u}" alt="" />`).join('')}</div>` : ''}${used ? `<small>${used}</small>` : ''}${q ? `<span></span>` : ''}`;
    if (q) me.querySelector('span')!.textContent = q;
    msgs.appendChild(me);
    const bot = document.createElement('div'); bot.className = 'oc-bot'; bot.innerHTML = `<i>${G}</i><div><span class="oc-dots"><u></u><u></u><u></u></span></div>`; msgs.appendChild(bot);
    const hit = REPLIES.find(([re]) => re.test(q));
    const text = pics.length ? `Recibí ${pics.length === 1 ? 'tu imagen' : `tus ${pics.length} imágenes`}. ${used === 'Crear imagen' ? 'Puedo usarla como referencia para crear una versión nueva para tus redes. ¿Qué estilo prefieres?' : 'Se ve una buena base para una publicación de Marea: luz cálida y mucho espacio. ¿Quieres que prepare un texto y un horario para publicarla?'}` : used === 'Investigar' ? 'Lo investigo y te resumo lo más importante en un momento. Mientras tanto: el mejor horario para publicar en Valle de Bravo es entre 7 y 9 pm.' : used === 'Escribir un informe' ? 'Listo el borrador: ventas de la semana $48,320, ocupación 78 % y 3 reservas por confirmar. ¿Lo envío por correo?' : hit ? hit[1] : 'Lo reviso y te aviso en unos segundos. Mientras tanto, puedo prepararte un resumen de ventas, facturas o avisos a huéspedes.';
    const box = bot.querySelector('div')!; input.value = '';
    setTimeout(() => {
      box.innerHTML = '<p></p>'; const p = box.querySelector('p')!; let n = 0;
      const t = setInterval(() => { p.textContent = text.slice(0, ++n); const st = c.closest<HTMLElement>('.obv-st'); if (st) st.scrollTop = st.scrollHeight; if (n >= text.length) { clearInterval(t); box.insertAdjacentHTML('beforeend', '<div class="oc-act"><i></i><i></i><i></i><i></i></div>'); (!pics.length && !used && hit?.[2] || []).forEach((k) => { const [a, b] = k.split('|'); box.insertAdjacentHTML('beforeend', `<div class="oc-card"><b>${a}</b><span>${b}</span></div>`); }); if (st) st.scrollTop = st.scrollHeight; } }, 16);
    }, 900);
    const st = c.closest<HTMLElement>('.obv-st'); if (st) requestAnimationFrame(() => (st.scrollTop = st.scrollHeight));
  };
  c.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-q]'); if (b) ask(b.dataset.q!); });
  form.addEventListener('submit', (e) => { e.preventDefault(); ask(input.value); });
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
  head.innerHTML = `<div><small>${brand}</small><b></b></div><button type="button" class="obv-av" aria-label="Perfil y configuración">${brand[0]}</button>`;
  w.prepend(head);
  if (!items.length) { head.querySelector('b')!.textContent = 'Panel'; return; }
  const MAIN = items.length > 5 ? 4 : items.length, main = items.slice(0, MAIN), rest = items.slice(MAIN);
  const bar = document.createElement('nav'); bar.className = 'obv-app ic';
  const mk = (icon: string, label: string, fn: () => void) => { const t = document.createElement('button'); t.type = 'button'; t.innerHTML = `<i>${icon}</i><span>${label}</span>`; t.addEventListener('click', fn); bar.appendChild(t); return t; };
  main.forEach((it) => mk(it.icon, it.label, () => { it.el.click(); stage.scrollTop = 0; }));
  const MORE = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>';
  const sheet = profileSheet(stage, kind, brand, rest.map((it) => ({ icon: it.icon, label: it.label, go: () => { it.el.click(); stage.scrollTop = 0; } })));
  if (rest.length) mk(MORE, 'Más', () => sheet.open());
  head.querySelector('.obv-av')!.addEventListener('click', () => sheet.open());
  stage.appendChild(bar);
  const btns = [...bar.querySelectorAll<HTMLElement>('button')];
  const sync = () => {
    const k = items.findIndex((it) => it.on()), inMain = k >= 0 && k < MAIN;
    btns.forEach((b, i) => b.classList.toggle('on', inMain ? i === k : rest.length > 0 && i === MAIN));
    head.querySelector('b')!.textContent = items[Math.max(0, k)].label;
  };
  sync(); new MutationObserver(sync).observe(root, { attributes: true, subtree: true, attributeFilter: ['class', 'data-v', 'data-view'] });
}

// Hoja de perfil: secciones que no caben en la barra, cuenta y ajustes (de ejemplo)
function profileSheet(stage: HTMLElement, kind: string, brand: string, rest: { icon: string; label: string; go: () => void }[]) {
  const names: Record<string, [string, string]> = { marea: ['Sofía Reyes', 'Administradora'], trama: ['Sofía Reyes', 'Dueña de la tienda'], abaco: ['Valeria Rojas', 'Dirección de operaciones'], hikari: ['Aiko Mora', 'Dirección del estudio'] };
  const [nm, role] = names[kind] || names.marea;
  const I = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const acct: [string, string][] = [['Mi perfil', I('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>')], ['Notificaciones', I('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>')], ['Equipo y permisos', I('<circle cx="9" cy="8" r="3.5"/><path d="M2 20c.8-3.4 3.4-5 7-5s6.2 1.6 7 5M17 4.5a3.5 3.5 0 0 1 0 7M22 20c-.4-2.4-1.6-4-3.6-4.8"/>')], ['Ayuda', I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>')]];
  const el = document.createElement('div'); el.className = 'obv-sh'; el.dataset.app = kind;
  el.innerHTML = `<i class="obv-sh-bg"></i><div class="obv-sh-p"><i class="obv-sh-g"></i>
<div class="obv-sh-h"><b class="obv-sh-a">${nm[0]}</b><div><strong>${nm}</strong><span>${role} · ${brand}</span></div></div>
${rest.length ? `<p class="obv-sh-t">Secciones</p><ul class="obv-sh-l">${rest.map((r, i) => `<li><button type="button" data-s="${i}">${r.icon}<span>${r.label}</span><u>›</u></button></li>`).join('')}</ul>` : ''}
<p class="obv-sh-t">Cuenta</p><ul class="obv-sh-l">${acct.map(([t, ic]) => `<li><button type="button">${ic}<span>${t}</span><u>›</u></button></li>`).join('')}</ul>
<p class="obv-sh-t">Configuración</p><ul class="obv-sh-l sw">${['Avisos en el teléfono', 'Resumen diario por correo', 'Modo compacto'].map((t, i) => `<li><button type="button" class="tg${i < 2 ? ' on' : ''}"><span>${t}</span><u><b></b></u></button></li>`).join('')}</ul>
<button type="button" class="obv-sh-out">Cerrar sesión</button><p class="obv-sh-f">Demostración · no se guarda nada</p></div>`;
  stage.appendChild(el);
  const open = () => el.classList.add('on'), shut = () => el.classList.remove('on');
  el.querySelector('.obv-sh-bg')!.addEventListener('click', shut); el.querySelector('.obv-sh-g')!.addEventListener('click', shut);
  el.querySelectorAll<HTMLElement>('[data-s]').forEach((b) => b.addEventListener('click', () => { shut(); setTimeout(() => rest[+b.dataset.s!].go(), 200); }));
  el.querySelectorAll<HTMLElement>('.tg').forEach((b) => b.addEventListener('click', () => b.classList.toggle('on')));
  el.querySelector('.obv-sh-out')!.addEventListener('click', shut);
  return { open };
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

function show(o: HTMLElement, pieces: { t: string; dash?: boolean; el: HTMLElement; site: boolean }[], k: number) {
  const stage = o.querySelector<HTMLElement>('.obv-st')!;
  stage.innerHTML = ''; stage.removeAttribute('data-scr'); stage.removeAttribute('data-site'); stage.removeAttribute('data-dash'); stage.removeAttribute('data-app'); if (pieces[k].site) stage.dataset.site = '1';
  const node = pieces[k].el.cloneNode(true) as HTMLElement;
  node.querySelectorAll<HTMLElement>('[data-ready], [data-tready]').forEach((e) => { delete e.dataset.ready; delete e.dataset.tready; });
  delete node.dataset.ready; delete node.dataset.tready;
  if (pieces[k].site) {
    stage.appendChild(node); node.classList.add('live');
    stage.style.fontSize = '19px';
  } else {
    const zoom = !!pieces[k].dash;
    const w = document.createElement('div');
    if (pieces[k].t === 'Identidad') { stage.dataset.scr = 'id'; idScreen(stage, o); }
    else if (pieces[k].t === 'Proyecto') { stage.dataset.scr = 'pr'; prScreen(stage, o, pieces[k].el); }
    else if (zoom) {
      // panel: diseño móvil (una columna, a todo el ancho, se desliza hacia abajo)
      stage.dataset.dash = '1'; w.className = 'obv-dashw live'; w.style.fontSize = '16px';
      w.appendChild(node); stage.appendChild(w);
      requestAnimationFrame(() => adapt(w));
      dashBar(stage, w, (o.dataset.name || ''));
    } else {
      w.className = 'obv-pg live';
      const fit = (innerWidth - 24) / 40; w.style.fontSize = `${fit}px`;
      w.appendChild(node); stage.appendChild(w);
    }
  }
  stage.scrollTop = 0; stage.scrollLeft = 0;
  o.querySelectorAll<HTMLElement>('.obv-tb button[data-k]').forEach((b) => b.classList.toggle('on', +b.dataset.k! === k));
  dispatchEvent(new Event('mw-boot'));
  if (pieces[k].site) {
    const root = node.classList.contains('mr-web') ? node : node.querySelector<HTMLElement>('.mr-web')!;
    const run = () => requestAnimationFrame(() => adapt(root));
    run(); new MutationObserver(run).observe(root, { attributes: true, attributeFilter: ['data-tab'] });
    siteMenu(stage, root, (o.dataset.name || ''));
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
    const cap = f.querySelector(':scope > figcaption')!.textContent || '';
    return { t: /panel/i.test(cap) ? 'Dashboard' : cap, dash: /panel/i.test(cap), el, site: !!el.querySelector('.mw-scroll') || el.classList.contains('mr-web') };
  });
  if (!pieces.length) { detail(c, i, x, y); return; }
  const first = Math.max(0, pieces.findIndex((p) => p.site));
  const o = document.createElement('div');
  o.className = 'obv'; o.dataset.th = c.dataset.th!; origin(o, x, y);
  o.dataset.name = c.dataset.n!; o.dataset.img = c.dataset.img || ''; o.dataset.hl = c.dataset.hl || ''; o.dataset.cat = c.dataset.cat || '';
  o.innerHTML = `<div class="obv-st"></div><nav class="obv-tb"><button type="button" class="obv-back" aria-label="Volver"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>${pieces.map((p, n) => `<button type="button" data-k="${n}">${p.t}</button>`).join('')}</nav>`;
  document.body.appendChild(o);
  document.documentElement.style.overflow = 'hidden';
  show(o, pieces, first);
  o.querySelectorAll<HTMLElement>('.obv-tb button[data-k]').forEach((b) => b.addEventListener('click', () => show(o, pieces, +b.dataset.k!)));
  wire(o);
}
