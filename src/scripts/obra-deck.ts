// Obra en celular: baraja de cartas que se desliza a la izquierda. El título, el fondo y la barra inferior siguen a la carta de arriba;
// un toque en la carta activa abre el proyecto a pantalla completa (obra-mobile.ts).
import { openProject } from './obra-mobile';

const sec = document.querySelector<HTMLElement>('[data-obs]');
if (sec) {
  const deck = sec.querySelector<HTMLElement>('[data-obs-deck]')!;
  const cards = [...deck.querySelectorAll<HTMLElement>('.obs-card')];
  const imgs = cards.map((c) => c.querySelector<HTMLElement>('img')!);
  const bgs = [...sec.querySelectorAll<HTMLElement>('.obs-bg')];
  const tabs = [...sec.querySelectorAll<HTMLElement>('.obs-tab button')];
  const title = sec.querySelector<HTMLElement>('[data-obs-title]')!, sub = sec.querySelector<HTMLElement>('[data-obs-sub]')!, num = sec.querySelector<HTMLElement>('[data-obs-n]')!;
  const N = cards.length, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 300, p = reduced ? 0 : -0.7, target = 0, idx = -1, raf = 0, drag: { x: number; y: number; p0: number; t: number; lx: number; lt: number; v: number; moved: boolean; id: number } | null = null;
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  const paint = () => {
    cards.forEach((c, i) => {
      const d = i - p, a = Math.abs(d);
      const x = d >= 0 ? d * W * 0.2 : d * W * 1.12;
      const sc = d >= 0 ? 1 - Math.min(d, 3) * 0.075 : 1;
      const rot = d < 0 ? d * 5 : 0;
      const op = d < 0 ? clamp(1 + d * 1.25, 0, 1) : clamp(1 - Math.max(0, d - 1.4) * 0.6, 0, 1);
      c.style.transform = `translate3d(${x.toFixed(1)}px, -50%, 0) scale(${sc.toFixed(3)}) rotate(${rot.toFixed(2)}deg)`;
      c.style.opacity = op.toFixed(3); c.style.zIndex = String(100 - Math.round(a * 10 + (d < 0 ? 5 : 0)));
      c.style.setProperty('--dim', clamp(d * 0.28, 0, 0.7).toFixed(3));
      imgs[i].style.transform = `scale(1.22) translate3d(${(d * -9).toFixed(2)}%, 0, 0)`;
    });
    const k = clamp(Math.round(p), 0, N - 1);
    if (k !== idx) setIndex(k);
  };

  const reveal = (el: HTMLElement, text: string) => {
    el.textContent = text;
    if (!reduced) el.animate([{ clipPath: 'inset(0 0 100% 0)', transform: 'translateY(0.35em)', opacity: 0 }, { clipPath: 'inset(-0.1em)', transform: 'none', opacity: 1 }], { duration: 750, easing: 'cubic-bezier(0.6, 0, 0.2, 1)' });
  };
  const setIndex = (k: number) => {
    const first = idx < 0; idx = k;
    const c = cards[k].dataset;
    if (first) { title.textContent = c.n!; sub.textContent = `${c.cat} · ${c.y}`; } else { reveal(title, c.n!); reveal(sub, `${c.cat} · ${c.y}`); }
    num.textContent = `0${k + 1}`;
    if (!first && !reduced) num.animate([{ transform: 'translateY(0.6em)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 500, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' });
    bgs.forEach((b, i) => b.classList.toggle('on', i === k)); tabs.forEach((t, i) => t.classList.toggle('on', i === k));
  };

  const step = () => {
    raf = 0;
    if (drag) return;
    const d = target - p;
    if (Math.abs(d) < 0.0008) { p = target; paint(); return; }
    p += d * 0.13; paint(); raf = requestAnimationFrame(step);
  };
  const go = (k: number) => { target = clamp(k, 0, N - 1); if (reduced) { p = target; paint(); } else if (!raf) raf = requestAnimationFrame(step); };

  const measure = () => { W = cards[0].offsetWidth || 300; paint(); };
  addEventListener('resize', measure);

  deck.addEventListener('pointerdown', (e) => {
    if (drag) return;
    drag = { x: e.clientX, y: e.clientY, p0: p, t: performance.now(), lx: e.clientX, lt: performance.now(), v: 0, moved: false, id: e.pointerId };
  });
  deck.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; } // es un desplazamiento vertical de la página
      if (Math.abs(dx) > 6) { drag.moved = true; deck.setPointerCapture(e.pointerId); }
    }
    if (!drag.moved) return;
    const now = performance.now(); drag.v = (e.clientX - drag.lx) / Math.max(1, now - drag.lt); drag.lx = e.clientX; drag.lt = now;
    p = clamp(drag.p0 - dx / (W * 0.72), -0.3, N - 0.7); paint();
  });
  const end = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    if (d.moved) { go(Math.round(p - d.v * 0.9)); return; }
    // toque: la carta activa se abre; otra carta se trae al frente
    const hit = cards.findIndex((c) => { const r = c.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom && +c.style.opacity > 0.3; });
    const topIdx = hit < 0 ? idx : hit;
    if (topIdx === idx) openProject(idx, e.clientX, e.clientY); else go(topIdx);
  };
  deck.addEventListener('pointerup', end); deck.addEventListener('pointercancel', () => { drag = null; go(Math.round(p)); });
  tabs.forEach((t, i) => t.addEventListener('click', () => go(i)));

  measure(); paint();
  // entrada: la baraja llega desde la derecha y, después, se asoma una carta para invitar a deslizar
  requestAnimationFrame(() => { sec.classList.add('ready'); go(0); });
  if (!reduced) {
    let hinted = false;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hinted) { hinted = true; setTimeout(() => { if (!drag && idx === 0) { target = 0.22; if (!raf) raf = requestAnimationFrame(step); setTimeout(() => { if (!drag && target === 0.22) go(0); }, 650); } }, 1900); }
    }, { threshold: 0.6 }).observe(sec);
  }
}
