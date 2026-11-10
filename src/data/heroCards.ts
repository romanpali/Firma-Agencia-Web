// Hero ribbon: each card has a "design" face (light world) and a "system" face (dark world).
const dots = '<span class="flex gap-1"><i class="size-1.5 rounded-full bg-[#111]/20"></i><i class="size-1.5 rounded-full bg-[#111]/20"></i><i class="size-1.5 rounded-full bg-[#111]/20"></i></span>';
const dk = 'size-full bg-[#0d1b3d] p-3 text-white';
const mono = 'font-mono text-[8px] uppercase tracking-wider';

export const designCards: string[] = [
  // brand mark
  `<div class="size-full bg-[#0b1a4a] p-3 text-white flex flex-col justify-between"><span class="relative size-9 rounded-full border border-white/80"><i class="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-white"></i></span><span class="text-[12px] tracking-wide"><b class="font-light">HUMAN</b> <b>CORP</b></span></div>`,
  // type specimen
  `<div class="size-full grid place-items-center bg-[#ff5b1f]"><span class="font-serif text-[92px] leading-none text-[#f4f1ea]">Aa</span></div>`,
  // palette
  `<div class="size-full flex"><i class="flex-1 bg-[#0b1a4a]"></i><i class="flex-1 bg-[#1d4bb8]"></i><i class="flex-1 bg-[#e9e8e4]"></i><i class="flex-1 bg-[#ff5b1f]"></i></div>`,
  // editorial
  `<div class="size-full bg-[#f4f1ea] p-3 flex flex-col justify-end"><span class="font-serif text-[48px] italic leading-none text-[#111]">Marca</span><i class="mt-2 h-px bg-[#111]/40"></i></div>`,
  // gradient poster
  `<div class="size-full p-3 flex items-end text-white" style="background:radial-gradient(80% 90% at 20% 15%,#5cb0ff,#1d4bb8 55%,#0b1a4a)"><span class="text-[24px] font-medium tracking-tight">Identidad</span></div>`,
  // web wireframe
  `<div class="size-full bg-white p-3">${dots}<div class="mt-3 h-3 w-4/5 rounded bg-[#111]"></div><div class="mt-1.5 h-3 w-3/5 rounded bg-[#111]"></div><div class="mt-3 h-1.5 w-full rounded bg-[#111]/15"></div><div class="mt-1 h-1.5 w-5/6 rounded bg-[#111]/15"></div><div class="mt-3 h-5 w-16 rounded-full bg-[#ff5b1f]"></div></div>`,
  // glyph
  `<div class="size-full grid place-items-center bg-[#111]"><span class="font-serif text-[88px] leading-none text-white">Gg</span></div>`,
  // label
  `<div class="size-full bg-[#1d4bb8] p-3 text-white flex flex-col justify-between"><span class="${mono}">Sistema visual</span><span class="font-serif text-[42px] leading-[0.9]">Marca<br>01</span></div>`,
];

