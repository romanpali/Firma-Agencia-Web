// Proyecto «Trama» (concepto): ecommerce de moda tipo Zara, con modelos en fondo de estudio. Identidad, tienda navegable (producto, talla, cesta), panel de tienda con asistente.
// Cada pieza es una página del libro (40em × 26.7em), en HTML/CSS/SVG. Estilos en styles/trama.css; la lógica de la tienda, en trama-site.ts (clics delegados por data-int="t…").
// Las modelos son ilustraciones vectoriales de estudio (sin ids ni filtros: el motor del libro clona las páginas), pensadas para cambiarse por fotografía real.
import { svg } from './marea-ico';

// ---------- la modelo: figura vectorial de frente, por capas (la mitad izquierda se refleja para la derecha) ----------
type Top = { k: 'tee' | 'knit' | 'turtle' | 'blazer' | 'coat' | 'shirt' | 'dress'; c: string; c2?: string };
type Bot = { k: 'wide' | 'slim' | 'skirt'; c: string };
type Look = { m?: boolean; skin: string; hair: string; hs: 'long' | 'short' | 'bun' | 'crop'; top?: Top; bot?: Bot; shoe: string };
const mir = (d: string, f: string, x = '') => `<path d="${d}" fill="${f}" ${x}/><path d="${d}" fill="${f}" transform="translate(200 0) scale(-1 1)" ${x}/>`;
const ink = 'stroke="rgba(0,0,0,.2)" stroke-width=".8" stroke-linejoin="round"';
const line = (d: string, o = 0.14) => `<path d="${d}" fill="none" stroke="rgba(0,0,0,${o})" stroke-width=".9" stroke-linecap="round"/><path d="${d}" fill="none" stroke="rgba(0,0,0,${o})" stroke-width=".9" stroke-linecap="round" transform="translate(200 0) scale(-1 1)"/>`;
const TOP: Record<string, string> = {
  tee: 'M100 75 Q93 74 90 66 L76 69 Q60 73 52 99 L62 111 L74 100 L75 172 L100 176Z',
  knit: 'M100 75 Q93 74 90 66 L76 69 Q60 73 53 100 L48 184 L60 186 L68 118 L75 172 L100 176Z',
  turtle: 'M100 75 Q93 74 90 66 L76 69 Q60 73 53 100 L48 184 L60 186 L68 118 L75 172 L100 176Z',
  shirt: 'M100 72 L88 64 L76 68 Q60 73 54 100 L49 186 L61 188 L69 116 L75 192 L100 196Z',
  blazer: 'M92 66 L76 69 Q60 73 53 99 L48 192 L62 194 L70 118 L74 206 L100 210 L100 152Z',
  coat: 'M92 66 L76 69 Q60 73 52 99 L46 194 L61 196 L69 120 L70 300 L100 306 L100 152Z',
  dress: 'M100 73 Q94 73 91 66 L80 67 L77 98 L79 150 L66 296 L100 302Z',
};
const BOT: Record<string, string> = {
  wide: 'M78 148 L100 148 L100 205 L98 366 L57 366 L66 270 L73 205Z',
  slim: 'M78 148 L100 148 L100 205 L98 364 L82 364 L83 270 L77 205Z',
  skirt: 'M78 148 L100 148 L100 306 L62 306 Q69 228 76 172Z',
};
function fig(l: Look): string {
  const s = l.skin, sh = 'rgba(0,0,0,.1)', t = l.top, b = l.bot;
  let o = `<ellipse cx="100" cy="382" rx="58" ry="6" fill="rgba(0,0,0,.1)"/><ellipse cx="100" cy="381" rx="38" ry="3.6" fill="rgba(0,0,0,.16)"/>`;
  if (l.hs === 'long') o += `<path d="M82 30 Q80 17 100 13 Q120 17 118 30 L122 82 Q100 90 78 82Z" fill="${l.hair}"/>`;
  o += mir('M77 190 L100 192 L99 364 L85 364 L86 300 L80 250Z', s);                       // piernas
  o += mir('M64 363 L97 363 L99 374 Q80 380 62 377 Q58 370 64 363Z', l.shoe, ink);                       // zapatos
  o += mir('M100 66 L77 72 Q72 100 76 150 L78 190 L100 192Z', s);                         // torso
  if (b) {
    o += mir(BOT[b.k], b.c, ink);
    if (b.k === 'wide') o += line('M84 214 L76 362', 0.12);
    if (b.k === 'slim') o += line('M88 214 L88 360', 0.1);
    if (b.k === 'skirt') o += line('M70 200 L66 304M80 190 L78 304M90 180 L90 304', 0.12);
    o += mir('M78 148 L100 148 L100 156 L77 156Z', 'rgba(0,0,0,.16)');                    // cintura
  }
  o += mir('M74 73 Q60 76 53 101 L48 190 L60 192 L68 118 L74 100Z', s);                                         // brazos
  o += mir('M48 188 L60 192 L58 211 Q52 217 47 210Z', s);                                // manos
  if (t) {
    if (t.k === 'blazer' || t.k === 'coat') o += `<path d="M100 72 L90 66 L100 152Z" fill="${t.c2 || '#f1eee8'}"/><path d="M100 72 L110 66 L100 152Z" fill="${t.c2 || '#f1eee8'}"/>`;
    o += mir(TOP[t.k], t.c, ink);
    if (t.k === 'turtle') o += mir('M91 50 L100 50 L100 75 Q93 74 90 66Z', t.c, ink);
    if (t.k === 'blazer' || t.k === 'coat') {
      o += mir('M92 66 L82 92 L100 154 L100 130 L91 104Z', 'rgba(0,0,0,.14)');
      o += `<circle cx="97" cy="${t.k === 'coat' ? 176 : 172}" r="1.7" fill="rgba(0,0,0,.45)"/><circle cx="97" cy="${t.k === 'coat' ? 200 : 190}" r="1.7" fill="rgba(0,0,0,.45)"/>`;
      o += line(t.k === 'coat' ? 'M84 168 L80 300' : 'M84 160 L82 206', 0.12);
    }
    if (t.k === 'coat') o += mir('M70 152 L100 154 L100 164 L70 162Z', 'rgba(0,0,0,.18)');
    if (t.k === 'shirt') o += mir('M88 64 L96 60 L100 72 L92 82Z', 'rgba(255,255,255,.55)', ink) + `<path d="M100 74 L100 196" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>`;
    if (t.k === 'knit' || t.k === 'tee' || t.k === 'turtle') o += line('M80 100 L78 168', 0.1);
    if (t.k === 'dress') o += line('M88 150 L80 290M94 150 L92 296', 0.1);
  }
  o += `<path d="M94 48 L106 48 L106 68 Q100 76 94 68Z" fill="${s}"/><path d="M94 60 Q100 70 106 60 L106 68 Q100 76 94 68Z" fill="${sh}"/>`;
  o += `<ellipse cx="100" cy="32" rx="15" ry="19" fill="${s}"/><path d="M90 47 Q100 53 110 47 Q100 56 90 47Z" fill="${sh}"/>`;
  const cap = { long: 'M85 31 Q85 15 100 14 Q115 15 115 31 Q108 21 100 23 Q92 21 85 31Z', short: 'M84 31 Q84 13 100 13 Q116 13 116 31 Q108 20 100 22 Q92 20 84 31Z', bun: 'M85 31 Q85 15 100 14 Q115 15 115 31 Q108 21 100 23 Q92 21 85 31Z', crop: 'M85 28 Q86 14 100 14 Q114 14 115 28 Q108 21 100 21 Q92 21 85 28Z' }[l.hs];
  o += `<path d="${cap}" fill="${l.hair}"/>`;
  if (l.hs === 'bun') o += `<ellipse cx="100" cy="9" rx="8" ry="6.5" fill="${l.hair}"/>`;
  const body = l.m ? `<g transform="translate(100 0) scale(1.1 1) translate(-100 0)">${o}</g>` : o;
  return `<svg class="tz-fig" viewBox="0 0 200 400" aria-hidden="true">${body}</svg>`;
}

