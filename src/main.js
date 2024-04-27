// 引入 Vue 的 createApp 函数和 App 组件
import { createApp } from 'vue';
import App from './App.vue';

// 引入 Vuetify 的样式和功能
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// 创建 Vuetify 实例
const vuetify = createVuetify({
  components,
  directives,
});

// 引入 Element Plus
import ElementPlus from 'element-plus';

// 引入 Router
import Router from './router';

// 创建 Vue 应用，使用 Vuetify 和 Element Plus 插件，并挂载到 #app 元素
createApp(App).use(vuetify).use(ElementPlus).use(Router).mount('#app');
