import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import path from 'path';

export default defineConfig({
  output: "static",

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
