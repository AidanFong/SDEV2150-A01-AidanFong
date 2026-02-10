import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// I've installed tailwind; now I need to integrate it with vite
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // and call it as a plugin for vite runtime
    tailwindcss(),
  ],
});
