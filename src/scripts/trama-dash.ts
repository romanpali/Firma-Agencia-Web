// Interactividad del panel de «Trama»: secciones del menú, pedidos que avanzan de estado, filtros, rango del resumen,
// reabastecimiento, interruptores de productos y campañas, y preguntas al asistente. El estado vive en data-* de la raíz .tz-dash.
const dirty = (r: HTMLElement) => r.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FLOW = ['Pagado', 'Preparando', 'Enviado', 'Entregado'];
const RANGE = [['$48,320', '64', '3.4 %', '$755'], ['$312,900', '421', '3.1 %', '$743'], ['$1,284,500', '1,736', '3.3 %', '$740']];
const DELTA = [['+12 %', '+8 %', '+0.4', '−2 %'], ['+9 %', '+6 %', '+0.2', '−1 %'], ['+14 %', '+11 %', '+0.5', '+1 %']];
const ANS = [
  'Esta semana lo más vendido fue el plumífero rojo (38 piezas), seguido del chaleco acolchado (27) y la chamarra polar bicolor (21). El sábado fue el mejor día.',
  'El plumífero rojo en M (quedan 12) y la chamarra polar en S (quedan 9) se agotan en menos de una semana al ritmo actual. Te sugiero pedir 24 piezas de cada uno.',
  'La campaña «Lookbook edición 02» en TikTok tiene el retorno más bajo (2.4x). Te sugiero pausarla y mover ese presupuesto a «Recupera tu cesta», que rinde 9.2x.',
];
const timers = new WeakMap<HTMLElement, number>();

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
    const on = t.classList.toggle('on'); const lb = t.parentElement!.querySelector('small'); if (lb) lb.textContent = t.closest('.td-cp') ? (on ? 'Activa' : 'Pausada') : 'Visible en la tienda';
    t.closest('.td-pc')?.classList.toggle('off', !on);
  } else if (k === 'dstk') {
    const li = t.closest<HTMLElement>('li')!, v = +(li.dataset.s || 0) + 24; li.dataset.s = String(v);
    li.querySelector('b')!.textContent = String(v); (li.querySelector('i') as HTMLElement).style.setProperty('--v', `${Math.min(100, v)}%`); li.classList.toggle('low', v < 20);
    t.textContent = 'Pedido enviado'; setTimeout(() => { t.textContent = 'Reabastecer'; dirty(r); }, 1400);
  } else if (k === 'dask') {
    const box = r.querySelector<HTMLElement>('.td-msgs')!, q = ANS[+t.dataset.q!];
    clearInterval(timers.get(box)); box.insertAdjacentHTML('beforeend', `<p class="me">${t.textContent}</p><p class="bot"></p>`);
    const el = box.lastElementChild as HTMLElement; box.scrollTop = box.scrollHeight;
    if (reduced) { el.textContent = q; } else { let n = 0; timers.set(box, window.setInterval(() => { el.textContent = q.slice(0, ++n); box.scrollTop = box.scrollHeight; if (n >= q.length) { clearInterval(timers.get(box)); dirty(r); } }, 14)); }
  }
  dirty(r);
}
document.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-int^=d]');
  const r = t?.closest<HTMLElement>('.tz-dash');
  if (!t || !r || t.closest('.lc')) return;
  ev.stopPropagation(); act(t, r);
});
