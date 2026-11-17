// Diccionario español → inglés (texto exacto, sin espacios sobrantes). Lo usa scripts/i18n.ts.
// Cubre el menú, el inicio, contacto y «Agendar una llamada». Las demás páginas y las maquetas de ejemplo (paneles, buscador, redes) siguen en español.
import { P1 } from './en-p1';
import { P2 } from './en-p2';
import { P3 } from './en-p3';
import { P4 } from './en-p4';
import { P5 } from './en-p5';
import { P6, P6_RE } from './en-p6';
import { P7, P7_RE } from './en-p7';

const BASE: Record<string, string> = {
  'HumanCorp — Diseño, tecnología y operaciones empresariales': 'HumanCorp — Design, technology and business operations', 'Contacto — HumanCorp': 'Contact — HumanCorp',
  // menú y encabezado
  'Inicio': 'Home', 'Servicios': 'Services', 'Las 8 divisiones': 'The 8 divisions', 'Diseño e identidad': 'Design & identity', 'Desarrollo digital': 'Digital development',
  'Marketing y crecimiento': 'Marketing & growth', 'Ventas y CRM': 'Sales & CRM', 'IA y automatización': 'AI & automation', 'Finanzas, contable y fiscal': 'Finance, accounting & tax',
  'Operaciones y personas': 'Operations & people', 'Datos e infraestructura': 'Data & infrastructure', 'Ver todos los servicios →': 'See all services →', 'Herramientas': 'Tools',
  'Arma tu proyecto (beta)': 'Build your project (beta)', 'Personaliza un sitio y mira cómo se genera.': 'Customize a site and watch it get built.',
  'Diagnóstico gratis': 'Free diagnostic', '¿Qué tan conectada está tu empresa?': 'How connected is your company?', 'Recursos': 'Resources',
  'Listas prácticas para revisar tu negocio.': 'Practical checklists to review your business.', 'Obra': 'Work', 'Paquetes': 'Packages', 'Contable y fiscal': 'Accounting & tax',
  'Nosotros': 'About us', 'Contacto': 'Contact', 'Arma tu proyecto': 'Build your project', 'Cerrar': 'Close', 'Diagnóstico': 'Diagnostic', 'Agenda una llamada': 'Book a call',
  'Contáctanos': 'Contact us', 'Agendar una llamada': 'Book a call', 'Servicio contable y fiscal': 'Accounting and tax service', 'Abrir menú': 'Open menu', 'Buscar en el sitio': 'Search the site', 'Idioma': 'Language', 'Principal': 'Main',
  'Menú': 'Menu', 'Volver': 'Back', 'Pie': 'Footer', 'Idiomas y países': 'Languages and countries', 'Próximamente': 'Coming soon',
  // inicio: portada
  'Todo lo que hace funcionar a una empresa, conectado bajo un solo': 'Everything that keeps a company running, connected under a single', 'estándar': 'standard',
  'Conocer servicios': 'Explore services', 'HumanCorp:': 'HumanCorp:', 'Todo conectado.': 'Everything connected.', 'Bajo un solo': 'Under a single', 'estándar.': 'standard.',
  'Todo lo que hace funcionar a una empresa, bajo un mismo estándar.': 'Everything that keeps a company running, under one standard.',
  'Piezas sueltas de una empresa se convierten, una por una, en módulos conectados que forman un solo sistema': 'The loose pieces of a company turn, one by one, into connected modules that form a single system',
  // inicio: qué hacemos
  'Qué hacemos': 'What we do', 'Tu empresa, hoy': 'Your company, today', 'Branding e identidad digital': 'Branding & digital identity', 'Presencia digital': 'Digital presence',
  'Branding y redes sociales': 'Branding & social media', 'Finanzas, Asesoría Contable y Fiscal': 'Finance, Accounting & Tax Advisory', 'Operaciones': 'Operations', 'Un solo ecosistema': 'One ecosystem',
  'Finanzas': 'Finance', 'Calendario': 'Calendar',
  // inicio: cómo trabajamos
  'Cómo trabajamos': 'How we work', 'Contacto inicial': 'First contact', 'El cliente contacta a HumanCorp y recibe atención comercial.': 'The client contacts HumanCorp and receives commercial support.',
  'Atención comercial': 'Commercial support', 'Llamada de descubrimiento': 'Discovery call', 'Se agenda una llamada para conocer su empresa, necesidades y objetivos.': 'A call is scheduled to learn about their company, needs and goals.',
  'Jueves · 11:00': 'Thursday · 11:00', 'HumanCorp analiza su situación e identifica qué soluciones necesita.': 'HumanCorp analyzes their situation and identifies which solutions they need.',
  'Necesidades': 'Needs', 'Objetivos': 'Goals', 'Soluciones': 'Solutions', 'Diagnóstico y análisis': 'Diagnosis & analysis', 'Propuesta comercial': 'Commercial proposal',
  'Se presenta la solución, los servicios, entregables, tiempos y precios.': 'The solution is presented: services, deliverables, timelines and pricing.', 'Entregables': 'Deliverables', 'Tiempos': 'Timelines', 'Inversión total': 'Total investment',
  'Contratación y onboarding': 'Contracting & onboarding', 'Se negocian condiciones, se firma el contrato, se recibe el anticipo y se incorpora al cliente.': 'Terms are agreed, the contract is signed, the deposit is received and the client is onboarded.',
  'FIRMADO': 'SIGNED', 'Anticipo recibido': 'Deposit received', 'Planificación y ejecución': 'Planning & execution', 'Se organiza el proyecto y comienzan los trabajos de las áreas correspondientes.': 'The project is organized and the work begins in each relevant area.',
  'Diseño': 'Design', 'Desarrollo': 'Development', 'Marketing': 'Marketing', 'IA y datos': 'AI & data', 'En ejecución': 'In progress', 'Entrega y validación': 'Delivery & validation',
  'Se presentan los resultados, se realizan ajustes acordados y se entrega formalmente el proyecto.': 'Results are presented, agreed adjustments are made and the project is formally delivered.',
  'Resultados presentados': 'Results presented', 'Entrega formal': 'Formal delivery', 'Seguimiento y continuidad': 'Follow-up & continuity',
  'Se proporciona soporte, mantenimiento, seguimiento de resultados y posibles nuevos servicios.': 'Support, maintenance, results tracking and possible new services are provided.',
  'Mantenimiento': 'Maintenance', 'Resultados': 'Results', 'Nuevos servicios': 'New services', 'empresa': 'company', 'Tu': 'Your',
  // inicio: para quién trabajamos
  'Para quién trabajamos': 'Who we work with', 'Empresas de todos los tamaños': 'Companies of every size', 'Pequeñas empresas': 'Small businesses',
  'Necesitan construir una presencia profesional, captar clientes y organizar sus operaciones.': 'They need to build a professional presence, win clients and organize their operations.',
  'Empresas en crecimiento': 'Growing companies', 'Necesitan conectar sistemas, profesionalizar procesos, implementar CRM y automatizar actividades.': 'They need to connect systems, professionalize processes, implement a CRM and automate tasks.',
  'Empresas consolidadas': 'Established companies', 'Necesitan integrar departamentos, mejorar la gestión de información y modernizar infraestructura.': 'They need to integrate departments, improve information management and modernize infrastructure.',
  'Comercios y establecimientos': 'Shops & venues', 'Necesitan sitios web, catálogos, publicidad, sistemas de pedidos, inventarios y facturación.': 'They need websites, catalogs, advertising, ordering systems, inventory and invoicing.',
  'Servicios profesionales': 'Professional services', 'Necesitan identidad corporativa, presencia digital, gestión de clientes y cotizaciones.': 'They need corporate identity, digital presence, client management and quotes.',
  'Comercio electrónico': 'E-commerce', 'Necesitan tiendas digitales, marketing, gestión de pedidos y análisis de ventas.': 'They need online stores, marketing, order management and sales analytics.',
  'Procesos administrativos complejos': 'Complex administrative processes', 'Necesitan centralizar información, documentación, control operativo y seguimiento.': 'They need to centralize information, documentation, operational control and follow-up.',
  'Ver nuestros servicios': 'See our services',
  // inicio: preguntas frecuentes
  'Preguntas frecuentes': 'Frequently asked questions', 'Lo que suelen preguntarnos': 'What people usually ask us', '¿No ves tu duda? Escríbenos a': 'Can’t find your question? Write to us at',
  '¿Con qué tipo de empresas trabajan?': 'What kinds of companies do you work with?',
  'Con empresas de todos los tamaños: desde pequeñas y comercios hasta empresas consolidadas, servicios profesionales, comercio electrónico y organizaciones con procesos administrativos complejos.': 'Companies of every size: from small businesses and shops to established companies, professional services, e-commerce and organizations with complex administrative processes.',
  '¿Qué incluye trabajar con HumanCorp?': 'What does working with HumanCorp include?',
  'Diseño y producción creativa, desarrollo digital, marketing, ventas y CRM, finanzas y administración, operaciones y datos, e inteligencia artificial y automatización, bajo un mismo estándar y un solo equipo.': 'Design and creative production, digital development, marketing, sales and CRM, finance and administration, operations and data, and artificial intelligence and automation, under one standard and a single team.',
  '¿Cómo empezamos?': 'How do we start?',
  'Con un contacto inicial y una llamada de descubrimiento para conocer tu empresa, tus necesidades y tus objetivos. Después hacemos un diagnóstico y te presentamos una propuesta con servicios, entregables, tiempos y precios.': 'With a first contact and a discovery call to learn about your company, your needs and your goals. Then we run a diagnosis and present a proposal with services, deliverables, timelines and pricing.',
  '¿Cuánto tiempo toma un proyecto?': 'How long does a project take?', 'Depende del alcance. Los tiempos se definen por escrito en la propuesta comercial, antes de contratar.': 'It depends on the scope. Timelines are set in writing in the commercial proposal, before you hire us.',
  '¿Me ayudan también con la contabilidad y los temas fiscales?': 'Do you also help with accounting and tax matters?',
  'Sí. Nuestro Director de Administración y Finanzas es contador y, junto con su área, te brinda asesoría contable y fiscal y todo lo relacionado con lo contable, apoyado en la tecnología y la automatización que construimos. En temas jurídicos o de seguridad especializada trabajamos con profesionales aliados.': 'Yes. Our Director of Administration and Finance is an accountant and, together with the finance team, provides accounting and tax advice and everything related to accounting, supported by the technology and automation we build. For legal or specialized security matters we work with partner professionals.',
  '¿Garantizan resultados?': 'Do you guarantee results?', 'Trabajamos con claridad y calidad, y damos seguimiento a los resultados de cada proyecto, pero no prometemos resultados comerciales garantizados.': 'We work with clarity and quality and track the results of every project, but we do not promise guaranteed commercial results.',
  '¿Qué pasa después de la entrega?': 'What happens after delivery?', 'Hacemos una validación formal, aplicamos los ajustes acordados y seguimos contigo con soporte, mantenimiento y seguimiento de resultados, además de posibles nuevos servicios.': 'We run a formal validation, apply the agreed adjustments and stay with you with support, maintenance and results tracking, plus possible new services.',
  'Lo que suelen preguntarnos ': 'What people usually ask us',
  // pie
  'Términos de uso': 'Terms of use', 'Privacidad': 'Privacy', 'Privacidad y cookies': 'Privacy and cookies', '© 2026 Todos los derechos reservados. HumanCorp': '© 2026 All rights reserved. HumanCorp', 'Mérida, Yucatán, México': 'Mérida, Yucatán, Mexico', 'Mérida': 'Mérida', 'Teléfono': 'Phone', 'Correo': 'Email', 'Oficina': 'Office',
  // contacto
  'Hablemos de tu empresa': 'Let’s talk about your company',
  'Cuéntanos qué necesitas: diseño, tecnología, administración o asesoría contable y fiscal. Te respondemos para agendar una llamada de descubrimiento.': 'Tell us what you need: design, technology, administration or accounting and tax advice. We’ll reply to schedule a discovery call.',
  'o escríbenos un mensaje': 'or send us a message', 'Nombre completo': 'Full name', 'Empresa': 'Company', '(opcional)': '(optional)', 'Correo electrónico': 'Email address', '¿Qué te interesa?': 'What are you interested in?',
  'Puedes elegir varias.': 'You can choose several.', 'Asesoría contable y fiscal': 'Accounting & tax advisory', 'Aún no estoy seguro': 'I’m not sure yet', 'Mensaje': 'Message', 'Enviar mensaje': 'Send message',
  'Responderemos a tu correo.': 'We’ll reply to your email.', 'Tu nombre': 'Your name', 'Nombre de tu empresa': 'Your company name', 'tu@correo.com': 'you@email.com', 'Cuéntanos sobre tu empresa y qué necesitas': 'Tell us about your company and what you need',
  'Enviando…': 'Sending…', 'Gracias. Recibimos tu mensaje y te responderemos pronto.': 'Thank you. We received your message and will reply soon.',
  // agendar
  'Elige el tema, el día y la hora. Sin costo y sin compromiso.': 'Choose the topic, day and time. No cost, no commitment.', 'Mérida, Yucatán · Hora del centro de México (UTC−6)': 'Mérida, Yucatán · Central Mexico time (UTC−6)',
  'Continuar': 'Continue', 'Volver ': 'Back', '¿De qué quieres platicar?': 'What would you like to talk about?', 'Elige el tema. Después te confirmamos cómo prefieres la llamada.': 'Choose a topic. We’ll then confirm how you’d like to take the call.',
  'Llamada de descubrimiento ': 'Discovery call', 'Platicamos de tu empresa y de lo que necesitas.': 'We talk about your company and what you need.', 'Con nuestro Director de Administración y Finanzas.': 'With our Director of Administration and Finance.',
  'Diseño y sitio web': 'Design & website', 'Identidad, sitio, tienda en línea o galería.': 'Identity, site, online store or gallery.', 'Tecnología y automatización': 'Technology & automation', 'Procesos, paneles, asistentes y sistemas.': 'Processes, dashboards, assistants and systems.',
  'Elige día y hora': 'Choose a day and time', 'Horarios': 'Times', 'Elige un día para ver los horarios disponibles.': 'Choose a day to see the available times.', 'Ya no quedan horarios este día. Prueba con otra fecha.': 'No times left on this day. Try another date.',
  'Mes anterior': 'Previous month', 'Mes siguiente': 'Next month', '¿A nombre de quién la agendamos?': 'Who should we book it for?', 'Solo usamos tus datos para esta llamada.': 'We only use your details for this call.',
  'Teléfono ': 'Phone', 'Nombre': 'Name', '¿Algo que quieras adelantarnos?': 'Anything you’d like to tell us in advance?', 'Cuéntanos en una línea de qué trata tu empresa o qué necesitas': 'Tell us in one line what your company does or what you need',
  'Revisa y confirma': 'Review and confirm', 'Si algo no es correcto, cámbialo antes de confirmar.': 'If something isn’t right, change it before confirming.', 'Tema': 'Topic', 'Duración': 'Duration', 'Fecha': 'Date', 'Hora': 'Time', 'Fecha y hora': 'Date and time', 'Cambiar': 'Change',
  'aviso de privacidad': 'privacy notice', 'Acepto el': 'I accept the', 'y que HumanCorp use estos datos para agendar y dar seguimiento a esta llamada.': 'and that HumanCorp may use these details to schedule and follow up on this call.', 'Confirmar llamada': 'Confirm call', 'Confirmando…': 'Confirming…', 'Agregar a Google Calendar': 'Add to Google Calendar', 'Descargar .ics': 'Download .ics', 'Atrás': 'Back',
  'Elige un tema para continuar.': 'Choose a topic to continue.', 'Elige una hora.': 'Choose a time.', 'Elige un día disponible.': 'Choose an available day.', 'Acepta el aviso de privacidad para confirmar.': 'Accept the privacy notice to confirm.',
  'Escribe tu nombre, un correo válido y, si lo pones, un teléfono completo.': 'Enter your name, a valid email and, if you add one, a full phone number.',
  'Horario de Mérida (UTC−6), igual al de tu zona.': 'Mérida time (UTC−6), same as your time zone.', 'Horario de Mérida (UTC−6); debajo, la hora en tu zona.': 'Mérida time (UTC−6); your local time is shown below.',
};

