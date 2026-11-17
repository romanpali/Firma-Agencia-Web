// Proyecto «Trama» (concepto): ecommerce de moda urbana tipo Zara, con fotografía de modelos. Identidad, tienda navegable (producto, talla, cesta), panel de tienda con asistente.
// Cada pieza es una página del libro (40em × 26.7em), en HTML/CSS. Estilos en styles/trama.css; la lógica de la tienda, en trama-site.ts (clics delegados por data-int="t…").
import { svg } from './marea-ico';

// ---------- catálogo (una foto por prenda: /public/obra/trama/<id>.webp) ----------
type P = { id: string; n: string; p: number; sx: 'Mujer' | 'Hombre'; k: string; kn: string; tag?: string; d: string; comp: string; col: string };
const P_: P[] = [
  { id: 'h1', n: 'Sudadera con capucha lavada', p: 899, sx: 'Hombre', k: 'sudaderas', kn: 'Sudaderas', col: 'Gris carbón', comp: '100 % algodón, lavado a la piedra', d: 'Sudadera oversize con capucha amplia y hombros caídos. Algodón grueso con acabado lavado.' },
  { id: 'h2', n: 'Pantalón cargo oversize', p: 999, sx: 'Hombre', k: 'pantalones', kn: 'Pantalones', col: 'Verde militar', comp: '100 % algodón', d: 'Pantalón cargo de pierna ancha con bolsillos laterales. Tela desgastada, de talle medio.' },
  { id: 'h3', n: 'Chamarra bomber de felpa', p: 1299, sx: 'Hombre', k: 'chamarras', kn: 'Chamarras', col: 'Azul lavado', comp: '80 % algodón, 20 % poliéster', d: 'Bomber con cierre completo y puños elásticos. Corte amplio y felpa suave por dentro.' },
  { id: 'h4', n: 'Plumífero acolchado', p: 1799, sx: 'Hombre', k: 'chamarras', kn: 'Chamarras', col: 'Verde oliva', comp: 'Relleno 100 % poliéster reciclado', d: 'Plumífero corto con cuello alto y bolsillos de mano. Abriga sin pesar.' },
  { id: 'h5', n: 'Sudadera oversize con bolsillo', p: 899, sx: 'Hombre', k: 'sudaderas', kn: 'Sudaderas', col: 'Azul marino', comp: '100 % algodón', d: 'Sudadera de caída ancha con bolsillo canguro y puños acanalados.' },
  { id: 'h6', n: 'Plumífero rojo', p: 1799, sx: 'Hombre', k: 'chamarras', kn: 'Chamarras', tag: 'Nuevo', col: 'Rojo', comp: 'Relleno 100 % poliéster reciclado', d: 'Plumífero de color con cierre y cuello alto. La pieza de la temporada.' },
  { id: 'm1', n: 'Chaleco acolchado', p: 1199, sx: 'Mujer', k: 'chamarras', kn: 'Chamarras', tag: 'Nuevo', col: 'Azul eléctrico', comp: 'Relleno 100 % poliéster reciclado', d: 'Chaleco acolchado con cuello alto. Para ponerlo sobre una sudadera y listo.' },
  { id: 'm2', n: 'Chamarra varsity con parches', p: 1899, sx: 'Mujer', k: 'chamarras', kn: 'Chamarras', tag: 'Nuevo', col: 'Guinda y crema', comp: 'Poliuretano, forro de poliéster', d: 'Varsity de efecto piel con parches bordados, botones de presión y puños a rayas.' },
  { id: 'm3', n: 'Chamarra bomber desgastada', p: 1599, sx: 'Mujer', k: 'chamarras', kn: 'Chamarras', col: 'Verde', comp: '100 % algodón', d: 'Bomber de algodón con lavado desgastado, cierre doble y hombros amplios.' },
  { id: 'm4', n: 'Suéter jacquard', p: 999, sx: 'Mujer', k: 'punto', kn: 'Punto', col: 'Mostaza', comp: '60 % acrílico, 40 % lana', d: 'Suéter de punto con estampado jacquard en contraste. Cuello redondo y caída ancha.' },
  { id: 'm5', n: 'Chamarra polar bicolor', p: 1299, sx: 'Mujer', k: 'chamarras', kn: 'Chamarras', tag: 'Nuevo', col: 'Morado y crudo', comp: '100 % poliéster reciclado', d: 'Chamarra de borrego con bloques de color y cierre completo. Cálida y ligera.' },
  { id: 'm6', n: 'Camisa de franela a cuadros', p: 899, sx: 'Mujer', k: 'camisas', kn: 'Camisas', col: 'Naranja', comp: '100 % algodón', d: 'Sobrecamisa de franela con bolsillos de parche. Se lleva abierta sobre una sudadera.' },
];
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;
const SZ = ['XS', 'S', 'M', 'L', 'XL'];
const byId = (id: string) => P_.find((p) => p.id === id)!;
const src = (id: string) => `/obra/trama/${id}.webp`;
const img = (id: string, cls = 'tz-img') => `<img class="${cls}" src="${src(id)}" alt="" width="687" height="1024" decoding="async">`;
const ph = (p: P, cls = '') => `<div class="tz-ph ${cls}">${img(p.id)}</div>`;
const tile = (p: P) => `<article class="tz-p rv" data-int="tpdp" data-id="${p.id}" data-k="${p.k}" data-n="${p.n}" data-p="${p.p}" data-sx="${p.sx}" data-kn="${p.kn}" data-col="${p.col}" data-comp="${p.comp}" data-d="${p.d}">
${ph(p)}${p.tag ? `<span class="tz-tag">${p.tag}</span>` : ''}<div class="tz-qs"><small>Añadir rápido</small><div>${SZ.map((s) => `<button type="button" data-int="tadd" data-id="${p.id}" data-s="${s}">${s}</button>`).join('')}</div></div>
<div class="tz-pi"><div><b>${p.n}</b><span>${p.col}</span></div><em>${money(p.p)}</em></div></article>`;
const fil = (sx: string) => {
  const m = new Map<string, string>(); P_.filter((p) => p.sx === sx).forEach((p) => { if (!m.has(p.k)) m.set(p.k, p.kn); });
  return [['todo', 'Todo'], ...m].map(([k, t]) => `<button type="button" class="tz-f" data-int="tfil" data-f="${k}">${t}</button>`).join('');
};

