// Sitio web (funcional) y ficha del proyecto de «Marea». Páginas de 40em × 26.7em, en HTML/CSS.
// El sitio vive dentro de la página del libro: pestañas (Inicio, Estancias, Experiencias, Tienda, Nosotros, Reservar), desplazamiento propio,
// carrito y reservas con total. La lógica está en marea-ui.ts (clics delegados por data-int); los estilos, en styles/marea-web.css.
import { svg, g } from './marea-ico';

const tabs: [string, string][] = [['clases', 'Estancias'], ['experiencias', 'Experiencias'], ['tienda', 'Tienda'], ['nosotros', 'Nosotros']];
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const btn = (t: string, cls: string, label: string) => `<button type="button" class="${cls}" ${go(t)}>${label}</button>`;

const nav = `<div class="mw-nav mw-f" style="--d:.15s"><button type="button" class="wn-logo" ${go('inicio')}>${g}marea</button><nav>${tabs.map(([k, t]) => btn(k, 'wn-t', t)).join('')}</nav><button type="button" class="wn-bag" ${go('tienda')} aria-label="Carrito">${svg('bag')}<em data-cart-n>0</em></button><button type="button" class="wn-cta" ${go('reservar')}>Reservar</button></div>
<button type="button" class="wn-ex" data-int="wex" aria-label="Ver en pantalla completa"><i></i>Entrar al sitio</button>`;

const foot = `<footer class="wf"><div class="wf-l"><b>${g}marea</b><p>Estancias junto al lago<br>Valle de Bravo, Edo. de México</p></div>
<div class="wf-m">${tabs.map(([k, t]) => btn(k, 'wf-a', t)).join('')}${btn('reservar', 'wf-a', 'Reservar')}</div>
<p class="wf-r">hola@marea.example<br>Concepto de HumanCorp · Datos de ejemplo</p></footer>`;

// ---------- estancias ----------
type Cl = { k: string; t: string; lv: string; d: string; p: number; ph: string; li: string[] };
const clases: Cl[] = [
  { k: 'cristal', t: 'Casa de cristal', lv: '2 huéspedes', d: 'Sobre el agua, con la cama frente al lago.', p: 4800, ph: 'ph1', li: ['Muros de cristal y terraza sobre el agua', 'Cama king, baño de piedra y tina', 'Desayuno, kayaks y muelle incluidos'] },
  { k: 'bosque', t: 'Cabaña del bosque', lv: '2 a 3 huéspedes', d: 'Madera, chimenea y silencio.', p: 3200, ph: 'ph4', li: ['Chimenea con leña incluida', 'Sala con vista a los pinos', 'A cinco minutos caminando del muelle'] },
  { k: 'muelle', t: 'Suite del muelle', lv: '2 huéspedes', d: 'Terraza propia y el lago a tus pies.', p: 3900, ph: 'ph3', li: ['Terraza privada sobre el muelle', 'Desayuno servido en la terraza', 'Acceso directo al agua para nadar'] },
  { k: 'casa', t: 'Casa completa', lv: 'Hasta 6 huéspedes', d: 'Tres recámaras para ir en familia o con amigos.', p: 9800, ph: 'ph2', li: ['Tres recámaras y cocina abierta', 'Muelle y fogata solo para ustedes', 'Anfitrión y chef bajo petición'] },
];
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;
const classCard = (c: Cl) => `<article class="wc rv"><div class="wc-ph ${c.ph}"><span>${c.lv}</span></div><div class="wc-b"><h4>${c.t}</h4><p class="wc-d">${c.d}</p><ul>${c.li.map((x) => `<li>${x}</li>`).join('')}</ul>
<div class="wc-f"><div><b>${money(c.p)}</b><small>por noche · desayuno incluido</small></div><button type="button" class="wb" data-int="wbook" data-nivel="${c.k}">Reservar</button></div></div></article>`;

