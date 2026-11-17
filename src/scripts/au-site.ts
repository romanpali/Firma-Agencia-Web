// Formulario de contacto de «Estudio Aurora» (demostración: no envía nada). Chips de interés, envío con confirmación y valores que viajan con la hoja.
const dirty = (r: HTMLElement) => r.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));
document.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-int=auchip], [data-int=ausend]');
  const r = t?.closest<HTMLElement>('.au-web');
  if (!t || !r || t.closest('.lc')) return;
  ev.stopPropagation();
  if (t.dataset.int === 'auchip') { r.querySelectorAll('[data-int=auchip]').forEach((c) => c.classList.toggle('on', c === t)); }
  else r.dataset.done = '1';
  dirty(r);
});
document.addEventListener('input', (ev) => {
  const i = ev.target as HTMLInputElement | HTMLTextAreaElement;
  if (!i.closest?.('.au-web')) return;
  if (i.tagName === 'INPUT') i.setAttribute('value', i.value); else if (i.tagName === 'TEXTAREA') i.textContent = i.value;
});