// ---------- catálogo ----------
type P = { id: string; n: string; p: number; sx: 'Mujer' | 'Hombre'; k: string; kn: string; bg: string; look: Look; tag?: string; d: string; comp: string; col: string };
const L = '#e2b99a', M = '#a8704c', D = '#6e4630';
const P_: P[] = [
  { id: 'a1', n: 'Abrigo largo cruzado', p: 2999, sx: 'Mujer', k: 'abrigos', kn: 'Abrigos', bg: '#e6ddd0', tag: 'Nuevo', col: 'Camel', comp: '70 % lana, 30 % poliamida', d: 'Abrigo de corte recto con solapas amplias, cinturón y caída larga. Pensado para llevarlo abierto o ceñido.', look: { skin: L, hair: '#2b1e17', hs: 'long', top: { k: 'coat', c: '#b78d5f', c2: '#efe9de' }, bot: { k: 'slim', c: '#34363b' }, shoe: '#2a2a2c' } },
  { id: 'a2', n: 'Blazer sastre oversize', p: 1999, sx: 'Mujer', k: 'sastre', kn: 'Sastrería', bg: '#d8d6d1', col: 'Carbón', comp: '55 % poliéster, 43 % viscosa, 2 % elastano', d: 'Blazer de hombros marcados y largo hasta la cadera. Funciona con todo, de la oficina a la noche.', look: { skin: M, hair: '#171212', hs: 'bun', top: { k: 'blazer', c: '#3c3e44', c2: '#f3f0ea' }, bot: { k: 'wide', c: '#d9d2c4' }, shoe: '#f1efe9' } },
  { id: 'a3', n: 'Vestido midi satinado', p: 1299, sx: 'Mujer', k: 'vestidos', kn: 'Vestidos', bg: '#d3d9de', tag: 'Nuevo', col: 'Arena', comp: '100 % poliéster reciclado', d: 'Vestido de tirantes con caída fluida y largo midi. Tela satinada con brillo suave.', look: { skin: D, hair: '#1b1411', hs: 'short', top: { k: 'dress', c: '#d7c3a6' }, shoe: '#f1efe9' } },
  { id: 'a4', n: 'Pantalón wide-leg', p: 999, sx: 'Mujer', k: 'pantalones', kn: 'Pantalones', bg: '#e0dcd3', col: 'Crema', comp: '65 % viscosa, 35 % lino', d: 'Pantalón de talle alto y pierna ancha con caída larga. Fresco y fácil de combinar.', look: { skin: L, hair: '#6a4630', hs: 'long', top: { k: 'tee', c: '#f6f4ee' }, bot: { k: 'wide', c: '#d8cdb8' }, shoe: '#2a2a2c' } },
  { id: 'a5', n: 'Suéter de punto cuello alto', p: 799, sx: 'Mujer', k: 'punto', kn: 'Punto', bg: '#e7d9cf', col: 'Terracota', comp: '50 % algodón, 50 % lana merino', d: 'Suéter de punto fino con cuello alto. Suave, ligero y cálido.', look: { skin: M, hair: '#2b1e17', hs: 'bun', top: { k: 'turtle', c: '#b4694a' }, bot: { k: 'slim', c: '#2e3a52' }, shoe: '#f1efe9' } },
  { id: 'a6', n: 'Falda plisada midi', p: 899, sx: 'Mujer', k: 'vestidos', kn: 'Faldas', bg: '#d6dae0', col: 'Azul marino', comp: '100 % poliéster reciclado', d: 'Falda plisada de largo midi y cintura elástica. Se mueve con cada paso.', look: { skin: L, hair: '#171212', hs: 'short', top: { k: 'knit', c: '#efebe3' }, bot: { k: 'skirt', c: '#2a3550' }, shoe: '#2a2a2c' } },
  { id: 'h1', n: 'Abrigo de lana largo', p: 3499, sx: 'Hombre', k: 'abrigos', kn: 'Abrigos', bg: '#d8d6d2', tag: 'Nuevo', col: 'Gris humo', comp: '80 % lana, 20 % poliamida', d: 'Abrigo largo de lana con solapa y botonadura sencilla. Un clásico de temporada.', look: { m: true, skin: M, hair: '#1b1411', hs: 'crop', top: { k: 'coat', c: '#5a5d63', c2: '#e8e5de' }, bot: { k: 'slim', c: '#2d2f35' }, shoe: '#26262a' } },
  { id: 'h2', n: 'Blazer deconstruido', p: 2299, sx: 'Hombre', k: 'sastre', kn: 'Sastrería', bg: '#e2dccf', col: 'Topo', comp: '60 % lino, 40 % algodón', d: 'Blazer sin forro de hombros suaves. Estructura ligera para entretiempo.', look: { m: true, skin: L, hair: '#4a3626', hs: 'short', top: { k: 'blazer', c: '#9a8b76', c2: '#f3f0ea' }, bot: { k: 'slim', c: '#2e3a52' }, shoe: '#f1efe9' } },
  { id: 'h3', n: 'Camisa de lino', p: 799, sx: 'Hombre', k: 'basicos', kn: 'Camisas', bg: '#cdd3dc', col: 'Blanco roto', comp: '100 % lino', d: 'Camisa de manga larga con cuello clásico. Lino lavado, fresco y con caída natural.', look: { m: true, skin: D, hair: '#151111', hs: 'crop', top: { k: 'shirt', c: '#f1eee6' }, bot: { k: 'slim', c: '#c7b79a' }, shoe: '#2a2a2c' } },
  { id: 'h4', n: 'Pantalón de pinzas', p: 999, sx: 'Hombre', k: 'pantalones', kn: 'Pantalones', bg: '#dcd8cf', col: 'Arena', comp: '70 % algodón, 30 % lino', d: 'Pantalón de pinzas con pierna recta y talle alto. Elegante sin esfuerzo.', look: { m: true, skin: M, hair: '#201814', hs: 'short', top: { k: 'tee', c: '#2f3342' }, bot: { k: 'wide', c: '#bba98a' }, shoe: '#f1efe9' } },
  { id: 'h5', n: 'Suéter de punto', p: 899, sx: 'Hombre', k: 'punto', kn: 'Punto', bg: '#d9dde3', col: 'Azul marino', comp: '100 % algodón', d: 'Suéter de punto liso con cuello redondo. Una base para toda la semana.', look: { m: true, skin: L, hair: '#3a2a1f', hs: 'crop', top: { k: 'knit', c: '#2b3550' }, bot: { k: 'slim', c: '#d3cbbb' }, shoe: '#f1efe9' } },
  { id: 'h6', n: 'Playera básica', p: 349, sx: 'Hombre', k: 'basicos', kn: 'Básicos', bg: '#d5cfc6', col: 'Marfil', comp: '100 % algodón orgánico', d: 'Playera de cuello redondo y corte regular. Algodón grueso que conserva la forma.', look: { m: true, skin: D, hair: '#111010', hs: 'crop', top: { k: 'tee', c: '#f4f1ea' }, bot: { k: 'wide', c: '#4a4d54' }, shoe: '#f1efe9' } },
];
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;
const SZ = ['XS', 'S', 'M', 'L', 'XL'];
const byId = (id: string) => P_.find((p) => p.id === id)!;
// el fondo de estudio (papel continuo con luz) lo pone el CSS con --bg
const ph = (p: P, cls = '') => `<div class="tz-ph ${cls}" style="--bg:${p.bg}">${fig(p.look)}</div>`;
const tile = (p: P) => `<article class="tz-p rv" data-int="tpdp" data-id="${p.id}" data-k="${p.k}" data-n="${p.n}" data-p="${p.p}" data-bg="${p.bg}" data-sx="${p.sx}" data-kn="${p.kn}" data-col="${p.col}" data-comp="${p.comp}" data-d="${p.d}">
${ph(p)}${p.tag ? `<span class="tz-tag">${p.tag}</span>` : ''}<div class="tz-qs"><small>Añadir rápido</small><div>${SZ.map((s) => `<button type="button" data-int="tadd" data-id="${p.id}" data-s="${s}">${s}</button>`).join('')}</div></div>
<div class="tz-pi"><div><b>${p.n}</b><span>${p.col}</span></div><em>${money(p.p)}</em></div></article>`;
const fil = (sx: string) => {
  const m = new Map<string, string>(); P_.filter((p) => p.sx === sx).forEach((p) => { if (!m.has(p.k)) m.set(p.k, p.k === 'vestidos' ? 'Vestidos y faldas' : p.kn); });
  return [['todo', 'Todo'], ...m].map(([k, t]) => `<button type="button" class="tz-f" data-int="tfil" data-f="${k}">${t}</button>`).join('');
};

