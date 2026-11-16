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

// 4 · Panel con asistente de IA: menú lateral por divisiones, chat al centro e historial a la derecha
const nav: [string, string][] = [['crm', 'Ventas y CRM'], ['fin', 'Finanzas'], ['fis', 'Asesoría Contable y Fiscal'], ['ops', 'Operaciones'], ['dat', 'Datos e Infraestructura'], ['ia', 'IA y Automatización']];
const hist: [string, string, string, string][] = [['Cobranza de la semana', 'Resumen de pagos pendientes y recordatorios…', 'Hace 2 h', 'c1'], ['Cotización para hotel', 'Paquete de clases para 12 huéspedes…', 'Hace 3 h', 'c2'], ['Facturas por emitir', 'Tres clientes esperan su CFDI de…', 'Ayer', 'c3']];
const dash = `<div class="pg mr-dash" data-rp="light"><div class="md-app">
<aside class="md-side"><div class="md-logo">${g}<b>marea</b></div><p>Menú principal</p><ul><li class="on">${svg('chat')}<span>Inicio</span></li>${nav.map(([k, t]) => `<li>${svg(k)}<span>${t}</span></li>`).join('')}</ul>
<div class="md-user"><i>S</i><div><b>Sofía Reyes</b><span>Administradora</span></div></div></aside>
<main class="md-main"><i class="md-star mw-f" style="--d:.2s"></i><h5 class="mw-f" style="--d:.4s">Bienvenida, Sofía.</h5><p class="md-sub mw-f" style="--d:.55s">¿En qué te ayudo hoy?</p>
<div class="md-cards mw-f" style="--d:.7s"><div>${svg('crm')}<b>Resumen de ventas</b></div><div>${svg('fis')}<b>Facturas por emitir</b></div><div>${svg('ia')}<b>Automatizar avisos</b></div></div>
<div class="md-in mw-f" style="--d:.9s"><p>${svg('ia')}Pregunta algo o escribe una instrucción…</p><div><span>${svg('clip')}Adjuntar</span><span>Opciones</span><i>${svg('up')}</i></div></div></main>
<aside class="md-hist mw-f" style="--d:.5s"><h6>Historial de chats</h6><div class="md-find">${svg('find')}Buscar…</div><ul>${hist.map(([t, d, h, c]) => `<li><b>${t}</b><span>${d}</span><div><i class="${c}"></i><em>${h}</em></div></li>`).join('')}</ul><div class="md-new">Crear nuevo chat</div></aside>
</div>${rp}</div>`;

// Dos hojas: [portada | sitio web] → [redes | panel]
export const mareaLeaves = (): { f: string; b: string }[] => [{ f: brand, b: web }, { f: soc, b: dash }];
export const mareaPieces = [
  { t: 'Identidad', h: brand },
  { t: 'Sitio web', h: web },
  { t: 'Redes sociales', h: soc },
  { t: 'Panel con IA', h: dash },
];
