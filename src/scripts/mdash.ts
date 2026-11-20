// Panel con asistente de IA para Trama, Hikari y Ábaco: la misma estructura que el de Marea (menú, asistente al centro, historial) con paleta oscura propia y contenido de cada proyecto.
// Usa las clases md-* / mv-* de marea.css; el color sale de [data-tm] (ver mdash.css).
import { svg } from './marea-ico';

type Cards = [string, string, string][];
type Cfg = {
  key: 'trama' | 'hikari' | 'abaco'; brand: string; mark: string; user: [string, string, string];
  greet: string; sub: string; cards: Cards; prompt: string;
  ans: { lead: string; h1: string; rows: [string, string, string][]; h2: string; steps: [string, string][]; chips: string[] };
  nav: [string, string, string][]; views: string; hist: [string, string, string, string][];
};

const head = (t: string) => `<div class="mv-h"><h5>${t}</h5><em>Datos de ejemplo</em></div>`;
const kpi = (l: string, v: string, n: string) => `<div><small>${l}</small><b>${v}</b><i>${n}</i></div>`;
const kpis = (a: [string, string, string][]) => `<div class="mv-k">${a.map(([l, v, n]) => kpi(l, v, n)).join('')}</div>`;
const k4 = (a: [string, string, string][]) => `<div class="mv-k mv-k4">${a.map(([l, v, n]) => `<div><small>${l}</small><b>${v}</b><i>${n}</i></div>`).join('')}</div>`;
const col = (t: string, n: number, cards: [string, string, string][]) => `<div class="mp-c"><p>${t}<em>${n}</em></p>${cards.map(([a, b, c]) => `<div class="mp-k"><b>${a}</b><span>${b}</span><i>${c}</i></div>`).join('')}</div>`;
const ln = (a: number[]) => a.map((v, i) => `${(i * 300) / (a.length - 1)},${90 - v}`).join(' ');
const chart = (a: number[], b: number[]) => `<svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22H300M0 45H300M0 68H300" stroke="currentColor" stroke-opacity=".12" stroke-width=".6" fill="none"/><polygon points="0,90 ${ln(a)} 300,90" class="ch-f"/><polyline points="${ln(a)}" fill="none" class="ch-a" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><polyline points="${ln(b)}" fill="none" class="ch-b" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
const box = (t: string, l1: string, l2: string, a: number[], b: number[]) => `<div class="mv-box"><div class="mv-bt"><span>${t}</span><small><i class="l1"></i>${l1} <i class="l2"></i>${l2}</small></div>${chart(a, b)}</div>`;
const list = (rows: [string, string, string, string][]) => `<ul class="mv-list">${rows.map(([a, b, c, d]) => `<li><b>${a}</b><span>${b}</span><em>${c}</em><i>${d}</i></li>`).join('')}</ul>`;
const ev = (d: number, r: number, t: string, n: string, c: string) => `<div class="mo-e ${c}" style="grid-column:${d};grid-row:${r}"><b>${t}</b><span>${n}</span></div>`;
const cal = (rows: string[], evs: [number, number, string, string, string][]) => `<div class="mo"><div class="mo-d"><span></span><b>Lun</b><b>Mar</b><b>Mié</b><b>Jue</b><b>Vie</b><b>Sáb</b></div><div class="mo-g">${rows.map((r, i) => `<i class="mo-t" style="grid-row:${i + 1}">${r}</i>`).join('')}${evs.map((e) => ev(...e)).join('')}</div></div>`;
const srv = (rows: [string, string, string, string, boolean?][]) => `<ul class="md-srv">${rows.map(([a, b, c, , w]) => `<li><i${w ? ' class="w"' : ''}></i><b>${a}</b><span>${b}</span><em>${c}</em></li>`).join('')}</ul>`;
const feed = (title: string, rows: [string, string, string, string, string, string][], flows: [string, boolean?][]) => `<div class="mf"><p class="mf-t"><span class="mf-live"></span>${title}<em>Hoy</em></p><ul>${rows.map(([cl, ic, t, ch, tx, h]) => `<li><i class="mf-i ${cl}">${svg(ic)}</i><div><b>${t}<small>${ch}</small></b><span>${tx}</span></div><em>${h}</em></li>`).join('')}</ul></div>
<div class="mf-flows"><small>Flujos activos</small>${flows.map(([t, off]) => `<span data-int="tog"${off ? ' class="off"' : ''}><i></i>${t}</span>`).join('')}</div>`;

const section = (v: string, title: string, body: string) => `<section class="mv mv-${v}">${head(title)}${body}</section>`;
const goto = (v: string) => `data-int="go" data-v="${v}"`;

export function mkDash(c: Cfg) {
  const a = c.ans;
  return `<div class="pg mr-dash" data-rp="dark" data-view="inicio" data-tm="${c.key}" data-prompt="${c.prompt}"><div class="md-app">
