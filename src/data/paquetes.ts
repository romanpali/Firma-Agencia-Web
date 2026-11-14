// Datos compartidos de paquetes (usados en /paquetes y /servicios).
import { packages, divisions } from './servicios';

export type Pk = { t: string; d: string; divs: string[]; items: string[]; g: [string, string, string]; mark: string; code: string; kind: string; href: string };

// Para quién es cada paquete y qué divisiones toca.
export const meta: [string, string[]][] = [
  ['Para marcas que nacen o necesitan renovarse y verse profesionales en todos lados.', ['01']],
  ['Para quien necesita producir imágenes, video y contenido de forma constante.', ['01']],
  ['Para negocios que quieren un sitio que se vea bien, se encuentre y reciba contactos.', ['02']],
  ['Para quien quiere atraer clientes de forma ordenada y medir lo que funciona.', ['03', '04']],
  ['Para equipos que quieren dar seguimiento a cada prospecto y cotizar sin perder tiempo.', ['04']],
  ['Para empresas con tareas repetitivas que quieren automatizar con supervisión.', ['05']],
  ['Para negocios que necesitan orden en facturación, flujo de caja y su información contable y fiscal.', ['06']],
  ['Para organizaciones que quieren procesos, proyectos, inventarios y equipos más claros.', ['07']],
];
// Emblemas (64x64) de los paquetes.
export const marks: string[] = [
  '<rect x="10" y="22" width="30" height="30" rx="6"/><circle cx="42" cy="26" r="16"/>',
  '<path d="M32 8l12 30H20z"/><path d="M26 46h12M29 52h6"/><circle cx="32" cy="26" r="4"/>',
  '<path d="M10 52V40M24 52V30M38 52V20M52 52V10"/><path d="M10 34l14-10 14-8 14-8"/><path d="M44 8h8v8"/>',
  '<rect x="12" y="24" width="40" height="30" rx="5"/><path d="M22 24v-4a10 10 0 0 1 20 0v4"/><path d="M24 36h16"/>',
  '<circle cx="24" cy="26" r="14"/><circle cx="40" cy="26" r="14"/><circle cx="32" cy="40" r="14"/>',
  '<path d="M22 20L8 32l14 12M42 20l14 12-14 12M36 14L28 50"/>',
  '<path d="M32 6l22 13v26L32 58 10 45V19z"/><circle cx="32" cy="32" r="6"/><path d="M32 6v20M54 19L37 29M10 19l17 10"/>',
  '<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="12"/><path d="M32 20v24M26 26h9a4 4 0 0 1 0 8h-9"/>',
  '<circle cx="14" cy="14" r="5"/><circle cx="50" cy="14" r="5"/><circle cx="14" cy="50" r="5"/><circle cx="50" cy="50" r="5"/><path d="M19 14h26M19 50h26M14 19v26M50 19v26M17 17l30 30M47 17L17 47"/>',
  '<circle cx="32" cy="32" r="5"/><circle cx="32" cy="8" r="3"/><circle cx="49" cy="15" r="3"/><circle cx="56" cy="32" r="3"/><circle cx="49" cy="49" r="3"/><circle cx="32" cy="56" r="3"/><circle cx="15" cy="49" r="3"/><circle cx="8" cy="32" r="3"/><circle cx="15" cy="15" r="3"/><path d="M32 11v16M47 17L36 28M53 32H37M47 47L36 36M32 53V37M17 47l11-11M11 32h16M17 17l11 11"/>',
];

