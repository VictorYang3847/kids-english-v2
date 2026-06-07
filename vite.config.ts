import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from 'vite-plugin-singlefile';

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
    react(),
    tsconfigPaths(),
    viteSingleFile(),
  ],
})
