// Interactividad de la tienda de «Trama»: ficha de producto, tallas, cesta con totales, filtros y pedido de ejemplo.
// Los clics se delegan por data-int="t…"; el estado vive en data-* de la raíz .tz-web (así se copia con la hoja y con la vista ampliada).
// Las pestañas, el desplazamiento, la aparición y la vista ampliada los resuelve marea-site.ts (la raíz también es .mr-web).
type Line = [string, string, number]; // producto, talla, cantidad
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;
const dirty = (r: HTMLElement) => r.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));
const read = (r: HTMLElement): Line[] => { try { return JSON.parse(r.dataset.bag || '[]'); } catch { return []; } };
const tileOf = (r: HTMLElement, id: string) => r.querySelector<HTMLElement>(`.tz-p[data-id="${id}"]`);
const setAll = (r: HTMLElement, sel: string, v: string) => r.querySelectorAll(sel).forEach((e) => { if (e.textContent !== v) e.textContent = v; });

const SHIP: Record<string, [string, string]> = { std: ['Estándar', 'en 2 a 4 días hábiles'], exp: ['Express', 'mañana antes de las 7 pm'], pick: ['Recoger en tienda', 'en 2 horas, en tienda'] };
const PM: Record<string, string> = { card: 'Tarjeta', spei: 'Transferencia', cash: 'Efectivo en tienda' };
function totals(r: HTMLElement, sub: number) {
  const disc = r.dataset.promo ? Math.round(sub * 0.1) : 0, o = r.dataset.ship || 'std';
  const ship = !sub ? 0 : o === 'exp' ? 199 : o === 'pick' ? 0 : sub - disc >= 1200 ? 0 : 99;
  return { disc, ship, total: sub - disc + ship };
}
function render(r: HTMLElement) {
  const bag = read(r); let n = 0, tot = 0;
  const li = bag.map(([id, s, q], i) => {
    const t = tileOf(r, id); if (!t) return '';
    const p = +(t.dataset.p || 0); n += q; tot += p * q;
    return `<li><div class="tz-ph tz-bt">${t.querySelector('.tz-img')!.outerHTML}</div><div><b>${t.dataset.n}</b><span>${t.dataset.col} · Talla ${s}</span><div class="tz-q"><button type="button" data-int="tqty" data-i="${i}" data-d="-1" aria-label="Menos">−</button><i>${q}</i><button type="button" data-int="tqty" data-i="${i}" data-d="1" aria-label="Más">+</button></div></div><em>${money(p * q)}</em></li>`;
  }).join('');
  r.querySelector('.tz-bl')!.innerHTML = li; r.dataset.cn = String(n);
  const li2 = bag.map(([id, s, q], i) => {
    const t = tileOf(r, id); if (!t) return '';
    const p = +(t.dataset.p || 0);
    return `<li><div class="tz-ph tz-bt">${t.querySelector('.tz-img')!.outerHTML}</div><div class="tz-ci"><b>${t.dataset.n}</b><span>${t.dataset.col} · Talla ${s}</span><div class="tz-q"><button type="button" data-int="tqty" data-i="${i}" data-d="-1" aria-label="Menos">−</button><i>${q}</i><button type="button" data-int="tqty" data-i="${i}" data-d="1" aria-label="Más">+</button></div></div><div class="tz-cp2"><em>${money(p * q)}</em><button type="button" data-int="tqty" data-i="${i}" data-d="-99" aria-label="Quitar">Quitar</button></div></li>`;
  }).join('');
  const mi = bag.map(([id, , q]) => { const t = tileOf(r, id); return t ? `<li><div class="tz-ph tz-bt">${t.querySelector('.tz-img')!.outerHTML}<i>${q}</i></div><span>${t.dataset.n}</span><em>${money(+(t.dataset.p || 0) * q)}</em></li>` : ''; }).join('');
  const cl = r.querySelector('.tz-cl2'), ml = r.querySelector('.tz-mi'); if (cl) cl.innerHTML = li2; if (ml) ml.innerHTML = mi;
  const T = totals(r, tot), left = Math.max(0, 1200 - (tot - T.disc));
  setAll(r, '[data-cn]', String(n)); setAll(r, '[data-tot]', money(tot));
  setAll(r, '[data-sub]', money(tot)); setAll(r, '[data-disc]', `−${money(T.disc)}`); setAll(r, '[data-shp]', T.ship ? money(T.ship) : 'Gratis'); setAll(r, '[data-tot2]', money(T.total));
  setAll(r, '[data-free]', left ? `Te faltan ${money(left)} para el envío gratis` : 'Tienes envío gratis en este pedido');
  r.querySelectorAll<HTMLElement>('[data-freebar]').forEach((b) => (b.style.width = `${Math.min(100, ((tot - T.disc) / 1200) * 100)}%`));
  r.toggleAttribute('data-empty', n === 0); r.toggleAttribute('data-hasdisc', T.disc > 0);
  r.querySelectorAll<HTMLElement>('[data-o]').forEach((b) => b.classList.toggle('on', b.dataset.o === (r.dataset.ship || 'std')));
  r.querySelectorAll<HTMLElement>('[data-m]').forEach((b) => b.classList.toggle('on', b.dataset.m === (r.dataset.pm || 'card')));
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
  else if (k === 'tcart') { delete d.bagOpen; d.step = 'cart'; toTab(r, 'carrito'); render(r); }
  else if (k === 'tship') { d.ship = t.dataset.o!; render(r); }
  else if (k === 'tpm') { d.pm = t.dataset.m!; delete d.perr; }
  else if (k === 'tcode') {
    const v = (r.querySelector<HTMLInputElement>('[data-ck=code]')?.value || '').trim().toUpperCase(), m = r.querySelector('[data-codemsg]')!;
    if (v === 'TRAMA10') { d.promo = '1'; m.textContent = 'Código aplicado: 10 % de descuento'; } else { delete d.promo; m.textContent = v ? 'Ese código no es válido' : 'Prueba con TRAMA10'; }
    render(r);
  }
  else if (k === 'tstep') {
    const to = t.dataset.s!, v = (key: string) => (r.querySelector<HTMLInputElement>(`[data-ck=${key}]`)?.value || '').trim();
    if (to === 'ship' && !read(r).length) return;
    if (to === 'pay' && !(v('nom') && /.+@.+/.test(v('mail')) && v('dir'))) { r.dataset.err = '1'; dirty(r); return; }
    delete d.err; d.step = to; const sc = r.querySelector<HTMLElement>('.mw-scroll'); if (sc) sc.scrollTop = 0;
  }
  else if (k === 'tpay') {
    const v = (key: string) => (r.querySelector<HTMLInputElement>(`[data-ck=${key}]`)?.value || '').replace(/\s/g, '');
    if ((d.pm || 'card') === 'card' && !(v('cnum').length >= 13 && v('cexp').length >= 5 && v('ccvv').length >= 3)) { d.perr = '1'; dirty(r); return; }
    delete d.perr; d.busy = '1';
    setTimeout(() => {
      const bag = read(r); let sub = 0; bag.forEach(([id, , q]) => { const tl = tileOf(r, id); if (tl) sub += +(tl.dataset.p || 0) * q; });
      const T = totals(r, sub), o = d.ship || 'std';
      setAll(r, '[data-code]', String(2042 + Math.floor(Math.random() * 90)));
      setAll(r, '[data-nm]', (r.querySelector<HTMLInputElement>('[data-ck=nom]')?.value || 'Sofía').split(' ')[0] || 'Sofía');
      setAll(r, '[data-ml]', r.querySelector<HTMLInputElement>('[data-ck=mail]')?.value || 'tu correo');
      setAll(r, '[data-eta]', SHIP[o][1]); setAll(r, '[data-paid]', money(T.total)); setAll(r, '[data-shn]', SHIP[o][0]); setAll(r, '[data-pmn]', PM[d.pm || 'card']);
      d.bag = '[]'; delete d.promo; delete d.busy; d.step = 'done';
      const sc = r.querySelector<HTMLElement>('.mw-scroll'); if (sc) sc.scrollTop = 0;
      render(r); setAll(r, '[data-paid]', money(T.total)); dirty(r);
    }, 1500);
  }
  else if (k === 'tnew') { d.step = 'cart'; toTab(r, 'inicio'); }
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
document.addEventListener('input', (ev) => {
  const i = ev.target as HTMLInputElement, r = i.closest?.<HTMLElement>('.tz-web');
  if (!r || !i.dataset?.ck || i.closest('.lc')) return;
  const k = i.dataset.ck;
  if (k === 'cnum') { const d = i.value.replace(/\D/g, '').slice(0, 16); i.value = d.replace(/(.{4})/g, '$1 ').trim(); setAll(r, '[data-cc=num]', (d.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim())); }
  else if (k === 'cexp') { const d = i.value.replace(/\D/g, '').slice(0, 4); i.value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; setAll(r, '[data-cc=exp]', i.value || 'MM/AA'); }
  else if (k === 'ccvv') i.value = i.value.replace(/\D/g, '').slice(0, 4);
  else if (k === 'cnom') setAll(r, '[data-cc=nom]', i.value.toUpperCase() || 'NOMBRE APELLIDO');
  i.setAttribute('value', i.value); delete r.dataset.err; delete r.dataset.perr; dirty(r);
});
const boot = () => document.querySelectorAll<HTMLElement>('.tz-web').forEach((r) => { if (!r.closest('.lc') && !r.dataset.tready) { r.dataset.tready = '1'; render(r); } });
boot(); addEventListener('load', boot); addEventListener('mw-boot', boot);
