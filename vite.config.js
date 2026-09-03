import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: './',
  publicDir: false,
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/app.js'),
      name: 'UnionJack',
      formats: ['es'],
      fileName: () => 'app.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
})
