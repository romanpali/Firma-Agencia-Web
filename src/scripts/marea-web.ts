// Sitio web (funcional) y ficha del proyecto de «Marea». Páginas de 40em × 26.7em, en HTML/CSS.
// El sitio vive dentro de la página del libro: pestañas (Inicio, Clases, Experiencias, Tienda, Nosotros, Reservar), desplazamiento propio,
// carrito y reservas con total. La lógica está en marea-ui.ts (clics delegados por data-int); los estilos, en styles/marea-web.css.
import { svg, g } from './marea-ico';

const tabs: [string, string][] = [['clases', 'Clases'], ['experiencias', 'Experiencias'], ['tienda', 'Tienda'], ['nosotros', 'Nosotros']];
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const btn = (t: string, cls: string, label: string) => `<button type="button" class="${cls}" ${go(t)}>${label}</button>`;

const nav = `<div class="mw-nav mw-f" style="--d:.15s"><button type="button" class="wn-logo" ${go('inicio')}>${g}marea</button><nav>${tabs.map(([k, t]) => btn(k, 'wn-t', t)).join('')}</nav><button type="button" class="wn-bag" ${go('tienda')} aria-label="Carrito">${svg('bag')}<em data-cart-n>0</em></button><button type="button" class="wn-cta" ${go('reservar')}>Reservar</button></div>
<button type="button" class="wn-ex" data-int="wex" aria-label="Ver en pantalla completa"><i></i>Entrar al sitio</button>`;

const foot = `<footer class="wf"><div class="wf-l"><b>${g}marea</b><p>Escuela de surf<br>Puerto Escondido, Oaxaca</p></div>
<div class="wf-m">${tabs.map(([k, t]) => btn(k, 'wf-a', t)).join('')}${btn('reservar', 'wf-a', 'Reservar')}</div>
<p class="wf-r">hola@marea.example<br>Concepto de HumanCorp · Datos de ejemplo</p></footer>`;

// ---------- clases ----------
type Cl = { k: string; t: string; lv: string; d: string; h: string; p: number; ph: string; li: string[] };
const clases: Cl[] = [
  { k: 'principiante', t: 'Principiante', lv: 'Nivel 1', d: 'Tu primera ola, sin prisa.', h: '2 h', p: 650, ph: 'ph1', li: ['Seguridad y teoría en la arena', 'Remada, equilibrio y cómo ponerte de pie', 'Primeras olas con un instructor a tu lado'] },
  { k: 'intermedio', t: 'Intermedio', lv: 'Nivel 2', d: 'Aprende a leer la ola y a girar.', h: '2 h', p: 750, ph: 'ph2', li: ['Lectura de olas y posicionamiento', 'Giros y control de velocidad', 'Revisión de tu sesión con video'] },
  { k: 'ninos', t: 'Niños', lv: '7 a 13 años', d: 'Mar tranquilo y mucho juego.', h: '1 h 30', p: 550, ph: 'ph3', li: ['Grupos de la misma edad', 'Juegos para perder el miedo al agua', 'Un adulto de la escuela por cada tres niños'] },
  { k: 'privada', t: 'Clase privada', lv: 'Uno a uno', d: 'Tu ritmo, tu objetivo.', h: '1 h 30', p: 1200, ph: 'ph4', li: ['Plan según tu nivel y tus metas', 'Horario flexible, también al amanecer', 'Ideal para parejas o familias'] },
];
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;
const classCard = (c: Cl) => `<article class="wc rv"><div class="wc-ph ${c.ph}"><span>${c.lv}</span></div><div class="wc-b"><h4>${c.t}</h4><p class="wc-d">${c.d}</p><ul>${c.li.map((x) => `<li>${x}</li>`).join('')}</ul>
<div class="wc-f"><div><b>${money(c.p)}</b><small>por persona · ${c.h}</small></div><button type="button" class="wb" data-int="wbook" data-nivel="${c.k}">Reservar</button></div></div></article>`;

