// Traducciones: textos que generan los scripts de diagnóstico y asesoría contable.
export const P6: Record<string, string> = {
  'Tu marca tiene logotipo, colores y estilo definidos, y los usas de forma consistente.': 'Your brand has a defined logo, colors and style, and you use them consistently.', 'Tu sitio web está al día, se ve bien en celular y te llegan contactos.': 'Your website is up to date, looks good on mobile and brings you leads.',
  'Sabes de dónde llegan tus clientes nuevos y tienes un plan para atraerlos.': 'You know where your new clients come from and you have a plan to attract them.', 'Das seguimiento a cada prospecto en un solo lugar, no en notas sueltas.': 'You follow up on every lead in one place, not in scattered notes.',
  'Las tareas repetitivas (respuestas, recordatorios, reportes) ya están automatizadas.': 'Repetitive tasks (replies, reminders, reports) are already automated.', 'Sabes cuánto entra y sale cada mes, y tu información contable y fiscal está en orden.': 'You know how much comes in and goes out each month, and your accounting and tax information is in order.',
  'Tus facturas y comprobantes están organizados y los emites sin retrasos.': 'Your invoices and receipts are organized and you issue them without delays.', 'Tus procesos y responsabilidades están documentados y cualquiera puede darles seguimiento.': 'Your processes and responsibilities are documented and anyone can follow them.',
  'Tienes indicadores claros y tu información está respaldada y protegida.': 'You have clear indicators and your information is backed up and protected.', 'Tus herramientas (sitio, CRM, facturación, etc.) están conectadas entre sí.': 'Your tools (site, CRM, invoicing, etc.) are connected to each other.',
  'Por reforzar': 'Needs work', 'En camino': 'On the way', 'Sólido': 'Solid', 'Tus herramientas ya se hablan entre sí. Buen punto de partida.': 'Your tools already talk to each other. A good starting point.',
  'Tus herramientas se conectan en parte: ahí hay oportunidad de ahorrar tiempo.': 'Your tools connect only in part: there is an opportunity to save time there.', 'Tus herramientas trabajan por separado: conectarlas suele ser el mayor ahorro de tiempo.': 'Your tools work separately: connecting them is usually the biggest time saver.',
  'Paquete sugerido:': 'Suggested package:', 'Ver cómo lo resolvemos': 'See how we solve it', 'Ver cómo lo resolvemos →': 'See how we solve it →',
};
export const P6_RE: [RegExp, string][] = [
  [/^Pregunta (\d+) de (\d+)$/, 'Question $1 of $2'], [/^(\d+) marcadas?\.$/, '$1 selected.'], [/^Paquete sugerido: (.+)$/, 'Suggested package: $1'],
];
