// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://elu-melu.github.io',
  redirects: {
    '/watching': '/log/',
  },
  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()]
  }
});
