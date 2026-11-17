// Transición al entrar a «Arma tu proyecto»: un círculo de tinta nace en el clic y cubre la pantalla, aparece el nombre con una línea fina y se navega;
// la página nueva abre levantando la cortina (ver html[data-tr] en global.css y el script en línea de Header.astro).
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('click', (ev) => {
  const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>('a[href="/arma-tu-proyecto"]');
  if (!a || reduced || ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || a.target === '_blank') return;
  ev.preventDefault();
  if (document.querySelector('.tr-cover')) return;
  const r = a.getBoundingClientRect(), x = ev.clientX || r.left + r.width / 2, y = ev.clientY || r.top + r.height / 2;
  const c = document.createElement('div');
  c.className = 'tr-cover'; c.style.setProperty('--x', `${x}px`); c.style.setProperty('--y', `${y}px`);
  c.innerHTML = '<span class="tr-t">Arma tu proyecto</span><i class="tr-l"></i>';
  document.body.appendChild(c);
  try { sessionStorage.setItem('hc-tr', '1'); } catch { /* sin almacenamiento: la página abre sin cortina */ }
  setTimeout(() => { location.href = a.href; }, 1050);
});
addEventListener('pageshow', (e) => { if ((e as PageTransitionEvent).persisted) document.querySelector('.tr-cover')?.remove(); });
