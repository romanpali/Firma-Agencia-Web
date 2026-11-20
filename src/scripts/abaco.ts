import { abacoDash } from './mdash';
// Proyecto «Ábaco» (concepto): finanzas y operaciones para empresas medianas. Sitio web completo (Inicio, Soluciones, Casos, Nosotros, Contacto),
// portada de marca (ábaco animado), tabla de contenido y panel interactivo en el reverso. Datos de ejemplo.
// La raíz también es .mr-web: pestañas, desplazamiento, aparición (.rv), contadores y vista ampliada los resuelve marea-site.ts; lo propio, abaco-site.ts.
const IMG = '/obra/p5.webp';
const go = (t: string) => `data-int="wtab" data-t="${t}"`;
const btn = (t: string, cls: string, label: string) => `<button type="button" class="${cls}" ${go(t)}>${label}</button>`;
const tabs: [string, string][] = [['soluciones', 'Soluciones'], ['casos', 'Casos'], ['nosotros', 'Nosotros'], ['contacto', 'Contacto']];
const words = (s: string) => s.split(' ').map((w, i) => `<span style="--w:${i}">${w}</span>`).join(' ');
const stat = (n: number, dec: number, suf: string, label: string) => `<div class="rv"><b><span data-count="${n}" data-dec="${dec}">${n.toFixed(dec)}</span>${suf}</b><small>${label}</small></div>`;

const nav = `<div class="ab-nav mw-f" style="--d:.15s"><button type="button" class="ab-logo" ${go('inicio')}><i></i>ábaco</button><nav>${tabs.map(([k, t]) => btn(k, 'ab-t', t)).join('')}</nav></div>`;
const foot = `<footer class="ab-ft"><div class="ab-fg"><div><b>ábaco</b><p>Finanzas y operaciones<br>Ciudad de México</p></div><div><p class="ab-k">Sitio</p>${tabs.map(([k, t]) => btn(k, 'ab-fa', t)).join('')}</div><div><p class="ab-k">Escríbenos</p><span class="ab-fa">hola@abaco.example</span><span class="ab-fa">+52 55 0000 0000</span></div></div><b class="ab-big" aria-hidden="true">ábaco</b><p class="ab-leg">Concepto de HumanCorp · datos de ejemplo. La asesoría contable y fiscal la brinda un contador; la tecnología la respalda.</p></footer>`;
const ph = (pos: string) => `<div class="ab-phi"><img src="${IMG}" alt="" width="1500" height="1000" loading="lazy" decoding="async" style="--p:${pos}"></div>`;
const hdr = (k: string, t: string, p: string, pos: string) => `<header class="ab-ph">${ph(pos)}<p class="ab-k rv">${k}</p><h3 class="ab-t2 rv">${t}</h3>${p ? `<p class="ab-p rv">${p}</p>` : ''}</header>`;

