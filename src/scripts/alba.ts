// Proyecto propio «Alba» (concepto): identidad, sitio web, redes sociales y dashboard. Todo es HTML/CSS (nítido a cualquier tamaño).
// Cada pieza es una página del libro (40em × 26.7em). Los estilos viven en styles/alba.css. Sin ids ni filtros: se clona en las franjas curvas.

const ico: Record<string, string> = {
  crm: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5"/><path d="M16 5.5a3 3 0 0 1 0 5.6M18 14.4c1.7.7 2.7 2.2 3 4.6"/>',
  fin: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M9.4 9.6c.6-1 1.6-1.4 2.6-1.4 1.6 0 2.6.8 2.6 1.9 0 2.6-5.2 1.3-5.2 3.9 0 1.1 1.1 1.9 2.6 1.9 1.1 0 2-.5 2.6-1.4"/>',
  fis: '<path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z"/><path d="M14 3.5v4h4M9.5 12h5M9.5 15h5M9.5 18h3"/>',
  ops: '<rect x="3.5" y="3.5" width="6" height="6" rx="1.4"/><rect x="14.5" y="14.5" width="6" height="6" rx="1.4"/><path d="M9.5 6.5h5.5a3 3 0 0 1 3 3V14.5"/>',
  dat: '<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8V6M4.5 12v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-6"/>',
  ia: '<path d="M12 3.5l1.9 5.2 5.2 1.9-5.2 1.9L12 17.7l-1.9-5.2L4.9 10.6l5.2-1.9z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
};
const svg = (k: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[k]}</svg>`;
const rp = '<div class="rp-s"></div>';
const glyph = '<span class="al-glyph"></span>';

// Datos de ejemplo del dashboard (línea y área).
const pts = [28, 34, 31, 42, 39, 52, 48, 61, 57, 70, 66, 78];
const line = pts.map((v, i) => `${(i * 300) / (pts.length - 1)},${90 - v}`).join(' ');

const brand = `<div class="pg al-brand" data-rp="dark"><i class="al-mesh"></i><i class="al-grain"></i>
<div class="al-bt"><span>Manual de marca</span><span>2026 · v1.0</span></div>
<div class="al-wm">${glyph}<b>alba</b></div>
<p class="al-tag">Inteligencia que amanece contigo</p>
<div class="al-bb"><span>Identidad visual</span><span>Logotipo · Color · Tipografía</span></div>${rp}</div>`;

const web = `<div class="pg al-web" data-rp="light">
<div class="aw-bar"><b>${glyph}alba</b><nav><span>Producto</span><span>Cómo funciona</span><span>Precios</span></nav><i>Descargar</i></div>
<i class="aw-orb"></i>
<div class="aw-hero"><p class="aw-k">Asistente personal con IA</p><h4>Empieza tu día<br>con claridad.</h4><p class="aw-s">Alba ordena tu agenda, resume tus mensajes y te avisa solo de lo importante.</p><div class="aw-cta"><i>Probar Alba</i><span>Ver cómo funciona →</span></div></div>
<div class="aw-phone"><div class="aw-scr"><i class="aw-mesh"></i><p class="aw-hi">Buenos días</p><div class="aw-b"><small>Hoy</small><b>3 reuniones</b><span>La primera, a las 10:00</span></div><div class="aw-b"><small>Mensajes</small><b>Resumen listo</b><span>24 mensajes, 2 requieren respuesta</span></div><div class="aw-b aw-ok"><small>Alba</small><b>Todo en orden</b></div></div></div>
${rp}</div>`;

const soc = `<div class="pg al-soc" data-rp="dark">
<div class="as-head"><i class="as-av">${glyph}</i><div><b>@alba.app</b><span>Asistente personal con IA</span></div><em>Redes sociales</em></div>
<div class="as-grid">
<div class="as-a"><i class="al-mesh"></i><i class="al-grain"></i><div class="as-wm">${glyph}<b>alba</b></div><p>Buenos días,<br>mundo.</p></div>
<div class="as-b"><p>Menos ruido.</p></div>
<div class="as-c"><p>Más claridad.</p></div>
<div class="as-d"><span>Lanzamiento</span><b>Conoce a Alba</b><p>Tu asistente para empezar el día sabiendo qué sigue.</p><i></i></div>
</div>${rp}</div>`;

const nav: [string, string][] = [['crm', 'Ventas y CRM'], ['fin', 'Finanzas'], ['fis', 'Asesoría Contable y Fiscal'], ['ops', 'Operaciones'], ['dat', 'Datos e Infraestructura'], ['ia', 'IA y Automatización']];
const dash = `<div class="pg al-dash" data-rp="dark">
<aside class="ad-side"><div class="ad-logo">${glyph}<b>alba</b></div><p>Divisiones</p><ul>${nav.map(([k, t], i) => `<li${i === 0 ? ' class="on"' : ''}>${svg(k)}<span>${t}</span></li>`).join('')}</ul></aside>
<div class="ad-main">
<div class="ad-top"><h5>Ventas y CRM</h5><em>Datos de ejemplo</em></div>
<div class="ad-kpis"><div><small>Prospectos activos</small><b>128</b><i>+12 esta semana</i></div><div><small>Cotizaciones abiertas</small><b>34</b><i>6 por vencer</i></div><div><small>Tasa de cierre</small><b>27 %</b><i>Últimos 30 días</i></div></div>
<div class="ad-chart"><div class="ad-ct"><span>Ingresos proyectados</span><small>12 semanas</small></div><svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22H300M0 45H300M0 68H300" stroke="rgba(255,255,255,.07)" stroke-width=".6" fill="none"/><polygon points="0,90 ${line} 300,90" fill="rgba(122,108,255,.2)"/><polyline points="${line}" fill="none" stroke="#9b8fff" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg></div>
<ul class="ad-list"><li><b>Casa Lumbre</b><span>Cotización enviada</span><i>Hoy</i></li><li><b>Grupo Ceiba</b><span>Reunión de seguimiento</span><i>Mañana</i></li><li><b>Taller 33</b><span>Propuesta en revisión</span><i>Jue</i></li></ul>
</div>${rp}</div>`;

// Dos hojas: [portada | sitio web] → [redes | dashboard]
export const albaLeaves = (): { f: string; b: string }[] => [{ f: brand, b: web }, { f: soc, b: dash }];
export const albaPieces = [
  { t: 'Identidad', h: brand },
  { t: 'Sitio web', h: web },
  { t: 'Redes sociales', h: soc },
  { t: 'Dashboard', h: dash },
];
