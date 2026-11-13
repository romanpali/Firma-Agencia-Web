// Contenido de /servicios (fuente: docs/nexa-concepto.md, con la marca HumanCorp).
// Cada área lista sus servicios separados por "|".
type Area = [title: string, items: string];
export type Division = { n: string; title: string; short: string; intro: string; goal: string; note?: string; areas: Area[] };

export const divisions: Division[] = [
  {
    n: '01', title: 'Diseño, identidad y producción creativa', short: 'Diseño e identidad',
    intro: 'Construimos y mantenemos la identidad visual y comunicativa de una empresa, desde el concepto de marca hasta el material gráfico, fotográfico y audiovisual.',
    goal: 'Una identidad visual y comunicativa coherente en todos los puntos de contacto de la empresa.',
    areas: [
      ['Branding e identidad corporativa', 'Creación de marcas desde cero|Rediseño de identidad corporativa|Diseño y rediseño de logotipos|Sistemas de identidad visual|Manuales de marca|Paletas cromáticas|Sistemas tipográficos|Dirección de arte|Naming y exploración de nombres|Papelería corporativa|Tarjetas de presentación|Firmas de correo|Plantillas institucionales|Presentaciones corporativas|Sistemas gráficos para sucursales|Aplicaciones de marca en productos'],
      ['Diseño gráfico y comunicación visual', 'Publicaciones para redes sociales|Banners digitales|Flyers y carteles|Folletos y brochures|Catálogos comerciales|Infografías|Presentaciones ejecutivas|Dossiers corporativos|Menús y cartas|Diseño editorial|Empaques y etiquetas|Diseño de promociones|Gráficos para eventos|Comunicación interna'],
      ['Edición, retoque y transformación de imágenes', 'Retoque fotográfico profesional|Restauración de fotografías|Corrección de iluminación y color|Eliminación y sustitución de fondos|Composición y fotomontaje|Mejora y ampliación de resolución|Adaptación de formatos|Imágenes publicitarias|Recursos visuales generados con IA|Mockups de productos|Optimización de imágenes para web y publicidad'],
      ['Producción y edición audiovisual', 'Videos corporativos e institucionales|Videos promocionales y publicitarios|Reels, Shorts y TikToks|Edición profesional de video|Corrección de color|Motion graphics|Animación 2D|Animación de logotipos|Videos explicativos y tutoriales|Videos testimoniales|Subtítulos y traducción|Locución y doblaje|Producción audiovisual asistida por IA|Adaptación a plataformas y formatos'],
      ['Fotografía comercial y corporativa', 'Fotografía de productos|Fotografía corporativa|Retratos profesionales|Fotografía de instalaciones y establecimientos|Fotografía gastronómica|Fotografía publicitaria|Fotografía del equipo de trabajo|Dirección de sesiones|Edición y selección|Bancos de imágenes empresariales'],
      ['Diseño digital y experiencias interactivas', 'Diseño UI/UX|Diseño de interfaces|Diseño de dashboards|Diseño de aplicaciones|Experiencias web|Prototipos interactivos|Wireframes|Sistemas de diseño|Componentes digitales|Animaciones y microinteracciones|Presentaciones interactivas'],
      ['Dirección creativa y campañas', 'Conceptualización de campañas|Dirección creativa y de arte|Conceptos publicitarios|Creatividades para Meta Ads|Creatividades para Google Ads|Variantes gráficas y audiovisuales|Pruebas A/B de materiales|Campañas de lanzamiento|Campañas promocionales y de posicionamiento|Adaptación a diferentes medios'],
      ['Contenido y comunicación de marca', 'Copywriting|Textos institucionales|Contenido web|Guiones audiovisuales|Storytelling de marca|Calendarios editoriales|Newsletters|Comunicados empresariales|Contenido comercial y educativo|Mensajes y tono de comunicación'],
    ],
  },
  {
    n: '02', title: 'Desarrollo digital y presencia en internet', short: 'Desarrollo digital',
    intro: 'Desarrollamos los espacios y productos digitales con los que una empresa presenta sus servicios, vende sus productos e interactúa con sus clientes.',
    goal: 'Una presencia digital sólida, funcional y preparada para generar oportunidades comerciales.',
    areas: [
      ['Diseño y desarrollo web', 'Sitios corporativos e institucionales|Landing pages|Sitios comerciales|Sitios para profesionales|Portafolios digitales|Sitios para establecimientos|Páginas de servicios|Micrositios para campañas|Rediseño de sitios existentes|Desarrollo web personalizado|Diseño responsive|Optimización de experiencia de usuario|Formularios y sistemas de contacto|Integraciones con CRM y herramientas externas|Mantenimiento y actualización'],
      ['Comercio electrónico', 'Tiendas en línea|Catálogos digitales|Productos y variantes|Carritos de compra|Integraciones de pago|Gestión de pedidos|Confirmaciones automatizadas|Seguimiento de compras|Integración con inventarios|Optimización del proceso de compra'],
      ['Aplicaciones y plataformas', 'Aplicaciones web|Portales privados para clientes|Portales empresariales|Paneles administrativos|Plataformas internas|Herramientas de gestión|Sistemas personalizados|Aplicaciones para procesos específicos|Prototipos de productos digitales|Integración de APIs'],
      ['Experiencia digital y optimización', 'Auditorías UX/UI|Optimización de navegación|Arquitectura de información|Optimización de conversiones|Accesibilidad digital|Optimización de rendimiento|Optimización de contenido|Experiencias interactivas|Analítica de comportamiento'],
      ['SEO y posicionamiento orgánico', 'Auditorías SEO|SEO técnico|SEO on-page|Investigación de palabras clave|Optimización de metadatos|Estructuración de contenido|SEO local|Optimización de páginas de servicios|Datos estructurados|Seguimiento de posicionamiento'],
    ],
  },
  {
    n: '03', title: 'Marketing, publicidad y crecimiento comercial', short: 'Marketing y crecimiento',
    intro: 'Atraemos oportunidades y desarrollamos estrategias de adquisición para mejorar la capacidad de una empresa de llegar a su mercado.',
    goal: 'Sistemas sostenibles de visibilidad, adquisición y crecimiento comercial.',
    areas: [
      ['Estrategia de marketing', 'Diagnóstico de presencia digital|Investigación de mercado|Públicos objetivo|Segmentación de clientes|Posicionamiento comercial|Estrategia de comunicación|Estrategias de adquisición|Planes de marketing|Estrategias de lanzamiento|Planificación de campañas'],
      ['Publicidad digital', 'Meta Ads, Facebook e Instagram Ads|Google Ads|Campañas de búsqueda|Campañas de display|Campañas de remarketing|Generación de prospectos|Publicidad para comercio electrónico|Configuración de conversiones|Seguimiento de campañas|Optimización de inversión publicitaria'],
      ['Gestión de redes sociales', 'Configuración de perfiles comerciales|Administración de cuentas|Planeación de contenido|Calendarios de publicación|Diseño de publicaciones|Producción de contenido|Programación de publicaciones|Gestión de mensajes|Moderación de comentarios|Análisis de rendimiento|Informes de actividad|Crecimiento orgánico'],
      ['Adquisición de clientes', 'Sistemas de generación de leads|Embudos de adquisición|Landing pages comerciales|Formularios inteligentes|Automatización de captación|Integración de campañas con CRM|Seguimiento de prospectos|Remarketing|Optimización de conversión|Pruebas de propuestas comerciales'],
      ['Email marketing', 'Campañas de correo|Newsletters|Automatizaciones de bienvenida|Seguimiento comercial|Campañas de recuperación|Segmentación de contactos|Secuencias de comunicación|Reportes de rendimiento'],
    ],
  },
  {
    n: '04', title: 'Ventas, CRM y relaciones con clientes', short: 'Ventas y CRM',
    intro: 'Organizamos el proceso comercial desde que aparece un prospecto hasta que se convierte en cliente y mantiene una relación con la empresa.',
    goal: 'Relaciones comerciales organizadas y un seguimiento de clientes estructurado y medible.',
    areas: [
      ['Gestión de prospectos', 'Captura de prospectos|Centralización de contactos|Clasificación de oportunidades|Segmentación comercial|Asignación de responsables|Seguimiento automatizado|Historial de interacciones|Priorización de oportunidades'],
      ['Sistemas CRM', 'Implementación de CRM|Configuración de pipelines|Etapas comerciales|Automatización de tareas|Seguimiento de oportunidades|Gestión de clientes|Reportes comerciales|Integración con sitios web y formularios|Integración con correo electrónico|Integración con mensajería, cuando la plataforma lo permita'],
      ['Automatización de ventas', 'Respuestas iniciales automatizadas|Distribución de prospectos|Recordatorios comerciales|Seguimiento de cotizaciones|Notificaciones internas|Automatización de propuestas|Secuencias de seguimiento|Recuperación de oportunidades|Automatización de renovaciones'],
      ['Cotizaciones y propuestas', 'Generación de cotizaciones|Plantillas comerciales|Propuestas personalizadas|Presentaciones comerciales|Documentos de contratación|Seguimiento de propuestas|Registro de aceptación|Integración con facturación'],
      ['Experiencia y fidelización', 'Portales de clientes|Sistemas de atención|Seguimiento posventa|Encuestas de satisfacción|Programas de fidelización|Gestión de incidencias|Recordatorios automatizados|Renovaciones y continuidad comercial'],
    ],
  },
  {
    n: '05', title: 'Inteligencia artificial y automatización empresarial', short: 'IA y automatización',
    intro: 'Incorporamos inteligencia artificial y automatización en las actividades de la empresa para reducir trabajo manual y facilitar la ejecución de procesos.',
    goal: 'Inteligencia artificial en procesos empresariales reales, con supervisión, controles y criterios de utilidad.',
    areas: [
      ['Agentes de inteligencia artificial', 'Agentes de atención al cliente|Agentes de ventas|Asistentes administrativos|Asistentes de investigación|Agentes internos para empleados|Asistentes de consulta documental|Agentes de soporte|Agentes especializados por departamento|Asistentes de gestión empresarial'],
      ['Automatización de procesos', 'Tareas repetitivas|Formularios|Correos|Notificaciones|Documentos|Seguimiento comercial|Reportes|Flujos administrativos|Integración de sistemas mediante APIs y herramientas de automatización'],
      ['Procesamiento inteligente de información', 'Extracción de información de documentos|Clasificación documental|Procesamiento de formularios|Organización de archivos|Resumen de información|Análisis de documentos|Búsqueda inteligente|Clasificación de solicitudes|Generación asistida de informes'],
      ['Asistentes empresariales internos', 'Bases de conocimiento|Asistentes para manuales internos|Consulta de procedimientos|Asistencia para equipos comerciales|Asistencia administrativa|Asistencia para recursos humanos|Consulta de políticas|Asistentes para capacitación'],
      ['Integraciones inteligentes', 'IA con CRM|Plataformas de administración|Sistemas financieros|Herramientas de comunicación|Bases de datos|Plataformas de comercio electrónico|Conexión entre aplicaciones'],
      ['IA aplicada al contenido', 'Generación asistida de contenido|Borradores comerciales|Generación de imágenes|Edición audiovisual asistida|Generación de guiones|Asistencia para campañas|Materiales de comunicación'],
      ['Gobernanza y seguridad de IA', 'Definición de permisos|Control de acceso a información|Supervisión humana|Registro de actividades|Evaluación de resultados|Protección de información sensible|Restricciones de uso|Políticas de utilización de IA'],
    ],
  },
  {
    n: '06', title: 'Finanzas, administración y cumplimiento', short: 'Finanzas y contabilidad',
    intro: 'Organizamos y automatizamos tus procesos administrativos y financieros, y te asesoramos en lo contable y fiscal.',
    goal: 'Procesos ordenados y asesoría contable y fiscal de nuestro equipo.',
    note: 'La asesoría contable y fiscal está a cargo de nuestro contador, Director de Administración y Finanzas.',
    areas: [
      ['Estructura financiera automatizada', 'Control de ingresos|Registro de egresos|Cuentas por cobrar|Cuentas por pagar|Gestión de flujo de caja|Seguimiento de pagos|Control de movimientos|Clasificación de gastos|Control presupuestario|Proyecciones financieras|Reportes de liquidez'],
      ['Facturación electrónica y CFDI 4.0', 'Sistemas de facturación|Automatización de generación de CFDI|Datos de clientes|Organización de comprobantes|Clasificación de facturas|Gestión documental|Seguimiento de facturas emitidas|Control de pagos relacionados|Integración con sistemas administrativos|Organización de información fiscal'],
      ['Gestión administrativa', 'Automatización de procesos administrativos|Digitalización de documentos|Control de gastos|Gestión de proveedores|Órdenes de compra|Organización de expedientes|Control de pagos|Sistemas de autorización|Reportes administrativos'],
      ['CFO tecnológico', 'Dashboards financieros|Indicadores de liquidez|Análisis de ingresos y egresos|Seguimiento de márgenes|Reportes de rentabilidad|Proyecciones|Alertas financieras|Control de presupuestos|Visualización de obligaciones y compromisos'],
      ['Cumplimiento y organización fiscal', 'Organización de documentación fiscal|Seguimiento de obligaciones|Recordatorios de fechas|Clasificación de comprobantes|Integración con sistemas contables|Reportes administrativos|Preparación de documentación para revisión profesional'],
      ['Asesoría contable y fiscal', 'Asesoría contable|Asesoría fiscal en general|Orientación sobre obligaciones fiscales|Revisión de la información contable|Acompañamiento con tu información financiera|Coordinación con tu equipo y tus sistemas|Todo lo relacionado con lo contable'],
    ],
  },
  {
    n: '07', title: 'Operaciones, gestión empresarial y capital humano', short: 'Operaciones y personas',
    intro: 'Mejoramos el funcionamiento interno de las organizaciones estructurando procesos, recursos, equipos y actividades.',
    goal: 'Procesos internos más claros, coordinados, medibles y eficientes.',
    areas: [
      ['Gestión de operaciones', 'Diagnóstico de procesos|Documentación de procedimientos|Optimización de flujos de trabajo|Automatización operativa|Diseño de procesos internos|Gestión de solicitudes|Sistemas de aprobación|Seguimiento de actividades|Indicadores operativos|Estandarización de procedimientos'],
      ['Gestión de proyectos', 'Herramientas de gestión|Planeación de proyectos|Asignación de responsables|Seguimiento de tareas|Control de fechas|Gestión de entregables|Reportes de avance|Recordatorios automatizados|Seguimiento de productividad'],
      ['Inventarios y compras', 'Control de inventario|Registro de existencias|Alertas de stock|Entradas y salidas|Gestión de proveedores|Órdenes de compra|Seguimiento de abastecimiento|Automatización de solicitudes|Reportes de inventario'],
      ['Capital humano y recursos humanos', 'Reclutamiento y candidatos|Expedientes|Onboarding de empleados|Documentación laboral|Control de asistencia|Vacaciones y permisos|Seguimiento de capacitaciones|Evaluación de desempeño|Encuestas internas|Comunicación organizacional|Automatización de procesos de RR. HH.'],
      ['Organización y estructura empresarial', 'Organigramas|Documentación de responsabilidades|Manuales de procedimientos|Comunicación interna|Gestión de políticas|Estandarización de procesos|Indicadores de desempeño|Sistemas de control organizacional'],
    ],
  },
  {
    n: '08', title: 'Datos, infraestructura y seguridad tecnológica', short: 'Datos e infraestructura',
    intro: 'Aportamos los elementos técnicos para conectar, almacenar, administrar, analizar y proteger la información de la empresa.',
    goal: 'Que la información y los sistemas de la empresa funcionen de forma integrada, confiable y segura.',
    areas: [
      ['Inteligencia de negocios', 'Dashboards ejecutivos|Dashboards financieros, comerciales y operativos|Indicadores clave (KPI)|Visualización de datos|Reportes automatizados|Análisis de tendencias|Comparación de periodos|Centralización de indicadores'],
      ['Integración y arquitectura de datos', 'Integración de bases de datos|Conexión de plataformas|Centralización de información|Sincronización de sistemas|Diseño de estructuras de datos|Automatización de extracción|Procesamiento de datos|Organización de fuentes empresariales'],
      ['Infraestructura tecnológica', 'Servicios cloud|Administración de servidores|Bases de datos|Despliegue de aplicaciones|Gestión de dominios|Servicios empresariales|Integración de APIs|Monitoreo técnico|Mantenimiento de infraestructura|Optimización de recursos'],
      ['Seguridad informática', 'Auditorías técnicas iniciales|Gestión de permisos|Control de acceso|Autenticación y autorización|Configuración de respaldos|Monitoreo de sistemas|Gestión de vulnerabilidades|Protección de información|Políticas de seguridad|Planes de recuperación|Registro y revisión de actividades'],
      ['Continuidad tecnológica', 'Respaldos automatizados|Recuperación de información|Monitoreo de disponibilidad|Planes de contingencia|Gestión de incidentes|Documentación técnica|Mantenimiento preventivo|Evaluación de infraestructura'],
    ],
  },
];

