// Interactividad del panel de «Trama»: secciones del menú, pedidos que avanzan de estado, filtros, rango del resumen,
// reabastecimiento, interruptores de productos y campañas, y preguntas al asistente. El estado vive en data-* de la raíz .tz-dash.
const dirty = (r: HTMLElement) => r.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FLOW = ['Pagado', 'Preparando', 'Enviado', 'Entregado'];
const RANGE = [['$48,320', '64', '3.4 %', '$755'], ['$312,900', '421', '3.1 %', '$743'], ['$1,284,500', '1,736', '3.3 %', '$740']];
const DELTA = [['+12 %', '+8 %', '+0.4', '−2 %'], ['+9 %', '+6 %', '+0.2', '−1 %'], ['+14 %', '+11 %', '+0.5', '+1 %']];
const bars = (rows: [string, string, number][]) => `<div class="ai-c">${rows.map(([a, b, v]) => `<div><span>${a}</span><b>${b}</b><i style="--v:${v}%"></i></div>`).join('')}</div>`;
const ANS: { re: RegExp; t: string; c: string }[] = [
  { re: /vend|top|ranking|m[aá]s popular/i, t: 'Esta semana lo más vendido fue el plumífero rojo, seguido del chaleco acolchado y la chamarra polar bicolor. El sábado fue el mejor día.', c: bars([['Plumífero rojo', '38 piezas', 100], ['Chaleco acolchado', '27 piezas', 71], ['Chamarra polar bicolor', '21 piezas', 55]]) },
  { re: /reabast|stock|inventario|agot|existenc/i, t: 'Dos prendas se agotan en menos de una semana al ritmo actual. Te sugiero pedir 24 piezas de cada una.', c: bars([['Chamarra polar · S', 'Quedan 9', 12], ['Plumífero rojo · M', 'Quedan 12', 16], ['Chamarra varsity · S', 'Quedan 22', 30]]) },
  { re: /campa|anunc|pausa|tiktok|retorno|publicidad/i, t: '«Lookbook edición 02» en TikTok tiene el retorno más bajo. Te sugiero pausarla y mover ese presupuesto a «Recupera tu cesta».', c: bars([['Recupera tu cesta', '9.2x', 100], ['Plumíferos de temporada', '4.8x', 52], ['Lookbook edición 02', '2.4x', 26]]) },
  { re: /ventas|hoy|ingres|facturaci|dinero|cu[aá]nto/i, t: 'Hoy llevas $48,320 en ventas, un 12 % más que ayer. La conversión está en 3.4 % y el ticket promedio en $755.', c: bars([['Ventas hoy', '$48,320', 100], ['Ayer', '$43,140', 89], ['Mismo día, semana pasada', '$40,890', 85]]) },
];
const FALLBACK = { t: 'Por ahora puedo ayudarte con ventas, inventario y campañas. Prueba con «¿Qué debo reabastecer?» o «¿Cómo van las ventas de hoy?».', c: '' };

const esc = (x: string) => x.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
let run = 0;
function ask(r: HTMLElement, q: string) {
  const box = r.querySelector<HTMLElement>('.td-msgs')!, th = r.querySelector<HTMLElement>('.td-thread')!, id = ++run;
  const ia = r.querySelector('.td-hello i')!.innerHTML, a = ANS.find((x) => x.re.test(q)) || FALLBACK;
  r.dataset.chat = '1';
  box.insertAdjacentHTML('beforeend', `<div class="m me"><p>${esc(q)}</p></div><div class="m bot"><i class="av">${ia}</i><div><div class="dots"><i></i><i></i><i></i></div></div></div>`);
  const el = box.lastElementChild!.lastElementChild as HTMLElement; th.scrollTop = th.scrollHeight;
  const done = () => { el.innerHTML = `<p>${a.t}</p>${a.c}`; th.scrollTop = th.scrollHeight; dirty(r); };
  if (reduced) { done(); return; }
  setTimeout(() => {
    if (id !== run) { done(); return; }
    el.innerHTML = '<p></p>'; const p = el.firstElementChild as HTMLElement; let n = 0;
    const iv = window.setInterval(() => { if (id !== run) { clearInterval(iv); return; } p.textContent = a.t.slice(0, (n += 2)); th.scrollTop = th.scrollHeight; if (n >= a.t.length) { clearInterval(iv); done(); } }, 16);
  }, 800);
}

