import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 base: VITE_APP_ID || "/react-vite-weather-app",
})
