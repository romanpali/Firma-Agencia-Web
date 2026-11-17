// Proyecto «Estudio Aurora» (concepto): asistentes de IA y automatización. Sitio web completo (Inicio, Servicios, Casos, Nosotros, Contacto) y ficha del proyecto.
// Dos páginas del libro (40em × 26.7em): el sitio navegable y su ficha en el reverso. La raíz del sitio también es .mr-web, así que las pestañas, el desplazamiento,
// la aparición (.rv), los contadores y la vista ampliada los resuelve marea-site.ts; el formulario, au-site.ts. Estilos en styles/aurora.css.
const IMG = '/obra/p4.webp';
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const btn = (t: string, cls: string, label: string) => `<button type="button" class="${cls}" ${go(t)}>${label}</button>`;
const tabs: [string, string][] = [['servicios', 'Servicios'], ['casos', 'Casos'], ['nosotros', 'Nosotros'], ['contacto', 'Contacto']];
const photo = (pos: string, z = 1, cls = '') => `<div class="au-im ${cls}"><img src="${IMG}" alt="" width="1500" height="1000" loading="lazy" decoding="async" style="--p:${pos};--z:${z}"></div>`;
const words = (s: string) => s.split(' ').map((w, i) => `<span style="--w:${i}">${w}</span>`).join(' ');

const nav = `<div class="au-nav mw-f" style="--d:.15s"><button type="button" class="au-logo" ${go('inicio')}>Estudio Aurora</button><nav>${tabs.map(([k, t]) => btn(k, 'au-t', t)).join('')}</nav></div>
<button type="button" class="wn-ex" data-int="wex" aria-label="Ver en pantalla completa"><i></i>Entrar al sitio</button>`;
const foot = `<footer class="au-ft"><div class="au-fg"><div><b>Estudio Aurora</b><p>Asistentes y automatización<br>para equipos pequeños y medianos.</p></div><div><p class="au-k">Sitio</p>${tabs.map(([k, t]) => btn(k, 'au-fa', t)).join('')}</div><div><p class="au-k">Escríbenos</p><span class="au-fa">hola@aurora.example</span><span class="au-fa">+52 55 0000 0000</span></div></div><b class="au-big" aria-hidden="true">aurora</b><p class="au-cp">Concepto de HumanCorp · Datos de ejemplo</p></footer>`;
const hdr = (k: string, t: string, p: string, pos: string) => `<header class="au-ph">${photo(pos, 1.6, 'au-phi')}<div><p class="au-k rv">${k}</p><h3 class="au-t2 rv">${t}</h3>${p ? `<p class="au-p rv">${p}</p>` : ''}</div></header>`;