// ---------- elementos de estudio ----------
const softbox = `<svg class="tz-gear" viewBox="0 0 80 240" aria-hidden="true"><path d="M40 118V236M18 236L40 214L62 236" stroke="#8b8a86" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="8" y="14" width="64" height="88" rx="3" fill="#f6f4ee" stroke="#a7a59f" stroke-width="2"/><rect x="14" y="20" width="52" height="76" fill="#fff"/><path d="M40 102V118" stroke="#8b8a86" stroke-width="3"/></svg>`;
const g3 = [P_[0], P_[1], P_[3]];

// ---------- 1 · identidad ----------
const brand = `<div class="pg tz-brand" data-rp="light"><div class="tzb-bg"></div>
<div class="tzb-t mw-f" style="--d:.2s"><span>Manual de marca</span><span>Made by <b><i class="wl">Human</i><i class="ws">Corp</i></b></span></div>
<div class="tzb-fig mw-f" style="--d:.5s">${fig(P_[1].look)}</div>
<div class="tzb-wm mw-f" style="--d:.35s"><b>TRAMA</b><span>Moda de estudio · Colección otoño 26</span></div>
<div class="tzb-sw"><i style="--c:#e6ddd0"></i><i style="--c:#b78d5f"></i><i style="--c:#3c3e44"></i><i style="--c:#f3f0ea"></i><i style="--c:#d8cdb8"></i></div></div>`;

