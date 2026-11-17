// Proyecto «Hikari Estudio» (concepto): estudio de diseño y fotografía. Sitio web completo (Inicio, Servicios, Casos, Nosotros, Contacto), portada de marca y tabla de contenido.
// La raíz del sitio también es .mr-web, así que las pestañas, el desplazamiento, la aparición (.rv), los contadores y la vista ampliada los resuelve marea-site.ts;
// el formulario, au-site.ts. Estilos en styles/aurora.css (minimalismo japonés: papel claro, serif ligera, líneas finas que se trazan).
const IMG = '/obra/p4.webp';
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const btn = (t: string, cls: string, label: string) => `<button type="button" class="${cls}" ${go(t)}>${label}</button>`;
const tabs: [string, string][] = [['servicios', 'Servicios'], ['casos', 'Casos'], ['nosotros', 'Nosotros'], ['contacto', 'Contacto']];
const photo = (pos: string, z = 1, cls = '') => `<div class="au-im ${cls}"><img src="${IMG}" alt="" width="1500" height="1000" loading="lazy" decoding="async" style="--p:${pos};--z:${z}"></div>`;
const words = (s: string) => s.split(' ').map((w, i) => `<span style="--w:${i}">${w}</span>`).join(' ');

const nav = `<div class="au-nav mw-f" style="--d:.15s"><button type="button" class="au-logo" ${go('inicio')}>Hikari Estudio</button><nav>${tabs.map(([k, t]) => btn(k, 'au-t', t)).join('')}</nav></div>`;
const foot = `<footer class="au-ft"><div class="au-fg"><div><b>Hikari Estudio</b><p>Diseño y fotografía<br>Ciudad de México</p></div><div><p class="au-k">Sitio</p>${tabs.map(([k, t]) => btn(k, 'au-fa', t)).join('')}</div><div><p class="au-k">Escríbenos</p><span class="au-fa">hola@hikari.example</span><span class="au-fa">+52 55 0000 0000</span></div></div><b class="au-big" aria-hidden="true">hikari</b><p class="au-cp">Concepto de HumanCorp · Datos de ejemplo</p></footer>`;
const hdr = (k: string, t: string, p: string, pos: string) => `<header class="au-ph">${photo(pos, 1.6, 'au-phi')}<div><p class="au-k rv">${k}</p><h3 class="au-t2 rv">${t}</h3>${p ? `<p class="au-p rv">${p}</p>` : ''}</div></header>`;

