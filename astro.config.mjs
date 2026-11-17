import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// El CSS va dentro del HTML: no hay hoja externa que bloquee el primer pintado.
export default defineConfig({
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
