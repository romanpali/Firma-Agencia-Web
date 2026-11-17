// Cambio de idioma (español ⇄ inglés) sin duplicar páginas: se sustituye el texto exacto por su traducción (data/en.ts).
// El idioma queda en localStorage («hc-lang»); al cambiarlo se recarga la página para que todo (incluido el JavaScript de cada sección) arranque en ese idioma.
import { EN, EN_RE } from '../data/en';

const KEY = 'hc-lang';
const get = (): 'es' | 'en' => {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'es') { localStorage.setItem(KEY, q); return q; }
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'es';
  } catch { return 'es'; }
};
export const lang = get();

const tr = (raw: string) => {
  const k = raw.trim().replace(/\s+/g, ' ');
  if (!k) return null;
  const hit = EN[k];
  if (hit !== undefined) return hit;
  for (const [re, to] of EN_RE) if (re.test(k)) return k.replace(re, to);
  return null;
};
const SKIP = 'SCRIPT,STYLE,NOSCRIPT,TEXTAREA,[data-no-i18n]';
const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];

function text(n: Text) {
  const p = n.parentElement; if (!p || p.closest(SKIP) || p.closest('[data-i18n]')) return;
  const v = n.nodeValue || '', en = tr(v); if (en === null || en === v.trim()) return;
  const lead = v.match(/^\s*/)![0], trail = v.match(/\s*$/)![0];
  n.nodeValue = lead + en + trail;
}
function attrs(el: Element) {
  if (el.closest(SKIP)) return;
  for (const a of ATTRS) { const v = el.getAttribute(a); if (v) { const en = tr(v); if (en !== null) el.setAttribute(a, en); } }
}
// Los títulos animados palabra por palabra (data-words) se reconstruyen completos: no se pueden traducir palabra por palabra.
function words(el: HTMLElement) {
  if (el.dataset.i18n) return;
  const en = tr(el.textContent || ''); if (en === null) return;
  el.dataset.i18n = '1'; el.textContent = '';
  const frag = document.createDocumentFragment();
  en.split(' ').forEach((w, i, all) => {
    const s = document.createElement('span'); s.className = 'w'; s.dataset.word = ''; s.textContent = w; frag.append(s);
    if (i < all.length - 1) frag.append(document.createTextNode(' '));
  });
  el.append(frag);
}
function walk(root: Node) {
  if (root.nodeType === 3) { text(root as Text); return; }
  if (root.nodeType !== 1) return;
  const el = root as Element;
  if (el.matches?.(SKIP)) return;
  if (el.matches?.('[data-words]')) words(el as HTMLElement);
  el.querySelectorAll?.('[data-words]').forEach((w) => words(w as HTMLElement));
  attrs(el); el.querySelectorAll?.('[placeholder],[aria-label],[title],[alt]').forEach(attrs);
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) text(n as Text);
}

const mark = () => document.querySelectorAll<HTMLElement>('[data-lang]').forEach((b) => {
  const on = b.dataset.lang === lang;
  b.setAttribute('aria-pressed', String(on));
  b.classList.toggle('bg-white', on); b.classList.toggle('text-[#0b0c0f]', on); b.classList.toggle('text-white/55', !on);
});

document.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-lang]'); if (!b) return;
  const to = b.dataset.lang === 'en' ? 'en' : 'es';
  if (to === lang) return;
  try { localStorage.setItem(KEY, to); } catch {}
  const u = new URL(location.href); u.searchParams.delete('lang'); location.href = u.toString();
});

const init = () => {
  mark();
  if (lang !== 'en') return;
  document.documentElement.lang = 'en';
  const ti = tr(document.title); if (ti) document.title = ti;
  walk(document.body);
  new MutationObserver((ms) => {
    for (const m of ms) {
      if (m.type === 'characterData') text(m.target as Text);
      else m.addedNodes.forEach((n) => walk(n));
      if (m.type === 'attributes') attrs(m.target as Element);
    }
  }).observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ATTRS });
  requestAnimationFrame(() => document.documentElement.classList.remove('i18n-wait'));
  // los títulos animados se crean cuando carga la página: se vuelven a revisar
  addEventListener('load', () => walk(document.body));
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
setTimeout(() => document.documentElement.classList.remove('i18n-wait'), 1500);