// ---------- 1 · identidad ----------
const brand = `<div class="pg tz-brand" data-rp="light"><div class="tzb-bg"></div>
<div class="tzb-t mw-f" style="--d:.2s"><span>Manual de marca</span><span>Made by <b><i class="wl">Human</i><i class="ws">Corp</i></b></span></div>
<div class="tzb-ph mw-f" style="--d:.5s">${img('m2')}${img('h3')}</div>
<div class="tzb-wm mw-f" style="--d:.35s"><b>TRAMA</b><span>Moda urbana · Colección invierno 26</span></div>
<div class="tzb-sw"><i style="--c:#8b2a35"></i><i style="--c:#1f4fd8"></i><i style="--c:#d4a21f"></i><i style="--c:#3e6b4a"></i><i style="--c:#c9c7c1"></i></div></div>`;

// ---------- 2 · tienda ----------
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const tabsN: [string, string][] = [['mujer', 'Mujer'], ['hombre', 'Hombre'], ['studio', 'Lookbook']];
const nav = `<div class="tz-nav mw-f" style="--d:.1s"><nav>${tabsN.map(([k, t]) => `<button type="button" class="tz-t" ${go(k)} data-t="${k}">${t}</button>`).join('')}</nav><button type="button" class="tz-logo" ${go('inicio')}>TRAMA</button><div class="tz-r"><span>Buscar</span><span>Cuenta</span><button type="button" data-int="tbag" class="tz-cb">Cesta (<i data-cn>0</i>)</button></div></div>
<aside class="tz-bag"><div class="tz-bh"><b>Cesta (<i data-cn>0</i>)</b><button type="button" data-int="tbag" aria-label="Cerrar">${svg('x')}</button></div><ul class="tz-bl"></ul><p class="tz-be">Tu cesta está vacía.</p>
<div class="tz-bf"><div><span>Subtotal</span><b data-tot>$0</b></div><button type="button" class="tz-bb" data-int="tcart">Ver carrito y pagar</button><small>Envío gratis desde $1,200 · Cambios en 30 días</small></div>
<div class="tz-bd"><i>${svg('check')}</i><h4>¡Gracias por tu compra!</h4><p>Pedido TR-<span data-code>2041</span>. Te avisamos por correo cuando salga.</p><button type="button" data-int="tbag">Seguir comprando</button></div></aside>`;