// ---------- 2 · tienda: navegación, inicio, mujer, hombre, studio y cesta ----------
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const tabsN: [string, string][] = [['mujer', 'Mujer'], ['hombre', 'Hombre'], ['studio', 'Studio']];
const nav = `<div class="tz-nav mw-f" style="--d:.1s"><nav>${tabsN.map(([k, t]) => `<button type="button" class="tz-t" ${go(k)} data-t="${k}">${t}</button>`).join('')}</nav><button type="button" class="tz-logo" ${go('inicio')}>TRAMA</button><div class="tz-r"><span>Buscar</span><span>Cuenta</span><button type="button" data-int="tbag" class="tz-cb">Cesta (<i data-cn>0</i>)</button></div></div>
<button type="button" class="wn-ex" data-int="wex" aria-label="Ver en pantalla completa"><i></i>Entrar al sitio</button>
<aside class="tz-bag"><div class="tz-bh"><b>Cesta (<i data-cn>0</i>)</b><button type="button" data-int="tbag" aria-label="Cerrar">${svg('x')}</button></div><ul class="tz-bl"></ul><p class="tz-be">Tu cesta está vacía.</p>
<div class="tz-bf"><div><span>Subtotal</span><b data-tot>$0</b></div><button type="button" class="tz-bb" data-int="tbuy">Tramitar pedido</button><small>Envío gratis desde $1,200 · Cambios en 30 días</small></div>
<div class="tz-bd"><i>${svg('check')}</i><h4>¡Gracias por tu compra!</h4><p>Pedido TR-<span data-code>2041</span>. Te avisamos por correo cuando salga.</p><button type="button" data-int="tbag">Seguir comprando</button></div></aside>`;

