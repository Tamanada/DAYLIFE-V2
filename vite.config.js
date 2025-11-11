import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configuration pour GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/DAYLIFE-V2/', // 👈 nom EXACT de ton dépôt GitHub
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
  },
})