const logos = ['WhatsApp', 'Gmail', 'Google Calendar', 'Slack', 'Notion', 'HubSpot', 'Shopify', 'Stripe', 'Zapier'];
const ticker = `<div class="au-tools"><p>${logos.slice(0, 7).join('<i></i>')}</p></div>`;
const stat = (n: number, dec: number, suf: string, label: string) => `<div class="rv"><b><span data-count="${n}" data-dec="${dec}">${n.toFixed(dec)}</span>${suf}</b><small>${label}</small></div>`;
const serv: [string, string, string, string[]][] = [
  ['01', 'Agentes de atención', 'Responden por WhatsApp, correo y chat con la información de tu negocio. Si no saben algo, pasan la conversación a una persona.', ['Base de conocimiento de tu negocio', 'Tono de voz propio', 'Reglas para pasar a una persona', 'Panel de conversaciones']],
  ['02', 'Flujos de seguimiento', 'Prospectos, cotizaciones y pagos pendientes con recordatorios en el momento correcto y avisos al equipo.', ['Flujos por etapa del proceso', 'Recordatorios automáticos', 'Resumen diario para el equipo', 'Alertas cuando algo se atora']],
  ['03', 'Integraciones', 'Conectamos las herramientas que ya usas para que los datos se muevan solos y nadie los capture dos veces.', ['Conexión de tus herramientas', 'Sincronización de contactos', 'Reportes automáticos', 'Documentación para tu equipo']],
];
const steps: [string, string, string][] = [['01', 'Entendemos tu operación', 'Revisamos cómo atiendes hoy y qué tareas se repiten.'], ['02', 'Diseñamos el agente', 'Definimos qué sabe, cómo habla y cuándo pasa a una persona.'], ['03', 'Lo probamos contigo', 'Tu equipo lo usa en pruebas antes de abrirlo a clientes.'], ['04', 'Medimos y ajustamos', 'Revisamos conversaciones reales y mejoramos cada semana.']];
const chat: [string, string][] = [['u', '¿Tienen horario el sábado?'], ['a', 'Sí, el sábado atendemos de 9:00 a 14:00. ¿Quieres que te aparte un lugar?'], ['u', 'A las 11, por favor.'], ['a', 'Listo, quedaste a las 11:00. Te mando un recordatorio un día antes.'], ['n', 'Cita confirmada · el equipo ya fue avisado'], ['u', 'Necesito corregir una factura.'], ['a', 'Eso lo revisa una persona de nuestro equipo. Ya le avisé y te escribirá hoy.'], ['n', 'Pasó a una persona · con el resumen de la conversación']];
const faq: [string, string][] = [['¿Se hace pasar por una persona?', 'No. El asistente se presenta como tal y avisa cuando pasa la conversación a alguien del equipo.'], ['¿Qué pasa si no sabe la respuesta?', 'No inventa: pasa la conversación a una persona con un resumen para que no tengas que repetir nada.'], ['¿Quién ve mis datos?', 'Solo tu equipo y el nuestro, con accesos controlados. Los datos son tuyos y puedes pedirlos cuando quieras.'], ['¿Cuánto tarda el primer agente?', 'Entre tres y seis semanas, según los canales y las herramientas que haya que conectar.'], ['¿Reemplaza a mi equipo?', 'No. Quita las tareas repetitivas para que tu equipo dedique su tiempo a lo que sí requiere a una persona.'], ['¿Puedo empezar con algo pequeño?', 'Sí. Lo más común es empezar con un agente y un canal, y crecer después con lo que se vea funcionar.']];
const casos: [string, string, string, string, [string, string][]][] = [
  ['Clínica dental', 'Agenda y recordatorios por WhatsApp', 'La recepción pasaba el día confirmando citas por teléfono. Un agente las agenda, las confirma y las mueve; solo lo complejo llega a una persona.', '40', [['7 de cada 10', 'citas se confirman sin llamada'], ['24/7', 'atención a pacientes']]],
  ['Tienda de ropa', 'Seguimiento de carritos y pedidos', 'Cuando alguien deja su cesta, recibe un mensaje con la prenda y una duda resuelta. El equipo ve cada pedido en un solo tablero.', '72', [['1 de cada 5', 'carritos vuelve a la tienda'], ['< 1 min', 'primera respuesta']]],
  ['Despacho contable', 'Recordatorios de documentos', 'Cada mes se persigue a los clientes para recibir documentos. Ahora el agente los pide, los recibe y avisa al equipo cuando está completo.', '10', [['3 días', 'menos de espera por expediente'], ['100 %', 'con revisión de una persona']]],
];
const prin: [string, string, string][] = [['01', 'Supervisión humana', 'Cada agente tiene reglas claras para pasar a una persona. La IA ayuda; el equipo decide.'], ['02', 'Tus datos son tuyos', 'Los guardamos con accesos controlados y puedes pedirlos o borrarlos cuando quieras.'], ['03', 'Sin promesas infladas', 'Te decimos qué puede hacer hoy el asistente y qué todavía no. Prefieres saberlo desde el inicio.']];
const team: [string, string, string][] = [['MV', 'Mariana Vela', 'Dirección y estrategia'], ['IT', 'Iván Toledo', 'Ingeniería de agentes'], ['CR', 'Carla Ríos', 'Diseño de conversaciones']];
const tiers: [string, string, string, string][] = [['Agentes', '1', 'Hasta 3', 'A medida'], ['Canales', '1', 'Hasta 3', 'Los que necesites'], ['Flujos de seguimiento', '3', 'Hasta 10', 'A medida'], ['Supervisión humana', 'Incluida', 'Incluida', 'Incluida'], ['Reporte mensual', '—', 'Incluido', 'Incluido'], ['Soporte', 'Por correo', 'Por correo y chat', 'Equipo dedicado']];

