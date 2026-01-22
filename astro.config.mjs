import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import path from 'path';

export default defineConfig({
  integrations: [react()], 
  vite: {
    server: {
      allowedHosts: [
        'robbin-unmethodising-uninvitingly.ngrok-free.dev'
      ]
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@styles': path.resolve('./src/styles'),
        '@assets': path.resolve('./src/assets'),
      },
    },
  },
});