export const combos: { t: string; d: string; divs: string[]; items: string[]; g: [string, string, string] }[] = [
  { t: 'Marca y sitio', d: 'Una identidad clara y un sitio profesional para empezar con buen pie.', divs: ['01', '02'], items: ['Identidad y manual de marca', 'Sitio web a la medida', 'SEO base y formularios'], g: ['#5b7bff', '#9a7bff', '#e9a6ff'] },
  { t: 'Lanzamiento', d: 'Marca, sitio y primeras campañas para presentarte al mercado.', divs: ['01', '02', '03'], items: ['Identidad y sitio web', 'Estrategia y campañas iniciales', 'Contenido para redes'], g: ['#ff8a6b', '#ff6f9c', '#b46bff'] },
  { t: 'Crecimiento comercial', d: 'Atrae clientes y dales seguimiento sin perder ninguno.', divs: ['02', '03', '04'], items: ['Sitio con captación de contactos', 'Publicidad y analítica', 'CRM y cotizaciones'], g: ['#19b6a6', '#3b82f6', '#7c5cff'] },
  { t: 'Venta en línea', d: 'Tienda, promoción y facturación conectadas.', divs: ['02', '03', '06'], items: ['Tienda en línea', 'Campañas y contenido de producto', 'Facturación electrónica (CFDI)'], g: ['#f59e0b', '#ef4f7a', '#8b5cf6'] },
  { t: 'Creativo completo', d: 'Todo lo visual y de comunicación bajo una misma dirección.', divs: ['01', '03'], items: ['Identidad y dirección de arte', 'Producción de imagen y video', 'Marketing y redes sociales'], g: ['#ec4899', '#a855f7', '#6366f1'] },
  { t: 'Técnico completo', d: 'Desarrollo, automatización e infraestructura, listos para operar.', divs: ['02', '05', '08'], items: ['Sitio o aplicación a la medida', 'Asistentes y automatizaciones', 'Datos, respaldo e infraestructura'], g: ['#0ea5e9', '#2563eb', '#4f46e5'] },
  { t: 'Operación inteligente', d: 'Procesos claros y tareas repetitivas automatizadas con supervisión.', divs: ['04', '05', '07'], items: ['CRM y seguimiento', 'Flujos y asistentes', 'Procesos, proyectos e inventarios'], g: ['#22c55e', '#14b8a6', '#3b82f6'] },
  { t: 'Orden financiero', d: 'Información contable, fiscal y operativa ordenada en un solo lugar.', divs: ['06', '07', '08'], items: ['Asesoría contable y fiscal', 'Facturación, flujo de caja y reportes', 'Tableros y respaldo de información'], g: ['#6d5dfc', '#4338ca', '#0ea5e9'] },
  { t: 'Empresa conectada', d: 'Marca, sitio, ventas y administración trabajando como un solo equipo.', divs: ['01', '02', '04', '06'], items: ['Identidad y sitio web', 'CRM y automatización de ventas', 'Facturación y asesoría contable y fiscal'], g: ['#f97316', '#e11d8f', '#6d28d9'] },
  { t: 'Ecosistema HumanCorp', d: 'Todas las divisiones conectadas bajo un solo estándar, con un plan de implementación a tu medida.', divs: ['01', '02', '03', '04', '05', '06', '07', '08'], items: ['Diseño, desarrollo y marketing', 'Ventas, IA y automatización', 'Finanzas, operaciones y datos'], g: ['#1d4ed8', '#7c3aed', '#db2777'] },
];

export const name = (n: string) => divisions.find((d) => d.n === n)!.short;
export const quote = (t: string) => `/contacto?interes=${encodeURIComponent('Paquete: ' + t)}&mensaje=${encodeURIComponent('Hola, me interesa el paquete «' + t + '». Me gustaría recibir una propuesta a mi medida.')}`;
export const pk = (t: string, d: string, divs: string[], items: string[], g: [string, string, string], mark: number, code: string, kind: string): Pk => ({ t, d, divs: divs.map(name), items, g, mark: marks[mark], code, kind, href: quote(t) });
export const palette: Record<string, [string, string, string]> = { creativa: ['#c026d3', '#7c3aed', '#3730a3'], tecnica: ['#0ea5e9', '#2563eb', '#3730a3'], contable: ['#059669', '#0f766e', '#1e3a8a'] };
export const area = (i: number, cat: string, code: string, mk: number) => pk(packages[i][0], meta[i][0], meta[i][1], packages[i][1].split('|'), palette[cat], mk, code, 'Paquete por área');