// ---------- tienda (merch: minimalista, casual y de lujo discreto) ----------
const prodArt: Record<string, string> = {
  vela: '<svg viewBox="0 0 70 100" aria-hidden="true"><rect x="14" y="34" width="42" height="56" rx="8" fill="#efe6d6"/><path d="M35 34c-4-8-1-14 0-20 4 6 4 12 0 20z" fill="#d6802d"/><path d="M35 34v-6" stroke="#0a1f36" stroke-width="1.6"/><path d="M22 60h26" stroke="#0a1f36" stroke-width="1" opacity=".35"/></svg>',
  taza: '<svg viewBox="0 0 100 80" aria-hidden="true"><path d="M20 22h52v30c0 14-10 22-26 22S20 66 20 52z" fill="#fbf9f4" stroke="#0a1f36" stroke-width="1.2"/><path d="M72 30h8c8 0 8 22 0 22h-8" fill="none" stroke="#0a1f36" stroke-width="3"/><path d="M28 36h36" stroke="#0a1f36" stroke-width="1.2" opacity=".3"/></svg>',
  libreta: '<svg viewBox="0 0 80 100" aria-hidden="true"><rect x="12" y="6" width="56" height="88" rx="4" fill="#0a1f36"/><rect x="12" y="6" width="8" height="88" fill="#14304f"/><rect x="30" y="22" width="26" height="3" rx="1.5" fill="#f4f1ea" opacity=".8"/><rect x="30" y="30" width="18" height="3" rx="1.5" fill="#f4f1ea" opacity=".5"/></svg>',
  traje: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M34 6h32l18 10 8 40-12 4-5-24v60H54V62h-8v34H23V36l-5 24-12-4 8-40z" fill="#0a1f36"/><path d="M34 6c3 9 9 13 16 13s13-4 16-13" stroke="#f4f1ea" stroke-width="1.6" fill="none" opacity=".7"/><path d="M50 19v34" stroke="rgba(255,255,255,.22)" stroke-width="1.2"/></svg>',
  playera: '<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M30 6L8 18l8 18 10-5v51h48V31l10 5 8-18L70 6c-4 8-12 11-20 11S34 14 30 6z" fill="#fbf9f4"/><path d="M40 46c7-4 13-4 20 0M38 52c8-4 16-4 24 0" stroke="#0a1f36" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/></svg>',
  gorra: '<svg viewBox="0 0 100 80" aria-hidden="true"><path d="M16 56C16 30 32 16 52 16s30 14 30 40z" fill="#0a1f36"/><path d="M10 58c20-6 46-6 74 0 7 2 5 9-2 9H14c-6 0-8-7-4-9z" fill="#14304f"/><circle cx="52" cy="14" r="2.6" fill="#f4f1ea"/></svg>',
  parafina: '<svg viewBox="0 0 100 80" aria-hidden="true"><rect x="14" y="22" width="72" height="42" rx="10" fill="#fbf9f4"/><path d="M26 22v42M42 22v42M58 22v42M74 22v42" stroke="#0a1f36" stroke-width="1" opacity=".18"/><rect x="30" y="38" width="40" height="10" rx="5" fill="#0a1f36"/></svg>',
  bolsa: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M22 36h56l4 56H18z" fill="#efe6d6"/><path d="M36 36c0-16 4-24 14-24s14 8 14 24" fill="none" stroke="#0a1f36" stroke-width="3.2" stroke-linecap="round"/><path d="M34 62c10-5 22-5 32 0" stroke="#0a1f36" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/></svg>',
  toalla: '<svg viewBox="0 0 80 110" aria-hidden="true"><rect x="12" y="6" width="56" height="88" rx="3" fill="#fbf9f4"/><path d="M12 26h56M12 34h56" stroke="#0a1f36" stroke-width="3.4"/><path d="M12 62h56" stroke="#0a1f36" stroke-width="1.2" opacity=".3"/><path d="M18 94v10M26 94v10M34 94v10M42 94v10M50 94v10M58 94v10" stroke="#e6dfd2" stroke-width="2"/></svg>',
  sudadera: '<svg viewBox="0 0 100 110" aria-hidden="true"><path d="M34 12c4 8 10 12 16 12s12-4 16-12l18 8 10 38-12 4-4-20v54H26V42l-4 20-12-4 10-38z" fill="#3a3f4a"/><path d="M36 12c0-8 7-12 14-12s14 4 14 12c-4 6-9 9-14 9s-10-3-14-9z" fill="#2b2f38"/><path d="M38 78h24v10H38z" fill="#2b2f38"/><path d="M45 22v16M55 22v16" stroke="#f4f1ea" stroke-width="1.2" opacity=".6"/></svg>',
  termo: '<svg viewBox="0 0 70 120" aria-hidden="true"><rect x="24" y="4" width="22" height="12" rx="4" fill="#14304f"/><rect x="18" y="16" width="34" height="92" rx="10" fill="#0a1f36"/><path d="M24 62c4-4 8-4 11 0s7 4 11 0" stroke="#f4f1ea" stroke-width="1.4" fill="none" opacity=".8" stroke-linecap="round"/></svg>',
};
const prods: [string, string, string, number, string, string, string][] = [
  ['playera', 'Playera Marea', 'Algodón orgánico', 480, 'pt3', 'ropa', 'Nuevo'],
  ['sudadera', 'Suéter Valle', 'Lana merino', 1650, 'pt7', 'ropa', ''],
  ['gorra', 'Gorra Marea', 'Algodón lavado', 390, 'pt1', 'accesorios', ''],
  ['bolsa', 'Tote de lona', 'Lona gruesa, hecha a mano', 650, 'pt6', 'accesorios', ''],
  ['termo', 'Termo Marea', 'Acero · 750 ml', 540, 'pt5', 'accesorios', ''],
  ['toalla', 'Manta de algodón', 'Tejido turco', 1280, 'pt4', 'hogar', 'Nuevo'],
  ['vela', 'Vela de cedro', 'Cera de soya · 40 h', 420, 'pt1', 'hogar', ''],
  ['taza', 'Taza de cerámica', 'Hecha a mano', 280, 'pt8', 'hogar', ''],
  ['libreta', 'Libreta del lago', 'Papel reciclado', 220, 'pt4', 'hogar', ''],
];
const prodCard = ([k, t, d, p, c, cat, tag]: (typeof prods)[number]) => `<article class="wp rv" data-c="${cat}"><div class="wp-ph ${c}">${prodArt[k]}${tag ? `<span class="wp-tag">${tag}</span>` : ''}<button type="button" class="wp-add" data-int="wadd" data-p="${p}">Agregar +</button></div><div class="wp-i"><div><h4>${t}</h4><p>${d}</p></div><b>${money(p)}</b></div></article>`;
const filtros: [string, string][] = [['todo', 'Todo'], ['ropa', 'Ropa'], ['accesorios', 'Accesorios'], ['hogar', 'Hogar']];

