import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteFonts from 'unplugin-fonts/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Vuetify from 'vite-plugin-vuetify';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Vuetify(),
    ViteFonts({
      google: {
        families: ['Roboto:100,300,400,500,700,900'],
      },
    }),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver(), ArcoResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), ArcoResolver({ sideEffect: true })],
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(js|css|woff2|woff|ttf|md)/, // js / css 静态资源缓存
            handler: "CacheFirst",
            options: {
              cacheName: "js-css-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
        ],
      }
    })  ],
  optimizeDeps: {
    include: ['gsap', 'gsap/MorphSVGPlugin', 'gsap/ScrollTrigger', 'gsap/MotionPathPlugin', 'gsap/PixiPlugin', 'gsap/SplitText'],
  },
  server: {
    port: "3000",
    open: true,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        pure_funcs: ["console.log"],
      },
    },
  },

});