const ticker = ['Facturación CFDI', 'Cobranza', 'Flujo de caja', 'Conciliación', 'Compras y gastos', 'Aprobaciones', 'Reportes', 'Cierre mensual'];
const sol: [string, string, string, string[]][] = [
  ['01', 'Facturación CFDI', 'Emite y consulta tus facturas desde un solo lugar, con folios ordenados y envío al cliente.', ['Emisión y cancelación guiada', 'Plantillas por cliente', 'Envío por correo', 'Consulta de folios']],
  ['02', 'Cobranza', 'Sabe quién te debe, desde cuándo y qué toca hacer hoy, con recordatorios amables.', ['Antigüedad de saldos', 'Recordatorios programados', 'Promesas de pago', 'Estado por cliente']],
  ['03', 'Flujo de caja', 'Ingresos, egresos y saldo proyectado a tres meses, para decidir con calma.', ['Proyección mensual', 'Escenarios sencillos', 'Alertas de saldo bajo', 'Exporta a hoja de cálculo']],
  ['04', 'Conciliación', 'Cruza tus movimientos bancarios con tus facturas y deja a la vista solo lo que no cuadra.', ['Carga de estados de cuenta', 'Sugerencias de cruce', 'Diferencias a revisar', 'Historial de cambios']],
  ['05', 'Compras y gastos', 'Solicitudes, aprobaciones y comprobantes en un flujo claro, sin cadenas de correos.', ['Solicitud con monto y motivo', 'Aprobación por nivel', 'Comprobante adjunto', 'Presupuesto por área']],
  ['06', 'Procesos internos', 'Convierte tareas repetidas en pasos definidos, con responsables y fechas.', ['Listas de verificación', 'Responsables y fechas', 'Cierre mensual guiado', 'Bitácora de actividad']],
];
const mes: [string, string, string][] = [['Día 1', 'Se emiten las facturas', 'Con el catálogo y las plantillas de cada cliente.'], ['Día 5', 'Se concilian los movimientos', 'Solo se revisa lo que no cuadra.'], ['Día 10', 'Se aprueban gastos', 'Cada responsable ve lo suyo.'], ['Día 15', 'Se cierra el mes', 'Con una lista de pasos y responsables.'], ['Día 18', 'Llega el reporte', 'Cifras claras para la dirección.']];
const meses = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const ing = [52, 58, 55, 63, 70, 66, 74, 78, 72, 84, 88, 94], egr = [44, 47, 50, 52, 55, 57, 58, 61, 62, 64, 66, 68];
const casos: [string, string, string, [string, string][]][] = [
  ['Distribuidora Norte', 'Facturación y cobranza', 'Una distribuidora emitía facturas desde hojas de cálculo. Ordenamos folios, plantillas y recordatorios de cobro por cliente.', [['1 solo lugar', 'para facturas y cobros'], ['−2 días', 'en el ciclo de cobro (ejemplo)']]],
  ['Clínica Alba', 'Compras y aprobaciones', 'Las compras pasaban por correo y chats. Definimos un flujo de solicitud, aprobación por nivel y comprobante adjunto.', [['3 niveles', 'de aprobación'], ['100 %', 'de compras con comprobante (ejemplo)']]],
  ['Estudio Cantera', 'Flujo de caja y reportes', 'Un despacho necesitaba ver su saldo proyectado. Armamos un panel mensual con ingresos, egresos y alertas.', [['3 meses', 'de proyección'], ['1 reporte', 'mensual para la dirección']]],
];
const faq: [string, string][] = [['¿Reemplaza a mi contador?', 'No. Ábaco ordena y automatiza tareas; la asesoría contable y fiscal la brinda un contador. Si ya tienes uno, trabajamos con él.'], ['¿Se conecta con mis bancos?', 'Cargamos estados de cuenta y definimos con tu banco la mejor forma de importar. No prometemos conexiones que no existan.'], ['¿Cuánto tarda la puesta en marcha?', 'Desde dos semanas para facturación y cobranza. Los procesos más amplios los calendarizamos contigo.'], ['¿Mis datos están seguros?', 'Trabajamos con accesos por rol, respaldos y bitácora de cambios. Te explicamos el detalle antes de empezar.']];
const prin: [string, string, string][] = [['01', 'Primero el orden', 'Antes de automatizar, ordenamos: qué se hace, quién lo hace y cuándo.'], ['02', 'Pocas pantallas', 'Cada persona ve solo lo que necesita para su trabajo del día.'], ['03', 'Cifras que se entienden', 'Reportes breves, con lenguaje claro y sin tecnicismos.']];
const team: [string, string, string][] = [['VR', 'Valeria Rojas', 'Dirección de operaciones'], ['LT', 'Luis Tapia', 'Finanzas y procesos'], ['NM', 'Nora Mendoza', 'Diseño de producto']];
const tiers: [string, string, string, string][] = [['Facturación CFDI', 'Incluida', 'Incluida', 'Incluida'], ['Cobranza y recordatorios', '—', 'Incluida', 'Incluida'], ['Conciliación bancaria', '—', 'Incluida', 'Incluida'], ['Flujo de caja', 'Básico', 'Proyección a 3 meses', 'A medida'], ['Compras y aprobaciones', '—', '—', 'Incluida'], ['Acompañamiento', 'Correo', 'Llamada mensual', 'Equipo dedicado']];

const bars = (a: number[], b: number[]) => a.map((v, i) => `<div class="ab-bc" style="--i:${i}"><i class="in" style="--h:${v}%"></i><i class="out" style="--h:${b[i]}%"></i><span>${meses[i]}</span></div>`).join('');