// ---------- tienda (merch: minimalista, casual y de lujo discreto) ----------
const prodArt: Record<string, string> = {
  tabla: '<svg viewBox="0 0 60 120" aria-hidden="true"><path d="M30 4C42 22 46 52 44 86c-1 16-7 26-14 30-7-4-13-14-14-30C14 52 18 22 30 4z" fill="#fbf9f4"/><path d="M30 10v100" stroke="#0a1f36" stroke-width="1.2" opacity=".55"/><path d="M19 82c7 3 15 3 22 0" stroke="#0a1f36" stroke-width="1.2" fill="none" opacity=".4"/><path d="M23 104l-2 8 5-3zM37 104l2 8-5-3z" fill="#0a1f36" opacity=".7"/></svg>',
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
  ['sudadera', 'Sudadera Costa', 'Felpa gruesa', 1150, 'pt7', 'ropa', ''],
  ['gorra', 'Gorra de sol', 'Protección UV', 390, 'pt1', 'accesorios', ''],
  ['bolsa', 'Bolsa de playa', 'Lona resistente al agua', 650, 'pt6', 'accesorios', ''],
  ['toalla', 'Toalla Rayas', 'Algodón turco', 720, 'pt4', 'accesorios', 'Nuevo'],
  ['termo', 'Termo Marea', 'Acero · 750 ml', 540, 'pt5', 'accesorios', ''],
  ['tabla', 'Tabla Marea 7′0″', 'Epoxi, ideal para aprender', 9800, 'pt1', 'equipo', ''],
  ['traje', 'Traje 3/2 mm', 'Neopreno · S a XL', 2450, 'pt8', 'equipo', ''],
  ['parafina', 'Parafina de coco', 'Para agua tibia', 120, 'pt4', 'equipo', ''],
];
const prodCard = ([k, t, d, p, c, cat, tag]: (typeof prods)[number]) => `<article class="wp rv" data-c="${cat}"><div class="wp-ph ${c}">${prodArt[k]}${tag ? `<span class="wp-tag">${tag}</span>` : ''}<button type="button" class="wp-add" data-int="wadd" data-p="${p}">Agregar +</button></div><div class="wp-i"><div><h4>${t}</h4><p>${d}</p></div><b>${money(p)}</b></div></article>`;
const filtros: [string, string][] = [['todo', 'Todo'], ['ropa', 'Ropa'], ['accesorios', 'Accesorios'], ['equipo', 'Equipo']];

// ---------- experiencias ----------
const exps: [string, string, string, string, string[], string][] = [
  ['Atardecer', 'Sesión al atardecer', 'La hora dorada, con el mar más suave. Una clase corta, fotos de tu sesión y fruta al terminar.', 'ph2', ['2 h', 'Máx. 6 personas', '$850'], 'e1'],
  ['Fin de semana', 'Retiro de surf y calma', 'Dos noches frente al mar: clases por la mañana, yoga al atardecer y comidas ligeras.', 'ph4', ['2 noches', 'Todo incluido', '$6,900'], 'e2'],
  ['Surf y yoga', 'Mañana de mar y movimiento', 'Calentamiento con yoga, clase de surf y un desayuno largo en la playa.', 'ph1', ['3 h', 'Máx. 8 personas', '$980'], 'e3'],
  ['Para equipos', 'Hoteles, empresas y grupos', 'Armamos la jornada para tu equipo o tus huéspedes, con horarios y precios a medida.', 'ph3', ['Desde 8 personas', 'A medida', 'Cotiza'], 'e4'],
];
const expRow = ([tag, t, d, ph, m]: (typeof exps)[number]) => `<article class="we rv"><div class="we-ph ${ph}"><span>${tag}</span></div><div class="we-b"><h4>${t}</h4><p>${d}</p><div class="we-m">${m.map((x) => `<i>${x}</i>`).join('')}</div><button type="button" class="wb" ${go('reservar')}>Pedir fecha</button></div></article>`;

