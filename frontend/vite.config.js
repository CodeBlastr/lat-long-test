import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,  // Ensure this is the port exposed in Dockerfile
    strictPort: true,  // Ensures Vite doesn't try to pick another port if the specified one is busy
    host: true,  // Listens on all network interfaces
    watch: {
      usePolling: true
    }
  }
});