<aside class="md-side"><div class="md-logo"><i class="md-gl">${c.mark}</i><b>${c.brand}</b></div><p>Menú principal</p><ul><li class="on" ${goto('inicio')}>${svg('chat')}<span>Inicio</span></li>${c.nav.map(([k, t, v]) => `<li ${goto(v)}>${svg(k)}<span>${t}</span></li>`).join('')}</ul>
<div class="md-user"><i>${c.user[1]}</i><div><b>${c.user[0]}</b><span>${c.user[2]}</span></div></div></aside>
<main class="md-main">
<section class="mv mv-inicio">
<div class="mc-welcome"><h5>${c.greet}</h5><p class="md-sub">${c.sub}</p>
<div class="md-cards">${c.cards.map(([k, t, v]) => `<div ${goto(v)}>${svg(k)}<b>${t}</b></div>`).join('')}</div></div>
<div class="mc-conv"><div class="mc-user"><span></span></div><div class="mc-bot"><i class="mc-av"><i class="md-gl">${c.mark}</i></i><div class="mc-typing"><i></i><i></i><i></i></div>
<div class="mc-ans"><p class="mc-b mc-lead">${a.lead}</p><strong class="mc-b mc-hh">${a.h1}</strong>
<div class="mc-rows">${a.rows.map(([x, y, z]) => `<div class="mc-b"><span>${x}</span><b>${y}</b><em>${z}</em></div>`).join('')}</div>
<strong class="mc-b mc-hh">${a.h2}</strong>
<ol class="mc-ol">${a.steps.map(([t, d], i) => `<li class="mc-b"><i>${i + 1}</i><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ol>
<div class="mc-b mc-chips">${a.chips.map((x) => `<span>${x}</span>`).join('')}</div></div></div></div>
<div class="md-in"><p class="mc-field"><span class="mc-t"></span><em class="mc-caret"></em><span class="mc-ph">Pregunta algo o escribe una instrucción…</span></p><div><span>${svg('clip')}Adjuntar</span><span>Opciones</span><i>${svg('up')}</i></div></div>
</section>${c.views}
<i class="md-tgl" data-int="hist" title="Mostrar historial">${svg('panel')}</i>
</main>
<aside class="md-hist"><h6>Historial de chats<i data-int="hist" title="Ocultar historial">${svg('x')}</i></h6><div class="md-find">${svg('find')}Buscar…</div><ul>${c.hist.map(([t, d, h, k]) => `<li><b>${t}</b><span>${d}</span><div><i class="${k}"></i><em>${h}</em></div></li>`).join('')}</ul><div class="md-new" data-int="new">${svg('plus')}Crear nuevo chat</div></aside>
</div></div>`;
}

const mk = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

/* ───────── Trama · tienda de ropa ───────── */
const tramaViews =
  section('ventas', 'Pedidos', kpis([['Pedidos del día', '38', '+6 vs. ayer'], ['Por enviar', '12', '4 con envío express'], ['Ticket promedio', '$1,420', 'Últimos 7 días']]) +
    `<div class="mp">${col('Nuevo', 14, [['TR-2043', 'Chamarra varsity · Ana L.', '$1,899'], ['TR-2042', 'Pantalón cargo · Luis M.', '$1,150']])}${col('En preparación', 9, [['TR-2040', 'Suéter de punto · Karla V.', '$1,290'], ['TR-2039', 'Camisa de lino · Jorge P.', '$890']])}${col('Enviado', 15, [['TR-2036', 'Plumífero rojo · Sara D.', '$2,490'], ['TR-2035', 'Chaleco acolchado · Ivo R.', '$1,590']])}</div>`) +
  section('finanzas', 'Ingresos', kpis([['Ventas del mes', '$318,900', '+9 % vs. mes anterior'], ['Devoluciones', '$12,400', '3.9 % de las ventas'], ['Por liquidar', '$41,200', 'Tarjeta y PayPal']]) +
    box('Ventas y devoluciones', 'Ventas', 'Devoluciones', [30, 36, 33, 44, 41, 54, 50, 62, 58, 70, 66, 78], [24, 26, 25, 30, 29, 33, 31, 36, 34, 38, 37, 40]) +
    list([['Tarjeta', 'Liquidación 0412', '$28,600', 'Mañana'], ['PayPal', 'Liquidación 0411', '$9,800', 'Hoy'], ['Apple Pay', 'Liquidación 0410', '$2,800', 'Hace 2 días']])) +
  section('calendario', 'Lanzamientos · Semana', cal(['Instagram', 'Correo', 'Tienda', 'Prensa'], [[2, 1, 'Teaser', 'Reel', 'e1'], [5, 1, 'Lookbook 03', 'Carrusel', 'e1'], [3, 2, 'Boletín', 'Nuevos ingresos', 'e2'], [6, 2, 'Preventa', 'Clientes VIP', 'e2'], [2, 3, 'Colección', 'Se publica', 'e3'], [4, 3, 'Rebajas', 'Pausadas', 'e3'], [7, 3, 'Cápsula', 'Plumíferos', 'e3'], [4, 4, 'Editorial', 'Revista', 'e4'], [7, 4, 'Pop-up', 'Sábado', 'e5']])) +
  section('datos', 'Inventario', kpis([['Piezas en stock', '4,820', '126 referencias'], ['Stock bajo', '9', 'Reabasto sugerido'], ['Rotación', '3.2x', 'Últimos 90 días']]) +
    srv([['Chamarra varsity', 'Stock saludable', '58 pzas', ''], ['Pantalón cargo', 'Stock saludable', '41 pzas', ''], ['Plumífero rojo', 'Reabasto sugerido', '12 pzas', '', true], ['Chaleco acolchado', 'Reabasto sugerido', '9 pzas', '', true]])) +
  section('automatizacion', 'Campañas', k4([['Instagram', '4', 'publicaciones'], ['Correo', '2', 'envíos'], ['Anuncios', '3', 'activos'], ['Carritos', '18', 'recuperados']]) +
    feed('Lo que tu tienda envía sola', [['ig', 'share', 'Reel de lanzamiento', 'Instagram', '«Cápsula de invierno» se publicó a las 8:00 con 3 productos etiquetados.', '08:00'], ['wa', 'chat', 'Carrito abandonado', 'Correo', 'Se enviaron 6 recordatorios con 10 % de descuento; 2 compras se recuperaron.', '10:20'], ['call', 'bolt', 'Boletín semanal', 'Correo', 'Se programó el envío a 4,200 suscriptores para el jueves.', 'Mañana']], [['Carrito abandonado'], ['Reseña tras compra'], ['Aviso de reabasto'], ['Rebajas', true]]));

export const tramaDash = mkDash({
  key: 'trama', brand: 'trama', mark: mk('<path d="M6 5v14M10.7 5v14M15.4 5v14M20 5v14" stroke-width="2.6"/>'),
  user: ['Sofía Reyes', 'S', 'Dueña de la tienda'], greet: 'Hola, Sofía.', sub: '¿Qué quieres revisar de la tienda?',
  cards: [['crm', 'Pedidos de hoy', 'ventas'], ['bag', 'Qué reabastecer', 'datos'], ['bolt', 'Campaña de la semana', 'automatizacion']],
  prompt: '¿Qué se vendió más esta semana y qué debo reabastecer?',
  ans: { lead: 'Las ventas suben <b>9 %</b> frente a la semana pasada.', h1: 'Lo más vendido', rows: [['Chamarra varsity', '42 pzas', '+18 %'], ['Plumífero rojo', '31 pzas', '+7 %'], ['Chaleco acolchado', '24 pzas', '+4 %']], h2: 'Qué atender primero', steps: [['Reabastecer plumífero rojo', 'Quedan 12 piezas en talla M.'], ['Pausar la campaña de rebajas', 'Su retorno bajó a 1.8x.']], chips: ['Reabastecer', 'Ver pedidos', 'Crear reporte'] },
  nav: [['crm', 'Pedidos', 'ventas'], ['fin', 'Ingresos', 'finanzas'], ['cal', 'Lanzamientos', 'calendario'], ['bag', 'Inventario', 'datos'], ['bolt', 'Campañas', 'automatizacion']],
  views: tramaViews,
  hist: [['Reabasto de abrigos', 'Plumífero rojo y chaleco con poco…', 'Hace 1 h', 'c1'], ['Campaña lookbook 02', 'Retorno por canal y creatividad…', 'Hace 4 h', 'c2'], ['Pedidos por enviar', 'Doce pedidos esperan guía de…', 'Ayer', 'c3']],
});

/* ───────── Hikari · estudio de fotografía y diseño ───────── */
const hikariViews =
  section('ventas', 'Proyectos', kpis([['Proyectos activos', '9', '2 por aprobar'], ['Entregas esta semana', '3', 'Próxima: jueves'], ['Sesiones este mes', '14', '4 por agendar']]) +
    `<div class="mp">${col('En diseño', 3, [['Casa Hoshi', 'Sitio web de huéspedes', 'Vie 21'], ['Taller Marea', 'Libro de marca', 'Sin fecha']])}${col('En edición', 4, [['Cerámica Tierra Viva', 'Sesión de producto · 24 piezas', 'Mié 19'], ['Librería Pino', 'Retrato del equipo', 'Vie 21']])}${col('Por aprobar', 2, [['Café Nube', 'Identidad y empaque', 'Jue 20'], ['Mercado Sol', 'Fotografía de platillos', 'Lun 24']])}</div>`) +
  section('finanzas', 'Facturación', kpis([['Facturado del mes', '$184,600', '+6 % vs. mes anterior'], ['Por cobrar', '$46,000', '3 facturas abiertas'], ['Anticipos', '$28,500', '2 proyectos nuevos']]) +
    box('Facturado y anticipos', 'Facturado', 'Anticipos', [26, 30, 38, 34, 46, 44, 56, 52, 64, 60, 72, 76], [14, 16, 15, 20, 19, 22, 21, 26, 24, 28, 27, 30]) +
    list([['Café Nube', 'Factura 0087', '$18,400', 'Vence en 4 días'], ['Casa Hoshi', 'Factura 0086', '$16,000', 'Vence hoy'], ['Taller Marea', 'Factura 0083', '$11,600', 'Vencida 3 días']])) +
  section('calendario', 'Sesiones · Semana', cal(['Estudio', 'Locación', 'Retrato', 'Producto'], [[2, 1, 'Cerámica', 'Producto', 'e3'], [5, 1, 'Mercado Sol', 'Platillos', 'e3'], [3, 2, 'Casa Hoshi', 'Exteriores', 'e4'], [6, 2, 'Taller Marea', 'Scouting', 'e4'], [2, 3, 'Librería Pino', 'Equipo', 'e1'], [4, 3, 'Café Nube', 'Retratos', 'e1'], [7, 3, 'Boda Ortega', 'Medio día', 'e5'], [3, 4, 'Tierra Viva', 'Detalle', 'e2'], [6, 4, 'Edición', 'Entrega', 'e2']])) +
  section('datos', 'Archivo y entregas', kpis([['Archivos del mes', '2,140', 'RAW y editados'], ['Galerías activas', '11', 'Para clientes'], ['Último respaldo', '02:00', 'Hoy · diario']]) +
    srv([['Galerías de clientes', 'Operando', '99.9 %', ''], ['Descarga de archivos', 'Operando', '99.8 %', ''], ['Respaldo en la nube', 'Operando', '100 %', ''], ['Envío de pruebas', 'Revisión programada', '98.2 %', '', true]])) +
  section('automatizacion', 'Mensajes', k4([['Correo', '14', 'mensajes hoy'], ['WhatsApp', '9', 'respuestas'], ['Galerías', '3', 'enviadas'], ['Recordatorios', '7', 'sesiones']]) +
    feed('Lo que tu estudio envía solo', [['ig', 'share', 'Galería enviada', 'Correo', 'Se envió la galería de Café Nube con 48 fotos para aprobar.', '11:05'], ['wa', 'chat', 'Recordatorio de sesión', 'WhatsApp', 'Retrato del equipo mañana a las 10:00. Se avisó a 6 personas.', '09:30'], ['call', 'fin', 'Seguimiento de factura', 'Correo', 'Recordatorio amable a Casa Hoshi por la factura 0086.', '08:10']], [['Galería lista'], ['Recordatorio de sesión'], ['Seguimiento de factura'], ['Encuesta final', true]]));

export const hikariDash = mkDash({
  key: 'hikari', brand: 'hikari', mark: mk('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>'),
  user: ['Aiko Mora', 'A', 'Dirección del estudio'], greet: 'Hola, Aiko.', sub: '¿Qué revisamos del estudio?',
  cards: [['crm', 'Proyectos por aprobar', 'ventas'], ['cal', 'Sesiones de la semana', 'calendario'], ['fin', 'Facturas por cobrar', 'finanzas']],
  prompt: '¿Qué entregas tengo esta semana y qué falta aprobar?',
  ans: { lead: 'Tienes <b>3 entregas</b> esta semana y 2 proyectos por aprobar.', h1: 'Entregas de la semana', rows: [['Café Nube', 'Identidad', 'Jue'], ['Casa Hoshi', 'Sitio web', 'Vie'], ['Librería Pino', 'Retrato del equipo', 'Vie']], h2: 'Qué atender primero', steps: [['Enviar galería a Café Nube', 'Faltan 6 fotos por retocar.'], ['Confirmar sesión de Taller Marea', 'Piden fecha para el libro de marca.']], chips: ['Enviar galería', 'Ver calendario', 'Crear reporte'] },
  nav: [['crm', 'Proyectos', 'ventas'], ['fin', 'Facturación', 'finanzas'], ['cal', 'Sesiones', 'calendario'], ['dat', 'Archivo y entregas', 'datos'], ['chat', 'Mensajes', 'automatizacion']],
  views: hikariViews,
  hist: [['Entrega de Café Nube', 'Galería, textos y archivos finales…', 'Hace 1 h', 'c1'], ['Sesión de retrato', 'Horario, luz y locación del equipo…', 'Hace 3 h', 'c2'], ['Facturas abiertas', 'Tres facturas por dar seguimiento…', 'Ayer', 'c3']],
});

/* ───────── Ábaco · contabilidad y operación ───────── */
const abacoViews =
  section('ventas', 'Clientes y cobranza', kpis([['Clientes activos', '86', '+4 este mes'], ['Facturas abiertas', '31', '7 por vencer'], ['Cobranza del mes', '92 %', 'Meta 95 %']]) +
    `<div class="mp">${col('Por cobrar', 12, [['Café Nube', 'A-1046 · vence en 3 días', '$6,200'], ['Clínica Alba', 'A-1044 · vence mañana', '$14,800']])}${col('Por aprobar', 5, [['Clínica Alba', 'Compra de equipo', '$32,000'], ['Taller Soto', 'Renta de bodega', '$9,500']])}${col('Pagado', 24, [['Café Nube', 'A-1045 · hoy', '$6,200'], ['Distribuidora Luz', 'A-1041 · ayer', '$21,300']])}</div>`) +
  section('finanzas', 'Flujo de efectivo', kpis([['Ingresos del mes', '$742,300', '+5 % vs. mes anterior'], ['Gastos del mes', '$418,900', 'Nómina y proveedores'], ['Saldo en bancos', '$1,204,500', '3 cuentas conciliadas']]) +
    box('Ingresos y gastos', 'Ingresos', 'Gastos', [34, 38, 36, 46, 44, 52, 50, 60, 58, 66, 64, 74], [26, 28, 30, 29, 34, 33, 38, 36, 40, 39, 42, 41]) +
    list([['Distribuidora Luz', 'Factura A-1041', '$21,300', 'Pagada ayer'], ['Clínica Alba', 'Factura A-1044', '$14,800', 'Vence mañana'], ['Taller Soto', 'Factura A-1038', '$9,500', 'Vencida 5 días']])) +
  section('calendario', 'Vencimientos · Semana', cal(['Impuestos', 'Nómina', 'Proveedores', 'Cobranza'], [[3, 1, 'IVA', 'Presentación mensual', 'e1'], [6, 1, 'ISR', 'Pago provisional', 'e1'], [2, 2, 'Nómina', 'Quincena', 'e4'], [5, 2, 'IMSS', 'Cuotas', 'e2'], [3, 3, 'Proveedores', '6 pagos', 'e3'], [7, 3, 'Renta', 'Bodega', 'e3'], [2, 4, 'Cobranza', '7 avisos', 'e5'], [5, 4, 'Seguimiento', 'Clínica Alba', 'e5']])) +
  section('datos', 'Conciliación', kpis([['Movimientos del mes', '1,284', 'Importados del banco'], ['Conciliados', '96 %', 'Sin diferencias'], ['Por revisar', '52', 'Con sugerencia']]) +
    srv([['Cuenta empresarial', 'Conciliada', '100 %', ''], ['Cuenta de nómina', 'Conciliada', '99.4 %', ''], ['Tarjeta corporativa', 'Revisión pendiente', '94.1 %', '', true], ['CFDI recibidos', 'Importados', '98.6 %', '']])) +
  section('automatizacion', 'Recordatorios', k4([['Cobranza', '18', 'avisos hoy'], ['Facturas', '9', 'enviadas'], ['Aprobaciones', '4', 'pendientes'], ['Reportes', '2', 'programados']]) +
    feed('Lo que tu operación envía sola', [['wa', 'chat', 'Recordatorio de pago', 'Correo', 'Aviso amable a Café Nube por la factura A-1046, que vence en 3 días.', '10:40'], ['call', 'fis', 'Factura enviada', 'Facturación', 'Se envió la factura A-1047 a Distribuidora Luz con su CFDI.', '09:55'], ['ig', 'check', 'Aprobación pendiente', 'Aprobaciones', 'La compra de equipo de Clínica Alba espera la firma de dirección.', '09:10']], [['Cobranza amable'], ['Factura al emitir'], ['Reporte semanal'], ['Aviso de vencimiento', true]]));

export const abacoDash = mkDash({
  key: 'abaco', brand: 'ábaco', mark: mk('<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="1.8" fill="currentColor"/><circle cx="15" cy="12" r="1.8" fill="currentColor"/><circle cx="11" cy="18" r="1.8" fill="currentColor"/>'),
  user: ['Valeria Rojas', 'V', 'Dirección de operaciones'], greet: 'Hola, Valeria.', sub: '¿Qué revisamos hoy de las finanzas?',
  cards: [['fin', 'Flujo de efectivo', 'finanzas'], ['fis', 'Facturas por cobrar', 'ventas'], ['bolt', 'Recordatorios de cobranza', 'automatizacion']],
  prompt: '¿Cómo va la cobranza del mes y qué vence esta semana?',
  ans: { lead: 'La cobranza va en <b>92 %</b>, a 3 puntos de la meta.', h1: 'Resumen del mes', rows: [['Facturado', '$742,300', '+5 %'], ['Cobrado', '$683,000', '92 %'], ['Por cobrar', '$59,300', '7 por vencer']], h2: 'Qué atender primero', steps: [['Dar seguimiento a Clínica Alba', 'Su factura vence mañana.'], ['Aprobar la compra de equipo', 'Espera la firma de dirección.']], chips: ['Enviar recordatorios', 'Ver facturas', 'Crear reporte'] },
  nav: [['crm', 'Clientes', 'ventas'], ['fin', 'Flujo de efectivo', 'finanzas'], ['cal', 'Vencimientos', 'calendario'], ['dat', 'Conciliación', 'datos'], ['bolt', 'Recordatorios', 'automatizacion']],
  views: abacoViews,
  hist: [['Cobranza de la semana', 'Facturas por vencer y recordatorios…', 'Hace 1 h', 'c1'], ['Conciliación de octubre', '52 movimientos con sugerencia…', 'Hace 3 h', 'c2'], ['Aprobaciones', 'Dos compras esperan la firma de…', 'Ayer', 'c3']],
});

/* ───────── Asistente en celular: textos propios de cada proyecto ───────── */
export type ChatCfg = { ph: string; hi: string; sub: string; sug: [string, string][]; fine: string; rep: [string, string, string[]?][]; fb: string; img: string; inv: string; rpt: string; res: string };
export const CHATS: Record<string, ChatCfg> = {
  trama: {
    ph: 'Pregúntale a Trama IA', hi: 'Hola, Sofía', sub: '¿Qué revisamos de la tienda?', fine: 'Trama IA puede equivocarse. Respuestas de ejemplo.',
    sug: [['Pedidos de hoy', 'doc'], ['Qué reabastecer', 'chart'], ['Campaña de la semana', 'bolt'], ['Lanzamientos de la semana', 'cal']],
    rep: [['venta|ingres|vend', 'Esta semana llevas $79,400, 9 % más que la anterior. La chamarra varsity lidera con 42 piezas.', ['$79,400|Ventas de la semana', '42 pzas|Chamarra varsity']], ['pedido|envi', 'Tienes 12 pedidos por enviar, 4 con envío express. Puedo generar las guías ahora.', ['12 pedidos|Por enviar']], ['reabast|stock|inventario', 'El plumífero rojo (talla M) y el chaleco acolchado tienen pocas piezas: quedan 12 y 9.', ['12 pzas|Plumífero rojo', '9 pzas|Chaleco acolchado']], ['campa|anunci|correo|instagram', 'La campaña de rebajas bajó a 1.8x de retorno. Te recomiendo pausarla y reforzar el lookbook 02, que va en 6.1x.', ['1.8x|Rebajas', '6.1x|Lookbook 02']]],
    fb: 'Lo reviso y te aviso en unos segundos. Mientras tanto, puedo prepararte un resumen de pedidos, inventario o campañas.',
    img: 'Se ve una buena base para una publicación de Trama: prenda clara y fondo limpio. ¿Quieres que prepare un texto y un horario para publicarla?', inv: 'Lo investigo y te resumo lo más importante. Mientras tanto: las publicaciones de moda rinden mejor entre 7 y 9 pm.', rpt: 'Listo el borrador: ventas de la semana $79,400, 12 pedidos por enviar y 2 prendas por reabastecer. ¿Lo envío por correo?', res: 'Genera una imagen para tus redes',
  },
  hikari: {
    ph: 'Pregúntale a Hikari IA', hi: 'Hola, Aiko', sub: '¿Qué revisamos del estudio?', fine: 'Hikari IA puede equivocarse. Respuestas de ejemplo.',
    sug: [['Proyectos por aprobar', 'doc'], ['Entregas de la semana', 'chart'], ['Sesiones de esta semana', 'cal'], ['Facturas por cobrar', 'bolt']],
    rep: [['entrega|proyecto|aprob', 'Tienes 3 entregas esta semana: Café Nube (jue), Casa Hoshi y Librería Pino (vie). Dos proyectos esperan aprobación.', ['3 entregas|Esta semana', '2|Por aprobar']], ['sesi|agenda|fecha', 'Mañana a las 10:00 hay retrato del equipo de Librería Pino. El jueves tienes retratos en Café Nube.', ['10:00|Mañana']], ['factura|cobr|pago', 'Hay 3 facturas abiertas por $46,000. La de Casa Hoshi vence hoy.', ['$46,000|Por cobrar']], ['galer|archivo|foto', 'Tienes 11 galerías activas. La de Café Nube está lista con 48 fotos para aprobar.', ['11|Galerías activas']]],
    fb: 'Lo reviso y te aviso en unos segundos. Mientras tanto, puedo prepararte un resumen de proyectos, sesiones o facturas.',
    img: 'Se ve una buena base para el portafolio de Hikari: luz suave y mucha textura. ¿Quieres que prepare un texto y la ficha del proyecto?', inv: 'Lo investigo y te resumo lo más importante. Mientras tanto: la luz de las 9 a 11 am funciona mejor para producto.', rpt: 'Listo el borrador: 3 entregas, 14 sesiones del mes y $46,000 por cobrar. ¿Lo envío por correo?', res: 'Genera una imagen de referencia',
  },
  abaco: {
    ph: 'Pregúntale a Ábaco IA', hi: 'Hola, Valeria', sub: '¿Qué revisamos hoy de las finanzas?', fine: 'Ábaco IA puede equivocarse. Respuestas de ejemplo.',
    sug: [['Cobranza del mes', 'chart'], ['Facturas por cobrar', 'doc'], ['Vencimientos de la semana', 'cal'], ['Aprobaciones pendientes', 'bolt']],
    rep: [['cobr|factura|cliente', 'La cobranza va en 92 %, a 3 puntos de la meta. Hay 7 facturas por vencer; la de Clínica Alba vence mañana.', ['92 %|Cobranza', '7|Por vencer']], ['flujo|ingres|gasto|banco', 'Este mes llevas $742,300 de ingresos y $418,900 de gastos. El saldo en bancos es $1,204,500.', ['$742,300|Ingresos', '$418,900|Gastos']], ['venc|impuesto|iva|isr', 'Esta semana vencen la presentación de IVA (mié) y el pago provisional de ISR (sáb). Tu contador las revisa contigo.', ['2|Vencimientos']], ['aprob|compra', 'Hay 5 aprobaciones pendientes. La compra de equipo de Clínica Alba ($32,000) espera la firma de dirección.', ['5|Por aprobar']]],
    fb: 'Lo reviso y te aviso en unos segundos. Mientras tanto, puedo prepararte un resumen de cobranza, flujo o vencimientos.',
    img: 'Recibí el documento. Puedo leer los datos y proponerte cómo registrarlo. ¿Lo asocio a un cliente o a un proveedor?', inv: 'Lo investigo y te resumo lo más importante. Mientras tanto: lo ideal es enviar los recordatorios de cobro 3 días antes del vencimiento.', rpt: 'Listo el borrador: facturado $742,300, cobrado 92 % y $59,300 por cobrar. ¿Lo envío por correo?', res: 'Genera una gráfica o resumen',
  },
};
