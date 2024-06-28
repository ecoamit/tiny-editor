import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  base: '', // relative paths
  server: {
    port: 3000,
  },
  plugins: [react()],
  test: {
    environment: 'happy-dom',
  },
  optimizeDeps: {
    include: ['draft-js-import-html']
  },
  build: {
    rollupOptions: {
      external: ['draft-js-import-html']
    }
  },
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      'draft-js-import-html': require.resolve('draft-js-import-html'),
      '@': '/path/to/your/src',
    },
  },
}));
