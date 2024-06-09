// 引入 Vue 的 createApp 函数和 App 组件
import { createApp } from 'vue';
import App from './App.vue';

// 引入 Vuetify 的样式和功能
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// 创建 Vuetify 实例
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // 设置使用 Material Design Icons
  },
});

// 引入 Element Plus
import ElementPlus from 'element-plus';

// 引入 Router
import Router from './router';

// 引入 Vue-Clerk
import { clerkPlugin } from 'vue-clerk/plugin'

// 引入 Arco
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Vuetify 插件
app.use(vuetify);

// 使用 Element Plus 插件
app.use(ElementPlus);

// 使用 Router 插件
app.use(Router);

// 使用 Vue-Clerk 插件
app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
})

app.use(ArcoVue);

// 挂载应用到 #app 元素
app.mount('#app');