// Sitio web (funcional) y ficha del proyecto de «Marea». Páginas de 40em × 26.7em, en HTML/CSS.
// El sitio vive dentro de la página del libro: pestañas (Inicio, Estancias, Experiencias, Nosotros, Reservar), desplazamiento propio
// y reservas con total. La lógica está en marea-site.ts (clics delegados por data-int); los estilos, en styles/marea-web.css.
import { svg } from './marea-ico';

const tabs: [string, string][] = [['clases', 'Estancias'], ['experiencias', 'Experiencias'], ['nosotros', 'Nosotros']];
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const btn = (t: string, cls: string, label: string) => `<button type="button" class="${cls}" ${go(t)}>${label}</button>`;
const money = (n: number) => `$${n.toLocaleString('es-MX')}`;

// foto: la misma toma con encuadres distintos (punto de enfoque x/y en % y acercamiento)
type Crop = [number, number, number, string?];
const C: Record<string, Crop> = { casa: [27, 56, 2.1], pino: [4, 58, 2.3], reflejo: [24, 82, 2.4], cerros: [62, 44, 1.5], cielo: [86, 22, 1.3], agua: [72, 86, 1.5], lago: [50, 55, 1], sala: [50, 50, 1, 'sala'], comedor: [50, 50, 1, 'comedor'], cocina: [50, 50, 1, 'cocina'], pasillo: [50, 50, 1, 'pasillo'], recamara: [50, 50, 1, 'recamara'], bano: [50, 50, 1, 'bano'], biblioteca: [50, 50, 1, 'biblioteca'] };
const im = (c: Crop, cls = '') => `<div class="im ${cls}"><img src="${c[3] ? `/obra/marea/${c[3]}.webp` : '/obra/marea-lago-uhd.webp'}" alt="" loading="lazy" decoding="async" style="--x:${c[0]}%;--y:${c[1]}%;--z:${c[2]}"></div>`;

const nav = `<div class="mw-nav mw-f" style="--d:.15s"><button type="button" class="wn-logo" ${go('inicio')}>marea<sup>®</sup></button><div class="wn-r"><nav>${tabs.map(([k, t]) => btn(k, 'wn-t', t)).join('')}</nav><button type="button" class="wn-cta" ${go('reservar')}>Reservar</button></div></div>
<button type="button" class="wn-ex" data-int="wex" aria-label="Ver en pantalla completa"><i></i>Entrar al sitio</button>`;

const foot = `<footer class="wf"><div class="wf-t"><div class="wf-l"><b>Marea</b><p>Estancias junto al lago<br>Camino al Muelle 12, Valle de Bravo<br>Estado de México</p></div>
<div class="wf-m"><p>Sitio</p>${tabs.map(([k, t]) => btn(k, 'wf-a', t)).join('')}${btn('reservar', 'wf-a', 'Reservar')}</div>
<div class="wf-m"><p>Contacto</p><span class="wf-a">hola@marea.example</span><span class="wf-a">+52 726 000 0000</span><span class="wf-a">Check-in 15:00 · Check-out 12:00</span></div>
<p class="wf-r">Concepto de HumanCorp<br>Datos de ejemplo</p></div><b class="wf-big" aria-hidden="true">marea<sup>®</sup></b></footer>`;