// ---------- experiencias ----------
const exps: [string, string, string, string, string[], string][] = [
  ['Atardecer', 'Atardecer en kayak', 'Remo suave a la hora dorada y una copa al volver al muelle.', 'ph2', ['2 h', 'Máx. 6 personas', '$850'], 'e1'],
  ['Fin de semana', 'Retiro de calma', 'Dos noches frente al lago: yoga al amanecer, baño de bosque y comidas ligeras.', 'ph4', ['2 noches', 'Todo incluido', '$6,900'], 'e2'],
  ['Bienestar', 'Yoga y desayuno largo', 'Yoga frente al lago y un desayuno sin prisa en la terraza.', 'ph1', ['3 h', 'Máx. 8 personas', '$980'], 'e3'],
  ['Para grupos', 'Retiros y celebraciones', 'Armamos la estancia para tu equipo o tu familia, con fechas y precios a medida.', 'ph3', ['Desde 8 personas', 'A medida', 'Cotiza'], 'e4'],
];
const expRow = ([tag, t, d, ph, m]: (typeof exps)[number]) => `<article class="we rv"><div class="we-ph ${ph}"><span>${tag}</span></div><div class="we-b"><h4>${t}</h4><p>${d}</p><div class="we-m">${m.map((x) => `<i>${x}</i>`).join('')}</div><button type="button" class="wb" ${go('reservar')}>Pedir fecha</button></div></article>`;

// ---------- nosotros ----------
const team: [string, string, string, string][] = [['DS', 'Diego Salas', 'Anfitrión principal · 12 años en hospitalidad', 'a'], ['AR', 'Ana Rivera', 'Bienestar y yoga', 'b'], ['LM', 'Luis Mendoza', 'Cocina y desayunos', 'c']];
const vals: [string, string, string][] = [['01', 'Pocas estancias', 'Solo ocho, para que el lugar siga en calma.'], ['02', 'Anfitriones presentes', 'Te recibimos, te acompañamos y desaparecemos cuando quieres silencio.'], ['03', 'Descanso sin prisa', 'Sin horarios ni actividades obligatorias. Lo único fijo es el desayuno.']];

