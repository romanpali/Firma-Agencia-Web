export type IconName =
  | 'pen' | 'code' | 'chart' | 'users' | 'bot' | 'coins'
  | 'gear' | 'shield' | 'layers' | 'cart' | 'mail' | 'camera';

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  items: { label: string; icon: IconName }[];
  silk: [string, string, string]; // violet accent, light blue, deep blue
}

export const services: Service[] = [
  {
    slug: 'diseno',
    title: 'Diseño y producción creativa',
    description: 'Identidad, diseño gráfico, audiovisual y fotografía para que tu marca se vea y se comunique con claridad.',
    icon: 'pen',
    items: [
      { label: 'Branding e identidad', icon: 'pen' },
      { label: 'Producción audiovisual', icon: 'camera' },
      { label: 'Experiencias interactivas', icon: 'layers' },
    ],
    silk: ['#5b4bb0', '#2f5fd0', '#12308a'],
  },
  {
    slug: 'desarrollo',
    title: 'Desarrollo digital',
    description: 'Sitios web, tiendas en línea y plataformas pensadas para atraer, informar y vender.',
    icon: 'code',
    items: [
      { label: 'Diseño y desarrollo web', icon: 'code' },
      { label: 'Comercio electrónico', icon: 'cart' },
      { label: 'SEO y posicionamiento', icon: 'chart' },
    ],
    silk: ['#2f6fe0', '#4b5fc4', '#0f2a7a'],
  },
  {
    slug: 'marketing',
    title: 'Marketing y crecimiento',
    description: 'Estrategia, publicidad, redes y correo para atraer clientes de forma ordenada y medible.',
    icon: 'chart',
    items: [
      { label: 'Publicidad digital', icon: 'chart' },
      { label: 'Gestión de redes sociales', icon: 'users' },
      { label: 'Email marketing', icon: 'mail' },
    ],
    silk: ['#6a52b8', '#2a58c8', '#14338f'],
  },
  {
    slug: 'ventas',
    title: 'Ventas y CRM',
    description: 'Seguimiento de prospectos, CRM y propuestas para que cada relación comercial tenga continuidad.',
    icon: 'users',
    items: [
      { label: 'Sistemas CRM', icon: 'users' },
      { label: 'Automatización de ventas', icon: 'gear' },
      { label: 'Cotizaciones y propuestas', icon: 'layers' },
    ],
    silk: ['#3a6ad6', '#5547b0', '#10297c'],
  },
  {
    slug: 'ia',
    title: 'IA y automatización',
    description: 'Agentes de inteligencia artificial y automatización para reducir trabajo manual y ordenar la información.',
    icon: 'bot',
    items: [
      { label: 'Agentes de IA', icon: 'bot' },
      { label: 'Automatización de procesos', icon: 'gear' },
      { label: 'Asistentes internos', icon: 'bot' },
    ],
    silk: ['#4f46c4', '#2b66e0', '#0d2674'],
  },
  {
    slug: 'finanzas',
    title: 'Finanzas y administración',
    description: 'Tecnología para organizar finanzas, facturación y administración, junto a profesionales fiscales y contables.',
    icon: 'coins',
    items: [
      { label: 'Facturación electrónica CFDI 4.0', icon: 'coins' },
      { label: 'CFO tecnológico', icon: 'chart' },
      { label: 'Gestión administrativa', icon: 'layers' },
    ],
    silk: ['#2a5cc8', '#6350b4', '#142f86'],
  },
  {
    slug: 'operaciones',
    title: 'Operaciones y capital humano',
    description: 'Procesos, proyectos, inventarios y equipos mejor estructurados para que la operación fluya.',
    icon: 'gear',
    items: [
      { label: 'Gestión de proyectos', icon: 'layers' },
      { label: 'Inventarios y compras', icon: 'cart' },
      { label: 'Recursos humanos', icon: 'users' },
    ],
    silk: ['#3568d8', '#4a4fc0', '#0f2b80'],
  },
  {
    slug: 'datos',
    title: 'Datos, infraestructura y seguridad',
    description: 'Tableros, integración de datos, infraestructura y seguridad para decidir con mejor información.',
    icon: 'shield',
    items: [
      { label: 'Inteligencia de negocios', icon: 'chart' },
      { label: 'Infraestructura tecnológica', icon: 'layers' },
      { label: 'Seguridad informática', icon: 'shield' },
    ],
    silk: ['#5a4cb8', '#1f56c8', '#0e2470'],
  },
];

export const principles = [
  { title: 'Integración', text: 'Conectar herramientas, departamentos, procesos e información.' },
  { title: 'Diseño', text: 'Construir experiencias, identidades y productos digitales profesionales.' },
  { title: 'Automatización', text: 'Reducir tareas repetitivas y mejorar los flujos de trabajo.' },
  { title: 'Inteligencia', text: 'Convertir información empresarial en indicadores y conocimiento útil.' },
  { title: 'Optimización', text: 'Mejorar progresivamente cómo una empresa trabaja, administra y crece.' },
];
