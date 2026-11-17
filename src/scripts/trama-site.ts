// Interactividad de la tienda de «Trama»: ficha de producto, tallas, cesta con totales, filtros y pedido de ejemplo.
// Los clics se delegan por data-int="t…"; el estado vive en data-* de la raíz .tz-web (así se copia con la hoja y con la vista ampliada).
// Las pestañas, el desplazamiento, la aparición y la vista ampliada los resuelve marea-site.ts (la raíz también es .mr-web).
type Line = [string, string, number]; // producto, talla, cantidad
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;
const dirty = (r: HTMLElement) => r.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));
const read = (r: HTMLElement): Line[] => { try { return JSON.parse(r.dataset.bag || '[]'); } catch { return []; } };
const tileOf = (r: HTMLElement, id: string) => r.querySelector<HTMLElement>(`.tz-p[data-id="${id}"]`);
const setAll = (r: HTMLElement, sel: string, v: string) => r.querySelectorAll(sel).forEach((e) => { if (e.textContent !== v) e.textContent = v; });

function render(r: HTMLElement) {
  const bag = read(r); let n = 0, tot = 0;
  const li = bag.map(([id, s, q], i) => {
    const t = tileOf(r, id); if (!t) return '';
    const p = +(t.dataset.p || 0); n += q; tot += p * q;
    return `<li><div class="tz-ph tz-bt">${t.querySelector('.tz-img')!.outerHTML}</div><div><b>${t.dataset.n}</b><span>${t.dataset.col} · Talla ${s}</span><div class="tz-q"><button type="button" data-int="tqty" data-i="${i}" data-d="-1" aria-label="Menos">−</button><i>${q}</i><button type="button" data-int="tqty" data-i="${i}" data-d="1" aria-label="Más">+</button></div></div><em>${money(p * q)}</em></li>`;
  }).join('');
  r.querySelector('.tz-bl')!.innerHTML = li; r.dataset.cn = String(n);
  setAll(r, '[data-cn]', String(n)); setAll(r, '[data-tot]', money(tot));
}
const toTab = (r: HTMLElement, tab: string) => { const sc = r.querySelector<HTMLElement>('.mw-scroll'); r.dataset.tab = tab; if (sc) sc.scrollTop = 0; r.removeAttribute('data-sc'); };

function pdp(r: HTMLElement, id: string) {
  const t = tileOf(r, id); if (!t) return; const d = t.dataset, fig = t.querySelector('.tz-img')!.outerHTML;
  if (r.dataset.tab !== 'producto') r.dataset.from = r.dataset.tab || 'inicio';
  const seen = new Set<string>([id]);
  const more = [...r.querySelectorAll<HTMLElement>('.tz-mujer .tz-p, .tz-hombre .tz-p')].filter((x) => x.dataset.sx === d.sx && !seen.has(x.dataset.id!) && (seen.add(x.dataset.id!), true)).slice(0, 4);
  r.querySelector('.tz-prod')!.innerHTML = `<div class="tz-pd"><div class="tz-pgl">${['c0', 'c1', 'c2', 'c3'].map((c) => `<div class="tz-ph tz-pc ${c}">${fig}</div>`).join('')}</div>
<aside class="tz-pa"><button type="button" class="tz-bk" data-int="tback">← Volver</button><p class="tz-k">${d.sx} · ${d.kn}</p><h2>${d.n}</h2><b class="tz-pr">${money(+d.p!)}</b><p class="tz-pdsc">${d.d}</p>
<p class="tz-lb2">Color <b>${d.col}</b></p>
<p class="tz-lb2">Talla <u>Guía de tallas</u></p><div class="tz-sz">${['XS', 'S', 'M', 'L', 'XL'].map((s) => `<button type="button" data-int="tsz" data-s="${s}">${s}</button>`).join('')}</div>
<button type="button" class="tz-add" data-int="tadd" data-id="${id}" data-s="">Añadir a la cesta</button><p class="tz-need">Elige una talla para añadirlo.</p>
<ul class="tz-det"><li><b>Composición</b><span>${d.comp}</span></li><li><b>Envío</b><span>Gratis desde $1,200 · 2 a 4 días hábiles</span></li><li><b>Cambios</b><span>30 días, en tienda o por mensajería</span></li></ul></aside></div>
<div class="tz-sec"><div class="tz-sh"><p class="tz-k">Completa el look</p></div><div class="tz-row">${more.map((x) => x.outerHTML.replace('class="tz-p rv', 'class="tz-p rv in')).join('')}</div></div>`;
  r.dataset.sz = ''; toTab(r, 'producto');
  r.querySelectorAll('.tz-prod .rv').forEach((e) => e.classList.add('in'));
}

function act(t: HTMLElement, r: HTMLElement) {
  const k = t.dataset.int, d = r.dataset;
  if (k === 'tpdp') pdp(r, t.dataset.id!);
  else if (k === 'tback') toTab(r, d.from || 'inicio');
  else if (k === 'tfil') d.fil = t.dataset.f!;
  else if (k === 'tsz') { d.sz = t.dataset.s!; r.querySelectorAll('.tz-sz button').forEach((b) => b.classList.toggle('on', b === t)); t.closest('.tz-pa')?.classList.remove('need'); }
  else if (k === 'tadd') {
    const s = t.dataset.s || d.sz; if (!s) { t.closest('.tz-pa')?.classList.add('need'); return; }
    const bag = read(r), id = t.dataset.id!, f = bag.find((l) => l[0] === id && l[1] === s);
    if (f) f[2]++; else bag.push([id, s, 1]);
    d.bag = JSON.stringify(bag); render(r); d.bagOpen = '1'; r.removeAttribute('data-bag-done');
  } else if (k === 'tqty') {
    const bag = read(r), l = bag[+t.dataset.i!]; if (!l) return; l[2] += +t.dataset.d!;
    d.bag = JSON.stringify(bag.filter((x) => x[2] > 0)); render(r);
  } else if (k === 'tbag') { if (d.bagOpen) delete d.bagOpen; else d.bagOpen = '1'; }
  else if (k === 'tbuy') {
    if (!read(r).length) return;
    setAll(r, '[data-code]', String(2042 + Math.floor(Math.random() * 90))); d.bag = '[]'; render(r); d.bagDone = '1';
  }
  dirty(r);
}

document.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-int^=t]');
  const r = t?.closest<HTMLElement>('.tz-web');
  if (!t || !r || t.closest('.lc')) return;
  ev.stopPropagation(); act(t, r);
});
const boot = () => document.querySelectorAll<HTMLElement>('.tz-web').forEach((r) => { if (!r.closest('.lc') && !r.dataset.tready) { r.dataset.tready = '1'; render(r); } });
boot(); addEventListener('load', boot);
