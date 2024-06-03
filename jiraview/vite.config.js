import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/rest/api': {
        target: `https://shaundaniel.atlassian.net`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest\/api/, '')
      },
    },
  },
  plugins: [react()],
})