export const siteHTML = `<div class="pg mr-web au-web" data-rp="dark" data-tab="inicio">
${nav}
<div class="mw-scroll">

<section class="au-v au-inicio">
 <div class="au-h0"><i class="au-vl"></i><div class="au-hp"><img class="au-img" src="${IMG}" alt="" width="1500" height="1000" decoding="async"></div><i class="au-sun"></i><p class="au-vt mw-f" style="--d:1.4s">Estudio Aurora · 2025</p>
  <div class="au-txt"><p class="au-k mw-f" style="--d:.5s">Asistentes y automatización</p><h4 class="au-h"><span class="mw-w" style="--d:.7s">Un asistente</span><span class="mw-w" style="--d:1s">que sí ayuda</span></h4>
   <p class="au-s mw-f" style="--d:1.5s">Responde, da seguimiento y avisa al equipo, con supervisión humana.</p><button type="button" class="au-l mw-f" style="--d:1.8s" ${go('contacto')}>Hablemos</button></div>
  <div class="au-scr mw-f" style="--d:2s"><i></i><span>Desliza</span></div></div>
 ${ticker}
 <div class="au-sec au-intro"><p class="au-k rv">Estudio Aurora</p><p class="au-state rv">${words('Construimos asistentes que atienden, dan seguimiento y avisan a tu equipo. Hablan como tu negocio, saben cuándo pedir ayuda y siempre hay una persona al final de la conversación.')}</p>
  <div class="au-stats">${stat(24, 0, '/7', 'atención sin pausas')}${stat(1, 0, ' min', 'primera respuesta, o menos')}${stat(100, 0, ' %', 'con supervisión humana')}${stat(12, 0, '+', 'herramientas que conectamos')}</div></div>
 <div class="au-sec"><div class="au-sh"><div><p class="au-k rv">Servicios</p><h3 class="au-t2 rv">Tres cosas, bien hechas</h3></div>${btn('servicios', 'au-ln', 'Ver servicios')}</div>
  <div class="au-svc">${serv.map(([n, t, d]) => `<article class="rv" ${go('servicios')}><em>${n}</em><b>${t}</b><span>${d}</span></article>`).join('')}</div></div>
 <div class="au-sec au-demo"><div class="au-dg"><div><p class="au-k rv">Así conversa</p><h3 class="au-t2 rv">Responde con lo que sabe y pasa lo demás a una persona</h3><p class="au-p rv">Conversaciones de ejemplo: el agente resuelve lo sencillo, confirma, y cuando hace falta una persona la llama con el resumen listo.</p></div>
  <div class="au-chat">${chat.map(([w, t]) => `<p class="rv m-${w}">${t}</p>`).join('')}</div></div></div>
 <div class="au-sec"><p class="au-k rv">Cómo trabajamos</p><h3 class="au-t2 rv">De la idea al agente funcionando</h3><div class="au-steps">${steps.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
 <div class="au-sec"><div class="au-sh"><div><p class="au-k rv">Casos</p><h3 class="au-t2 rv">Ejemplos de lo que hacemos</h3></div>${btn('casos', 'au-ln', 'Ver casos')}</div>
  <div class="au-cs">${casos.map(([c, t, , , m]) => `<article class="rv" ${go('casos')}><small>${c}</small><b>${t}</b><div>${m.map(([a, b]) => `<p><i>${a}</i>${b}</p>`).join('')}</div></article>`).join('')}</div></div>
 <div class="au-sec au-faq"><p class="au-k rv">Dudas frecuentes</p><div class="au-fq">${faq.map(([q, a]) => `<div class="rv"><b>${q}</b><span>${a}</span></div>`).join('')}</div></div>
 <div class="au-cta rv"><svg class="au-en" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 8A42 42 0 1 1 22 20" pathLength="1"/></svg><h3>¿Qué tarea te quitaría el día?</h3><p>Cuéntanos cómo atiendes hoy. Te respondemos en un día hábil.</p>${btn('contacto', 'au-btn', 'Escríbenos')}</div>
 ${foot}
</section>

<section class="au-v au-servicios">${hdr('Servicios', 'Asistentes que trabajan contigo', 'Tres servicios que se combinan. Empiezas con uno y creces con lo que funcione.', '82% 25%')}
 <div class="au-body">${serv.map(([n, t, d, l]) => `<article class="au-sb rv"><div><em>${n}</em><h4>${t}</h4><p>${d}</p></div><ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul></article>`).join('')}
 <h3 class="au-t3 rv">Cómo se ven los niveles</h3>
 <table class="au-tbl rv"><thead><tr><th></th><th>Esencial</th><th>Avanzado</th><th>A medida</th></tr></thead><tbody>${tiers.map(([a, b, c, d]) => `<tr><th>${a}</th><td>${b}</td><td>${c}</td><td>${d}</td></tr>`).join('')}</tbody></table>
 <p class="au-note rv">Los precios dependen del alcance. Te damos una cotización clara después de una llamada de 30 minutos.</p>
 <h3 class="au-t3 rv">Herramientas que conectamos</h3><div class="au-int rv">${logos.map((l) => `<span>${l}</span>`).join('')}<span>y más</span></div>
 <h3 class="au-t3 rv">Cómo trabajamos</h3><div class="au-steps">${steps.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div></div>
 ${foot}
</section>

<section class="au-v au-casos">${hdr('Casos', 'Ejemplos de lo que hacemos', 'Casos ilustrativos, con datos de ejemplo, de cómo se ve un asistente trabajando en cada tipo de negocio.', '60% 70%')}
 <div class="au-body">${casos.map(([c, t, d, n, m], i) => `<article class="au-cb rv"><div class="au-cn"><em>0${i + 1}</em><small>${c}</small></div><div><h4>${t}</h4><p>${d}</p></div><div class="au-cm">${m.map(([a, b]) => `<p><b>${a}</b><span>${b}</span></p>`).join('')}</div></article>`).join('')}
 <p class="au-note rv">Cifras de ejemplo. Los resultados reales dependen de cada operación y los medimos juntos desde el inicio.</p></div>
 <div class="au-cta rv"><svg class="au-en" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 8A42 42 0 1 1 22 20" pathLength="1"/></svg><h3>¿Tu caso se parece a alguno?</h3><p>Cuéntanos y vemos qué conviene automatizar primero.</p>${btn('contacto', 'au-btn', 'Escríbenos')}</div>${foot}
</section>

<section class="au-v au-nosotros">${hdr('Nosotros', 'Un estudio pequeño, con criterio', 'Somos un equipo chico de estrategia, ingeniería y diseño de conversaciones.', '10% 20%')}
 <div class="au-body"><p class="au-state au-st2 rv">${words('Creemos que un buen asistente no busca parecer una persona. Busca resolver rápido, decir la verdad sobre lo que sabe y llamar a alguien cuando hace falta.')}</p>
 <div class="au-prin">${prin.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div>
 <h3 class="au-t3 rv">El equipo</h3><div class="au-team">${team.map(([i, n, r]) => `<div class="rv"><i>${i}</i><b>${n}</b><span>${r}</span></div>`).join('')}</div></div>
 <div class="au-cta rv"><svg class="au-en" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 8A42 42 0 1 1 22 20" pathLength="1"/></svg><h3>Conozcámonos</h3><p>Una llamada de 30 minutos para entender tu operación.</p>${btn('contacto', 'au-btn', 'Escríbenos')}</div>${foot}
</section>

<section class="au-v au-contacto">${hdr('Contacto', 'Cuéntanos cómo atiendes hoy', 'Te respondemos en un día hábil, con una propuesta de por dónde empezar.', '40% 30%')}
 <div class="au-body"><div class="au-cg"><div class="au-form"><p class="au-lb">¿Qué te interesa?</p><div class="au-chips">${['Agente de atención', 'Flujos de seguimiento', 'Integraciones', 'No lo sé aún'].map((c) => `<button type="button" data-int="auchip">${c}</button>`).join('')}</div>
  <div class="au-flds"><input type="text" placeholder="Nombre" aria-label="Nombre" /><input type="text" placeholder="Correo o WhatsApp" aria-label="Contacto" /></div><textarea placeholder="Cuéntanos cómo atiendes hoy y qué tarea se repite más" aria-label="Mensaje"></textarea>
  <button type="button" class="au-btn" data-int="ausend">Enviar mensaje</button><div class="au-ok"><b>Gracias, recibimos tu mensaje.</b><span>Esta es una demostración: no se envió nada, pero así se vería la confirmación.</span></div></div>
 <aside class="au-ci"><p class="au-k">Escríbenos</p><b>hola@aurora.example</b><b>+52 55 0000 0000</b><p class="au-k">Horario</p><span>Lunes a viernes, 9:00 a 18:00</span><p class="au-k">Ciudad</p><span>Ciudad de México · trabajamos a distancia</span></aside></div></div>
 ${foot}
</section>

</div></div>`;