const materias = ['Marcas', 'Editorial', 'Moda', 'Gastronomía', 'Arquitectura', 'Producto', 'Retrato'];
const ticker = `<div class="au-tools"><p>${materias.join('<i></i>')}</p></div>`;
const stat = (n: number, dec: number, suf: string, label: string) => `<div class="rv"><b><span data-count="${n}" data-dec="${dec}">${n.toFixed(dec)}</span>${suf}</b><small>${label}</small></div>`;
const serv: [string, string, string, string[]][] = [
  ['01', 'Fotografía', 'Producto, retrato, editorial y espacios. Luz natural cuando se puede, estudio cuando hace falta, siempre con una idea clara por imagen.', ['Dirección de arte de la sesión', 'Fotografía en estudio o locación', 'Selección y retoque', 'Entrega para web e impresión']],
  ['02', 'Diseño de marca', 'Nombre, logotipo y sistema visual sencillo, pensado para verse bien en una tarjeta y en una pared.', ['Logotipo y variantes', 'Paleta y tipografía', 'Papelería y empaque', 'Guía de uso de la marca']],
  ['03', 'Diseño web y editorial', 'Sitios, catálogos y libros con pocos elementos y mucho aire, para que las imágenes respiren.', ['Sitio web a medida', 'Catálogos y lookbooks', 'Libros y publicaciones', 'Cuidado de la tipografía']],
];
const steps: [string, string, string][] = [['01', 'Conversación', 'Entendemos qué quieres contar y para quién.'], ['02', 'Dirección', 'Definimos luz, paleta, referencias y el guion de la sesión.'], ['03', 'Sesión', 'Fotografiamos en estudio o en locación, sin prisa.'], ['04', 'Entrega', 'Seleccionamos, retocamos y diseñamos la pieza final.']];
const hoja: [string, string, number, string][] = [['Retrato 01', '14% 18%', 1.7, 'tall'], ['Luz de la tarde', '90% 22%', 1.4, ''], ['Textura', '60% 85%', 1.6, ''], ['Retrato 02', '66% 30%', 2, 'tall']];
const faq: [string, string][] = [['¿Fotografían en locación?', 'Sí. Podemos trabajar en nuestro estudio o en el lugar donde ocurre tu proyecto. Visitamos antes para ver la luz.'], ['¿Cuántas fotografías incluye una sesión?', 'Depende del paquete. Entregamos una selección retocada, no cientos de archivos: preferimos pocas y buenas.'], ['¿Cuánto tarda la entrega?', 'La selección llega en una a dos semanas después de la sesión, según el volumen de retoque.'], ['¿Quién tiene los derechos de las imágenes?', 'Tú recibes una licencia de uso para los medios que acordamos desde el inicio. Si luego necesitas más, la ampliamos.'], ['¿Pueden encargarse también de la marca y el sitio?', 'Sí. Muchos proyectos empiezan con una sesión y siguen con identidad o web, para que todo se vea de una pieza.'], ['¿Cómo cotizan?', 'Después de una llamada de 30 minutos. Te enviamos una propuesta clara con alcance, fechas y precio.']];
const casos: [string, string, string, [string, string][]][] = [
  ['Cerámica Tierra Viva', 'Fotografía de producto y catálogo', 'Un taller de cerámica necesitaba fotografías sobrias para su tienda. Hicimos la sesión en un día con fondo de papel y luz de ventana, y diseñamos el catálogo.', [['48 piezas', 'fotografiadas en 2 días'], ['1 catálogo', 'impreso y digital']]],
  ['Café Nube', 'Identidad y fotografía de menú', 'Nombre, logotipo y una guía visual breve para una cafetería pequeña, junto con la fotografía de su menú y su local.', [['1 guía', 'de marca de 12 páginas'], ['24 imágenes', 'de menú y espacio']]],
  ['Casa Hoshi', 'Fotografía de arquitectura y sitio web', 'Un estudio de arquitectura quería mostrar una casa sin ruido. Fotografiamos a distintas horas y diseñamos un sitio de cinco páginas.', [['3 horarios', 'de luz fotografiados'], ['5 páginas', 'de sitio web']]],
];
const prin: [string, string, string][] = [['01', 'La luz primero', 'Todo empieza mirando la luz del lugar. Lo demás se decide a partir de ahí.'], ['02', 'Pocas cosas, bien hechas', 'Una idea por imagen. Quitamos hasta que lo que queda se sostiene solo.'], ['03', 'Tiempo para mirar', 'Trabajamos con pocos proyectos a la vez para dedicarle atención a cada uno.']];
const team: [string, string, string][] = [['AM', 'Aiko Mora', 'Dirección y fotografía'], ['DI', 'Daniel Ito', 'Diseño de marca y web'], ['SA', 'Sofía Arce', 'Producción y retoque']];
const tiers: [string, string, string, string][] = [['Duración de la sesión', 'Media jornada', 'Jornada completa', 'A medida'], ['Fotografías retocadas', '15', '30', 'A medida'], ['Dirección de arte', 'Incluida', 'Incluida', 'Incluida'], ['Diseño de marca', '—', 'Logotipo y guía', 'Sistema completo'], ['Licencia de uso', 'Web y redes', 'Web, redes e impresión', 'A medida'], ['Entrega', '2 semanas', '2 semanas', 'Según calendario']];

