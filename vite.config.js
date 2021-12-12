import {defineConfig} from 'vite'
import {injectHtml} from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    // html-webpack-plugin -> vite-plugin-html
    // 在 CRA 中使用 html-webpack-plugin 調整 HTML 文件，
    // vite 可以透過 vite-plugin-html 調整 HTML 文件
    injectHtml({
      data: {
        htmlWebpackPlugin: {
          options: {
            mayVar: 'variable',
          },
        },
      },
    }),
  ],

  //  webpack.alias -> resolve.alias
  // CRA 中 alias 在 webpack 下，vite 在 resolve 下
  resolve: {
    alias: [
      {find: '@', replacement: path.resolve(__dirname, 'src')},
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '')
        },
      },
    ],
  },

  server: {
    host: '0.0.0.0',
    https: false,
    port: 8888,
  },

  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },

  build: {
    // 把輸出路徑設定成跟 CRA 相同的 `build/`
    outDir: 'build',
  },
})