const cat = (t: string, sx: string, id: string) => `<article class="tz-cat rv" ${go(sx.toLowerCase())}>${ph(byId(id))}<div class="tz-cl"><b>${t}</b><span>Ver colección</span></div></article>`;
const trio = (ids: string[]) => `<div class="tz-trio">${ids.map((id) => img(id)).join('')}</div>`;
const lookIds = ['h6', 'm1', 'm5'];
const looks = `<div class="tz-look rv"><div class="tz-lb">${trio(lookIds)}${lookIds.map((id, i) => `<button type="button" class="tz-hot" style="left:${16.7 + i * 33.3}%;top:${i === 1 ? 36 : 38}%" data-int="tpdp" data-id="${id}"><i></i><span>${byId(id).n}<b>${money(byId(id).p)}</b></span></button>`).join('')}</div>
<div class="tz-lt"><p class="tz-k">Edición 01</p><h3>Plumíferos y color, tres looks</h3><p>Abrigos acolchados, chalecos y polares en tonos fuertes sobre básicos grises y jeans anchos.</p><button type="button" class="tz-ln" ${go('studio')}>Ver el lookbook</button></div></div>`;

const scenes: [string, string, string, string[]][] = [
  ['Edición 01', 'Plumíferos y color', 'Abrigos acolchados, chalecos y polares en tonos fuertes sobre básicos grises y jeans anchos.', ['h6', 'm1', 'm5']],
  ['Edición 02', 'Bombers y capas', 'Chamarras de corte amplio, sudaderas debajo y pantalones de pierna ancha.', ['h3', 'm3', 'm2']],
  ['Edición 03', 'Punto, franela y sudaderas', 'Suéteres con estampado, franela a cuadros y sudaderas lavadas.', ['m4', 'm6', 'h1']],
];
const scene = ([k, t, d, ids]: (typeof scenes)[number]) => `<div class="tz-sc rv"><div class="tz-stage">${trio(ids)}</div><div class="tz-sd"><p class="tz-k">${k}</p><h3>${t}</h3><p>${d}</p><div class="tz-mini">${ids.map((id) => `<button type="button" data-int="tpdp" data-id="${id}"><b>${byId(id).n}</b><span>${money(byId(id).p)}</span></button>`).join('')}</div></div></div>`;

const serv: [string, string][] = [['Envío gratis', 'En pedidos desde $1,200'], ['Cambios en 30 días', 'En tienda o por mensajería'], ['Pago seguro', 'Tarjeta, transferencia y efectivo'], ['Recoge en tienda', 'Listo en 2 horas']];
const foot = `<footer class="tz-ft"><div class="tz-fg"><div><p class="tz-k">Ayuda</p>${['Pedidos y envíos', 'Cambios y devoluciones', 'Guía de tallas', 'Contacto'].map((x) => `<span>${x}</span>`).join('')}</div><div><p class="tz-k">Tienda</p>${tabsN.map(([k, t]) => `<button type="button" ${go(k)}>${t}</button>`).join('')}</div><div><p class="tz-k">Síguenos</p><span>Instagram</span><span>TikTok</span><span>Pinterest</span></div><div class="tz-nl"><p class="tz-k">Boletín</p><p>Novedades y ediciones nuevas, una vez al mes.</p><div><input type="text" placeholder="Tu correo" aria-label="Correo" /><button type="button">Suscribirme</button></div></div></div><b class="tz-big" aria-hidden="true">TRAMA</b><p class="tz-cp">Concepto de HumanCorp · Datos de ejemplo</p></footer>`;


