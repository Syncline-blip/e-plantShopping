import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/e-plantShopping/', // Base URL for GitHub Pages deployment
  plugins: [react()],
});