// ---------- reservar ----------
const days = ['Vie 14', 'Sáb 15', 'Dom 16', 'Lun 17', 'Mar 18', 'Mié 19', 'Jue 20'];
const hours: [string, string, boolean][] = [['1', '1 noche', false], ['2', '2 noches', false], ['3', '3 noches', false], ['4', '4 noches', true]];
const chip = (g_: string, v: string, label: string, sub = '', full = false) => `<button type="button" class="wk${full ? ' full' : ''}" data-int="wpick" data-g="${g_}" data-v="${v}">${label}${sub ? `<small>${sub}</small>` : ''}</button>`;

// frase animada del hero: cada frase se escribe letra por letra (el CSS anima cada <i>)
const rot = (ph: string[]) => `<span class="mw-rot">${ph.map((t, i) => `<span class="mw-r" style="--i:${i}">${[...t].map((c, k) => `<i style="--k:${k}">${c === ' ' ? '&nbsp;' : c}</i>`).join('')}</span>`).join('')}</span>`;

export const webHTML = `<div class="pg mr-web" data-rp="dark" data-tab="inicio" data-fil="todo" data-nivel="cristal" data-dia="0" data-hora="2" data-pax="2" data-cart="0" data-total="0">
${nav}
<div class="mw-scroll">

<section class="wv wv-inicio">
 <div class="wh"><i class="mw-photo"></i><i class="mw-shade"></i>
  <div class="mw-hero">
   <p class="mw-k mw-f" style="--d:.5s">Estancias junto al lago · Valle de Bravo</p>
   <h4 class="mw-h"><span class="mw-w" style="--d:.65s">Un lugar para</span><span class="mw-w mw-it" style="--d:.95s">${rot(['bajar el ritmo.', 'mirar el lago.', 'dormir con calma.', 'volver a ti.'])}</span></h4>
  </div>
  <div class="mw-side mw-f" style="--d:1.4s"><p>Ocho estancias frente al agua, con desayuno incluido y anfitriones que te cuidan sin estorbar.</p>${btn('clases', 'wb-g', 'Ver estancias →')}</div>
 </div>
 <div class="wdk"><div class="mw-book rv" ${go('reservar')}><div><small>Estancia</small><b>Casa de cristal</b></div><div><small>Llegada</small><b>Vie 14 · 3 pm</b></div><div><small>Noches</small><b>2 noches</b></div><i>Buscar fechas</i></div>
  <div class="mw-cond rv"><small>Lago hoy</small><div><b>22 °</b><span>Aire</span></div><div><b>19 °</b><span>Agua</span></div><div><b>7:42</b><span>Atardecer</span></div></div></div>
 <div class="wlt wfw"><div class="wsx wfeat"><div class="rv"><i>${svg('check')}</i><b>Desayuno incluido</b><span>Con producto local, cada mañana.</span></div><div class="rv"><i>${svg('crm')}</i><b>Solo ocho estancias</b><span>Atención personal de tu anfitrión.</span></div><div class="rv"><i>${svg('cal')}</i><b>Reserva en línea</b><span>Elige fechas en un minuto.</span></div></div></div>
 <div class="wlt wfw wmore">
  <div class="wsx"><p class="wk-o">Estancias</p><h3 class="wt">Un refugio para <em>cada plan</em></h3>
   <div class="wg3">${clases.slice(0, 3).map((c) => `<article class="wm rv"><div class="wc-ph ${c.ph}"><span>${c.lv}</span></div><b>${c.t}</b><small>${c.d}</small><em>${money(c.p)} / noche</em></article>`).join('')}</div></div>
  <div class="wsx wsteps"><p class="wk-o">Cómo funciona</p><h3 class="wt">Tu estancia en <em>tres pasos</em></h3>
   <div class="wg3">${[['01', 'Elige tu estancia', 'Casa, llegada y noches. Te mostramos la disponibilidad al momento.'], ['02', 'Llega al lago', 'Check-in desde las 15:00. Te recibimos con una bebida y te mostramos todo.'], ['03', 'Desconecta', 'Desayuno, muelle, chimenea y silencio. Lo demás lo decides tú.']].map(([n, t, d]) => `<div class="wstep rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
  <div class="wsx wquote"><div class="wq rv"><p>“Dormimos con el lago frente a la cama. Fue el fin de semana más tranquilo del año.”</p><small>Mariana R. · Casa de cristal</small></div>
   <div class="wq rv"><p>“Fuimos en familia a la casa completa. Todo cuidado, sin prisa y con el muelle solo para nosotros.”</p><small>Familia Ortega · Casa completa</small></div></div>
  <div class="wband rv"><i class="wband-ph"></i><div><p class="wk-o">Esta semana</p><h3 class="wt">Aún hay fechas <em>entre semana</em></h3><p class="ws-p">Reserva en un minuto. Cancelas sin costo hasta 72 horas antes de tu llegada.</p>${btn('reservar', 'wb wb-l', 'Ver fechas')}</div></div>
  <div class="wsx wfaq"><p class="wk-o">Dudas frecuentes</p><div class="wg2">${[['¿Cuánto tarda llegar desde la Ciudad de México?', 'Unas dos horas por carretera. Te enviamos la ruta y el código de acceso.'], ['¿Qué incluye la estancia?', 'Desayuno, kayaks, uso del muelle y leña para la chimenea.'], ['¿Aceptan mascotas?', 'Sí, en la cabaña del bosque y con aviso previo.'], ['¿A qué hora es la entrada y la salida?', 'Entras desde las 15:00 y sales hasta las 12:00.']].map(([q, a]) => `<div class="wqa rv"><b>${q}</b><span>${a}</span></div>`).join('')}</div></div>
 </div>

 ${foot}