// ---------- nosotros ----------
const team: [string, string, string, string][] = [['DS', 'Diego Salas', 'Instructor principal · 12 años en el agua', 'a'], ['AR', 'Ana Rivera', 'Surf y yoga · primeros auxilios', 'b'], ['LM', 'Luis Mendoza', 'Clases para niños y familias', 'c']];
const vals: [string, string, string][] = [['01', 'El mar manda', 'Si las condiciones no son seguras, reprogramamos sin costo.'], ['02', 'Grupos pequeños', 'Máximo seis personas por instructor para que nadie quede atrás.'], ['03', 'Aprender sin prisa', 'Cada quien avanza a su ritmo. La primera ola llega cuando llega.']];

// ---------- reservar ----------
const days = ['Sáb 14', 'Dom 15', 'Lun 16', 'Mar 17', 'Mié 18', 'Jue 19', 'Vie 20'];
const hours: [string, string, boolean][] = [['07:00', '2 lugares', false], ['09:00', '4 lugares', false], ['11:00', 'Lleno', true], ['17:00', '5 lugares', false]];
const chip = (g_: string, v: string, label: string, sub = '', full = false) => `<button type="button" class="wk${full ? ' full' : ''}" data-int="wpick" data-g="${g_}" data-v="${v}">${label}${sub ? `<small>${sub}</small>` : ''}</button>`;