export const siteHTML = `<div class="pg mr-web au-web" data-rp="dark" data-tab="inicio">
${nav}
<div class="mw-scroll">

<section class="au-v au-inicio">
 <div class="au-h0 au-hb"><div class="au-hp"><img class="au-img" src="${IMG}" alt="" width="1500" height="1000" decoding="async"></div><i class="au-bv"></i>
  <div class="au-bw mw-f" style="--d:.5s"><b>hikari</b><span>光 · Estudio de diseño y fotografía</span></div>
  <div class="au-scr mw-f" style="--d:1.4s"><i></i><span>Desliza</span></div></div>
 ${ticker}
 <div class="au-sec au-intro"><p class="au-k rv">Hikari · 光</p><p class="au-state rv">${words('Somos un estudio de diseño y fotografía. Creemos que una buena imagen dice poco y lo dice bien: luz natural, espacio para respirar y una sola idea por encuadre.')}</p>
  <div class="au-stats">${stat(12, 0, '', 'años de oficio')}${stat(120, 0, '+', 'proyectos realizados')}${stat(6, 0, '', 'personas en el estudio')}${stat(3, 0, '', 'ciudades donde hemos trabajado')}</div></div>
 <div class="au-sec"><div class="au-sh"><div><p class="au-k rv">Servicios</p><h3 class="au-t2 rv">Tres oficios, una misma mirada</h3></div>${btn('servicios', 'au-ln', 'Ver servicios')}</div>
  <div class="au-svc">${serv.map(([n, t, d]) => `<article class="rv" ${go('servicios')}><em>${n}</em><b>${t}</b><span>${d}</span></article>`).join('')}</div></div>
 <div class="au-sec"><p class="au-k rv">Hoja de contactos</p><h3 class="au-t2 rv">Fragmentos de nuestro trabajo</h3><div class="au-cts">${hoja.map(([t, pos, z, c]) => `<figure class="rv ${c}">${photo(pos, z, 'au-ct')}<figcaption>${t}</figcaption></figure>`).join('')}</div></div>
 <div class="au-sec"><p class="au-k rv">Cómo trabajamos</p><h3 class="au-t2 rv">De la idea a la imagen final</h3><div class="au-steps">${steps.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
 <div class="au-sec"><div class="au-sh"><div><p class="au-k rv">Casos</p><h3 class="au-t2 rv">Proyectos recientes</h3></div>${btn('casos', 'au-ln', 'Ver casos')}</div>
  <div class="au-cs">${casos.map(([c, t, , m]) => `<article class="rv" ${go('casos')}><small>${c}</small><b>${t}</b><div>${m.map(([a, b]) => `<p><i>${a}</i>${b}</p>`).join('')}</div></article>`).join('')}</div></div>
 <div class="au-sec au-faq"><p class="au-k rv">Dudas frecuentes</p><div class="au-fq">${faq.map(([q, a]) => `<div class="rv"><b>${q}</b><span>${a}</span></div>`).join('')}</div></div>
 <div class="au-cta rv"><svg class="au-en" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 8A42 42 0 1 1 22 20" pathLength="1"/></svg><h3>¿Qué historia quieres contar?</h3><p>Cuéntanos de tu proyecto. Te respondemos en un día hábil.</p>${btn('contacto', 'au-btn', 'Escríbenos')}</div>
 ${foot}
</section>

<section class="au-v au-servicios">${hdr('Servicios', 'Fotografía, marca y diseño', 'Tres servicios que se combinan. Puedes empezar con una sesión y seguir con lo demás.', '82% 25%')}
 <div class="au-body">${serv.map(([n, t, d, l]) => `<article class="au-sb rv"><div><em>${n}</em><h4>${t}</h4><p>${d}</p></div><ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul></article>`).join('')}
 <h3 class="au-t3 rv">Cómo se ven los paquetes</h3>
 <table class="au-tbl rv"><thead><tr><th></th><th>Esencial</th><th>Marca</th><th>A medida</th></tr></thead><tbody>${tiers.map(([a, b, c, d]) => `<tr><th>${a}</th><td>${b}</td><td>${c}</td><td>${d}</td></tr>`).join('')}</tbody></table>
 <p class="au-note rv">Los precios dependen del alcance. Te damos una cotización clara después de una llamada de 30 minutos.</p>
 <h3 class="au-t3 rv">Con qué trabajamos</h3><div class="au-int rv">${['Luz natural', 'Fondos de papel', 'Película y digital', 'Locaciones', 'Retrato', 'Producto', 'Arquitectura', 'Edición y retoque'].map((l) => `<span>${l}</span>`).join('')}</div>
 <h3 class="au-t3 rv">Cómo trabajamos</h3><div class="au-steps">${steps.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
 ${foot}
</section>

<section class="au-v au-casos">${hdr('Casos', 'Proyectos recientes', 'Casos ilustrativos, con datos de ejemplo, de cómo trabajamos con distintos tipos de proyecto.', '60% 70%')}
 <div class="au-body">${casos.map(([c, t, d, m], i) => `<article class="au-cb rv"><div class="au-cn"><em>0${i + 1}</em><small>${c}</small></div><div><h4>${t}</h4><p>${d}</p></div><div class="au-cm">${m.map(([a, b]) => `<p><b>${a}</b><span>${b}</span></p>`).join('')}</div></article>`).join('')}
 <p class="au-note rv">Proyectos y cifras de ejemplo.</p></div>
 <div class="au-cta rv"><h3>¿Tu proyecto se parece a alguno?</h3><p>Cuéntanos y vemos cómo contarlo mejor.</p>${btn('contacto', 'au-btn', 'Escríbenos')}</div>${foot}
</section>

<section class="au-v au-nosotros">${hdr('Nosotros', 'Un estudio pequeño, con calma', 'Somos un equipo chico de dirección, fotografía y diseño.', '10% 20%')}
 <div class="au-body"><p class="au-state au-st2 rv">${words('Creemos que mirar bien lleva tiempo. Por eso trabajamos con pocos proyectos a la vez, cuidamos la luz y diseñamos solo lo necesario.')}</p>
 <div class="au-prin">${prin.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div>
 <h3 class="au-t3 rv">El equipo</h3><div class="au-team">${team.map(([i, n, r]) => `<div class="rv"><i>${i}</i><b>${n}</b><span>${r}</span></div>`).join('')}</div></div>
 <div class="au-cta rv"><h3>Conozcámonos</h3><p>Una llamada de 30 minutos para hablar de tu proyecto.</p>${btn('contacto', 'au-btn', 'Escríbenos')}</div>${foot}
</section>

<section class="au-v au-contacto">${hdr('Contacto', 'Cuéntanos de tu proyecto', 'Te respondemos en un día hábil, con una propuesta de por dónde empezar.', '40% 30%')}
 <div class="au-body"><div class="au-cg"><div class="au-form"><p class="au-lb">¿Qué te interesa?</p><div class="au-chips">${['Fotografía', 'Diseño de marca', 'Diseño web', 'No lo sé aún'].map((c) => `<button type="button" data-int="auchip">${c}</button>`).join('')}</div>
  <div class="au-flds"><input type="text" placeholder="Nombre" aria-label="Nombre" /><input type="text" placeholder="Correo o WhatsApp" aria-label="Contacto" /></div><textarea placeholder="Cuéntanos qué quieres contar y para qué" aria-label="Mensaje"></textarea>
  <button type="button" class="au-btn" data-int="ausend">Enviar mensaje</button><div class="au-ok"><b>Gracias, recibimos tu mensaje.</b><span>Esta es una demostración: no se envió nada, pero así se vería la confirmación.</span></div></div>
 <aside class="au-ci"><p class="au-k">Escríbenos</p><b>hola@hikari.example</b><b>+52 55 0000 0000</b><p class="au-k">Horario</p><span>Lunes a viernes, 10:00 a 18:00</span><p class="au-k">Estudio</p><span>Ciudad de México · con cita previa</span></aside></div></div>
 ${foot}
</section>

</div></div>`;