const cat = (t: string, sx: string, p: P) => `<article class="tz-cat rv" ${go(sx.toLowerCase())}>${ph(p, 'tz-wide')}<div class="tz-cl"><b>${t}</b><span>Ver colección</span></div></article>`;
const spots: [number, number, string, string][] = [[20, 42, 'a1', 'Abrigo largo cruzado'], [50, 42, 'a2', 'Blazer sastre oversize'], [80, 68, 'a4', 'Pantalón wide-leg']];
const looks = `<div class="tz-look rv"><div class="tz-lb"><i class="tz-wall"></i><i class="tz-floor"></i>${softbox}<div class="tz-trio">${g3.map((p) => fig(p.look)).join('')}</div>
${spots.map(([x, y, id, n]) => `<button type="button" class="tz-hot" style="left:${x}%;top:${y}%" data-int="tpdp" data-id="${id}"><i></i><span>${n}<b>${money(byId(id).p)}</b></span></button>`).join('')}</div>
<div class="tz-lt"><p class="tz-k">Studio 01</p><h3>Siluetas de otoño, tres looks</h3><p>Abrigos largos, sastrería holgada y pantalones de pierna ancha. Un solo fondo, una sola luz.</p><button type="button" class="tz-ln" ${go('studio')}>Ver el studio</button></div></div>`;