// ---------- carrito y pago (de ejemplo): carrito → envío → pago → compra realizada ----------
const steps = [['cart', 'Carrito'], ['ship', 'Envío'], ['pay', 'Pago'], ['done', 'Listo']];
const field = (k: string, label: string, ph: string, extra = '') => `<label class="tz-fd${extra}"><span>${label}</span><input type="text" data-ck="${k}" placeholder="${ph}" autocomplete="off" /></label>`;
const checkout = `<div class="tz-ck">
<div class="tz-ckh"><p class="tz-k">Mi carrito</p><h2 class="tz-t2">Tu pedido</h2>
 <ol class="tz-st">${steps.map(([k, t], i) => `<li data-k="${k}"><i>${i + 1}</i><span>${t}</span></li>`).join('')}<u><b></b></u></ol></div>
<div class="tz-ckg">
 <div class="tz-ckm">
  <div class="tz-pn tz-pn-cart">
   <div class="tz-free"><p><span data-free>Te faltan $1,200 para el envío gratis</span></p><u><b data-freebar></b></u></div>
   <ul class="tz-cl2"></ul>
   <div class="tz-empty"><i>${svg('x')}</i><b>Tu carrito está vacío</b><span>Agrega algo de la colección y vuelve aquí.</span><button type="button" class="tz-b2" ${go('mujer')}>Ver colección</button></div>
   <div class="tz-code"><input type="text" data-ck="code" placeholder="Código de descuento" autocomplete="off" /><button type="button" data-int="tcode">Aplicar</button><small data-codemsg>Prueba con TRAMA10</small></div>
   <div class="tz-ac"><button type="button" class="tz-b2 ghost" ${go('mujer')}>← Seguir comprando</button><button type="button" class="tz-b2" data-int="tstep" data-s="ship">Continuar al envío</button></div>
  </div>
  <div class="tz-pn tz-pn-ship">
   <h3>Datos de envío</h3>
   <div class="tz-ff">${field('nom', 'Nombre completo', 'Sofía Reyes')}${field('mail', 'Correo', 'sofia@correo.com')}${field('tel', 'Teléfono', '55 0000 0000')}${field('cp', 'Código postal', '06600')}${field('dir', 'Calle y número', 'Av. Álvaro Obregón 120', ' wide')}${field('ciu', 'Ciudad', 'Ciudad de México', ' wide')}</div>
   <h3>Método de envío</h3>
   <div class="tz-opt">${[['std', 'Estándar', '2 a 4 días hábiles', 'Gratis desde $1,200'], ['exp', 'Express', 'Mañana antes de las 7 pm', '$199'], ['pick', 'Recoger en tienda', 'Listo en 2 horas', 'Gratis']].map(([k, t, d, p]) => `<button type="button" data-int="tship" data-o="${k}"><i></i><span><b>${t}</b><small>${d}</small></span><em>${p}</em></button>`).join('')}</div>
   <p class="tz-err" data-err>Completa tu nombre, correo y dirección para continuar.</p>
   <div class="tz-ac"><button type="button" class="tz-b2 ghost" data-int="tstep" data-s="cart">← Carrito</button><button type="button" class="tz-b2" data-int="tstep" data-s="pay">Continuar al pago</button></div>
  </div>
  <div class="tz-pn tz-pn-pay">
   <h3>Forma de pago</h3>
   <div class="tz-pm">${[['card', 'Tarjeta'], ['spei', 'Transferencia'], ['cash', 'Efectivo en tienda']].map(([k, t]) => `<button type="button" data-int="tpm" data-m="${k}">${t}</button>`).join('')}</div>
   <div class="tz-pc tz-pc-card">
    <div class="tz-cc"><i></i><b data-cc="num">•••• •••• •••• ••••</b><div><span><small>Titular</small><em data-cc="nom">NOMBRE APELLIDO</em></span><span><small>Vence</small><em data-cc="exp">MM/AA</em></span></div></div>
    <div class="tz-ff">${field('cnum', 'Número de tarjeta', '4242 4242 4242 4242', ' wide')}${field('cnom', 'Nombre en la tarjeta', 'Sofía Reyes', ' wide')}${field('cexp', 'Vencimiento', 'MM/AA')}${field('ccvv', 'CVV', '123')}</div>
   </div>
   <div class="tz-pc tz-pc-spei"><p>Te mostramos una CLABE de ejemplo al confirmar. El pedido se aparta por 24 horas.</p><b>0123 4567 8901 2345 67</b></div>
   <div class="tz-pc tz-pc-cash"><p>Pagas en cualquier tienda de conveniencia con una referencia. El pedido se aparta por 48 horas.</p><b>Ref. TR-<span data-code>2042</span>-00</b></div>
   <p class="tz-err" data-perr>Completa los datos de la tarjeta para pagar.</p>
   <p class="tz-secure">${svg('check')}Pago de demostración: no se cobra ni se guarda ningún dato.</p>
   <div class="tz-ac"><button type="button" class="tz-b2 ghost" data-int="tstep" data-s="ship">← Envío</button><button type="button" class="tz-b2 pay" data-int="tpay"><span>Pagar <b data-tot2>$0</b></span><u></u></button></div>
  </div>
  <div class="tz-pn tz-pn-done">
   <svg class="tz-ok" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" pathLength="1" /><path d="M26 41l10 10 19-21" pathLength="1" /></svg>
   <p class="tz-k">Pedido TR-<span data-code>2042</span></p><h2 class="tz-t2">Compra realizada</h2>
   <p class="tz-dn">Gracias, <span data-nm>Sofía</span>. Te enviamos la confirmación a <b data-ml>tu correo</b>. Llegará <b data-eta>en 2 a 4 días hábiles</b>.</p>
   <div class="tz-dl"><div><small>Total pagado</small><b data-paid>$0</b></div><div><small>Envío</small><b data-shn>Estándar</b></div><div><small>Pago</small><b data-pmn>Tarjeta</b></div></div>
   <div class="tz-ac c"><button type="button" class="tz-b2" data-int="tnew">Seguir comprando</button></div>
  </div>
 </div>
 <aside class="tz-ckr"><h3>Resumen</h3><ul class="tz-mi"></ul>
  <dl><div><dt>Subtotal</dt><dd data-sub>$0</dd></div><div class="dsc"><dt>Descuento</dt><dd data-disc>−$0</dd></div><div><dt>Envío</dt><dd data-shp>Gratis</dd></div><div class="tot"><dt>Total</dt><dd data-tot2>$0</dd></div></dl>
  <p class="tz-sf">${svg('check')}Pago seguro · Cambios en 30 días</p></aside>
</div></div>`;