// ---------- identidad: portada con la fotografía a sangre ----------
const brand = `<div class="pg au-brand" data-rp="dark"><img class="au-img" src="${IMG}" alt="" width="1500" height="1000" decoding="async"><i class="au-bv"></i>
<div class="au-bt mw-f" style="--d:.2s"><span>Manual de marca</span><span>Made by <b><i class="wl">Human</i><i class="ws">Corp</i></b></span></div>
<div class="au-bw mw-f" style="--d:.5s"><b>hikari</b><span>光 · Estudio de diseño y fotografía</span></div></div>`;

// ---------- tabla de contenido ----------
const hd: [string, string][] = [['Naming e identidad', 'Nombre, logotipo y manual'], ['Portada fotográfica', 'Fotografía a sangre y movimiento'], ['Sitio web', '5 secciones navegables'], ['Servicios y paquetes', 'Qué hacemos y cómo se ve'], ['Hoja de contactos', 'Selección de imágenes'], ['Casos', 'Proyectos con cifras'], ['Formulario de contacto', 'Con confirmación'], ['Datos e infraestructura', 'Respaldos y monitoreo']];
const contents = `<div class="pg lt pc mr-case au-case"><div class="pc-top"><b><span class="wl">HUMAN</span> <span class="ws">CORP</span></b><span>Proyecto Hikari Estudio · 2025</span></div>
<div class="pc-l"><h4>Lo que se hizo</h4><p>${hd.length} entregables</p></div>
<ul class="pc-r">${hd.map(([t, d], n) => `<li><div class="pc-i"><em>${String(n + 1).padStart(2, '0')}</em><b>${t}</b><i></i><span>${d}</span></div></li>`).join('')}</ul>
<p class="pc-f">Hikari Estudio · diseño y fotografía · concepto, datos de ejemplo</p><span class="bk-pn">16</span></div>`;

