import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// Arco Design
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

// Custom CSS
import '@/css/markdown.css';

// Router
import Router from './router';

// Vue-Clerk
import { clerkPlugin } from 'vue-clerk/plugin'

// Vuetify 配置
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#FFFFFF',
          surface: '#FAFAFA',
          'on-background': '#000000',
          'on-surface': '#000000',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#121212',
          surface: '#212121',
          'on-background': '#FFFFFF',
          'on-surface': '#FFFFFF',
        },
      },
    },
    options: {
      customProperties: true,
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 5,
        darken: 5,
      },
    },
  },
});

// 创建 Vue 应用实例
const app = createApp(App);

// 使用插件
app.use(vuetify);
app.use(ElementPlus);
app.use(ArcoVue);
app.use(Router);
app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
});

// 挂载应用
app.mount('#app');

// 主题管理
const themeManager = {
  setTheme(theme) {
    vuetify.theme.global.name.value = theme;
    document.body.setAttribute('arco-theme', theme);
    document.documentElement.className = theme === 'dark' ? 'dark' : '';
  },
  toggleTheme() {
    const currentTheme = vuetify.theme.global.name.value;
    this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }
};

// 将主题管理器暴露给全局，以便在组件中使用
app.config.globalProperties.$themeManager = themeManager;