export const siteHTML = `<div class="pg mr-web tz-web" data-rp="light" data-tab="inicio" data-fil="todo" data-bag="[]" data-step="cart" data-ship="std" data-pm="card">
${nav}
<div class="mw-scroll">

<section class="tz-v tz-inicio">
 <div class="tz-hero"><div class="tz-ht"><p class="tz-k mw-f" style="--d:.3s">Colección invierno · 26</p><h2 class="tz-h"><span class="mw-w" style="--d:.45s">Urban</span><span class="mw-w" style="--d:.7s">Edit 01</span></h2><p class="tz-hs mw-f" style="--d:1s">Capas oversize, colores fuertes y básicos que se combinan solos. Hecha para caminar la ciudad.</p>
   <div class="tz-hl mw-f" style="--d:1.2s"><button type="button" ${go('mujer')}>Ver mujer</button><button type="button" ${go('hombre')}>Ver hombre</button></div></div>
  <div class="tz-hp"><img class="tz-img" src="/obra/trama/hero.webp" alt="" width="2048" height="1144" decoding="async"><i></i></div></div>
 <div class="tz-cats">${cat('Mujer', 'Mujer', 'm2')}${cat('Hombre', 'Hombre', 'h3')}</div>
 <div class="tz-sec"><div class="tz-sh"><p class="tz-k rv">Novedades</p><button type="button" class="tz-ln" ${go('mujer')}>Ver todo</button></div><div class="tz-row">${['h6', 'm1', 'm2', 'm5'].map((i) => tile(byId(i))).join('')}</div></div>
 ${looks}
 <div class="tz-serv">${serv.map(([a, b]) => `<div class="rv"><b>${a}</b><span>${b}</span></div>`).join('')}</div>
 <div class="tz-sec"><div class="tz-sh"><p class="tz-k rv">Más vendido</p></div><div class="tz-row">${['h4', 'h1', 'm4', 'm6'].map((i) => tile(byId(i))).join('')}</div></div>
 ${foot}
</section>

<section class="tz-v tz-mujer"><div class="tz-ph0"><p class="tz-k rv">Colección</p><h2 class="tz-t2 rv">Mujer</h2></div><div class="tz-fb rv">${fil('Mujer')}</div>
 <div class="tz-grid">${P_.filter((p) => p.sx === 'Mujer').map(tile).join('')}</div>${foot}</section>

<section class="tz-v tz-hombre"><div class="tz-ph0"><p class="tz-k rv">Colección</p><h2 class="tz-t2 rv">Hombre</h2></div><div class="tz-fb rv">${fil('Hombre')}</div>
 <div class="tz-grid">${P_.filter((p) => p.sx === 'Hombre').map(tile).join('')}</div>${foot}</section>

<section class="tz-v tz-studio"><div class="tz-ph0"><p class="tz-k rv">Lookbook</p><h2 class="tz-t2 rv">Tres ediciones, una misma calle</h2></div>${scenes.map(scene).join('')}${foot}</section>

<section class="tz-v tz-prod"></section>
<section class="tz-v tz-carrito">${checkout}${foot}</section>

</div></div>`;

