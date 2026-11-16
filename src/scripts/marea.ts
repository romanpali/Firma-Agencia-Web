// Proyecto propio «Marea» (concepto): escuela de surf en el Pacífico mexicano. Identidad, sitio web, redes sociales y panel con asistente de IA.
// Cada pieza es una página del libro (40em × 26.7em), en HTML/CSS (nítido a cualquier tamaño). Estilos en styles/marea.css. Sin ids ni filtros: se clona en las franjas curvas.
// Las entradas (.mw-f fundido, .mw-w barrido) se disparan cuando la hoja está a la vista (clase .live que pone el motor del libro).

const ico: Record<string, string> = {
  chat: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3.5V16A2.5 2.5 0 0 1 4 13.5z"/>',
  crm: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/><path d="M16 5.5a3 3 0 0 1 0 5.6M18 14.4c1.7.7 2.7 2.2 3 4.6"/>',
  fin: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M9.4 9.6c.6-1 1.6-1.4 2.6-1.4 1.6 0 2.6.8 2.6 1.9 0 2.6-5.2 1.3-5.2 3.9 0 1.1 1.1 1.9 2.6 1.9 1.1 0 2-.5 2.6-1.4"/>',
  fis: '<path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z"/><path d="M14 3.5v4h4M9.5 12h5M9.5 15h5M9.5 18h3"/>',
  ops: '<rect x="3.5" y="3.5" width="6" height="6" rx="1.4"/><rect x="14.5" y="14.5" width="6" height="6" rx="1.4"/><path d="M9.5 6.5h5.5a3 3 0 0 1 3 3V14.5"/>',
  dat: '<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8V6M4.5 12v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-6"/>',
  ia: '<path d="M12 3.5l1.9 5.2 5.2 1.9-5.2 1.9L12 17.7l-1.9-5.2L4.9 10.6l5.2-1.9z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  cal: '<rect x="4" y="5.5" width="16" height="14" rx="2.5"/><path d="M4 10h16M9 3.5v4M15 3.5v4"/>',
  clip: '<path d="M20 11.5l-7.7 7.7a4.6 4.6 0 0 1-6.5-6.5l8-8a3 3 0 0 1 4.3 4.3l-8 8a1.5 1.5 0 0 1-2.2-2.2l7.2-7.2"/>',
  find: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  panel: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M14.5 4.5v15"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};
const svg = (k: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[k]}</svg>`;
const rp = '<div class="rp-s"></div>';
const g = '<span class="mr-glyph"></span>';

// 1 · Identidad: portada difuminada (la propia fotografía de marca, muy desenfocada)
const brand = `<div class="pg mr-brand" data-rp="dark"><i class="mr-blur"></i><i class="mr-grain"></i>
<div class="mb-t mw-f" style="--d:.2s"><span>Manual de marca</span><span>2026 · v1.0</span></div>
<div class="mb-wm mw-f" style="--d:.45s">${g}<b>marea</b></div>
<p class="mb-tag mw-f" style="--d:.8s">Aprende a leer el mar</p>
<div class="mb-b mw-f" style="--d:1s"><span>Identidad visual</span><span>Logotipo · Color · Tipografía</span></div>${rp}</div>`;

// 2 · Sitio web: fotografía a sangre, barra de navegación tipo píldora y buscador de clases
const web = `<div class="pg mr-web" data-rp="dark">
<i class="mw-photo"></i><i class="mw-shade"></i>
<div class="mw-nav mw-f" style="--d:.15s"><b>${g}marea</b><nav><span>Clases</span><span>Experiencias</span><span>Tienda</span><span>Nosotros</span></nav><i>Reservar</i></div>
<div class="mw-hero">
<p class="mw-k mw-f" style="--d:.5s"><i></i>Escuela de surf · Pacífico mexicano</p>
<h4 class="mw-h"><span class="mw-w" style="--d:.65s">Aprende a</span><span class="mw-w mw-it" style="--d:.95s">leer el mar.</span></h4>
<p class="mw-s mw-f" style="--d:1.4s">Clases para todos los niveles, con equipo incluido y grupos reducidos.</p>
</div>
<div class="mw-cond mw-f" style="--d:1.2s"><small>Mar hoy</small><div><b>1.2 m</b><span>Oleaje</span></div><div><b>14 s</b><span>Periodo</span></div><div><b>27 °</b><span>Agua</span></div></div>
<div class="mw-book mw-f" style="--d:1.85s"><div><small>Nivel</small><b>Principiante</b></div><div><small>Fecha</small><b>Sáb 14 · 07:00</b></div><div><small>Personas</small><b>2 personas</b></div><i>Buscar horarios</i></div>${rp}</div>`;

// 3 · Redes sociales
const soc = `<div class="pg mr-soc" data-rp="dark">
<div class="ms-head mw-f" style="--d:.1s"><i class="ms-av">${g}</i><div><b>@marea.surf</b><span>Escuela de surf · Pacífico mexicano</span></div><em>Redes sociales</em></div>
<div class="ms-grid">
<div class="ms-a mw-f" style="--d:.25s"><i class="ms-ph"></i><i class="ms-sh"></i><div class="ms-wm">${g}<b>marea</b></div><p>Hoy rompe<br>a la derecha.</p></div>
<div class="ms-b mw-f" style="--d:.45s"><p>Marea baja.<br>Mente en calma.</p></div>
<div class="ms-c mw-f" style="--d:.6s"><small>Clase</small><b>07:00</b></div>
<div class="ms-d mw-f" style="--d:.75s"><span>Sesión al atardecer</span><b>Reserva tu lugar</b><p>Grupos de máximo 6 personas. Equipo incluido.</p><i></i></div>
</div>${rp}</div>`;

// 4 · Panel con asistente de IA: menú lateral por áreas (cada una se abre), chat al centro con una conversación animada e historial a la derecha (se puede ocultar)
const nav: [string, string, string][] = [['crm', 'Ventas y CRM', 'ventas'], ['fin', 'Finanzas', 'finanzas'], ['ops', 'Operaciones', 'operaciones'], ['dat', 'Datos e Infraestructura', 'datos'], ['bolt', 'Automatización', 'automatizacion']];
const hist: [string, string, string, string][] = [['Cobranza de la semana', 'Resumen de pagos pendientes y recordatorios…', 'Hace 2 h', 'c1'], ['Cotización para hotel', 'Paquete de clases para 12 huéspedes…', 'Hace 3 h', 'c2'], ['Facturas por emitir', 'Tres clientes esperan su CFDI de…', 'Ayer', 'c3']];
const head = (t: string) => `<div class="mv-h"><h5>${t}</h5><em>Datos de ejemplo</em></div>`;
const kpi = (l: string, v: string, n: string) => `<div><small>${l}</small><b>${v}</b><i>${n}</i></div>`;
const pts = [30, 36, 33, 44, 41, 54, 50, 62, 58, 70, 66, 78], pts2 = [24, 26, 25, 30, 29, 33, 31, 36, 34, 38, 37, 40];
const ln = (a: number[]) => a.map((v, i) => `${(i * 300) / (a.length - 1)},${90 - v}`).join(' ');
const chart = `<svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22H300M0 45H300M0 68H300" stroke="rgba(20,24,43,.08)" stroke-width=".6" fill="none"/><polygon points="0,90 ${ln(pts)} 300,90" fill="rgba(217,100,138,.14)"/><polyline points="${ln(pts)}" fill="none" stroke="#d9648a" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><polyline points="${ln(pts2)}" fill="none" stroke="#8b78b8" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
const col = (t: string, n: number, cards: [string, string, string][]) => `<div class="mp-c"><p>${t}<em>${n}</em></p>${cards.map(([a, b, c]) => `<div class="mp-k"><b>${a}</b><span>${b}</span><i>${c}</i></div>`).join('')}</div>`;
const ev = (d: number, r: number, t: string, n: string, c: string) => `<div class="mo-e ${c}" style="grid-column:${d};grid-row:${r}"><b>${t}</b><span>${n}</span></div>`;
const views = `
<section class="mv mv-ventas">${head('Ventas y CRM')}
<div class="mv-k">${kpi('Prospectos activos', '128', '+12 esta semana')}${kpi('Cotizaciones abiertas', '34', '6 por vencer')}${kpi('Tasa de cierre', '27 %', 'Últimos 30 días')}</div>
<div class="mp">${col('Prospecto', 12, [['Hotel Costa Brava', 'Paquete de 12 clases', '$18,400'], ['Posada Las Gaviotas', 'Clases para huéspedes', '$9,600']])}${col('Cotizado', 6, [['Club Náutico Sur', 'Temporada de verano', '$42,000'], ['Escuela Mar Azul', 'Excursión escolar', '$15,800']])}${col('Ganado', 4, [['Familia Ortega', '8 clases privadas', '$12,800'], ['Grupo Bahía', 'Retiro de equipo', '$27,500']])}</div></section>
<section class="mv mv-finanzas">${head('Finanzas')}
<div class="mv-k">${kpi('Ingresos del mes', '$186,400', '+9 % vs. mes anterior')}${kpi('Gastos del mes', '$94,300', 'Equipo y personal')}${kpi('Por cobrar', '$31,200', '5 facturas abiertas')}</div>
<div class="mv-box"><div class="mv-bt"><span>Ingresos y gastos</span><small><i class="l1"></i>Ingresos <i class="l2"></i>Gastos</small></div>${chart}</div>
<ul class="mv-list"><li><b>Hotel Costa Brava</b><span>Factura 0142</span><em>$12,400</em><i>Vence en 3 días</i></li><li><b>Club Náutico Sur</b><span>Factura 0139</span><em>$9,800</em><i>Vence hoy</i></li><li><b>Posada Las Gaviotas</b><span>Factura 0137</span><em>$6,300</em><i>Vencida 4 días</i></li></ul></section>
<section class="mv mv-operaciones">${head('Operaciones · Semana')}
<div class="mo"><div class="mo-d"><span></span><b>Lun</b><b>Mar</b><b>Mié</b><b>Jue</b><b>Vie</b><b>Sáb</b></div><div class="mo-g"><i class="mo-t" style="grid-row:1">07:00</i><i class="mo-t" style="grid-row:2">09:00</i><i class="mo-t" style="grid-row:3">11:00</i><i class="mo-t" style="grid-row:4">17:00</i>
${ev(2, 1, 'Principiantes', '6 / 6 lugares', 'e1')}${ev(3, 1, 'Intermedio', '4 / 6 lugares', 'e2')}${ev(5, 1, 'Principiantes', '5 / 6 lugares', 'e1')}${ev(7, 1, 'Principiantes', '6 / 6 lugares', 'e1')}${ev(2, 2, 'Clase privada', '1 / 1', 'e3')}${ev(4, 2, 'Niños', '3 / 6 lugares', 'e4')}${ev(6, 2, 'Intermedio', '2 / 6 lugares', 'e2')}${ev(3, 3, 'Clase privada', '1 / 1', 'e3')}${ev(7, 3, 'Niños', '5 / 6 lugares', 'e4')}${ev(2, 4, 'Atardecer', '5 / 6 lugares', 'e5')}${ev(5, 4, 'Atardecer', '4 / 6 lugares', 'e5')}${ev(6, 4, 'Atardecer', '6 / 6 lugares', 'e5')}</div></div></section>
<section class="mv mv-datos">${head('Datos e Infraestructura')}
<div class="mv-k">${kpi('Visitas al sitio', '4,820', 'Últimos 7 días')}${kpi('Reservas en línea', '212', 'Este mes')}${kpi('Último respaldo', '03:00', 'Hoy · respaldo diario')}</div>
<ul class="md-srv"><li><i></i><b>Sitio web</b><span>Operando</span><em>99.9 %</em></li><li><i></i><b>Reservas en línea</b><span>Operando</span><em>99.8 %</em></li><li><i></i><b>Pagos</b><span>Operando</span><em>100 %</em></li><li><i class="w"></i><b>Correo y avisos</b><span>Revisión programada</span><em>98.6 %</em></li></ul></section>
<section class="mv mv-automatizacion">${head('Automatización')}
<ul class="ma"><li><div><b>Recordatorio de clase</b><span>WhatsApp, 24 horas antes de cada clase</span></div><em>Hoy · 18 envíos</em><i class="on"></i></li><li><div><b>Factura al cobrar</b><span>Se prepara el CFDI cuando entra un pago</span></div><em>Ayer · 6 facturas</em><i class="on"></i></li><li><div><b>Reseña después de la clase</b><span>Mensaje con enlace a las 3 horas</span></div><em>Hoy · 11 envíos</em><i class="on"></i></li><li><div><b>Aviso de mal clima</b><span>Reprograma con el grupo cuando el mar no es seguro</span></div><em>Pausado</em><i></i></li></ul></section>`;
const answer = `<div class="mc-ans"><p class="mc-b mc-lead">Vas <b>12 % arriba</b> frente a la semana pasada.</p>
<strong class="mc-b mc-hh">Resumen de la semana</strong>
<div class="mc-rows"><div class="mc-b"><span>Ingresos</span><b>$48,200</b><em>+12 %</em></div><div class="mc-b"><span>Clases vendidas</span><b>64</b><em>78 % de ocupación</em></div><div class="mc-b"><span>Cotizaciones abiertas</span><b>6</b><em>2 vencen mañana</em></div></div>
<strong class="mc-b mc-hh">Qué atender primero</strong>
<ol class="mc-ol"><li class="mc-b"><i>1</i><div><b>Dar seguimiento a Hotel Costa Brava</b><span>Su cotización vence mañana.</span></div></li><li class="mc-b"><i>2</i><div><b>Emitir 3 facturas pendientes</b><span>Hay pagos ya recibidos sin CFDI.</span></div></li></ol>
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
</div>${rp}</div>`;

// Dos hojas: [portada | sitio web] → [redes | panel]
export const mareaLeaves = (): { f: string; b: string }[] => [{ f: brand, b: web }, { f: soc, b: dash }];
export const mareaPieces = [
  { t: 'Identidad', h: brand },
  { t: 'Sitio web', h: web },
  { t: 'Redes sociales', h: soc },
  { t: 'Panel con IA', h: dash },
];