export const siteHTML = `<div class="pg mr-web ab-web" data-rp="light" data-tab="inicio" data-m="all">
${nav}
<div class="mw-scroll">

<section class="ab-v ab-inicio">
 <div class="ab-h0"><div class="ab-hp"><img class="ab-img" src="${IMG}" alt="" width="1500" height="1000" decoding="async"></div><i class="ab-sh0"></i>
  <svg class="ab-fl" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true"><path class="ab-rt" pathLength="1" d="M0 80 C90 80 140 10 230 22 S340 60 400 6"/><circle r="2.2"><animateMotion dur="7s" repeatCount="indefinite" path="M0 80 C90 80 140 10 230 22 S340 60 400 6"/></circle></svg>
  <div class="ab-txt"><p class="ab-k mw-f" style="--d:.4s"><i class="ab-pulse"></i>Finanzas y operaciones</p><h4 class="ab-h"><span class="mw-w" style="--d:.6s">Las cuentas,</span><span class="mw-w" style="--d:.85s">en orden.</span></h4>
   <p class="ab-s mw-f" style="--d:1.4s">Facturación, cobranza, flujo de caja y procesos en un solo lugar, para que decidas con calma y tu equipo deje de perseguir hojas de cálculo.</p>
   <div class="ab-cta2 mw-f" style="--d:1.7s">${btn('contacto', 'ab-btn dark', 'Agenda una llamada')}${btn('soluciones', 'ab-btn', 'Ver soluciones')}</div></div>
  <div class="ab-vis" aria-hidden="true">
   <div class="ab-card ab-c1 mw-f" style="--d:1s"><p class="ab-k">Facturado en octubre</p><b>$<span data-count="482" data-dec="0">482</span>,300</b><span class="ab-up">+12 % vs. septiembre</span>
    <svg viewBox="0 0 200 60" preserveAspectRatio="none"><path class="ab-ar" d="M0 52 C20 48 30 40 50 42 S80 30 100 28 S140 20 160 12 S190 8 200 4 L200 60 L0 60Z"/><path class="ab-ln" pathLength="1" d="M0 52 C20 48 30 40 50 42 S80 30 100 28 S140 20 160 12 S190 8 200 4"/></svg></div>
   <div class="ab-card ab-c2 mw-f" style="--d:1.5s"><p class="ab-k">Por cobrar</p><b>$<span data-count="96" data-dec="0">96</span>,400</b><div class="ab-pb"><i></i></div><small>14 facturas · 3 vencen esta semana</small></div>
   <div class="ab-card ab-c3 mw-f" style="--d:1.9s"><p class="ab-k">Conciliado</p><b><span data-count="94" data-dec="0">94</span> %</b><small>12 movimientos por revisar</small></div>
   <div class="ab-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" pathLength="1"/></svg></div>
  </div></div>
 <div class="ab-tk"><p>${[...ticker, ...ticker].map((t) => `<span>${t}</span>`).join('<i></i>')}</p></div>
 <div class="ab-sec ab-intro"><p class="ab-k rv">Qué hacemos</p><p class="ab-state rv">${words('Ordenamos las finanzas y las operaciones de tu empresa en un solo sistema, claro y sin ruido, para que cada persona sepa qué sigue.')}</p>
  <div class="ab-stats">${stat(6, 0, '', 'módulos conectados')}${stat(2, 0, ' semanas', 'para empezar con facturación')}${stat(3, 0, ' meses', 'de flujo proyectado')}${stat(100, 0, ' %', 'de cambios con bitácora')}</div></div>
 <div class="ab-sec"><div class="ab-sh"><div><p class="ab-k rv">Soluciones</p><h3 class="ab-t2 rv">Todo lo que se repite, en orden</h3></div>${btn('soluciones', 'ab-ln', 'Ver todas')}</div>
  <div class="ab-svc">${sol.map(([n, t, d]) => `<article class="rv" ${go('soluciones')}><em>${n}</em><b>${t}</b><span>${d}</span><i>→</i></article>`).join('')}</div></div>
 <div class="ab-sec"><div class="ab-sh"><div><p class="ab-k rv">Flujo de caja</p><h3 class="ab-t2 rv">Ve el año de un vistazo</h3></div>
  <div class="ab-seg rv"><button type="button" data-int="abm" data-m="all">Todo</button><button type="button" data-int="abm" data-m="in">Ingresos</button><button type="button" data-int="abm" data-m="out">Egresos</button></div></div>
  <div class="ab-chart rv"><div class="ab-bars">${bars(ing, egr)}</div><p class="ab-note2"><i class="in"></i>Ingresos <i class="out"></i>Egresos · miles de pesos, ejemplo</p></div></div>
 <div class="ab-sec"><p class="ab-k rv">Un mes con Ábaco</p><h3 class="ab-t2 rv">Del día 1 al reporte</h3><div class="ab-tl rv">${mes.map(([d, t, p]) => `<div><em>${d}</em><b>${t}</b><span>${p}</span></div>`).join('')}</div></div>
 <div class="ab-sec"><div class="ab-sh"><div><p class="ab-k rv">Casos</p><h3 class="ab-t2 rv">Empresas que se ordenaron</h3></div>${btn('casos', 'ab-ln', 'Ver casos')}</div>
  <div class="ab-cs">${casos.map(([c, t, , m]) => `<article class="rv" ${go('casos')}><small>${c}</small><b>${t}</b><div>${m.map(([a, b]) => `<p><i>${a}</i>${b}</p>`).join('')}</div></article>`).join('')}</div></div>
 <div class="ab-sec ab-faq"><p class="ab-k rv">Dudas frecuentes</p><div class="ab-fq">${faq.map(([q, a]) => `<div class="rv"><b>${q}</b><span>${a}</span></div>`).join('')}</div></div>
 <div class="ab-ctab rv"><h3>¿Ordenamos tus cuentas?</h3><p>Una llamada de 30 minutos para ver por dónde empezar.</p>${btn('contacto', 'ab-btn dark', 'Agenda una llamada')}</div>
 ${foot}
</section>

<section class="ab-v ab-soluciones">${hdr('Soluciones', 'Seis módulos que se hablan entre sí', 'Empieza con uno y suma los demás. Todo comparte los mismos datos, así que no se captura dos veces.', '20% 60%')}
 <div class="ab-body">${sol.map(([n, t, d, l]) => `<article class="ab-sb rv"><div><em>${n}</em><h4>${t}</h4><p>${d}</p></div><ul>${l.map((x) => `<li>${x}</li>`).join('')}</ul></article>`).join('')}
 <h3 class="ab-t3 rv">Qué incluye cada nivel</h3>
 <table class="ab-tbl rv"><thead><tr><th></th><th>Inicio</th><th>Operación</th><th>A medida</th></tr></thead><tbody>${tiers.map(([a, b, c, d]) => `<tr><th>${a}</th><td>${b}</td><td>${c}</td><td>${d}</td></tr>`).join('')}</tbody></table>
 <p class="ab-note rv">Los precios dependen del número de usuarios y módulos. Te damos una cotización clara después de una llamada.</p>
 <h3 class="ab-t3 rv">Con qué se conecta</h3><div class="ab-int rv">${['Estados de cuenta', 'Hojas de cálculo', 'Correo', 'Tu contador', 'Almacenes', 'Punto de venta', 'Nómina', 'Reportes en PDF'].map((l) => `<span>${l}</span>`).join('')}</div></div>
 ${foot}
</section>

<section class="ab-v ab-casos">${hdr('Casos', 'Empresas que se ordenaron', 'Casos ilustrativos, con datos de ejemplo, de cómo trabajamos con distintos tipos de empresa.', '55% 50%')}
 <div class="ab-body">${casos.map(([c, t, d, m], i) => `<article class="ab-cb rv"><div class="ab-cn"><em>0${i + 1}</em><small>${c}</small></div><div><h4>${t}</h4><p>${d}</p></div><div class="ab-cm">${m.map(([a, b]) => `<p><b>${a}</b><span>${b}</span></p>`).join('')}</div></article>`).join('')}
 <p class="ab-note rv">Casos y cifras de ejemplo.</p></div>
 <div class="ab-ctab rv"><h3>¿Tu empresa se parece a alguna?</h3><p>Cuéntanos cómo trabajas hoy y vemos por dónde empezar.</p>${btn('contacto', 'ab-btn dark', 'Escríbenos')}</div>${foot}
</section>

<section class="ab-v ab-nosotros">${hdr('Nosotros', 'Un equipo que ordena', 'Somos un equipo pequeño de operaciones, finanzas y diseño de producto.', '75% 45%')}
 <div class="ab-body"><p class="ab-state ab-st2 rv">${words('Creemos que una empresa funciona mejor cuando cada persona sabe qué sigue. Por eso diseñamos herramientas simples y las acompañamos hasta que se usan.')}</p>
 <div class="ab-prin">${prin.map(([n, t, d]) => `<div class="rv"><em>${n}</em><b>${t}</b><span>${d}</span></div>`).join('')}</div>
 <h3 class="ab-t3 rv">El equipo</h3><div class="ab-team">${team.map(([i, n, r]) => `<div class="rv"><i>${i}</i><b>${n}</b><span>${r}</span></div>`).join('')}</div></div>
 <div class="ab-ctab rv"><h3>Conozcámonos</h3><p>Una llamada de 30 minutos para hablar de tu operación.</p>${btn('contacto', 'ab-btn dark', 'Escríbenos')}</div>${foot}
</section>

<section class="ab-v ab-contacto">${hdr('Contacto', 'Cuéntanos cómo trabajas hoy', 'Te respondemos en un día hábil con una propuesta de por dónde empezar.', '40% 30%')}
 <div class="ab-body"><div class="ab-cg"><div class="ab-form"><p class="ab-lb">¿Qué quieres ordenar?</p><div class="ab-chips">${['Facturación', 'Cobranza', 'Flujo de caja', 'Compras', 'No lo sé aún'].map((c) => `<button type="button" data-int="abchip">${c}</button>`).join('')}</div>
  <div class="ab-flds"><input type="text" placeholder="Nombre" aria-label="Nombre" /><input type="text" placeholder="Correo o WhatsApp" aria-label="Contacto" /></div><textarea placeholder="Cuéntanos qué se hace a mano hoy" aria-label="Mensaje"></textarea>
  <button type="button" class="ab-btn dark" data-int="absend">Enviar mensaje</button><div class="ab-ok"><b>Gracias, recibimos tu mensaje.</b><span>Esta es una demostración: no se envió nada, pero así se vería la confirmación.</span></div></div>
 <aside class="ab-ci"><p class="ab-k">Escríbenos</p><b>hola@abaco.example</b><b>+52 55 0000 0000</b><p class="ab-k">Horario</p><span>Lunes a viernes, 9:00 a 18:00</span><p class="ab-k">Oficina</p><span>Ciudad de México · con cita previa</span></aside></div></div>
 ${foot}
</section>

</div></div>`;