export const webHTML = `<div class="pg mr-web" data-rp="dark" data-tab="inicio" data-fil="todo" data-nivel="principiante" data-dia="0" data-hora="07:00" data-pax="2" data-cart="0" data-total="0">
${nav}
<div class="mw-scroll">

<section class="wv wv-inicio">
 <div class="wh"><i class="mw-photo"></i><i class="mw-shade"></i>
  <div class="mw-hero">
   <p class="mw-k mw-f" style="--d:.5s">Escuela de surf · Puerto Escondido</p>
   <h4 class="mw-h"><span class="mw-w" style="--d:.65s">Aprende a</span><span class="mw-w mw-it" style="--d:.95s"><span class="mw-rot"><span class="mw-r" style="--i:0"><i style="--k:0">l</i><i style="--k:1">e</i><i style="--k:2">e</i><i style="--k:3">r</i><i style="--k:4">&nbsp;</i><i style="--k:5">e</i><i style="--k:6">l</i><i style="--k:7">&nbsp;</i><i style="--k:8">m</i><i style="--k:9">a</i><i style="--k:10">r</i><i style="--k:11">.</i></span><span class="mw-r" style="--i:1"><i style="--k:0">e</i><i style="--k:1">n</i><i style="--k:2">c</i><i style="--k:3">o</i><i style="--k:4">n</i><i style="--k:5">t</i><i style="--k:6">r</i><i style="--k:7">a</i><i style="--k:8">r</i><i style="--k:9">&nbsp;</i><i style="--k:10">t</i><i style="--k:11">u</i><i style="--k:12">&nbsp;</i><i style="--k:13">o</i><i style="--k:14">l</i><i style="--k:15">a</i><i style="--k:16">.</i></span><span class="mw-r" style="--i:2"><i style="--k:0">p</i><i style="--k:1">e</i><i style="--k:2">r</i><i style="--k:3">d</i><i style="--k:4">e</i><i style="--k:5">r</i><i style="--k:6">&nbsp;</i><i style="--k:7">e</i><i style="--k:8">l</i><i style="--k:9">&nbsp;</i><i style="--k:10">m</i><i style="--k:11">i</i><i style="--k:12">e</i><i style="--k:13">d</i><i style="--k:14">o</i><i style="--k:15">.</i></span><span class="mw-r" style="--i:3"><i style="--k:0">v</i><i style="--k:1">o</i><i style="--k:2">l</i><i style="--k:3">v</i><i style="--k:4">e</i><i style="--k:5">r</i><i style="--k:6">&nbsp;</i><i style="--k:7">a</i><i style="--k:8">l</i><i style="--k:9">&nbsp;</i><i style="--k:10">a</i><i style="--k:11">g</i><i style="--k:12">u</i><i style="--k:13">a</i><i style="--k:14">.</i></span></span></span></h4>
  </div>
  <div class="mw-side mw-f" style="--d:1.4s"><p>Clases para todos los niveles, con equipo incluido y grupos reducidos.</p>${btn('clases', 'wb-g', 'Ver clases →')}</div>
 </div>
 <div class="wdk"><div class="mw-book rv" ${go('reservar')}><div><small>Nivel</small><b>Principiante</b></div><div><small>Fecha</small><b>Sáb 14 · 07:00</b></div><div><small>Personas</small><b>2 personas</b></div><i>Buscar horarios</i></div>
  <div class="mw-cond rv"><small>Mar hoy</small><div><b>1.2 m</b><span>Oleaje</span></div><div><b>14 s</b><span>Periodo</span></div><div><b>27 °</b><span>Agua</span></div></div></div>
 <div class="wlt wfw"><div class="wsx wfeat"><div class="rv"><i>${svg('check')}</i><b>Equipo incluido</b><span>Tabla, licra y protector.</span></div><div class="rv"><i>${svg('crm')}</i><b>Grupos de máx. 6</b><span>Atención real de tu instructor.</span></div><div class="rv"><i>${svg('cal')}</i><b>Reserva en línea</b><span>Elige día y hora en un minuto.</span></div></div></div>
 <div class="wlt wfw wmore">
  <div class="wsx"><p class="wk-o">Clases</p><h3 class="wt">Un nivel para <em>cada ola</em></h3>
   <div class="wg3">${clases.slice(0, 3).map((c) => `<article class="wm rv"><div class="wc-ph ${c.ph}"><span>${c.lv}</span></div><b>${c.t}</b><small>${c.d}</small><em>${money(c.p)} · ${c.h}</em></article>`).join('')}</div></div>
  <div class="wsx wsteps"><p class="wk-o">Cómo funciona</p><h3 class="wt">Tu primera clase en <em>tres pasos</em></h3>
   <div class="wg3">${[['01', 'Elige tu clase', 'Nivel, día y hora. Te mostramos los lugares libres al momento.'], ['02', 'Llega a la playa', 'Te damos tabla, licra y protector. Solo trae ganas.'], ['03', 'Entra al agua', 'Teoría corta en la arena y después, a remar con tu instructor.']].map(([n, t, d]) => `<div class="wstep rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
  <div class="wsx wquote"><div class="wq rv"><p>“Llegué con miedo al mar y salí de pie en la tercera ola. Diego nunca tuvo prisa y siempre estuvo cerca.”</p><small>Mariana R. · Clase de principiantes</small></div>
   <div class="wq rv"><p>“Fuimos en familia con dos niños. Pequeños grupos, mar tranquilo y muchas risas. Ya reservamos otra vez.”</p><small>Familia Ortega · Clase para niños</small></div></div>
  <div class="wband rv"><i class="wband-ph"></i><div><p class="wk-o">Esta semana</p><h3 class="wt">Aún hay lugares <em>al amanecer</em></h3><p class="ws-p">Reserva en un minuto y paga en la playa. Si el mar no está seguro, reprogramamos sin costo.</p>${btn('reservar', 'wb wb-l', 'Ver horarios')}</div></div>
  <div class="wsx wfaq"><p class="wk-o">Dudas frecuentes</p><div class="wg2">${[['¿Necesito saber nadar?', 'Sí, lo básico. Siempre hay un instructor a tu lado y trabajamos en agua poco profunda.'], ['¿Qué llevo?', 'Traje de baño, toalla y ganas. La tabla, la licra y el protector van incluidos.'], ['¿Y si no hay olas?', 'Reprogramamos tu clase sin costo o te devolvemos tu pago.'], ['¿Desde qué edad?', 'Clases para niños desde 7 años, con un adulto de la escuela por cada tres.']].map(([q, a]) => `<div class="wqa rv"><b>${q}</b><span>${a}</span></div>`).join('')}</div></div>
 </div>

 ${foot}
</section>

