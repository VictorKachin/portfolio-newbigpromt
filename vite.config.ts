import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { patchCssModules } from 'vite-css-modules'

export default defineConfig({
  plugins: [
    react(),
    patchCssModules({
      generateSourceTypes: true,
    }),
  ],
  resolve: {
    alias: {
     '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: (content, filename) => {
          const ignored = ['_variables.scss', '_mixins.scss', '_index.scss']
          if (ignored.some((file) => filename.endsWith(file))) {
            return content
          }
          return `@use "@/styles" as *;\n${content}`
        },
      },
    },
  },
})