// ---------- 3 · panel de la tienda (reverso de la hoja del sitio): interactivo, lógica en trama-dash.ts ----------
const RANGE: [string, string, string][][] = [[['Ventas', '$48,320', '+12 %'], ['Pedidos', '64', '+8 %'], ['Conversión', '3.4 %', '+0.4'], ['Ticket promedio', '$755', '−2 %']], [['Ventas', '$312,900', '+9 %'], ['Pedidos', '421', '+6 %'], ['Conversión', '3.1 %', '+0.2'], ['Ticket promedio', '$743', '−1 %']], [['Ventas', '$1,284,500', '+14 %'], ['Pedidos', '1,736', '+11 %'], ['Conversión', '3.3 %', '+0.5'], ['Ticket promedio', '$740', '+1 %']]];
const days = [['L', 46], ['M', 58], ['X', 52], ['J', 71], ['V', 88], ['S', 100], ['D', 64]] as [string, number][];
const orders: [string, string, string, string, string][] = [['TR-2041', 'Mariana R.', 'Plumífero rojo · M', '$1,799', 'Pagado'], ['TR-2040', 'Andrés P.', 'Sudadera con capucha · L', '$899', 'Preparando'], ['TR-2039', 'Lucía F.', 'Chaleco acolchado · S', '$1,199', 'Enviado'], ['TR-2038', 'Diego S.', 'Pantalón cargo · M', '$999', 'Entregado'], ['TR-2037', 'Paula C.', 'Chamarra varsity · XS', '$1,899', 'Pagado'], ['TR-2036', 'Jorge T.', 'Plumífero acolchado · L', '$1,799', 'Preparando']];
const stock: [string, string, number][] = [['h6', 'Plumífero rojo · M', 12], ['m2', 'Chamarra varsity · S', 22], ['m1', 'Chaleco acolchado · L', 38], ['h2', 'Pantalón cargo · M', 64], ['m5', 'Chamarra polar · S', 9], ['h1', 'Sudadera con capucha · L', 80]];
const sw = (on = true) => `<button type="button" class="td-sw${on ? ' on' : ''}" data-int="dsw" aria-label="Activar o desactivar"><i></i></button>`;
const customers: [string, number, string, string][] = [['Mariana Reyes', 7, '$9,840', 'VIP'], ['Andrés Pérez', 4, '$4,290', ''], ['Lucía Fuentes', 3, '$3,100', ''], ['Diego Salas', 5, '$6,720', 'VIP'], ['Paula Cruz', 2, '$2,160', 'Nueva']];
const camps: [string, string, string, string, boolean][] = [['Plumíferos de temporada', 'Instagram · Reels', '$4,200', '4.8x', true], ['Recupera tu cesta', 'Correo automático', '$300', '9.2x', true], ['Lookbook edición 02', 'TikTok', '$2,800', '2.4x', false]];
const dnav: [string, string, string][] = [['resumen', 'Resumen', 'crm'], ['pedidos', 'Pedidos', 'bag'], ['productos', 'Productos', 'clip'], ['inventario', 'Inventario', 'dat'], ['clientes', 'Clientes', 'crm'], ['campanas', 'Campañas', 'bolt'], ['automatizaciones', 'Automatizaciones', 'ops'], ['asistente', 'Asistente', 'ia']];
const FLOWS: [string, string[], number, string, boolean][] = [
  ['Recupera tu cesta', ['Cesta abandonada · 1 h', 'Correo con la foto de la prenda', 'Cupón de 10 % a las 24 h'], 128, 'Cesta recuperada · Mariana R.', true],
  ['Confirmación de pedido', ['Pedido pagado', 'WhatsApp con el resumen', 'Aviso al almacén'], 421, 'Pedido TR-2042 confirmado', true],
  ['Alerta de inventario', ['Stock menor a 15 piezas', 'Aviso al asistente', 'Pedido sugerido al proveedor'], 6, 'Plumífero rojo · M, stock bajo', true],
  ['Reseña después de la compra', ['Pedido entregado + 5 días', 'Correo pidiendo reseña'], 212, 'Reseña solicitada · Diego S.', false],
];
const FIL = ['todo', 'Pagado', 'Preparando', 'Enviado', 'Entregado'];
const dash = `<div class="pg tz-dash" data-rp="light" data-v="resumen" data-of="todo" data-r="0"><aside class="td-s"><b>TRAMA<small>Panel</small></b>${dnav.map(([k, t, i]) => `<button type="button" data-int="dnav" data-v="${k}">${svg(i)}${t}</button>`).join('')}</aside>
<main class="td-m">
<section class="td-vw v-resumen"><header><div><p>Buenos días, Sofía</p><h4>Resumen de la tienda</h4></div><div class="td-ch">${['Hoy', '7 días', '30 días'].map((t, i) => `<button type="button" data-int="drg" data-r="${i}">${t}</button>`).join('')}</div></header>
<div class="td-k">${RANGE[0].map(([a, b, c], i) => `<div data-k="${i}"><small>${a}</small><b>${b}</b><em class="${c.startsWith('−') ? 'dn' : ''}">${c}</em></div>`).join('')}</div>
<div class="td-g"><section class="td-c"><h6>Ventas de la semana</h6><div class="td-b">${days.map(([d, v], i) => `<span style="--h:${v}%;--i:${i}"><i></i><small>${d}</small></span>`).join('')}</div></section>
<section class="td-c"><h6>Inventario bajo</h6><ul class="td-i">${stock.slice(0, 3).map(([, n, v]) => `<li><span>${n}</span><b>${v}</b><i style="--v:${v}%"></i></li>`).join('')}</ul></section></div>
<div class="td-g"><section class="td-c td-o"><h6>Pedidos recientes</h6><table>${orders.slice(0, 2).map(([a, , c, d, e]) => `<tr><td>${a}</td><td>${c}</td><td>${d}</td><td><em class="s-${e}">${e}</em></td></tr>`).join('')}</table></section>
<section class="td-ia"><i>${svg('ia')}</i><p><b>Asistente</b>El plumífero rojo (M) se agota en unos 5 días. Sugiero reabastecer M y L.</p></section></div></section>

<section class="td-vw v-pedidos"><header><div><p>Gestión</p><h4>Pedidos</h4></div><div class="td-ch">${FIL.map((f) => `<button type="button" data-int="dfil" data-f="${f}">${f === 'todo' ? 'Todos' : f}</button>`).join('')}</div></header>
<div class="td-c td-o"><table>${orders.map(([a, b, c, d, e]) => `<tr data-st="${e}"><td>${a}</td><td>${b}</td><td>${c}</td><td>${d}</td><td><button type="button" class="td-st s-${e}" data-int="dord">${e}</button></td></tr>`).join('')}</table></div><p class="td-hint">Toca el estado de un pedido para avanzarlo: Pagado, Preparando, Enviado y Entregado.</p></section>

<section class="td-vw v-productos"><header><div><p>Catálogo</p><h4>Productos</h4></div><i class="td-pill">12 prendas</i></header>
<div class="td-pg">${['h6', 'm1', 'm2', 'm5', 'h4', 'm4'].map((id) => { const p = byId(id); return `<div class="td-pc"><div class="tz-ph">${img(id)}</div><b>${p.n}</b><span>${money(p.p)}</span><div class="td-pr"><small>Visible en la tienda</small>${sw()}</div></div>`; }).join('')}</div></section>

<section class="td-vw v-inventario"><header><div><p>Existencias por talla M</p><h4>Inventario</h4></div><i class="td-pill">Toca «Reabastecer» para sumar 24</i></header>
<div class="td-c"><ul class="td-inv">${stock.map(([id, n, v]) => `<li data-s="${v}" class="${v < 20 ? 'low' : ''}"><div class="tz-ph">${img(id)}</div><span>${n}</span><b>${v}</b><i style="--v:${Math.min(100, v)}%"></i><button type="button" data-int="dstk">Reabastecer</button></li>`).join('')}</ul></div></section>

<section class="td-vw v-clientes"><header><div><p>Relación con clientes</p><h4>Clientes</h4></div><i class="td-pill">1,248 en total</i></header>
<div class="td-c td-o"><table><tr class="th"><td>Cliente</td><td>Pedidos</td><td>Gasto total</td><td></td></tr>${customers.map(([a, b, c, d]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>${d ? `<em class="s-${d === 'VIP' ? 'Pagado' : 'Enviado'}">${d}</em>` : ''}</td></tr>`).join('')}</table></div></section>