</section>

<section class="wv wv-clases wlt"><div class="wsx wtop"><p class="wk-o rv">Estancias</p><h3 class="wt rv">Elige tu <em>refugio.</em></h3><p class="ws-p rv">Todas incluyen desayuno, kayaks y uso del muelle. Cancelas sin costo hasta 72 horas antes.</p>
 <div class="wg2">${clases.map(classCard).join('')}</div>
 <div class="wsch rv"><p class="wk-o">Disponibilidad de la semana</p><div>${[['Vie 14', 'Cabaña · Suite del muelle'], ['Sáb 15', 'Casa completa'], ['Dom 16', 'Casa de cristal · Cabaña'], ['Lun 17', 'Todas las estancias']].map(([h, t]) => `<p><b>${h}</b><span>${t}</span></p>`).join('')}</div></div></div>
<div class="wwave" aria-hidden="true"><svg viewBox="0 0 800 150" preserveAspectRatio="none"><path d="M0 66l60-14 90 8 110-22 120 18 100-14 130 12 110-8 80 6V150H0z" fill="#8b9fb8" opacity=".35"/><path d="M0 92h800V150H0z" fill="#0a1f36" opacity=".9"/><path d="M60 104h180M300 112h260M120 124h140M420 132h300M520 104h200" stroke="#a0b4cc" stroke-width="1.4" stroke-linecap="round" opacity=".4"/><path d="M0 128h800V150H0z" fill="#06111f"/></svg></div>

 ${foot}
</section>

<section class="wv wv-experiencias wlt"><div class="wsx wtop"><p class="wk-o rv">Experiencias</p><h3 class="wt rv">Más que una <em>estancia.</em></h3><p class="ws-p rv">Momentos pensados para quedarte con el lago: solos, en pareja o con tu equipo.</p>
 <div class="wcol">${exps.map(expRow).join('')}</div></div>
 ${foot}
</section>

<section class="wv wv-tienda wlt"><div class="wsx wtop">
 <div class="wsh"><div><p class="wk-o rv">Tienda · Marea Goods</p><h3 class="wt rv">Hecho para quedarse,<br><em>también en casa.</em></h3></div>
 <p class="wcartb rv">Carrito<b><i data-cart-n>0</i> · <i data-cart-t>$0</i></b></p></div>
 <div class="wfil rv">${filtros.map(([k, t]) => `<button type="button" class="wf-c" data-int="wfil" data-f="${k}">${t}</button>`).join('')}</div>
 <div class="wshop">${prods.map(prodCard).join('')}</div>
 <div class="wship rv"><p>Envíos a todo México</p><p>Cambios en 30 días</p><p>Pago seguro</p></div></div>
 ${foot}
</section>