// ---------- estancias ----------
type Room = [number, number, number, number, string, boolean?];
type Cl = { k: string; t: string; lv: string; d: string; long: string; p: number; m2: number; cama: string; crop: Crop; li: string[]; plan: Room[]; ocu: number[] };
const clases: Cl[] = [
  { k: 'cristal', t: 'Casa de cristal', lv: '2 huéspedes', d: 'Sobre el agua, con la cama frente al lago.', long: 'Muros de vidrio del piso al techo y una terraza que entra al lago. Es la que más pide la gente que viene a no hacer nada.', p: 4800, m2: 62, cama: 'cama king', crop: C.sala, li: ['Muros de cristal y terraza sobre el agua', 'Cama king y baño de piedra con tina', 'Desayuno, kayaks y muelle incluidos', 'Calefacción de piso'], ocu: [0, 1, 1, 0, 0, 1, 0],
    plan: [[0, 40, 100, 20, 'Terraza sobre el agua', true], [4, 4, 52, 36, 'Sala y comedor'], [56, 4, 40, 22, 'Recámara king'], [56, 26, 40, 14, 'Baño y tina']] },
  { k: 'bosque', t: 'Cabaña del bosque', lv: '2 a 3 huéspedes', d: 'Madera, chimenea y silencio.', long: 'Entre los pinos, a cinco minutos caminando del muelle. Tiene chimenea y un sillón junto a la ventana que nadie quiere dejar.', p: 3200, m2: 48, cama: 'cama queen y sofá cama', crop: C.pasillo, li: ['Chimenea con leña incluida', 'Sala con vista a los pinos', 'Porche con hamaca', 'Acepta mascotas con aviso'], ocu: [1, 0, 0, 0, 1, 1, 1],
    plan: [[0, 40, 100, 20, 'Porche', true], [4, 4, 46, 36, 'Sala con chimenea'], [50, 4, 46, 24, 'Recámara'], [50, 28, 46, 12, 'Baño']] },
  { k: 'muelle', t: 'Suite del muelle', lv: '2 huéspedes', d: 'Terraza propia y el lago a tus pies.', long: 'Un solo ambiente, amplio, con la terraza pegada al agua. Se desayuna en el muelle y se nada desde la escalera.', p: 3900, m2: 40, cama: 'cama king', crop: C.recamara, li: ['Terraza privada sobre el muelle', 'Desayuno servido en la terraza', 'Acceso directo al agua para nadar', 'Regadera exterior'], ocu: [0, 0, 1, 1, 0, 0, 1],
    plan: [[0, 40, 100, 20, 'Terraza y muelle', true], [4, 4, 60, 36, 'Recámara y estar'], [64, 4, 32, 36, 'Baño']] },
  { k: 'casa', t: 'Casa completa', lv: 'Hasta 6 huéspedes', d: 'Tres recámaras para ir en familia o con amigos.', long: 'La casa grande de la orilla, con cocina abierta, tres recámaras y el muelle y la fogata solo para ustedes.', p: 9800, m2: 180, cama: '3 recámaras', crop: C.cocina, li: ['Tres recámaras y cocina abierta', 'Muelle y fogata solo para ustedes', 'Anfitrión y chef bajo petición', 'Estacionamiento para tres autos'], ocu: [0, 0, 0, 1, 1, 0, 0],
    plan: [[0, 40, 100, 20, 'Muelle y fogata', true], [4, 4, 44, 36, 'Sala y cocina'], [48, 4, 24, 20, 'Recámara 1'], [72, 4, 24, 20, 'Recámara 2'], [48, 24, 24, 16, 'Recámara 3'], [72, 24, 24, 16, 'Baños']] },
];
const plan = (r: Room[]) => `<svg viewBox="0 0 100 60" aria-hidden="true">${r.map(([x, y, w, h, t, o]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${o ? 'po' : 'pr'}"/><text x="${x + w / 2}" y="${y + h / 2 + 1.2}" text-anchor="middle">${t}</text>`).join('')}</svg>`;
const stayRow = (c: Cl, i: number) => `<article class="wstay rv"><div class="wsi">${im(c.crop, 'rm')}<span>0${i + 1}</span></div>
<div class="wsb"><h4>${c.t}</h4><p class="wmeta">${c.m2} m² · ${c.cama} · ${c.lv}</p><p class="wlong">${c.long}</p><ul>${c.li.map((x) => `<li>${x}</li>`).join('')}</ul><div class="wplan">${plan(c.plan)}</div>
<div class="wc-f"><div><b>${money(c.p)}</b><small>por noche · desayuno incluido</small></div><button type="button" class="wb" data-int="wbook" data-nivel="${c.k}">Reservar</button></div></div></article>`;

const days = ['Vie 14', 'Sáb 15', 'Dom 16', 'Lun 17', 'Mar 18', 'Mié 19', 'Jue 20'];
const avail = `<div class="wav rv"><div class="wav-h"><span></span>${days.map((d) => `<b>${d}</b>`).join('')}</div>${clases.map((c) => `<div class="wav-r"><span>${c.t}</span>${c.ocu.map((o) => `<i class="${o ? 'o' : ''}"></i>`).join('')}</div>`).join('')}<p><i class="k"></i>Disponible <i class="k o"></i>Ocupada</p></div>`;
const cmpRows: [string, (c: Cl) => string][] = [['Superficie', (c) => `${c.m2} m²`], ['Huéspedes', (c) => c.lv.replace(' huéspedes', '')], ['Camas', (c) => c.cama], ['Chimenea', (c) => (c.k === 'bosque' || c.k === 'casa' ? 'Sí' : '—')], ['Terraza al agua', (c) => (c.k === 'bosque' ? '—' : 'Sí')], ['Mascotas', (c) => (c.k === 'bosque' ? 'Sí' : '—')], ['Noche, temporada media', (c) => money(c.p)]];
const cmp = `<table class="wtbl rv"><thead><tr><th></th>${clases.map((c) => `<th>${c.t}</th>`).join('')}</tr></thead><tbody>${cmpRows.map(([n, f]) => `<tr><th>${n}</th>${clases.map((c) => `<td>${f(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

// ---------- tarifas ----------
const tarifas: [string, number, number, number][] = [['Casa de cristal', 4100, 4800, 5900], ['Cabaña del bosque', 2700, 3200, 3900], ['Suite del muelle', 3300, 3900, 4700], ['Casa completa', 8300, 9800, 11900]];
const rates = `<table class="wtbl wrate rv"><thead><tr><th>Por noche</th><th>Baja<small>may–jun, sep–oct</small></th><th>Media<small>nov, ene–abr</small></th><th>Alta<small>jul–ago, dic, Semana Santa</small></th></tr></thead><tbody>${tarifas.map(([n, a, b, c]) => `<tr><th>${n}</th><td>${money(a)}</td><td>${money(b)}</td><td>${money(c)}</td></tr>`).join('')}</tbody></table>`;

// ---------- experiencias ----------
const exps: [string, string, string, Crop, string[], string][] = [
  ['01', 'Atardecer en kayak', 'Remo suave a la hora dorada y una copa al volver al muelle. Salimos 40 minutos antes de que caiga el sol.', C.cielo, ['2 h', 'Máx. 6 personas'], '$850'],
  ['02', 'Retiro de calma', 'Dos noches frente al lago con yoga al amanecer, baño de bosque y comidas ligeras. Sin pantallas si quieres.', C.biblioteca, ['2 noches', 'Todo incluido'], '$6,900'],
  ['03', 'Yoga y desayuno largo', 'Una clase suave frente al agua y un desayuno sin prisa en la terraza, con pan y fruta de la región.', C.reflejo, ['3 h', 'Máx. 8 personas'], '$980'],
  ['04', 'Retiros y celebraciones', 'Armamos la estancia para tu equipo o tu familia, con fechas, comidas y precios a medida.', C.comedor, ['Desde 8 personas', 'A medida'], 'Cotiza'],
];
const expRow = ([n, t, d, c, m, pr]: (typeof exps)[number]) => `<article class="wxr rv"><span class="wxn">${n}</span>${im(c, 'rm wxi')}<div class="wxb"><h4>${t}</h4><p>${d}</p></div><div class="wxm"><ul>${m.map((x) => `<li>${x}</li>`).join('')}</ul><b>${pr}</b>${btn('reservar', 'wb wb-s', 'Pedir fecha')}</div></article>`;
const semana: [string, string, string, string][] = [['Lunes', 'Yoga suave · 8:00', 'Kayak libre', 'Cena en la terraza'], ['Martes', 'Caminata al mirador', 'Lectura en el muelle', 'Fogata'], ['Miércoles', 'Yoga suave · 8:00', 'Paseo en lancha', 'Noche de cine al aire libre'], ['Jueves', 'Baño de bosque', 'Kayak libre', 'Cena de mercado'], ['Viernes', 'Yoga · 8:00', 'Taller de cerámica', 'Fogata y música'], ['Sábado', 'Desayuno largo', 'Atardecer en kayak', 'Cena con el chef'], ['Domingo', 'Yoga suave · 8:00', 'Comida de despedida', '—']];
const adds: [string, string][] = [['Masaje en la terraza · 60 min', '$1,200'], ['Cena con chef privado', '$2,400'], ['Paseo en lancha · 1 h', '$1,800'], ['Fogata y malvaviscos', '$450'], ['Sesión de fotos al atardecer', '$3,500'], ['Decoración para ocasiones especiales', '$900']];
const paquetes: [string, string, string, string[]][] = [['Para dos', '$11,900', '2 noches en la Casa de cristal', ['Cena con chef el sábado', 'Atardecer en kayak', 'Desayuno en la terraza']], ['En familia', '$21,500', '2 noches en la Casa completa', ['Fogata y malvaviscos', 'Paseo en lancha', 'Comida de despedida']], ['Con tu equipo', 'A medida', 'Desde 8 personas, 1 a 3 noches', ['Espacio para trabajar', 'Cocina y bebidas', 'Actividad de integración']]];
const estaciones: [string, string, string][] = [['Primavera', 'Mar–may', 'Mañanas frescas y lago tranquilo. Ideal para yoga y caminatas.'], ['Verano', 'Jun–ago', 'Lluvia por las tardes, bosque verde y mucho vapor sobre el agua.'], ['Otoño', 'Sep–nov', 'Cielos limpios, atardeceres largos y la mejor luz para fotos.'], ['Invierno', 'Dic–feb', 'Chimenea encendida, cobijas y noches claras llenas de estrellas.']];

// ---------- nosotros ----------
const hitos: [string, string][] = [['2019', 'Compramos el terreno de la orilla y levantamos la primera cabaña con madera de la región.'], ['2021', 'Abrimos el muelle y la Casa de cristal. Las primeras reservas llegaron por recomendación.'], ['2023', 'Instalamos paneles solares y una planta para tratar el agua de la casa.'], ['2025', 'Llegamos a ocho estancias. Decidimos no crecer más.']];
const sost: [string, number][] = [['Energía de paneles solares', 78], ['Agua tratada y reutilizada', 100], ['Residuos que se reciclan', 64], ['Proveedores de la región', 85]];
const team: [string, string, string, string][] = [['DS', 'Diego Salas', 'Anfitrión principal · 12 años en hospitalidad', 'a'], ['AR', 'Ana Rivera', 'Bienestar y yoga', 'b'], ['LM', 'Luis Mendoza', 'Cocina y desayunos', 'c'], ['PC', 'Paula Cruz', 'Reservas y atención a huéspedes', 'd'], ['JT', 'Jorge Téllez', 'Mantenimiento y muelle', 'e']];
const vals: [string, string, string][] = [['01', 'Pocas estancias', 'Solo ocho, para que el lugar siga en calma.'], ['02', 'Anfitriones presentes', 'Te recibimos, te acompañamos y desaparecemos cuando quieres silencio.'], ['03', 'Descanso sin prisa', 'Sin horarios ni actividades obligatorias. Lo único fijo es el desayuno.']];

// ---------- reservar ----------
const hours: [string, string, boolean][] = [['1', '1 noche', false], ['2', '2 noches', false], ['3', '3 noches', false], ['4', '4 noches', true]];
const chip = (g_: string, v: string, label: string, sub = '', full = false) => `<button type="button" class="wk${full ? ' full' : ''}" data-int="wpick" data-g="${g_}" data-v="${v}">${label}${sub ? `<small>${sub}</small>` : ''}</button>`;

// frase del hero: cada frase sube y baja dentro de una ventana
const rot = (ph: string[]) => `<span class="mw-rot">${ph.map((t, i) => `<span class="mw-r" style="--i:${i}">${t}</span>`).join('')}</span>`;
// afirmación del inicio: las palabras se encienden una a una al llegar
const words = (s: string) => s.split(' ').map((w, i) => `<span style="--w:${i}">${w}</span>`).join(' ');
const hdr = (k: string, t: string, p: string, pos: string) => `<header class="wph" style="--p:${pos}"><div><p class="wk-o rv">${k}</p><h3 class="wt rv">${t}</h3>${p ? `<p class="ws-p rv">${p}</p>` : ''}</div></header>`;
const tick = ['Valle de Bravo', 'Ocho estancias', 'A 2 horas de la Ciudad de México', 'Desayuno incluido', 'Kayaks y muelle', 'Chimenea en cada cabaña', 'Anfitriones presentes'];
const ticker = `<div class="wtick" aria-hidden="true"><div>${[0, 1].map(() => `<span>${tick.map((t) => `<em>${t}</em><i></i>`).join('')}</span>`).join('')}</div></div>`;
const stat = (n: number, dec: number, suf: string, label: string) => `<div class="rv"><b><span data-count="${n}" data-dec="${dec}">${n.toFixed(dec)}</span>${suf}</b><small>${label}</small></div>`;
const dia: [string, string, string][] = [['7:30', 'Amanecer en el muelle', 'Café, neblina sobre el agua y los primeros kayaks.'], ['9:00', 'Desayuno largo', 'Pan, fruta, huevos de rancho y café de olla.'], ['11:00', 'Lago', 'Remar, nadar o leer en el muelle. Tú decides.'], ['14:30', 'Comida', 'Cocina de mercado, en la terraza o en tu estancia.'], ['19:40', 'Atardecer', 'El momento que le da nombre al lugar.'], ['21:00', 'Chimenea', 'Leña, cobijas y silencio.']];
const mapa = `<svg viewBox="0 0 400 270" aria-hidden="true"><rect width="400" height="270" class="mp-t"/>
<g class="mp-c" fill="none"><path d="M20 60c60-30 120-20 170-50M0 100c70-40 150-20 230-70M10 215c70 20 140 30 200 55M280 270c40-30 90-40 120-30M330 20c30 10 50 30 70 60"/></g>
<path class="mp-l" d="M58 128C74 66 156 42 226 72c64 27 116 14 138 62 22 48-36 98-110 90-52-6-62-40-104-30-52 12-104-8-92-66Z"/>
<path class="mp-l2" d="M96 130c10-34 66-48 116-30 42 15 80 6 100 34 14 22-16 52-62 50-34-1-48-24-80-20-34 4-84-4-74-34Z"/>
<ellipse cx="236" cy="118" rx="14" ry="8" class="mp-i"/>
<path class="mp-r" d="M-10 250C40 230 70 190 96 168S130 150 150 158" pathLength="1"/>
<g class="mp-p" transform="translate(150 158)"><circle class="rg" r="6"/><circle class="rg rg2" r="6"/><circle r="5" fill="#1f3558"/><text x="10" y="-8">Marea</text></g>
<g class="mp-d"><circle cx="332" cy="196" r="3.4"/><text x="340" y="199">Valle de Bravo</text><circle cx="96" cy="62" r="3.4"/><text x="104" y="60">Mirador</text><circle cx="262" cy="64" r="3.4"/><text x="270" y="62">Embarcadero</text></g>
<g transform="translate(364 28)"><circle r="13" class="mp-n"/><path d="M0-9L3 3L0 1L-3 3Z" fill="#1f3558"/><text y="22" text-anchor="middle">N</text></g></svg>`;
const sol = `<svg viewBox="0 0 400 190" aria-hidden="true"><path class="sl-a" d="M20 130A180 120 0 0 1 380 130" pathLength="1"/><line x1="0" y1="130" x2="400" y2="130" class="sl-h"/>
<g class="sl-w"><path d="M30 146h90M170 152h120M80 164h150M260 172h100M140 180h80"/></g>
<circle r="11" class="sl-s"><animateMotion dur="18s" repeatCount="indefinite" path="M20 130A180 120 0 0 1 380 130" calcMode="spline" keySplines=".45 0 .55 1" keyTimes="0;1"/></circle>
<circle r="11" class="sl-r"><animateMotion dur="18s" repeatCount="indefinite" path="M20 130A180 120 0 0 0 380 130" calcMode="spline" keySplines=".45 0 .55 1" keyTimes="0;1"/></circle>
<g class="sl-t"><text x="20" y="122" text-anchor="middle">7:30</text><text x="200" y="22" text-anchor="middle">13:00</text><text x="380" y="122" text-anchor="middle">19:40</text></g></svg>`;
const faq: [string, string][] = [['¿Cuánto se tarda desde la Ciudad de México?', 'Unas 2 horas 10 minutos en auto, por la carretera a Toluca y Valle de Bravo. Te enviamos la ruta y el código de acceso.'], ['¿Qué incluye la estancia?', 'Desayuno, kayaks, uso del muelle, leña para la chimenea, wifi y estacionamiento.'], ['¿Aceptan mascotas?', 'Sí, en la cabaña del bosque y con aviso previo. Pedimos que no se queden solas en la estancia.'], ['¿A qué hora es la entrada y la salida?', 'Entras desde las 15:00 y sales hasta las 12:00. Si llegas antes, te guardamos el equipaje.'], ['¿Puedo cancelar?', 'Sin costo hasta 72 horas antes de tu llegada. Después se cobra la primera noche.'], ['¿Hay dónde comer cerca?', 'Cocinamos desayuno y comida bajo pedido. El centro de Valle de Bravo está a 10 minutos en auto.']];
const rev: [string, string, string][] = [['Dormimos con el lago frente a la cama. Fue el fin de semana más tranquilo del año.', 'Mariana R.', 'Casa de cristal · octubre'], ['Fuimos en familia a la casa completa. Todo cuidado, sin prisa y con el muelle solo para nosotros.', 'Familia Ortega', 'Casa completa · agosto'], ['Llegué cansado un viernes y el domingo no quería irme. El desayuno en la terraza vale el viaje.', 'Andrés P.', 'Suite del muelle · marzo']];

export const webHTML = `<div class="pg mr-web" data-rp="dark" data-tab="inicio" data-nivel="cristal" data-dia="0" data-hora="2" data-pax="2">
${nav}
<div class="mw-scroll">

<section class="wv wv-inicio">
 <div class="wh"><i class="mw-photo"></i><i class="mw-shade"></i>
  <div class="mw-hero">
   <h4 class="mw-h"><span class="mw-w" style="--d:.5s">Un lugar para</span><span class="mw-w mw-it" style="--d:.8s">${rot(['bajar el ritmo.', 'mirar el lago.', 'dormir con calma.', 'volver a ti.'])}</span></h4>
   <p class="mw-s mw-f" style="--d:1.2s">Ocho estancias frente al agua, con desayuno incluido y anfitriones que te cuidan sin estorbar.</p>
   <button type="button" class="wb wb-h mw-f" style="--d:1.4s" ${go('reservar')}>Reservar estancia</button>
  </div>
  <button type="button" class="mw-feat mw-f" style="--d:1.6s" data-int="wbook" data-nivel="cristal">${im(C.sala, 'mf-img')}<span class="mf-card"><b>Casa de cristal</b><small>62 m², cama king y terraza sobre el agua. Desde $4,800 por noche.</small><em>Ver estancia<i></i></em></span></button>
 </div>
 ${ticker}

 <div class="wsx wbar"><div class="mw-book rv" ${go('reservar')}><div><small>Estancia</small><b>Casa de cristal</b></div><div><small>Llegada</small><b>Vie 14 · 3 pm</b></div><div><small>Noches</small><b>2 noches</b></div><i>Buscar fechas</i></div>
  <div class="mw-cond rv"><small>Lago hoy</small><div><b>22°</b><span>Aire</span></div><div><b>19°</b><span>Agua</span></div><div><b>7:42</b><span>Atardecer</span></div></div></div>

 <div class="wsx wintro"><p class="wk-o rv">Marea</p>
  <p class="wstate rv">${words('Ocho estancias sobre un solo muelle, en la orilla tranquila del lago de Valle de Bravo. Casas pequeñas, bien hechas, con el agua enfrente y el desayuno incluido. Venimos a que no hagas nada, y a que lo hagas bien.')}</p>
  <div class="wstats">${stat(8, 0, '', 'estancias en total')}${stat(2, 0, ' h', 'desde la Ciudad de México')}${stat(19, 0, '°', 'agua del lago hoy')}${stat(4.9, 1, '', 'promedio en 142 reseñas')}</div></div>

 <div class="wsx wsec"><div class="wsh"><div><p class="wk-o rv">Estancias</p><h3 class="wt rv">Cuatro formas de <em>quedarte</em></h3></div>${btn('clases', 'wb wb-s', 'Ver todas')}</div>
  <div class="wgrid">${clases.slice(0, 3).map((c, i) => `<article class="${i ? 'wsm' : 'wbig'} rv" ${go('clases')}>${im(c.crop, 'rm')}<div class="wcap"><span>0${i + 1}</span><b>${c.t}</b><small>${c.m2} m² · ${c.cama} · ${c.lv}</small><em>${money(c.p)} <i>/ noche</i></em></div></article>`).join('')}</div></div>

 <div class="wdarkb wday"><div class="wsx"><div class="wday-g"><div><p class="wk-o rv">Un día en Marea</p><h3 class="wt rv">Del amanecer a la <em>chimenea</em></h3><div class="wsun rv">${sol}</div></div>
  <ol class="wtl">${dia.map(([h, t, d]) => `<li class="rv"><time>${h}</time><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ol></div></div></div>

 <div class="wsx wmap"><div class="wmap-g"><div class="wmap-i"><p class="wk-o rv">Cómo llegar</p><h3 class="wt rv">A dos horas, <em>sin prisa</em></h3>
  <ol class="wroute">${[['Ciudad de México', 'Salida por la carretera a Toluca.', '0 min'], ['Toluca', 'Sigues por la carretera a Valle de Bravo.', '55 min'], ['Valle de Bravo', 'Cruzas el centro hacia la orilla del lago.', '1 h 55 min'], ['Camino al Muelle 12', 'Llegas a Marea. Te esperamos con una bebida.', '2 h 10 min']].map(([a, b, c]) => `<li class="rv"><b>${a}</b><span>${b}</span><time>${c}</time></li>`).join('')}</ol></div>
  <div class="wmap-m rv">${mapa}</div></div></div>

 <div class="wgal" aria-hidden="true"><div>${[0, 1].map(() => `<span>${[[C.sala, 13, 'Sala frente al lago'], [C.cielo, 7, 'Cielo de octubre'], [C.comedor, 13, 'Comedor al atardecer'], [C.reflejo, 9, 'Reflejo en el agua'], [C.cocina, 13, 'Cocina de nogal'], [C.biblioteca, 13, 'Rincón de lectura'], [C.pasillo, 8, 'Pasillo de madera'], [C.bano, 13, 'Baño con vista al lago'], [C.recamara, 13, 'Recámara, 7:10 pm'], [C.agua, 8, 'Lago en calma']].map(([c, w, t]) => `<figure style="--w:${w}em">${im(c as Crop)}<figcaption>${t}</figcaption></figure>`).join('')}</span>`).join('')}</div></div>

 <div class="wsx wrevs"><p class="wk-o rv">Lo que cuentan</p><div class="wrev">${rev.map(([q, n, s]) => `<figure class="rv"><i>★★★★★</i><blockquote>“${q}”</blockquote><figcaption><b>${n}</b>${s}</figcaption></figure>`).join('')}</div></div>

 <div class="wsx wrates"><div class="wsh"><div><p class="wk-o rv">Tarifas</p><h3 class="wt rv">Precio por noche, <em>según la temporada</em></h3></div></div>${rates}<p class="wnote rv">Todas incluyen desayuno, kayaks, muelle y leña. Cancelas sin costo hasta 72 horas antes.</p></div>

 <div class="wsx wfaq"><p class="wk-o rv">Dudas frecuentes</p><div class="wfq">${faq.map(([q, a]) => `<div class="rv"><b>${q}</b><span>${a}</span></div>`).join('')}</div></div>

 <div class="wband rv"><i class="wband-ph"></i><div><p class="wk-o">Esta semana</p><h3 class="wt">Aún hay fechas <em>entre semana</em></h3><p class="ws-p">Reserva en un minuto. Cancelas sin costo hasta 72 horas antes de tu llegada.</p>${btn('reservar', 'wb wb-h', 'Ver fechas')}</div></div>
 ${foot}
</section>

<section class="wv wv-clases">${hdr('Estancias', 'Ocho casas, <em>cuatro formas</em> de quedarte', 'Elige según con quién vienes y cuánto quieres estar junto al agua. Todas incluyen lo mismo.', '50% 4% / 100% auto')}
 <div class="wsx wbody"><ul class="winc rv">${['Desayuno para dos cada día', 'Kayaks y uso del muelle', 'Leña para la chimenea', 'Wifi y estacionamiento', 'Ropa de cama y amenidades'].map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join('')}</ul>
 ${clases.map(stayRow).join('')}
 <h3 class="wt2 rv">Compara las cuatro</h3>${cmp}
 <h3 class="wt2 rv">Disponibilidad de la semana</h3>${avail}
 <h3 class="wt2 rv">Tarifas por temporada</h3>${rates}
 <h3 class="wt2 rv">Antes de llegar</h3><div class="wpol">${[['Entrada y salida', 'Entras desde las 15:00 y sales hasta las 12:00. Guardamos tu equipaje si llegas antes.'], ['Cancelación', 'Sin costo hasta 72 horas antes. Después se cobra la primera noche.'], ['Pagos', 'Apartas con el 30 % y el resto lo pagas al llegar. Aceptamos tarjeta y transferencia.'], ['Niños y mascotas', 'Niños bienvenidos en todas. Mascotas solo en la cabaña del bosque, con aviso.']].map(([a, b]) => `<div class="rv"><b>${a}</b><span>${b}</span></div>`).join('')}</div></div>
 ${foot}
</section>

<section class="wv wv-experiencias">${hdr('Experiencias', 'Más que una <em>estancia</em>', 'Momentos pensados para quedarte con el lago: solo, en pareja, en familia o con tu equipo.', '100% 6% / 150% auto')}
 <div class="wsx wbody"><div class="wxl">${exps.map(expRow).join('')}</div>
 <h3 class="wt2 rv">Una semana en Marea</h3>
 <table class="wtbl wsem rv"><thead><tr><th></th><th>Mañana</th><th>Tarde</th><th>Noche</th></tr></thead><tbody>${semana.map(([d, a, b, c]) => `<tr><th>${d}</th><td>${a}</td><td>${b}</td><td>${c}</td></tr>`).join('')}</tbody></table>
 <p class="wnote rv">Las actividades de la semana están incluidas en las estancias de más de dos noches. El programa cambia según el clima.</p>
 <h3 class="wt2 rv">Complementos</h3>
 <ul class="wadd rv">${adds.map(([a, b]) => `<li><span>${a}</span><i></i><b>${b}</b></li>`).join('')}</ul></div>
 <div class="wdarkb wpk"><div class="wsx"><p class="wk-o rv">Paquetes</p><h3 class="wt rv">Todo resuelto, <em>para llegar y descansar</em></h3>
  <div class="wpks">${paquetes.map(([t, p, d, l]) => `<div class="rv"><b>${t}</b><em>${p}</em><small>${d}</small><ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul>${btn('reservar', 'wb wb-h wb-s', 'Pedir fecha')}</div>`).join('')}</div></div></div>
 <div class="wsx wseas"><p class="wk-o rv">Estaciones</p><div class="wse">${estaciones.map(([a, m, d]) => `<div class="rv"><b>${a}</b><em>${m}</em><span>${d}</span></div>`).join('')}</div></div>
 ${foot}
</section>

<section class="wv wv-nosotros">${hdr('Nosotros', 'Una casa <em>junto al lago</em>', 'Marea nació para ofrecer descanso sin ruido. Nos importa más que descanses que llenar el calendario.', '0% 4% / 150% auto')}
 <div class="wsx wbody"><div class="wnos"><p class="wstate wst2 rv">${words('Empezamos con una cabaña y un muelle de madera. Hoy son ocho estancias, y no habrá más. Preferimos recibir a pocas personas, conocer sus nombres y cuidar el lago que nos da el trabajo.')}</p>${im(C.lago, 'rm wnos-i')}</div>
 <div class="wvals">${vals.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div>
 <div class="wnos2"><div><h3 class="wt2 rv">Cómo cuidamos el lugar</h3><div class="wbars">${sost.map(([t, v]) => `<div class="rv" style="--v:${v}%"><span>${t}</span><b>${v}%</b><i></i></div>`).join('')}</div></div>
  <div><h3 class="wt2 rv">Nuestra historia</h3><ol class="wtl wtl2">${hitos.map(([y, t]) => `<li class="rv"><time>${y}</time><div><span>${t}</span></div></li>`).join('')}</ol></div></div>
 <h3 class="wt2 rv">El equipo</h3>
 <div class="wteam">${team.map(([i, n, r, c]) => `<div class="rv"><i class="av-${c}">${i}</i><b>${n}</b><span>${r}</span></div>`).join('')}</div>
 <div class="wloc rv"><div><p class="wk-o">Dónde estamos</p><b>Camino al Muelle 12, Valle de Bravo, Estado de México</b><span>Check-in desde las 15:00 · hola@marea.example · +52 726 000 0000</span></div>${btn('reservar', 'wb wb-h', 'Reservar estancia')}</div></div>
 ${foot}
</section>

<section class="wv wv-reservar">${hdr('Reservar', 'Reserva tu <em>estancia</em>', 'Elige fechas y te confirmamos al momento. Sin pagos por adelantado en esta demostración.', '70% 20% / 150% auto')}
 <div class="wsx wbody"><div class="wres">
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
   <button type="button" class="wb wb-h wb-w" data-int="wconfirm">Confirmar reserva</button><small>Desayuno incluido · Cancela sin costo hasta 72 h antes</small></div>
   <div class="wdone"><i>${svg('check')}</i><h4>¡Reserva confirmada!</h4><p data-sum="done">Te esperamos en el lago.</p><span data-sum="code">MAR-0142</span><button type="button" class="wb-g" data-int="wreset">Hacer otra reserva</button></div></aside>
 </div>
 <div class="wpol wpol3">${[['Qué incluye', 'Desayuno para dos cada día, kayaks, muelle, leña, wifi y estacionamiento.'], ['Cancelación', 'Sin costo hasta 72 horas antes de tu llegada. Después se cobra la primera noche.'], ['¿Prefieres escribirnos?', 'WhatsApp +52 726 000 0000 · hola@marea.example. Respondemos en menos de una hora.']].map(([a, b]) => `<div class="rv"><b>${a}</b><span>${b}</span></div>`).join('')}</div></div>
 ${foot}
</section>

</div></div>`;

// ---------- ficha del proyecto: mismo diseño que la página «Contenido» del libro de HumanCorp ----------
const hd: [string, string][] = [
  ['Identidad de marca', 'Logotipo y manual'],
  ['Sitio web', '5 secciones navegables'],
  ['Reservas en línea', 'Fechas y confirmación'],
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
