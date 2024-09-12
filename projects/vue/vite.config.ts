import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
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
    host: true,
    open: true,
    port: 8688,
    proxy: {
      '/api': {
        target: '127.0.0.1:3000'
      }
    }
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
