import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5116',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
