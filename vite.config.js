import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteFonts from 'unplugin-fonts/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Vuetify from 'vite-plugin-vuetify';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

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
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),
  ],
});