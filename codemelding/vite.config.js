import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
target: 'http://localhost:3000/',
secure: false,
      }
    },
    // host: '192.168.18.10',
    // port: 5173,
  
  },
  plugins: [react()],
})