// ---------- identidad: portada con la fotografía a sangre ----------
const brand = `<div class="pg au-brand" data-rp="dark"><img class="au-img" src="${IMG}" alt="" width="1500" height="1000" decoding="async"><i class="au-bv"></i>
<div class="au-bt mw-f" style="--d:.2s"><span>Manual de marca</span><span>Made by <b><i class="wl">Human</i><i class="ws">Corp</i></b></span></div>
<i class="au-sun mw-f" style="--d:.9s"></i><div class="au-bw mw-f" style="--d:.5s"><b>aurora</b><span>Asistentes y automatización · Estudio</span></div></div>`;

// ---------- tabla de contenido ----------
const hd: [string, string][] = [['Identidad de marca', 'Logotipo y manual'], ['Portada cinematográfica', 'Fotografía a sangre y movimiento'], ['Sitio web', '5 secciones navegables'], ['Servicios y niveles', 'Qué hacemos y cómo se ve'], ['Casos', 'Ejemplos con cifras'], ['Formulario de contacto', 'Con confirmación'], ['Panel de agentes', 'Conversaciones y traspaso'], ['Datos e infraestructura', 'Respaldos y monitoreo']];
const contents = `<div class="pg lt pc mr-case au-case"><div class="pc-top"><b><span class="wl">HUMAN</span> <span class="ws">CORP</span></b><span>Proyecto Estudio Aurora · 2025</span></div>
<div class="pc-l"><h4>Lo que se hizo</h4><p>${hd.length} entregables</p></div>
<ul class="pc-r">${hd.map(([t, d], n) => `<li><div class="pc-i"><em>${String(n + 1).padStart(2, '0')}</em><b>${t}</b><i></i><span>${d}</span></div></li>`).join('')}</ul>
<p class="pc-f">Estudio Aurora · asistentes de IA · concepto, datos de ejemplo</p><span class="bk-pn">16</span></div>`;

