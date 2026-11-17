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

// Panel de agentes: elegir una conversación, tomarla (pasa a una persona) y activar o pausar el agente.
document.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-int=adsel], [data-int=adtake], [data-int=adag]');
  const r = t?.closest<HTMLElement>('.au-dash');
  if (!t || !r || t.closest('.lc')) return;
  ev.stopPropagation();
  if (t.dataset.int === 'adsel') r.dataset.c = t.dataset.i!;
  else if (t.dataset.int === 'adag') { const on = t.classList.toggle('on'); r.toggleAttribute('data-off', !on); t.querySelector('span')!.textContent = on ? 'Agenda abierta' : 'Agenda en pausa'; }
  else {
    const tr = t.closest<HTMLElement>('.ad-t')!; tr.classList.add('taken'); t.textContent = 'Entrega aprobada';
    tr.querySelector('.ad-th span')!.textContent = 'Aprobada'; tr.querySelector('.ad-m')!.insertAdjacentHTML('beforeend', '<p class="m-n">Aprobaste la entrega · pasa a producción</p>');
    const li = r.querySelector(`[data-int=adsel][data-i="${tr.dataset.i}"] em`); if (li) { li.textContent = 'Aprobada'; li.className = 's-on'; }
  }
  dirty(r);
});