<section class="td-vw v-campanas"><header><div><p>Marketing</p><h4>Campañas</h4></div><i class="td-pill">Activa o pausa con el interruptor</i></header>
<div class="td-cp">${camps.map(([a, b, c, d, on]) => `<div class="td-c"><b>${a}</b><span>${b}</span><div><small>Inversión</small><em>${c}</em></div><div><small>Retorno</small><em>${d}</em></div><div class="td-pr"><small data-on>${on ? 'Activa' : 'Pausada'}</small>${sw(on)}</div></div>`).join('')}</div></section>

<section class="td-vw v-automatizaciones"><header><div><p>Flujos que trabajan solos</p><h4>Automatizaciones</h4></div><i class="td-pill">Prueba un flujo con «Probar»</i></header>
<div class="td-fls">${FLOWS.map(([t, ch, n, lg, on]) => `<div class="td-fl${on ? '' : ' off'}" data-log="${lg}"><div class="td-ft"><b>${t}</b><small><span data-c>${n}</span> ejecuciones esta semana</small></div><div class="td-fc">${ch.map((c) => `<em>${c}</em>`).join('<u>→</u>')}</div><button type="button" class="td-try" data-int="dflow">Probar</button>${sw(on)}</div>`).join('')}</div>
<div class="td-c td-lg"><h6>Actividad reciente</h6><ul class="td-log"><li><time>hace 2 min</time>Cesta recuperada · Lucía F.</li><li><time>hace 9 min</time>Pedido TR-2041 confirmado</li></ul></div></section>