<section class="wv wv-nosotros wlt"><div class="wsx wtop"><p class="wk-o rv">Nosotros</p><h3 class="wt rv">Una casa <em>junto al lago.</em></h3>
 <div class="wnos"><p class="ws-p rv">Marea nació para ofrecer descanso sin ruido: pocas estancias, anfitriones presentes y un lago que se respeta. Nos importa más que descanses que llenar el calendario.</p><i class="wnos-ph ph2 rv"></i></div>
 <div class="wvals">${vals.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div>
 <p class="wk-o rv" style="margin-top:2.6em">El equipo</p>
 <div class="wteam">${team.map(([i, n, r, c]) => `<div class="rv"><i class="av-${c}">${i}</i><b>${n}</b><span>${r}</span></div>`).join('')}</div>
 <div class="wloc rv"><div><p class="wk-o">Dónde estamos</p><b>Valle de Bravo, Estado de México</b><span>Check-in desde las 15:00 · hola@marea.example</span></div>${btn('reservar', 'wb wb-l', 'Reservar estancia')}</div></div>
 ${foot}
</section>

<section class="wv wv-reservar"><div class="wsx wtop"><p class="wk-o rv">Reservar</p><h3 class="wt rv">Reserva tu <em>estancia.</em></h3>
 <div class="wres">
  <div class="wform">
   <div class="wst"><p><i>1</i>Estancia</p><div>${clases.map((c) => chip('nivel', c.k, c.t, `${money(c.p)} / noche`)).join('')}</div></div>
   <div class="wst"><p><i>2</i>Llegada</p><div>${days.map((d, i) => chip('dia', String(i), d)).join('')}</div></div>
   <div class="wst"><p><i>3</i>Noches</p><div>${hours.map(([h, s, f]) => chip('hora', h, s, f ? 'No disponible' : 'Disponible', f)).join('')}</div></div>
   <div class="wst wst-p"><p><i>4</i>Huéspedes</p><div class="wpax"><button type="button" data-int="wpax" data-d="-1" aria-label="Menos">−</button><b data-sum="pax">2</b><button type="button" data-int="wpax" data-d="1" aria-label="Más">+</button></div></div>
   <div class="wst"><p><i>5</i>Tus datos</p><div class="wfld"><input type="text" placeholder="Nombre" aria-label="Nombre" /><input type="text" placeholder="WhatsApp" aria-label="WhatsApp" /></div></div>
  </div>
  <aside class="wsum"><div class="wsum-i"><p class="wk-o">Tu reserva</p>
   <dl><div><dt>Estancia</dt><dd data-sum="clase">Casa de cristal</dd></div><div><dt>Llegada</dt><dd data-sum="dia">Vie 14</dd></div><div><dt>Noches</dt><dd data-sum="hora">2 noches</dd></div><div><dt>Huéspedes</dt><dd data-sum="pax2">2</dd></div></dl>
   <div class="wtot"><span>Total</span><b data-sum="total">$9,600</b></div>
   <button type="button" class="wb wb-l wb-w" data-int="wconfirm">Confirmar reserva</button><small>Desayuno incluido · Cancela sin costo hasta 72 h antes</small></div>
   <div class="wdone"><i>${svg('check')}</i><h4>¡Reserva confirmada!</h4><p data-sum="done">Te esperamos en el lago.</p><span data-sum="code">MAR-0142</span><button type="button" class="wb-g" data-int="wreset">Hacer otra reserva</button></div></aside>
 </div></div>
 ${foot}
</section>

</div></div>`;

// ---------- ficha del proyecto: mismo diseño que la página «Contenido» del libro de HumanCorp ----------
const hd: [string, string][] = [
  ['Identidad de marca', 'Logotipo y manual'],
  ['Sitio web', '6 secciones navegables'],
  ['Reservas en línea', 'Fechas y confirmación'],
  ['Tienda en línea', 'Catálogo y carrito'],
  ['Ventas y CRM', 'Consultas y reservas'],
  ['Finanzas', 'Cobranza y facturas CFDI'],
  ['Calendario', 'Disponibilidad por noche'],
  ['Automatización', 'WhatsApp, redes y llamadas'],
  ['Asistente con IA', 'Resúmenes y prioridades'],
  ['Datos e infraestructura', 'Respaldos y monitoreo'],
];
export const caseHTML = `<div class="pg lt pc mr-case"><div class="pc-top"><b><span class="wl">HUMAN</span> <span class="ws">CORP</span></b><span>Proyecto Marea · 2026</span></div>
<div class="pc-l"><h4>Lo que se hizo</h4><p>${hd.length} entregables</p></div>
<ul class="pc-r">${hd.map(([t, d], n) => `<li><div class="pc-i"><em>${String(n + 1).padStart(2, '0')}</em><b>${t}</b><i></i><span>${d}</span></div></li>`).join('')}</ul>
<p class="pc-f">Marea · estancias junto al lago · concepto, datos de ejemplo</p><span class="bk-pn">04</span></div>`;