const studioScenes: [string, string, string, string[], string][] = [
  ['Studio 01', 'Siluetas de otoño', 'Abrigos largos, sastrería holgada y pantalones de pierna ancha.', ['a1', 'a2', 'a4'], '#e6ddd0'],
  ['Studio 02', 'Punto y color', 'Suéteres de punto fino en tonos tierra, con faldas y pantalones sencillos.', ['a5', 'a6', 'h5'], '#e4d6cc'],
  ['Studio 03', 'Básicos de hombre', 'Lino, algodón y lana en una paleta corta que se combina sola.', ['h1', 'h3', 'h6'], '#d3d6dc'],
];
const scene = ([k, t, d, ids, bg]: (typeof studioScenes)[number], i: number) => `<div class="tz-sc rv" style="--bg:${bg}"><div class="tz-stage">${softbox}<div class="tz-trio">${ids.map((id) => fig(byId(id).look)).join('')}</div></div><div class="tz-sd ${i % 2 ? 'r' : ''}"><p class="tz-k">${k}</p><h3>${t}</h3><p>${d}</p><div class="tz-mini">${ids.map((id) => `<button type="button" data-int="tpdp" data-id="${id}"><b>${byId(id).n}</b><span>${money(byId(id).p)}</span></button>`).join('')}</div></div></div>`;

const serv: [string, string][] = [['Envío gratis', 'En pedidos desde $1,200'], ['Cambios en 30 días', 'En tienda o por mensajería'], ['Pago seguro', 'Tarjeta, transferencia y efectivo'], ['Recoge en tienda', 'Listo en 2 horas']];
const foot = `<footer class="tz-ft"><div class="tz-fg"><div><p class="tz-k">Ayuda</p>${['Pedidos y envíos', 'Cambios y devoluciones', 'Guía de tallas', 'Contacto'].map((x) => `<span>${x}</span>`).join('')}</div><div><p class="tz-k">Tienda</p>${tabsN.map(([k, t]) => `<button type="button" ${go(k)}>${t}</button>`).join('')}</div><div><p class="tz-k">Síguenos</p><span>Instagram</span><span>TikTok</span><span>Pinterest</span></div><div class="tz-nl"><p class="tz-k">Boletín</p><p>Novedades y ediciones de studio, una vez al mes.</p><div><input type="text" placeholder="Tu correo" aria-label="Correo" /><button type="button">Suscribirme</button></div></div></div><b class="tz-big" aria-hidden="true">TRAMA</b><p class="tz-cp">Concepto de HumanCorp · Datos de ejemplo</p></footer>`;