<section class="wv wv-clases wlt"><div class="wsx wtop"><p class="wk-o rv">Clases</p><h3 class="wt rv">Elige tu <em>nivel.</em></h3><p class="ws-p rv">Todas incluyen tabla, licra y protector solar. Si el mar no está seguro, reprogramamos sin costo.</p>
 <div class="wg2">${clases.map(classCard).join('')}</div>
 <div class="wsch rv"><p class="wk-o">Horarios de la semana</p><div>${[['07:00', 'Principiantes · Intermedio'], ['09:00', 'Clases privadas · Niños'], ['11:00', 'Niños · Principiantes'], ['17:00', 'Atardecer · Intermedio']].map(([h, t]) => `<p><b>${h}</b><span>${t}</span></p>`).join('')}</div></div></div>
<div class="wwave" aria-hidden="true"><svg viewBox="0 0 800 150" preserveAspectRatio="none"><path d="M0 70c60-34 120-34 180 0s120 34 180 0 120-34 180 0 120 34 180 0 60-17 80-8V150H0z" fill="#8b9fb8" opacity=".35"/><path d="M0 92c70-30 130-30 200 0s130 30 200 0 130-30 200 0 130 30 200 0V150H0z" fill="#0a1f36" opacity=".9"/><path d="M0 118c80-24 140-24 220 0s140 24 220 0 140-24 220 0 120 20 140 14V150H0z" fill="#06111f"/></svg>
<svg class="wwave-b" viewBox="0 0 60 150" aria-hidden="true"><path d="M30 4C44 28 48 70 46 112c-1 20-8 32-16 36-8-4-15-16-16-36C12 70 16 28 30 4z" fill="#fbf9f4" stroke="#0a1f36" stroke-width="1.2"/><path d="M30 14v124" stroke="#0a1f36" stroke-width="1.4" opacity=".5"/><path d="M18 96c8 4 16 4 24 0" stroke="#ff9a62" stroke-width="2" fill="none"/><path d="M24 138l-3 9 6-4zM36 138l3 9-6-4z" fill="#0a1f36"/></svg></div>

 ${foot}
</section>

<section class="wv wv-experiencias wlt"><div class="wsx wtop"><p class="wk-o rv">Experiencias</p><h3 class="wt rv">Más que una <em>clase.</em></h3><p class="ws-p rv">Jornadas pensadas para disfrutar el mar con calma, solos, en pareja o con tu equipo.</p>
 <div class="wcol">${exps.map(expRow).join('')}</div></div>
 ${foot}
</section>

<section class="wv wv-tienda wlt"><div class="wsx wtop">
 <div class="wsh"><div><p class="wk-o rv">Tienda · Marea Goods</p><h3 class="wt rv">Hecho para el agua,<br><em>y para después.</em></h3></div>
 <p class="wcartb rv">Carrito<b><i data-cart-n>0</i> · <i data-cart-t>$0</i></b></p></div>
 <div class="wfil rv">${filtros.map(([k, t]) => `<button type="button" class="wf-c" data-int="wfil" data-f="${k}">${t}</button>`).join('')}</div>
 <div class="wshop">${prods.map(prodCard).join('')}</div>
 <div class="wship rv"><p>Envíos a todo México</p><p>Cambios en 30 días</p><p>Pago seguro</p></div></div>
 ${foot}
</section>

