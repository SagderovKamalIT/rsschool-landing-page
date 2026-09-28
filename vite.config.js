import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/rsschool-landing-page/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu-coffee.html'),
      },
    },
  },
});