export const siteHTML = `<div class="pg mr-web tz-web" data-rp="light" data-tab="inicio" data-fil="todo" data-bag="[]">
${nav}
<div class="mw-scroll">

<section class="tz-v tz-inicio">
 <div class="tz-hero"><div class="tz-cyc"></div><div class="tz-flr"></div>${softbox}<div class="tz-hm mw-f" style="--d:.5s">${fig(P_[0].look)}</div>
  <div class="tz-ht"><p class="tz-k mw-f" style="--d:.3s">Colección otoño · 26</p><h2 class="tz-h"><span class="mw-w" style="--d:.45s">Studio</span><span class="mw-w" style="--d:.7s">Edit 01</span></h2><p class="tz-hs mw-f" style="--d:1s">Siluetas largas, tejidos nobles y una paleta de tierra. Hecha en estudio, para llevar a diario.</p>
   <div class="tz-hl mw-f" style="--d:1.2s"><button type="button" ${go('mujer')}>Ver mujer</button><button type="button" ${go('hombre')}>Ver hombre</button></div></div></div>
 <div class="tz-cats">${cat('Mujer', 'Mujer', P_[1])}${cat('Hombre', 'Hombre', P_[6])}</div>
 <div class="tz-sec"><div class="tz-sh"><p class="tz-k rv">Novedades</p><button type="button" class="tz-ln" ${go('mujer')}>Ver todo</button></div><div class="tz-row">${[P_[0], P_[2], P_[6], P_[4]].map(tile).join('')}</div></div>
 ${looks}
 <div class="tz-serv">${serv.map(([a, b]) => `<div class="rv"><b>${a}</b><span>${b}</span></div>`).join('')}</div>
 <div class="tz-sec"><div class="tz-sh"><p class="tz-k rv">Más vendido</p></div><div class="tz-row">${[P_[3], P_[8], P_[1], P_[11]].map(tile).join('')}</div></div>
 ${foot}
</section>

<section class="tz-v tz-mujer"><div class="tz-ph0"><p class="tz-k rv">Colección</p><h2 class="tz-t2 rv">Mujer</h2></div><div class="tz-fb rv">${fil('Mujer')}</div>
 <div class="tz-grid">${P_.filter((p) => p.sx === 'Mujer').map(tile).join('')}</div>${foot}</section>

<section class="tz-v tz-hombre"><div class="tz-ph0"><p class="tz-k rv">Colección</p><h2 class="tz-t2 rv">Hombre</h2></div><div class="tz-fb rv">${fil('Hombre')}</div>
 <div class="tz-grid">${P_.filter((p) => p.sx === 'Hombre').map(tile).join('')}</div>${foot}</section>

<section class="tz-v tz-studio"><div class="tz-ph0"><p class="tz-k rv">Studio</p><h2 class="tz-t2 rv">Tres ediciones, un mismo fondo</h2></div>${studioScenes.map(scene).join('')}${foot}</section>

<section class="tz-v tz-prod"></section>

</div></div>`;