function act(t: HTMLElement, r: HTMLElement) {
  const k = t.dataset.int;
  if (k === 'dnav') r.dataset.v = t.dataset.v!;
  else if (k === 'drg') {
    const i = +t.dataset.r!; r.dataset.r = String(i);
    r.querySelectorAll<HTMLElement>('.td-k > div').forEach((d, n) => { d.querySelector('b')!.textContent = RANGE[i][n]; const e = d.querySelector('em')!; e.textContent = DELTA[i][n]; e.classList.toggle('dn', DELTA[i][n].startsWith('−')); });
  } else if (k === 'dfil') r.dataset.of = t.dataset.f!;
  else if (k === 'dord') {
    const tr = t.closest('tr')!, cur = tr.dataset.st || 'Pagado', next = FLOW[(FLOW.indexOf(cur) + 1) % FLOW.length];
    tr.dataset.st = next; t.textContent = next; t.className = `td-st s-${next}`;
  } else if (k === 'dsw') {
    const on = t.classList.toggle('on'); const lb = t.closest('.td-pr') ? t.parentElement!.querySelector('small') : null; t.closest('.td-fl')?.classList.toggle('off', !on); if (lb) lb.textContent = t.closest('.td-cp') ? (on ? 'Activa' : 'Pausada') : 'Visible en la tienda';
    t.closest('.td-pc')?.classList.toggle('off', !on);
  } else if (k === 'dstk') {
    const li = t.closest<HTMLElement>('li')!, v = +(li.dataset.s || 0) + 24; li.dataset.s = String(v);
    li.querySelector('b')!.textContent = String(v); (li.querySelector('i') as HTMLElement).style.setProperty('--v', `${Math.min(100, v)}%`); li.classList.toggle('low', v < 20);
    t.textContent = 'Pedido enviado'; setTimeout(() => { t.textContent = 'Reabastecer'; dirty(r); }, 1400);
  } else if (k === 'dflow') {
    const row = t.closest<HTMLElement>('.td-fl')!; if (row.classList.contains('off') || row.classList.contains('run')) return;
    row.classList.add('run'); const c = row.querySelector('[data-c]')!; c.textContent = String(+c.textContent!.replace(/,/g, '') + 1);
    const log = r.querySelector('.td-log')!; log.insertAdjacentHTML('afterbegin', `<li class="new"><time>ahora</time>${row.dataset.log}</li>`); while (log.children.length > 2) log.lastElementChild!.remove();
    setTimeout(() => { row.classList.remove('run'); dirty(r); }, 2600);
  } else if (k === 'dask') ask(r, t.dataset.t!);
  else if (k === 'dsend') { const i = r.querySelector<HTMLInputElement>('.td-in input')!; const v = i.value.trim(); if (v) { i.value = ''; i.removeAttribute('value'); ask(r, v); } }
  dirty(r);
}
document.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-int^=d]');
  const r = t?.closest<HTMLElement>('.tz-dash');
  if (!t || !r || t.closest('.lc')) return;
  ev.stopPropagation(); act(t, r);
});
document.addEventListener('keydown', (ev) => { const i = ev.target as HTMLInputElement; if (ev.key === 'Enter' && i.matches?.('.tz-dash .td-in input')) { ev.preventDefault(); i.closest('.td-in')!.querySelector<HTMLElement>('.td-send')!.click(); } });
document.addEventListener('input', (ev) => { const i = ev.target as HTMLInputElement; if (i.matches?.('.tz-dash .td-in input')) i.setAttribute('value', i.value); });
