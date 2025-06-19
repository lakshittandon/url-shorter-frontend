import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // anything that starts with /api will be forwarded to the backend
      '/api': {
        
        target: 'https://url-shorter-backend-qgfe.onrender.com'   // <-- backend host:port
        
      },
    },
  },
});