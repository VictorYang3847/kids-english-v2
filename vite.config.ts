import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: './',
  server: {
    hmr: {
      overlay: false,
    },
  },
  build: {
    sourcemap: false,
  },
  plugins: [
    react({
      babel: {
        plugins: ['react-dev-locator'],
      },
    }),
    tsconfigPaths(),
    viteSingleFile(),
    {
      name: 'strip-module',
      closeBundle() {
        const htmlPath = path.resolve('dist/index.html');
        if (fs.existsSync(htmlPath)) {
          let html = fs.readFileSync(htmlPath, 'utf-8');
          html = html.replace(/\s*crossorigin/g, '');
          html = html.replace(/type="module"/g, 'defer');
          fs.writeFileSync(htmlPath, html);
        }
      },
    },
  ],
})
