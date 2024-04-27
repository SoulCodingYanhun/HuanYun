import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteFonts from 'unplugin-fonts/vite'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Vuetify(),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数
        ElementPlusResolver(),
      ],
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
      // 您可以在这里为组件指定自定义前缀，以避免潜在的命名冲突
      dts: true,
    }),
  ],
  // 您可以添加其他 Vite 配置选项，如 CSS 预处理器、CDN 链接等
});
