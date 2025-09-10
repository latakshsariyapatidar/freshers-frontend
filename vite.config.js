import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy all API requests to the EC2 backend server
      '/api': {
        target: 'https://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com',
        changeOrigin: true,
        secure: false, // Set to false since you're using self-signed/invalid SSL cert
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
      // Proxy Socket.IO requests to avoid CORS
      '/socket.io': {
        target: 'https://ec2-51-21-192-129.eu-north-1.compute.amazonaws.com',
        changeOrigin: true,
        secure: false, // Set to false since you're using self-signed/invalid SSL cert
        ws: true, // Enable WebSocket proxying
      }
    }
  }
})
