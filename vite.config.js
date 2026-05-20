import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  // Para rodar localmente: '/'
  // Para publicar no GitHub Pages: '/sistema-solar/'
  // Deixe '/' enquanto estiver desenvolvendo
  base: 'https://github.com/genilsuh/Sistema-solar.git',
})