export const systemCards: string[] = [
  // CRM contact
  `<div class="${dk}"><div class="flex items-center gap-2"><i class="size-8 rounded-full bg-[#4f8cff]"></i><div><i class="block h-2 w-20 rounded bg-white/80"></i><i class="mt-1 block h-1.5 w-12 rounded bg-white/30"></i></div></div><div class="mt-3 flex gap-1.5"><span class="${mono} rounded-full bg-[#4f8cff]/20 px-2 py-0.5 text-[#8db4ff]">Cliente</span><span class="${mono} rounded-full bg-[#4ade80]/15 px-2 py-0.5 text-[#4ade80]">Activo</span></div><i class="mt-3 block h-1.5 w-full rounded bg-white/15"></i><i class="mt-1.5 block h-1.5 w-4/5 rounded bg-white/15"></i></div>`,
  // invoice
  `<div class="${dk}"><span class="${mono} text-[#8db4ff]">CFDI 4.0 · borrador</span><i class="mt-3 block h-1.5 w-full rounded bg-white/20"></i><i class="mt-1.5 block h-1.5 w-5/6 rounded bg-white/20"></i><i class="mt-1.5 block h-1.5 w-2/3 rounded bg-white/20"></i><div class="mt-3 flex items-center justify-between"><i class="block h-3 w-14 rounded bg-white/80"></i><span class="${mono} rounded-full bg-[#ff8a4c]/20 px-2 py-0.5 text-[#ff8a4c]">Revisión</span></div></div>`,
  // chart
  `<div class="${dk}"><span class="${mono} text-white/60">Flujo de caja</span><svg viewBox="0 0 170 80" class="mt-1 h-[84px] w-full"><path d="M0 62 C20 58 30 36 55 40 S95 18 120 22 S150 8 170 4" fill="none" stroke="#4f8cff" stroke-width="2"/><path d="M0 70 C25 66 50 60 80 62 S130 52 170 48" fill="none" stroke="#ffffff55" stroke-width="1.5"/></svg></div>`,
  // workflow
  `<div class="${dk}"><span class="${mono} text-white/60">Flujo</span><div class="mt-4 flex items-center"><i class="size-6 rounded-md border border-[#4f8cff] bg-[#4f8cff]/20"></i><i class="h-px flex-1 bg-white/30"></i><i class="size-6 rounded-md border border-white/40"></i><i class="h-px flex-1 bg-white/30"></i><i class="size-6 rounded-md border border-[#4ade80] bg-[#4ade80]/20"></i></div><div class="mt-3 flex justify-between ${mono} text-white/50"><span>CRM</span><span>IA</span><span>Factura</span></div></div>`,
  // code
  `<div class="${dk} font-mono text-[9px] leading-[1.55]"><div><span class="text-[#ff8a4c]">const</span> flujo = {</div><div class="pl-3">ventas: <span class="text-[#4ade80]">'crm'</span>,</div><div class="pl-3">factura: <span class="text-[#4ade80]">'cfdi'</span>,</div><div class="pl-3">datos: <span class="text-[#8db4ff]">dashboard</span></div><div>}</div></div>`,
  // kanban
  `<div class="${dk}"><div class="flex gap-1.5"><div class="flex-1 space-y-1.5"><i class="block h-1.5 w-8 rounded bg-white/40"></i><i class="block h-7 rounded bg-white/15"></i><i class="block h-7 rounded bg-white/15"></i></div><div class="flex-1 space-y-1.5"><i class="block h-1.5 w-8 rounded bg-[#4f8cff]"></i><i class="block h-7 rounded bg-[#4f8cff]/25"></i></div><div class="flex-1 space-y-1.5"><i class="block h-1.5 w-8 rounded bg-[#4ade80]"></i><i class="block h-7 rounded bg-[#4ade80]/20"></i><i class="block h-7 rounded bg-[#4ade80]/20"></i></div></div></div>`,
  // AI agent
  `<div class="${dk}"><div class="flex items-center gap-1.5"><i class="size-2 rounded-full bg-[#4ade80]"></i><span class="${mono} text-white/60">Agente IA</span></div><i class="mt-3 block h-6 w-4/5 rounded-lg rounded-tl-none bg-white/15"></i><i class="mt-1.5 ml-auto block h-6 w-3/5 rounded-lg rounded-tr-none bg-[#4f8cff]"></i><i class="mt-1.5 block h-3 w-2/5 rounded-lg bg-white/15"></i></div>`,
  // tasks
  `<div class="${dk}"><span class="${mono} text-white/60">Operación</span><div class="mt-3 space-y-2"><div class="flex items-center gap-2"><i class="size-3 rounded-[3px] bg-[#4ade80]"></i><i class="h-1.5 w-20 rounded bg-white/40"></i></div><div class="flex items-center gap-2"><i class="size-3 rounded-[3px] bg-[#4ade80]"></i><i class="h-1.5 w-14 rounded bg-white/40"></i></div><div class="flex items-center gap-2"><i class="size-3 rounded-[3px] border border-white/40"></i><i class="h-1.5 w-24 rounded bg-white/25"></i></div></div></div>`,
];
