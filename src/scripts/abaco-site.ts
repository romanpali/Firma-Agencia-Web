// Interacciones de «Ábaco» (demostración: no se guarda ni se envía nada). Gráfica del sitio, formulario y panel (vistas, estados de factura, aprobaciones).
// El estado vive en data-* de la raíz para que viaje con la hoja y con la vista ampliada.
const dirty = (r: HTMLElement) => r.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;
const NEXT: Record<string, string> = { Emitida: 'Enviada', Enviada: 'Pagada', Pagada: 'Emitida' };
const CL = ['Distribuidora Norte', 'Clínica Alba', 'Estudio Cantera', 'Café Nube', 'Librería Pino', 'Taller Marea'];

function totals(r: HTMLElement) {
  const rows = [...r.querySelectorAll<HTMLElement>('.ab-r')]; let due = 0, paid = 0;
  rows.forEach((x) => { if (x.dataset.s === 'Pagada') paid++; else due += +(x.dataset.m || 0); });
  const c = r.querySelector('[data-xc]'); if (c) c.textContent = money(due + 20000);
  const p = r.querySelectorAll('.ab-dk b')[2]; if (p) p.textContent = String(30 + paid);
  const a = r.querySelector('[data-xa]'); if (a) a.textContent = String(r.querySelectorAll('.ab-ap:not([data-d])').length);
}

document.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-int^=ab]');
  const r = t?.closest<HTMLElement>('.ab-web, .ab-dash');
  if (!t || !r || t.closest('.lc')) return;
  ev.stopPropagation();
  const k = t.dataset.int;
  if (k === 'abm') r.dataset.m = t.dataset.m!;
  else if (k === 'abchip') t.parentElement!.querySelectorAll('[data-int=abchip]').forEach((c) => c.classList.toggle('on', c === t));
  else if (k === 'absend') r.dataset.done = '1';
  else if (k === 'abv') r.dataset.v = t.dataset.k!;
  else if (k === 'abst') {
    const row = t.closest<HTMLElement>('.ab-r')!, s = NEXT[row.dataset.s!] || 'Emitida';
    row.dataset.s = s; t.textContent = s; t.className = `s-${s}`; totals(r);
  } else if (k === 'abnew') {
    const box = r.querySelector('.ab-rows')!, n = box.children.length, m = (4 + Math.floor(Math.random() * 20)) * 1000 + 500;
    const row = document.createElement('div'); row.className = 'ab-r new'; row.dataset.m = String(m); row.dataset.s = 'Emitida';
    row.innerHTML = `<span>A-${1042 + n}</span><b>${CL[n % CL.length]}</b><i>${money(m)}</i><button type="button" data-int="abst" class="s-Emitida">Emitida</button>`;
    box.prepend(row); if (box.children.length > 7) box.lastElementChild!.remove(); totals(r);
  } else if (k === 'abok' || k === 'abno') {
    const ap = t.closest<HTMLElement>('.ab-ap')!; ap.dataset.d = k === 'abok' ? 'ok' : 'no';
    ap.querySelector('em')!.textContent = k === 'abok' ? 'Aprobada · pasa a compras' : 'Rechazada · se avisó a quien la pidió'; totals(r);
  }
  dirty(r);
});
document.addEventListener('input', (ev) => {
  const i = ev.target as HTMLInputElement | HTMLTextAreaElement;
  if (!i.closest?.('.ab-web')) return;
  if (i.tagName === 'INPUT') i.setAttribute('value', i.value); else if (i.tagName === 'TEXTAREA') i.textContent = i.value;
});
