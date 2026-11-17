// Proyecto «Estudio Aurora» (concepto): asistentes de IA y automatización. Portada cinematográfica y ficha, sin marcos: la fotografía va a sangre.
// Dos páginas del libro (40em × 26.7em); estilos en styles/aurora.css. Las entradas (.mw-f, .mw-w) se disparan al ver la hoja (clase .live).
const IMG = '/obra/p4.webp';
const hero = `<div class="pg au-hero" data-rp="dark"><img class="au-img" src="${IMG}" alt="" width="1500" height="1000" decoding="async"><i class="au-vig"></i><i class="au-grain"></i><i class="au-streak"></i>
<div class="au-top mw-f" style="--d:.2s"><span>Estudio Aurora</span><span>Contacto</span></div>
<div class="au-txt"><p class="au-k mw-f" style="--d:.5s">Asistentes y automatización</p><h4 class="au-h"><span class="mw-w" style="--d:.7s">Un asistente</span><span class="mw-w" style="--d:1s">que sí ayuda</span></h4>
<p class="au-s mw-f" style="--d:1.5s">Responde, da seguimiento y avisa al equipo, con supervisión humana.</p><span class="au-l mw-f" style="--d:1.8s">Ver proyecto</span></div>
<div class="au-tc mw-f" style="--d:1.2s"><span>Escena 04</span><i><b></b></i><span>2025</span></div><span class="bk-pn">13</span></div>`;
const st: [string, string][] = [['24/7', 'atención sin pausas'], ['< 1 min', 'tiempo de primera respuesta'], ['100 %', 'con supervisión humana']];
const det = `<div class="pg au-det" data-rp="dark"><img class="au-img au-img2" src="${IMG}" alt="" width="1500" height="1000" decoding="async"><i class="au-vig2"></i><i class="au-grain"></i>
<div class="au-top"><span>Estudio Aurora</span><span>Proyecto · 2025</span></div>
<div class="au-dt"><span class="au-no">04</span><h5>Estudio Aurora</h5><p class="au-k">Asistentes y automatización · 2025</p><p class="au-s">Responde, da seguimiento y avisa al equipo, con supervisión humana.</p>
<p class="au-tg">Agentes de IA<i></i>Flujos<i></i>Integraciones</p><div class="au-st">${st.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div></div><span class="bk-pn">14</span></div>`;
export const auroraLeaves = (): { f: string; b: string }[] => [{ f: hero, b: det }];
export const auroraPieces = [{ t: 'Portada', h: hero }, { t: 'Proyecto', h: det }];
