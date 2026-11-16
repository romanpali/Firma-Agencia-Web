// Íconos y piezas comunes del proyecto «Marea» (compartidos por el panel, la ficha del proyecto y el sitio web).
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
  phone: '<path d="M5.5 4h3.2l1.6 4-2 1.3a10 10 0 0 0 5.4 5.4l1.3-2 4 1.6v3.2A1.8 1.8 0 0 1 17.2 19 12.7 12.7 0 0 1 5 6.8 1.8 1.8 0 0 1 5.5 4z"/>',
  share: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r=".6"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5s-1.3 6.1-3.9 8.5c-2.6-2.4-3.9-5.2-3.9-8.5S9.400 5.900 12 3.500z"/>',
  bag: '<path d="M5.5 8.5h13l-1 11h-11z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
  brush: '<path d="M4 20c1.8 0 3-1 3.400-2.600.3-1.200 1.300-2 2.400-2l.6-.1-1.800-1.800.1-.6c.2-1 1-1.900 2.100-2.200L19 4.500l.5.500-4.700 8.400c-.3 1.100-1.200 1.900-2.200 2.100l-.6.1.2.600c0 1.100-.8 2.100-2 2.400C8.700 19.300 6.500 20 4 20z"/>',
  expand: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
  star: '<path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.900-5.200-2.800-5.200 2.800 1-5.900-4.300-4.100 5.900-.8z"/>',
  check: '<path d="M5 12.500l4.500 4.500L19 7.500"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  panel: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M14.5 4.5v15"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};
export const svg = (k: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[k]}</svg>`;
export const g = '<span class="mr-glyph"></span>';
