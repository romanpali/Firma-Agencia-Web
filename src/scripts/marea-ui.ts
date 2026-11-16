// Interactividad del panel de «Marea» (páginas del libro y piezas del carrusel en celular):
// menú lateral que abre cada área, historial que se puede ocultar y una conversación con el asistente que se escribe y responde sola.
// Las páginas tienen una capa de ondas (.rp-s) encima; los clics sobre ella se reenvían al control que quede debajo.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PROMPT = '¿Cómo van las ventas de esta semana y qué debo atender primero?';
type Ctl = { play: () => void; stop: () => void };
const ctls = new WeakMap<HTMLElement, Ctl>();

function chat(root: HTMLElement): Ctl {
  const q = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const field = q('.mc-field'), txt = q('.mc-t'), user = q('.mc-user'), uText = q('.mc-user span'), typing = q('.mc-typing');
  const blocks = [...root.querySelectorAll<HTMLElement>('.mc-b')];
  let run = 0, vis = false;
  const wait = (ms: number, id: number) => new Promise<boolean>((r) => setTimeout(() => r(id === run), ms));
  const reset = () => {
    root.classList.remove('mc-on'); field.classList.remove('mc-typed'); txt.textContent = ''; uText.textContent = '';
    user.classList.remove('show'); typing.classList.remove('show'); blocks.forEach((b) => b.classList.remove('show'));
  };
  const final = () => { root.classList.add('mc-on'); uText.textContent = PROMPT; user.classList.add('show'); blocks.forEach((b) => b.classList.add('show')); };
  async function play() {
    const id = ++run; reset();
    if (reduced) { final(); return; }
    if (!(await wait(1600, id))) return;
    field.classList.add('mc-typed');
    for (let i = 1; i <= PROMPT.length; i++) { txt.textContent = PROMPT.slice(0, i); if (!(await wait(26 + Math.random() * 22, id))) return; }
    if (!(await wait(450, id))) return;
    root.classList.add('mc-on'); field.classList.remove('mc-typed'); txt.textContent = ''; uText.textContent = PROMPT; user.classList.add('show');
    if (!(await wait(600, id))) return;
    typing.classList.add('show');
    if (!(await wait(1300, id))) return;
    typing.classList.remove('show');
    for (const b of blocks) { b.classList.add('show'); if (!(await wait(b.matches('.mc-hh, .mc-chips') ? 420 : 560, id))) return; }
    if (!(await wait(8000, id))) return;
    root.classList.remove('mc-on');
    if (!(await wait(900, id))) return;
    if (vis && root.dataset.view === 'inicio') play();
  }
  const stop = () => { run++; };
  new IntersectionObserver(([e]) => {
    const v = e.isIntersecting; if (v === vis) return; vis = v;
    if (v && root.dataset.view === 'inicio') play(); else if (!v) stop();
  }, { threshold: 0.2 }).observe(root);
  return { play, stop };
}

function init() {
  document.querySelectorAll<HTMLElement>('.mr-dash').forEach((r) => { if (!r.closest('.lc') && !ctls.has(r)) ctls.set(r, chat(r)); });
}

const dirty = (root: HTMLElement) => root.dispatchEvent(new CustomEvent('bk-dirty', { bubbles: true }));
function act(t: HTMLElement, root: HTMLElement) {
  const kind = t.dataset.int, c = ctls.get(root);
  if (kind === 'go') {
    const v = t.dataset.v!; if (root.dataset.view === v) return;
    root.dataset.view = v;
    root.querySelectorAll('.md-side li').forEach((li) => li.classList.toggle('on', (li as HTMLElement).dataset.v === v));
    if (!reduced) { root.classList.add('mv-anim'); setTimeout(() => root.classList.remove('mv-anim'), 500); }
    if (v === 'inicio') c?.play(); else c?.stop();
  } else if (kind === 'tog') t.classList.toggle('off');
  else if (kind === 'hist') root.toggleAttribute('data-nohist');
  else if (kind === 'new') { root.dataset.view = 'inicio'; root.querySelectorAll('.md-side li').forEach((li) => li.classList.toggle('on', (li as HTMLElement).dataset.v === 'inicio')); c?.play(); }
  dirty(root);
}

// Control interactivo que queda bajo las capas de ondas, en el punto del puntero: es el primer elemento visible que no sea una capa de ondas.
const under = (x: number, y: number) => {
  for (const e of document.elementsFromPoint(x, y)) {
    if (!(e instanceof HTMLElement) || e.classList.contains('rp-s')) continue;
    const t = e.closest<HTMLElement>('[data-int]');
    return t && !t.closest('.lc') ? t : null;
  }
  return null;
};

document.addEventListener('click', (ev) => {
  const ov = ev.target as HTMLElement;
  if (!ov.classList?.contains('rp-s')) return;
  const t = under(ev.clientX, ev.clientY), root = t?.closest<HTMLElement>('.mr-dash');
  if (!t || !root) return;
  ev.stopPropagation(); act(t, root);
}, true);

let pend = 0;
document.addEventListener('pointermove', (ev) => {
  const ov = ev.target as HTMLElement;
  if (!ov.classList?.contains('rp-s') || pend) return;
  pend = requestAnimationFrame(() => { pend = 0; ov.style.cursor = under(ev.clientX, ev.clientY) ? 'pointer' : ''; });
}, { passive: true });

init();
addEventListener('load', init);