// ---------- panel de agentes (reverso del sitio): interactivo, lógica en au-site.ts ----------
type Msg = [string, string];
const convs: [string, string, string, string, Msg[]][] = [
  ['Mariana R.', '¿Tienen horario el sábado?', 'Resuelta', 'ok', [['u', '¿Tienen horario el sábado?'], ['a', 'Sí, el sábado atendemos de 9:00 a 14:00. ¿Quieres que te aparte un lugar?'], ['u', 'A las 11, por favor.'], ['a', 'Listo, quedaste a las 11:00. Te mando un recordatorio un día antes.']]],
  ['Andrés P.', 'Necesito corregir una factura', 'Pasó a persona', 'hu', [['u', 'Necesito corregir una factura.'], ['a', 'Eso lo revisa una persona de nuestro equipo. Ya le avisé y te escribirá hoy.'], ['n', 'Pasó a persona · resumen enviado al equipo']]],
  ['Lucía F.', '¿Cuánto cuesta el nivel avanzado?', 'Activa', 'on', [['u', '¿Cuánto cuesta el nivel avanzado?'], ['a', 'Depende del alcance: agentes, canales y flujos. Una llamada de 30 minutos nos basta para darte una cotización clara.'], ['u', '¿Puedo agendarla esta semana?']]],
  ['Diego S.', 'Quiero agendar una llamada', 'Resuelta', 'ok', [['u', 'Quiero agendar una llamada.'], ['a', 'Claro. Tengo el jueves a las 10:00 o el viernes a las 12:00.'], ['u', 'El jueves.'], ['a', 'Agendado. Te llegará la invitación por correo.']]],
  ['Paula C.', 'Mi pedido no llegó', 'Pasó a persona', 'hu', [['u', 'Mi pedido no llegó.'], ['a', 'Lamento eso. Lo reviso con una persona del equipo para darte una respuesta hoy.'], ['n', 'Pasó a persona · resumen enviado al equipo']]],
];
const adk: [string, string][] = [['128', 'conversaciones hoy'], ['71 %', 'resueltas por el agente'], ['29', 'pasaron a una persona'], ['38 s', 'primera respuesta']];
const dash = `<div class="pg au-dash" data-rp="light" data-c="0"><i class="ad-vl"></i>
<header><div><p class="au-k">Panel</p><h4>Agentes</h4></div><button type="button" class="ad-sw on" data-int="adag"><span>Agente activo</span><i><b></b></i></button></header>
<div class="ad-k">${adk.map(([a, b]) => `<div><b>${a}</b><small>${b}</small></div>`).join('')}</div>
<div class="ad-g"><ul class="ad-l">${convs.map(([n, q, st, c], i) => `<li><button type="button" data-int="adsel" data-i="${i}"><b>${n}</b><span>${q}</span><em class="s-${c}">${st}</em></button></li>`).join('')}</ul>
<div class="ad-tr">${convs.map(([n, , st, c, m], i) => `<div class="ad-t" data-i="${i}"><div class="ad-th"><b>${n}</b><span class="s-${c}">${st}</span>${c === 'hu' ? `<button type="button" class="ad-take" data-int="adtake">Tomar la conversación</button>` : ''}</div><div class="ad-m">${m.map(([w, t]) => `<p class="m-${w}">${t}</p>`).join('')}</div></div>`).join('')}
<div class="ad-in"><span>Escribe una respuesta…</span><i>↑</i></div></div></div><span class="bk-pn">18</span></div>`;

export const auroraLeaves = (): { f: string; b: string }[] => [{ f: brand, b: contents }, { f: siteHTML, b: dash }];
export const auroraPieces = [{ t: 'Identidad', h: brand }, { t: 'Proyecto', h: contents }, { t: 'Sitio web', h: siteHTML }, { t: 'Panel', h: dash }];