export const EN: Record<string, string> = { ...P4, ...P3, ...P2, ...P1, ...P5, ...P6, ...P7, ...BASE };

// Frases con partes variables (nombre, fechas, números).
export const EN_RE: [RegExp, string][] = [
  ...P6_RE, ...P7_RE,
  [/^Listo, (.+)\. Tu llamada está agendada\.$/, 'All set, $1. Your call is booked.'],
  [/^Folio (.+)$/, 'Reference $1'],
  [/^(\d+) minutos$/, '$1 minutes'], [/^(\d+) min$/, '$1 min'],
  [/^Te enviaremos la confirmación y los detalles de la llamada a (.+)\.$/, 'We’ll send the confirmation and call details to $1.'],
  [/^(\d+) minutos\. Atendemos de lunes a viernes de 9:00 a 18:00 y los sábados de 10:00 a 14:00\.$/, '$1 minutes. We’re available Monday to Friday from 9:00 AM to 6:00 PM and Saturdays from 10:00 AM to 2:00 PM.'],
  [/^Paso (\d+) \/ (\d+)$/i, 'Step $1 / $2'], [/^PASO (\d+) \/ (\d+)$/, 'STEP $1 / $2'], [/^(\d+) ítems$/, '$1 items'], [/^(\d+) sem\.$/, '$1 wks.'],
];