// ---------- identidad: portada con un ábaco que se arma ----------
const rods = [3, 1, 4, 2, 5].map((n, r) => `<g class="ab-rod" style="--r:${r}"><line x1="10" x2="190" y1="${18 + r * 16}" y2="${18 + r * 16}"/>${Array.from({ length: 6 }, (_, b) => `<circle class="${b < n ? 'on' : ''}" style="--b:${b}" cx="${24 + b * 12 + (b < n ? 0 : 70)}" cy="${18 + r * 16}" r="5"/>`).join('')}</g>`).join('');
const brand = `<div class="pg ab-brand" data-rp="dark">
<div class="ab-bt mw-f" style="--d:.2s"><span>Manual de marca</span><span>Made by <b><i class="wl">Human</i><i class="ws">Corp</i></b></span></div>
<div class="ab-bp"><img class="ab-img" src="${IMG}" alt="" width="1500" height="1000" decoding="async"></div><i class="ab-sh0"></i>
<svg class="ab-bs" viewBox="0 0 200 100" aria-hidden="true">${rods}</svg>
<div class="ab-bw mw-f" style="--d:.5s"><b>ábaco</b><span>Finanzas y operaciones · sistema de gestión para empresas</span></div></div>`;

// ---------- tabla de contenido ----------
const hd: [string, string][] = [['Naming e identidad', 'Nombre, logotipo y manual'], ['Portada animada', 'Ábaco con movimiento'], ['Sitio web', '5 secciones navegables'], ['Soluciones y niveles', 'Seis módulos conectados'], ['Gráfica de flujo de caja', 'Interactiva'], ['Casos', 'Con cifras de ejemplo'], ['Formulario de contacto', 'Con confirmación'], ['Panel de operación', 'Facturas y aprobaciones']];
const contents = `<div class="pg lt pc mr-case ab-case"><div class="pc-top"><b><span class="wl">HUMAN</span> <span class="ws">CORP</span></b><span>Proyecto Ábaco · 2025</span></div>
<div class="pc-l"><h4>Lo que se hizo</h4><p>${hd.length} entregables</p></div>
<ul class="pc-r">${hd.map(([t, d], n) => `<li><div class="pc-i"><em>${String(n + 1).padStart(2, '0')}</em><b>${t}</b><i></i><span>${d}</span></div></li>`).join('')}</ul>
<p class="pc-f">Ábaco · finanzas y operaciones · concepto, datos de ejemplo</p><span class="bk-pn">20</span></div>`;