<section class="td-vw v-asistente"><div class="td-ai"><div class="td-top"><span><i>${svg('ia')}</i>Asistente Trama</span><em>Respuestas de ejemplo</em></div>
<div class="td-thread"><div class="td-hello"><i>${svg('ia')}</i><h4>¿En qué te ayudo, Sofía?</h4><p>Pregunta por ventas, inventario o campañas.</p>
<div class="td-sug">${[['¿Qué se vendió más esta semana?', 'Ranking de prendas'], ['¿Qué debo reabastecer?', 'Inventario en riesgo'], ['¿Qué campaña conviene pausar?', 'Retorno por campaña']].map(([q, d]) => `<button type="button" data-int="dask" data-t="${q}"><b>${q}</b><span>${d}</span></button>`).join('')}</div></div><div class="td-msgs"></div></div>
<div class="td-in"><input type="text" placeholder="Pregunta algo sobre tu tienda…" aria-label="Pregunta" /><button type="button" class="td-send" data-int="dsend" aria-label="Enviar">${svg('up')}</button></div></div></section>
</main></div>`;

// ---------- ficha del proyecto: misma página «Contenido» del libro ----------
const hd: [string, string][] = [['Identidad de marca', 'Logotipo y manual'], ['Tienda en línea', 'Catálogo, tallas y cesta'], ['Fichas de producto', 'Fotos, detalle y composición'], ['Lookbook', 'Looks con compra directa'], ['Pedidos', 'Pago y seguimiento'], ['Inventario', 'Existencias por talla'], ['Ventas y reportes', 'Tablero diario'], ['Asistente con IA', 'Alertas y sugerencias'], ['Datos e infraestructura', 'Respaldos y monitoreo']];
const caseHTML = `<div class="pg lt pc mr-case tr-case"><div class="pc-top"><b><span class="wl">HUMAN</span> <span class="ws">CORP</span></b><span>Proyecto Trama · 2025</span></div>
<div class="pc-l"><h4>Lo que se hizo</h4><p>${hd.length} entregables</p></div>
<ul class="pc-r">${hd.map(([t, d], n) => `<li><div class="pc-i"><em>${String(n + 1).padStart(2, '0')}</em><b>${t}</b><i></i><span>${d}</span></div></li>`).join('')}</ul>
<p class="pc-f">Trama · ecommerce de moda · concepto, datos de ejemplo</p><span class="bk-pn">10</span></div>`;

export const tramaLeaves = (): { f: string; b: string }[] => [{ f: brand, b: caseHTML }, { f: siteHTML, b: dash }];
export const tramaPieces = [{ t: 'Identidad', h: brand }, { t: 'Proyecto', h: caseHTML }, { t: 'Tienda', h: siteHTML }, { t: 'Panel', h: dash }];