export const chain = ['Campaña', 'Landing page', 'CRM', 'Agente de seguimiento', 'Proceso administrativo', 'Información financiera', 'Dashboard ejecutivo'];

export const osModules: [string, string][] = [
  ['Panel de negocio', 'Ventas, prospectos, ingresos, egresos, flujo de caja, facturas, proyectos, tareas e inventarios en un solo lugar.'],
  ['CRM central', 'Contactos, clientes, oportunidades, historial comercial, cotizaciones y automatizaciones.'],
  ['Centro financiero', 'Ingresos, egresos, facturación, cuentas por cobrar y por pagar, presupuestos y reportes.'],
  ['Centro de operaciones', 'Proyectos, actividades, equipo, responsabilidades, inventarios, proveedores y procesos internos.'],
  ['Espacio de IA', 'Agentes y asistentes internos, consulta de documentos, notificaciones y generación de reportes.'],
  ['Capa de integración', 'Conexiones entre aplicaciones, sincronización de información, APIs, permisos y registro de operaciones.'],
];

export const ways: [string, string][] = [
  ['Proyectos individuales', 'Para resolver una necesidad concreta: una identidad, un sitio web, un video, un CRM, una automatización de facturación, un agente de IA o un dashboard.'],
  ['Soluciones integrales', 'Paquetes que combinan varias divisiones y trabajan como un solo sistema.'],
  ['Servicios recurrentes', 'Mantenimiento web, infraestructura, campañas, contenido, redes sociales, monitoreo de automatizaciones, soporte, CRM, reportes y optimización continua.'],
  ['Consultoría e implementación', 'Evaluación, identificación de oportunidades, diseño de la solución, implementación, capacitación y seguimiento.'],
];

export const packages: [string, string][] = [
  ['Identidad de marca', 'Branding|Identidad visual|Manual de marca|Papelería|Fotografía corporativa|Material gráfico'],
  ['Estudio creativo', 'Diseño gráfico|Edición de imágenes|Producción audiovisual|Motion graphics|Fotografía comercial|Contenido publicitario'],
  ['Presencia digital', 'Sitio web|Landing pages|SEO|UI/UX|Formularios|Integraciones comerciales'],
  ['Sistema de crecimiento', 'Estrategia de marketing|Meta Ads|Google Ads|Embudos comerciales|Captación de prospectos|CRM|Analítica de campañas'],
  ['Sistema de ventas', 'CRM|Automatización comercial|Cotizaciones|Seguimiento|Gestión de oportunidades|Reportes de ventas'],
  ['IA y automatización', 'Agentes de IA|Automatización|Integraciones|Asistentes empresariales|Procesamiento documental'],
  ['Operaciones financieras', 'Facturación|Flujo de caja|Control administrativo|Reportes|Automatización financiera|Organización documental'],
  ['Operaciones empresariales', 'Gestión de proyectos|Procesos internos|Inventarios|Proveedores|Capital humano|Indicadores operativos'],
];