// ---------- panel (reverso del sitio): resumen, facturas y aprobaciones; lógica en abaco-site.ts ----------
const inv: [string, string, number, string][] = [['A-1042', 'Distribuidora Norte', 18400, 'Pagada'], ['A-1043', 'Clínica Alba', 9650, 'Enviada'], ['A-1044', 'Estudio Cantera', 24800, 'Emitida'], ['A-1045', 'Café Nube', 6200, 'Enviada'], ['A-1046', 'Librería Pino', 14900, 'Emitida']];
const aps: [string, string, string][] = [['Compra de equipo de cómputo', 'Clínica Alba · $18,500', 'Solicitó Paula R. · Administración'], ['Renovación de licencias', 'Estudio Cantera · $4,200', 'Solicitó Hugo M. · Operaciones'], ['Viáticos de campo', 'Distribuidora Norte · $2,750', 'Solicitó Ana L. · Ventas']];
const dash = `<div class="pg ab-dash" data-rp="light" data-v="res"><header><b class="ab-lg"><i></i>ábaco</b><nav>${[['res', 'Resumen'], ['fac', 'Facturas'], ['apr', 'Aprobaciones']].map(([k, t]) => `<button type="button" data-int="abv" data-k="${k}">${t}</button>`).join('')}</nav><span class="ab-per">Octubre · ejemplo</span></header>
<div class="ab-dk">${[['Facturado', '$482,300'], ['Por cobrar', '$96,400'], ['Pagadas', '31'], ['Por aprobar', '3']].map(([a, b], i) => `<div><small>${a}</small><b${i === 1 ? ' data-xc' : i === 3 ? ' data-xa' : ''}>${b}</b></div>`).join('')}</div>
<div class="ab-dv ab-dres"><div class="ab-dch"><p class="ab-k">Ingresos y egresos</p><div class="ab-bars sm">${bars(ing, egr)}</div></div><div class="ab-dls"><p class="ab-k">Últimas facturas</p>${inv.slice(0, 4).map(([f, c, m, s]) => `<div><span>${f}</span><b>${c}</b><em class="s-${s}">${s}</em></div>`).join('')}</div></div>
<div class="ab-dv ab-dfac"><div class="ab-dtb"><p class="ab-k">Toca un estado para avanzarlo</p><button type="button" class="ab-add" data-int="abnew">+ Emitir factura</button></div><div class="ab-rows">${inv.map(([f, c, m, s]) => `<div class="ab-r" data-m="${m}" data-s="${s}"><span>${f}</span><b>${c}</b><i>$${m.toLocaleString('es-MX')}</i><button type="button" data-int="abst" class="s-${s}">${s}</button></div>`).join('')}</div></div>
<div class="ab-dv ab-dapr"><p class="ab-k">Solicitudes pendientes</p>${aps.map(([t, a, w]) => `<div class="ab-ap"><div><b>${t}</b><span>${a}</span><small>${w}</small></div><div class="ab-ab"><button type="button" data-int="abok">Aprobar</button><button type="button" data-int="abno">Rechazar</button></div><em></em></div>`).join('')}</div>
<span class="bk-pn">22</span></div>`;

export const abacoLeaves = (): { f: string; b: string }[] => [{ f: brand, b: contents }, { f: siteHTML, b: abacoDash }];
export const abacoPieces = [{ t: 'Identidad', h: brand }, { t: 'Proyecto', h: contents }, { t: 'Sitio web', h: siteHTML }, { t: 'Panel', h: abacoDash }];