// ---------- 3 · panel de la tienda (reverso de la hoja del sitio) ----------
const kpis: [string, string, string][] = [['Ventas hoy', '$48,320', '+12 %'], ['Pedidos', '64', '+8 %'], ['Conversión', '3.4 %', '+0.4'], ['Ticket promedio', '$755', '−2 %']];
const days = [['L', 46], ['M', 58], ['X', 52], ['J', 71], ['V', 88], ['S', 100], ['D', 64]] as [string, number][];
const orders: [string, string, string, string, string][] = [['TR-2041', 'Mariana R.', 'Abrigo largo cruzado · M', '$2,999', 'Pagado'], ['TR-2040', 'Andrés P.', 'Camisa de lino · L', '$799', 'Preparando'], ['TR-2039', 'Lucía F.', 'Vestido midi satinado · S', '$1,299', 'Enviado'], ['TR-2038', 'Diego S.', 'Blazer deconstruido · M', '$2,299', 'Pagado'], ['TR-2037', 'Paula C.', 'Falda plisada midi · XS', '$899', 'Enviado']];
const stock: [string, number][] = [['Abrigo largo cruzado · M', 12], ['Blazer sastre oversize · S', 22], ['Camisa de lino · L', 38], ['Pantalón wide-leg · XS', 64]];
const dash = `<div class="pg tz-dash" data-rp="light"><aside class="td-s"><b>TRAMA<small>Panel</small></b>${[['crm', 'Resumen', 1], ['bag', 'Pedidos', 0], ['clip', 'Productos', 0], ['dat', 'Inventario', 0], ['crm', 'Clientes', 0], ['bolt', 'Campañas', 0], ['ia', 'Asistente', 0]].map(([i, t, on]) => `<span class="${on ? 'on' : ''}">${svg(String(i))}${t}</span>`).join('')}</aside>
<main class="td-m"><header><div><p>Buenos días, Sofía</p><h4>Resumen de la tienda</h4></div><i>Hoy · 17 nov</i></header>
<div class="td-k">${kpis.map(([a, b, c]) => `<div class="mw-f" style="--d:.2s"><small>${a}</small><b>${b}</b><em class="${c.startsWith('−') ? 'dn' : ''}">${c}</em></div>`).join('')}</div>
<div class="td-g"><section class="td-c"><h6>Ventas de la semana</h6><div class="td-b">${days.map(([d, v], i) => `<span style="--h:${v}%;--i:${i}"><i></i><small>${d}</small></span>`).join('')}</div></section>
<section class="td-c"><h6>Inventario bajo</h6><ul class="td-i">${stock.slice(0, 3).map(([n, v]) => `<li><span>${n}</span><b>${v}</b><i style="--v:${v}%"></i></li>`).join('')}</ul></section></div>
<div class="td-g"><section class="td-c td-o"><h6>Pedidos recientes</h6><table>${orders.slice(0, 2).map(([a, b, c, d, e]) => `<tr><td>${a}</td><td>${c}</td><td>${d}</td><td><em class="s-${e}">${e}</em></td></tr>`).join('')}</table></section>
<section class="td-ia"><i>${svg('ia')}</i><p><b>Asistente</b>El abrigo largo cruzado (M) se agota en unos 5 días. Sugiero reabastecer M y L.</p></section></div></main></div>`;

// ---------- ficha del proyecto: misma página «Contenido» del libro ----------
const hd: [string, string][] = [['Identidad de marca', 'Logotipo y manual'], ['Tienda en línea', 'Catálogo, tallas y cesta'], ['Fichas de producto', 'Fotos, detalle y composición'], ['Studio / lookbook', 'Looks con compra directa'], ['Pedidos', 'Pago y seguimiento'], ['Inventario', 'Existencias por talla'], ['Ventas y reportes', 'Tablero diario'], ['Asistente con IA', 'Alertas y sugerencias'], ['Datos e infraestructura', 'Respaldos y monitoreo']];
const caseHTML = `<div class="pg lt pc mr-case tr-case"><div class="pc-top"><b><span class="wl">HUMAN</span> <span class="ws">CORP</span></b><span>Proyecto Trama · 2025</span></div>
<div class="pc-l"><h4>Lo que se hizo</h4><p>${hd.length} entregables</p></div>
<ul class="pc-r">${hd.map(([t, d], n) => `<li><div class="pc-i"><em>${String(n + 1).padStart(2, '0')}</em><b>${t}</b><i></i><span>${d}</span></div></li>`).join('')}</ul>
<p class="pc-f">Trama · ecommerce de moda · concepto, datos de ejemplo</p><span class="bk-pn">10</span></div>`;

export const tramaLeaves = (): { f: string; b: string }[] => [{ f: brand, b: caseHTML }, { f: siteHTML, b: dash }];
export const tramaPieces = [{ t: 'Identidad', h: brand }, { t: 'Proyecto', h: caseHTML }, { t: 'Tienda', h: siteHTML }, { t: 'Panel', h: dash }];