<section class="wv wv-nosotros wlt"><div class="wsx wtop"><p class="wk-o rv">Nosotros</p><h3 class="wt rv">Una escuela <em>hecha en el agua.</em></h3>
 <div class="wnos"><p class="ws-p rv">Marea nació para enseñar a surfear sin presión: con grupos pequeños, equipo cuidado y un mar que se respeta. Nos importa más que disfrutes tu primera ola que la cantidad de clases que tomes.</p><i class="wnos-ph ph2 rv"></i></div>
 <div class="wvals">${vals.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div>
 <p class="wk-o rv" style="margin-top:2.6em">El equipo</p>
 <div class="wteam">${team.map(([i, n, r, c]) => `<div class="rv"><i class="av-${c}">${i}</i><b>${n}</b><span>${r}</span></div>`).join('')}</div>
 <div class="wloc rv"><div><p class="wk-o">Dónde estamos</p><b>Playa Carrizalillo, Puerto Escondido</b><span>Todos los días de 6:30 a 19:00 · hola@marea.example</span></div>${btn('reservar', 'wb wb-l', 'Reservar clase')}</div></div>
 ${foot}
</section>

<section class="wv wv-reservar"><div class="wsx wtop"><p class="wk-o rv">Reservar</p><h3 class="wt rv">Reserva tu <em>lugar.</em></h3>
 <div class="wres">
  <div class="wform">
   <div class="wst"><p><i>1</i>Clase</p><div>${clases.map((c) => chip('nivel', c.k, c.t, `${money(c.p)} · ${c.h}`)).join('')}</div></div>
   <div class="wst"><p><i>2</i>Día</p><div>${days.map((d, i) => chip('dia', String(i), d)).join('')}</div></div>
   <div class="wst"><p><i>3</i>Hora</p><div>${hours.map(([h, s, f]) => chip('hora', h, h, s, f)).join('')}</div></div>
   <div class="wst wst-p"><p><i>4</i>Personas</p><div class="wpax"><button type="button" data-int="wpax" data-d="-1" aria-label="Menos">−</button><b data-sum="pax">2</b><button type="button" data-int="wpax" data-d="1" aria-label="Más">+</button></div></div>
   <div class="wst"><p><i>5</i>Tus datos</p><div class="wfld"><input type="text" placeholder="Nombre" aria-label="Nombre" /><input type="text" placeholder="WhatsApp" aria-label="WhatsApp" /></div></div>
  </div>
  <aside class="wsum"><div class="wsum-i"><p class="wk-o">Tu reserva</p>
   <dl><div><dt>Clase</dt><dd data-sum="clase">Principiante</dd></div><div><dt>Día</dt><dd data-sum="dia">Sáb 14</dd></div><div><dt>Hora</dt><dd data-sum="hora">07:00</dd></div><div><dt>Personas</dt><dd data-sum="pax2">2</dd></div></dl>
   <div class="wtot"><span>Total</span><b data-sum="total">$1,300</b></div>
   <button type="button" class="wb wb-l wb-w" data-int="wconfirm">Confirmar reserva</button><small>Equipo incluido · Cancela sin costo hasta 24 h antes</small></div>
   <div class="wdone"><i>${svg('check')}</i><h4>¡Reserva confirmada!</h4><p data-sum="done">Te esperamos en la playa.</p><span data-sum="code">MAR-0142</span><button type="button" class="wb-g" data-int="wreset">Hacer otra reserva</button></div></aside>
 </div></div>
 ${foot}
</section>

</div></div>`;

// ---------- ficha del proyecto: mismo diseño que la página «Contenido» del libro de HumanCorp ----------
const hd: [string, string][] = [
  ['Identidad de marca', 'Logotipo y manual'],
  ['Sitio web', '6 secciones navegables'],
  ['Reservas en línea', 'Cupos y confirmación'],
  ['Tienda en línea', 'Catálogo y carrito'],
  ['Ventas y CRM', 'Prospectos y cotizaciones'],
  ['Finanzas', 'Cobranza y facturas CFDI'],
  ['Calendario', 'Cupos por horario'],
  ['Automatización', 'WhatsApp, redes y llamadas'],
  ['Asistente con IA', 'Resúmenes y prioridades'],
  ['Datos e infraestructura', 'Respaldos y monitoreo'],
];
export const caseHTML = `<div class="pg lt pc mr-case"><div class="pc-top"><b><span class="wl">HUMAN</span> <span class="ws">CORP</span></b><span>Proyecto Marea · 2026</span></div>
<div class="pc-l"><h4>Lo que se hizo</h4><p>${hd.length} entregables</p></div>
<ul class="pc-r">${hd.map(([t, d], n) => `<li><div class="pc-i"><em>${String(n + 1).padStart(2, '0')}</em><b>${t}</b><i></i><span>${d}</span></div></li>`).join('')}</ul>
<p class="pc-f">Marea · escuela de surf · concepto, datos de ejemplo</p><span class="bk-pn">04</span></div>`;
