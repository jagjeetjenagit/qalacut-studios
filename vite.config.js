import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/qalacut-studios/ in production,
// but from root during local dev.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/qalacut-studios/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}))
