// Proyecto propio «Marea» (concepto): estancias boutique junto a un lago en Valle de Bravo. Identidad, sitio web, redes sociales y panel con asistente de IA.
// Cada pieza es una página del libro (40em × 26.7em), en HTML/CSS (nítido a cualquier tamaño). Estilos en styles/marea.css. Sin ids ni filtros: se clona en las franjas curvas.
// Las entradas (.mw-f fundido, .mw-w barrido) se disparan cuando la hoja está a la vista (clase .live que pone el motor del libro).

import { svg, g } from './marea-ico';
import { webHTML, caseHTML } from './marea-web';


// 1 · Identidad: portada difuminada (la propia fotografía de marca, muy desenfocada)
const brand = `<div class="pg mr-brand" data-rp="dark"><i class="mr-blur"></i><i class="mr-grain"></i>
<div class="mb-t mw-f" style="--d:.2s"><span>Manual de marca</span><span class="mb-by2">Made by <b><i class="wl">Human</i><i class="ws">Corp</i></b></span></div>
<div class="mb-wm mw-f" style="--d:.45s">${g}<b>marea</b></div>
<p class="mb-tag mw-f" style="--d:.8s">Un lugar para bajar el ritmo</p>
<div class="mb-b mw-f" style="--d:1s"><span>Identidad visual</span><span>Logotipo · Color · Tipografía</span></div>
</div>`;

