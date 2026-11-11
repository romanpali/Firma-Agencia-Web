// The eight areas, told as film chapters. `scene` is the generative backdrop (a photo in public/photos/<slug>.jpg replaces it).
export interface Area {
  slug: string;
  title: string;
  statement: string;
  description: string;
  scene: string;
}

export const areas: Area[] = [
  {
    slug: 'diseno',
    title: 'Diseño y producción creativa',
    statement: 'Diseñamos la identidad, las piezas y la producción creativa que dan a tu empresa una sola cara.',
    description: 'Identidad de marca, diseño gráfico, audiovisual y fotografía para que tu empresa se vea y se comunique con claridad.',
    scene: 'diseno',
  },
  {
    slug: 'desarrollo',
    title: 'Desarrollo digital',
    statement: 'Construimos sitios, tiendas y plataformas que informan, venden y trabajan todo el día.',
    description: 'Diseño y desarrollo web, comercio electrónico, aplicaciones y posicionamiento en buscadores.',
    scene: 'desarrollo',
  },
  {
    slug: 'marketing',
    title: 'Marketing y crecimiento',
    statement: 'Ordenamos la estrategia, la publicidad y las redes para atraer clientes de forma medible.',
    description: 'Estrategia de marketing, publicidad digital, gestión de redes sociales y correo.',
    scene: 'marketing',
  },
  {
    slug: 'ventas',
    title: 'Ventas y CRM',
    statement: 'Damos estructura a cada relación comercial para que ningún seguimiento se pierda.',
    description: 'Gestión de prospectos, sistemas CRM, automatización de ventas y propuestas.',
    scene: 'ventas',
  },
  {
    slug: 'ia',
    title: 'IA y automatización',
    statement: 'Incorporamos inteligencia artificial y automatización donde reducen trabajo manual y ordenan la información.',
    description: 'Agentes de IA, automatización de procesos, asistentes internos e integraciones.',
    scene: 'ia',
  },
  {
    slug: 'finanzas',
    title: 'Finanzas y administración',
    statement: 'Organizamos finanzas, facturación y administración con tecnología, junto a tus contadores y asesores.',
    description: 'Facturación electrónica CFDI 4.0, gestión administrativa y apoyo para organizar la información financiera.',
    scene: 'finanzas',
  },
  {
    slug: 'operaciones',
    title: 'Operaciones y capital humano',
    statement: 'Estructuramos procesos, proyectos, inventarios y equipos para que la operación fluya.',
    description: 'Gestión de operaciones y proyectos, inventarios y compras, recursos humanos y estructura organizacional.',
    scene: 'operaciones',
  },
  {
    slug: 'datos',
    title: 'Datos, infraestructura y seguridad',
    statement: 'Conectamos datos, infraestructura y seguridad para decidir con mejor información.',
    description: 'Inteligencia de negocios, integración de datos, infraestructura tecnológica y seguridad informática.',
    scene: 'datos',
  },
];