// la hoja del sitio lleva por reverso la pantalla negra de HumanCorp (la pasa la página de obra)
// ---------- panel del estudio (reverso del sitio): interactivo, lógica en au-site.ts ----------
type Msg = [string, string];
const convs: [string, string, string, string, Msg[]][] = [
  ['Cerámica Tierra Viva', 'Sesión de producto · 24 piezas', 'En edición', 'on', [['u', '¿Cómo va la selección de fotos?'], ['a', 'Ya van 18 de 24 retocadas. El jueves te llega la galería para elegir.'], ['u', 'Perfecto, la reviso ese día.']]],
  ['Café Nube', 'Identidad y empaque', 'Por aprobar', 'hu', [['u', 'Me encantó la segunda propuesta de logotipo.'], ['a', 'Quedó lista la versión final con sus variantes. Falta tu aprobación para pasar a producción.'], ['n', 'Entrega pendiente · archivos listos para revisar']]],
  ['Casa Hoshi', 'Sitio web de huéspedes', 'En diseño', 'on', [['u', '¿Podemos ver la página de habitaciones?'], ['a', 'Sí, mañana te comparto el prototipo con las tres habitaciones y la galería.']]],
  ['Librería Pino', 'Retrato del equipo', 'Entregado', 'ok', [['u', 'Las fotos del equipo quedaron muy bien.'], ['a', 'Gracias. Ya tienes la galería final y los archivos para web e impresión.']]],
  ['Taller Marea', 'Libro de marca', 'Por aprobar', 'hu', [['u', 'Falta ajustar los tonos del manual.'], ['a', 'Ya los ajusté. Revisa las páginas 12 a 16 y, si todo está bien, lo mandamos a imprenta.'], ['n', 'Entrega pendiente · manual en PDF listo']]],
];
const adk: [string, string][] = [['9', 'proyectos activos'], ['3', 'entregas esta semana'], ['2', 'por aprobar'], ['14', 'sesiones este mes']];
const dash = `<div class="pg au-dash" data-rp="light" data-c="0"><i class="ad-vl"></i>
<header><div><p class="au-k">Panel</p><h4>Proyectos</h4></div><button type="button" class="ad-sw on" data-int="adag"><span>Agenda abierta</span><i><b></b></i></button></header>
<div class="ad-k">${adk.map(([a, b]) => `<div><b>${a}</b><small>${b}</small></div>`).join('')}</div>
<div class="ad-g"><ul class="ad-l">${convs.map(([n, q, st, c], i) => `<li><button type="button" data-int="adsel" data-i="${i}"><b>${n}</b><span>${q}</span><em class="s-${c}">${st}</em></button></li>`).join('')}</ul>
<div class="ad-tr">${convs.map(([n, , st, c, m], i) => `<div class="ad-t" data-i="${i}"><div class="ad-th"><b>${n}</b><span class="s-${c}">${st}</span>${c === 'hu' ? `<button type="button" class="ad-take" data-int="adtake">Aprobar entrega</button>` : ''}</div><div class="ad-m">${m.map(([w, t]) => `<p class="m-${w}">${t}</p>`).join('')}</div></div>`).join('')}
<div class="ad-in"><span>Escribe un mensaje…</span><i>↑</i></div></div></div><span class="bk-pn">18</span></div>`;

export const auroraLeaves = (black: string, mid: string): { f: string; b: string }[] => [{ f: brand, b: contents }, { f: siteHTML, b: dash }, { f: mid, b: black }];
export const auroraPieces = [{ t: 'Identidad', h: brand }, { t: 'Proyecto', h: contents }, { t: 'Sitio web', h: siteHTML }, { t: 'Panel', h: dash }];