// 4 · Panel con asistente de IA: menú lateral por áreas (cada una se abre), chat al centro con una conversación animada e historial a la derecha (se puede ocultar)
const nav: [string, string, string][] = [['bolt', 'Automatización', 'automatizacion'], ['crm', 'Ventas y CRM', 'ventas'], ['fin', 'Finanzas', 'finanzas'], ['cal', 'Calendario', 'calendario'], ['dat', 'Datos e Infraestructura', 'datos']];
const hist: [string, string, string, string][] = [['Cobranza de la semana', 'Resumen de pagos pendientes y recordatorios…', 'Hace 2 h', 'c1'], ['Cotización para grupo', 'Retiro de ocho personas, dos noches…', 'Hace 3 h', 'c2'], ['Facturas por emitir', 'Tres huéspedes esperan su CFDI de…', 'Ayer', 'c3']];
const head = (t: string) => `<div class="mv-h"><h5>${t}</h5><em>Datos de ejemplo</em></div>`;
const kpi = (l: string, v: string, n: string) => `<div><small>${l}</small><b>${v}</b><i>${n}</i></div>`;
const pts = [30, 36, 33, 44, 41, 54, 50, 62, 58, 70, 66, 78], pts2 = [24, 26, 25, 30, 29, 33, 31, 36, 34, 38, 37, 40];
const ln = (a: number[]) => a.map((v, i) => `${(i * 300) / (a.length - 1)},${90 - v}`).join(' ');
const chart = `<svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22H300M0 45H300M0 68H300" stroke="rgba(20,24,43,.08)" stroke-width=".6" fill="none"/><polygon points="0,90 ${ln(pts)} 300,90" fill="rgba(217,100,138,.14)"/><polyline points="${ln(pts)}" fill="none" stroke="#d9648a" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><polyline points="${ln(pts2)}" fill="none" stroke="#8b78b8" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
const col = (t: string, n: number, cards: [string, string, string][]) => `<div class="mp-c"><p>${t}<em>${n}</em></p>${cards.map(([a, b, c]) => `<div class="mp-k"><b>${a}</b><span>${b}</span><i>${c}</i></div>`).join('')}</div>`;
const ev = (d: number, r: number, t: string, n: string, c: string) => `<div class="mo-e ${c}" style="grid-column:${d};grid-row:${r}"><b>${t}</b><span>${n}</span></div>`;
const views = `
<section class="mv mv-ventas">${head('Ventas y CRM')}
<div class="mv-k">${kpi('Consultas activas', '128', '+12 esta semana')}${kpi('Cotizaciones abiertas', '34', '6 por vencer')}${kpi('Tasa de reserva', '27 %', 'Últimos 30 días')}</div>
<div class="mp">${col('Consulta', 12, [['Empresa Altavista', 'Retiro de equipo · 8 pers.', '$38,400'], ['Boda Márquez', 'Casa completa · 2 noches', '$19,600']])}${col('Cotizado', 6, [['Club de Yoga Sur', 'Fin de semana', '$42,000'], ['Familia Ortega', 'Casa completa · 3 noches', '$29,400']])}${col('Reservado', 4, [['Pareja Salinas', 'Casa de cristal · 2 noches', '$9,600'], ['Grupo Bosque', 'Retiro de calma', '$27,500']])}</div></section>
<section class="mv mv-finanzas">${head('Finanzas')}
<div class="mv-k">${kpi('Ingresos del mes', '$286,400', '+9 % vs. mes anterior')}${kpi('Gastos del mes', '$94,300', 'Personal y mantenimiento')}${kpi('Por cobrar', '$31,200', '5 facturas abiertas')}</div>
<div class="mv-box"><div class="mv-bt"><span>Ingresos y gastos</span><small><i class="l1"></i>Ingresos <i class="l2"></i>Gastos</small></div>${chart}</div>
<ul class="mv-list"><li><b>Empresa Altavista</b><span>Factura 0142</span><em>$12,400</em><i>Vence en 3 días</i></li><li><b>Club de Yoga Sur</b><span>Factura 0139</span><em>$9,800</em><i>Vence hoy</i></li><li><b>Boda Márquez</b><span>Factura 0137</span><em>$6,300</em><i>Vencida 4 días</i></li></ul></section>
<section class="mv mv-calendario">${head('Calendario · Semana')}
<div class="mo"><div class="mo-d"><span></span><b>Lun</b><b>Mar</b><b>Mié</b><b>Jue</b><b>Vie</b><b>Sáb</b></div><div class="mo-g"><i class="mo-t" style="grid-row:1">Cristal</i><i class="mo-t" style="grid-row:2">Cabaña</i><i class="mo-t" style="grid-row:3">Suite</i><i class="mo-t" style="grid-row:4">Casa</i>
${ev(2, 1, 'Salinas', '2 noches', 'e1')}${ev(5, 1, 'Márquez', '3 noches', 'e1')}${ev(3, 2, 'Ortega', '2 noches', 'e2')}${ev(6, 2, 'Solís', '2 noches', 'e2')}${ev(2, 3, 'Ramos', '1 noche', 'e3')}${ev(4, 3, 'Díaz', '2 noches', 'e3')}${ev(7, 3, 'Vega', '1 noche', 'e3')}${ev(2, 4, 'Altavista', '4 noches', 'e4')}${ev(7, 4, 'Club Yoga', '2 noches', 'e5')}</div></div></section>
<section class="mv mv-datos">${head('Datos e Infraestructura')}
<div class="mv-k">${kpi('Visitas al sitio', '4,820', 'Últimos 7 días')}${kpi('Reservas en línea', '212', 'Este mes')}${kpi('Último respaldo', '03:00', 'Hoy · respaldo diario')}</div>
<ul class="md-srv"><li><i></i><b>Sitio web</b><span>Operando</span><em>99.9 %</em></li><li><i></i><b>Reservas en línea</b><span>Operando</span><em>99.8 %</em></li><li><i></i><b>Pagos</b><span>Operando</span><em>100 %</em></li><li><i class="w"></i><b>Correo y avisos</b><span>Revisión programada</span><em>98.6 %</em></li></ul></section>
<section class="mv mv-automatizacion">${head('Automatización')}
<div class="mv-k mv-k4"><div><small>WhatsApp</small><b>48</b><i>mensajes hoy</i></div><div><small>Redes sociales</small><b>6</b><i>publicaciones</i></div><div><small>Llamadas</small><b>12</b><i>seguimientos</i></div><div><small>Agenda</small><b>9</b><i>reservas nuevas</i></div></div>
<div class="mf"><p class="mf-t"><span class="mf-live"></span>Lo que tu negocio envía solo<em>Hoy</em></p><ul><li><i class="mf-i wa">${svg('chat')}</i><div><b>Instrucciones de llegada<small>WhatsApp</small></b><span>Hola Mariana, te esperamos mañana desde las 3 pm en el lago. Te enviamos la ruta y el código de acceso.</span></div><em>10:42</em></li><li><i class="mf-i call">${svg('phone')}</i><div><b>Seguimiento de cotización<small>Llamada</small></b><span>Llamada a Empresa Altavista de 2 min 14 s. Pidieron la propuesta por correo.</span></div><em>10:15</em></li><li><i class="mf-i ig">${svg('share')}</i><div><b>Publicación programada<small>Redes sociales</small></b><span>«Atardecer en el muelle» se publicó en Instagram y Facebook.</span></div><em>08:00</em></li><li><i class="mf-i ag">${svg('cal')}</i><div><b>Nueva reserva<small>Agenda</small></b><span>Familia Ortega reservó la casa completa. Quedó en el calendario del fin de semana.</span></div><em>07:31</em></li></ul></div>
<div class="mf-flows"><small>Flujos activos</small><span data-int="tog"><i></i>Recordatorio</span><span data-int="tog"><i></i>Factura al cobrar</span><span data-int="tog"><i></i>Reseña</span><span data-int="tog" class="off"><i></i>Aviso de lluvia</span></div></section>`;
const answer = `<div class="mc-ans"><p class="mc-b mc-lead">Vas <b>12 % arriba</b> frente a la semana pasada.</p>
<strong class="mc-b mc-hh">Resumen de la semana</strong>
<div class="mc-rows"><div class="mc-b"><span>Ingresos</span><b>$48,200</b><em>+12 %</em></div><div class="mc-b"><span>Noches vendidas</span><b>64</b><em>78 % de ocupación</em></div><div class="mc-b"><span>Cotizaciones abiertas</span><b>6</b><em>2 vencen mañana</em></div></div>
<strong class="mc-b mc-hh">Qué atender primero</strong>
<ol class="mc-ol"><li class="mc-b"><i>1</i><div><b>Dar seguimiento a Empresa Altavista</b><span>Su cotización vence mañana.</span></div></li><li class="mc-b"><i>2</i><div><b>Emitir 3 facturas pendientes</b><span>Hay pagos ya recibidos sin CFDI.</span></div></li></ol>
<div class="mc-b mc-chips"><span>Enviar recordatorios</span><span>Ver cotizaciones</span><span>Crear reporte</span></div></div>`;
const goto = (v: string) => `data-int="go" data-v="${v}"`;
const dash = `<div class="pg mr-dash" data-rp="light" data-view="inicio"><div class="md-app">
<aside class="md-side"><div class="md-logo">${g}<b>marea</b></div><p>Menú principal</p><ul><li class="on" ${goto('inicio')}>${svg('chat')}<span>Inicio</span></li>${nav.map(([k, t, v]) => `<li ${goto(v)}>${svg(k)}<span>${t}</span></li>`).join('')}</ul>
<div class="md-user"><i>S</i><div><b>Sofía Reyes</b><span>Administradora</span></div></div></aside>
<main class="md-main">
<section class="mv mv-inicio">
<div class="mc-welcome"><h5>Bienvenida, Sofía.</h5><p class="md-sub">¿En qué te ayudo hoy?</p>
<div class="md-cards"><div ${goto('ventas')}>${svg('crm')}<b>Resumen de ventas</b></div><div ${goto('finanzas')}>${svg('fis')}<b>Facturas por emitir</b></div><div ${goto('automatizacion')}>${svg('bolt')}<b>Automatizar avisos</b></div></div></div>
<div class="mc-conv"><div class="mc-user"><span></span></div><div class="mc-bot"><i class="mc-av">${g}</i><div class="mc-typing"><i></i><i></i><i></i></div>${answer}</div></div>
<div class="md-in"><p class="mc-field"><span class="mc-t"></span><em class="mc-caret"></em><span class="mc-ph">Pregunta algo o escribe una instrucción…</span></p><div><span>${svg('clip')}Adjuntar</span><span>Opciones</span><i>${svg('up')}</i></div></div>
</section>${views}
<i class="md-tgl" data-int="hist" title="Mostrar historial">${svg('panel')}</i>
</main>
<aside class="md-hist"><h6>Historial de chats<i data-int="hist" title="Ocultar historial">${svg('x')}</i></h6><div class="md-find">${svg('find')}Buscar…</div><ul>${hist.map(([t, d, h, c]) => `<li><b>${t}</b><span>${d}</span><div><i class="${c}"></i><em>${h}</em></div></li>`).join('')}</ul><div class="md-new" data-int="new">${svg('plus')}Crear nuevo chat</div></aside>
</div></div>`;

// Dos hojas: [portada | ficha del proyecto] → [sitio web | panel]
export const mareaLeaves = (): { f: string; b: string }[] => [{ f: brand, b: caseHTML }, { f: webHTML, b: dash }];
export const mareaPieces = [
  { t: 'Identidad', h: brand },
  { t: 'Proyecto', h: caseHTML },
  { t: 'Sitio web', h: webHTML },
  { t: 'Panel con IA', h: dash },
];
