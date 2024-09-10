import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 压缩静态资源, 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip', // gzip压缩
      ext: '.gz'
    })
  ],
  server: {
    open: true,
    host: '0.0.0.0',
    port: 8688
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  // vite 默认使用的是 esbuild 压缩，配置生产环境移除 console
  esbuild: {
    drop: ['console', 'debugger']
  }
})
