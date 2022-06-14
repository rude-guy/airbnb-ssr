import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vitePluginCompression from 'vite-plugin-compression'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginCompression()
    // AutoImport({
    //   resolvers: [ElementPlusResolver()]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/variable.scss";@import "@/assets/scss/main.scss";'
      }
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/release': {
        target: 'http://49.235.70.227:9001',
        rewrite: path => path.replace(/^\/release/, '')
      }
    }
  }
})
