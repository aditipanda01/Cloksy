import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No need to import '@tailwindcss/vite' anymore
export default defineConfig({
  plugins: [react()],
})
