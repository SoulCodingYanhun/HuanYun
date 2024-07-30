<template>
  <a-layout :class="{ 'dark-theme': isDarkTheme }">
    <a-layout-header class="header" :class="{ 'mobile-header': isMobile }">
      <div class="logo">
        <h4 class="text-gradient">幻云科技</h4>
      </div>
      <a-menu
          :mode="isMobile ? 'vertical' : 'horizontal'"
          :style="isMobile ? {} : { lineHeight: '44px' }"
          v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item key="home" @click="navigateTo('/')">首页</a-menu-item>
        <a-menu-item key="about" @click="navigateTo('/about')">关于我们</a-menu-item>
        <a-menu-item key="services" @click="navigateTo('/services')">服务</a-menu-item>
        <a-menu-item key="contact" @click="navigateTo('/contact')">联系我们</a-menu-item>
      </a-menu>
      <div class="header-right">
        <a-button class="theme-toggle" shape="circle" @click="toggleTheme">
          <template #icon>
            <icon-sun v-if="isDarkTheme" />
            <icon-moon v-else />
          </template>
        </a-button>
        <template v-if="!isLoggedIn">
          <a-dropdown trigger="hover">
            <a-button type="primary" shape="round" class="login-button">
              登录/注册
            </a-button>
            <template #content>
              <a-doption @click="navigateTo('/login')">登入账号</a-doption>
              <a-doption @click="navigateTo('/register')">注册账号</a-doption>
            </template>
          </a-dropdown>
        </template>
        <template v-else>
          <a-dropdown trigger="hover">
            <a-avatar icon="user">
              <img alt="avater" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </a-avatar>
            <template #content>
              <a-doption @click="navigateTo('/profile')">个人中心</a-doption>
              <a-doption @click="logout">退出登录</a-doption>
            </template>
          </a-dropdown>
        </template>
      </div>
    </a-layout-header>
    <a-layout-content :class="{ 'dark-content': isDarkTheme }">
      <div :class="{ 'dark-view': isDarkTheme }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer :class="{ 'dark-footer': isDarkTheme }"></a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { IconSun, IconMoon } from '@arco-design/web-vue/es/icon';
import { Message } from "@arco-design/web-vue";
import { useTheme as useVuetifyTheme } from 'vuetify'

const vuetifyTheme = useVuetifyTheme()

const selectedKeys = ref(['home']);
const isLoggedIn = ref(false);
const isMobile = ref(false);
const router = useRouter()
const route = useRoute()

const navigateTo = (path) => {
  router.push(path)
}

const updateSelectedKeys = (path) => {
  if (path === '/profile') {
    selectedKeys.value = [];
  } else {
    const key = path === '/' ? 'home' : path.slice(1);
    selectedKeys.value = [key];
  }
}

watch(() => route.path, (newPath) => {
  updateSelectedKeys(newPath);
  checkLoginStatus();
})

const isDarkTheme = ref(false);

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  updateTheme();
};

const updateTheme = () => {
  // Arco Design
  document.body.setAttribute('arco-theme', isDarkTheme.value ? 'dark' : 'light');

  // Element Plus
  document.documentElement.classList.toggle('dark', isDarkTheme.value);

  // Vuetify
  vuetifyTheme.global.name.value = isDarkTheme.value ? 'dark' : 'light'

  // 保存主题设置到 localStorage
  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDarkTheme.value = savedTheme === 'dark';
  updateTheme();
  checkLoginStatus();
  checkMobile();
  updateSelectedKeys(route.path);
  window.addEventListener('resize', checkMobile);
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
})

const checkLoginStatus = () => {
  // 获取所有 cookie
  const cookies = document.cookie.split(';');
  // 查找名为 'login' 的 cookie
  const loginCookie = cookies.find(cookie => cookie.trim().startsWith('login='));
  if (loginCookie) {
    // 如果找到 login cookie，检查它的值是否为 'true'
    isLoggedIn.value = loginCookie.split('=')[1].trim() === 'true';
  } else {
    isLoggedIn.value = false;
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const logout = () => {
  // 实现登出逻辑
  document.cookie = 'login=false; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  isLoggedIn.value = false;

  // 删除整个 IndexedDB 数据库
  const deleteRequest = indexedDB.deleteDatabase('UserDB');

  deleteRequest.onerror = (event) => {
    console.error("Error deleting database:", event.target.error);
    Message.error('退出登录时出现错误，请稍后再试');
  };

  deleteRequest.onsuccess = (event) => {
    navigateTo('/');
    Message.success('已成功退出登录');
  };

  deleteRequest.onblocked = (event) => {
    console.warn("Database deletion was blocked");
    // Message.warning('退出登录被阻止，请关闭所有相关标签页后重试');
  };
}
</script>

<style scoped>
.theme-toggle {
  margin-right: 16px;
}

.header {
  display: flex;
  align-items: center;
  padding: 0 50px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  height: 100%;
}

.logo {
  width: 140px;
}

.logo h4 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.text-gradient {
  background: linear-gradient(to right, #eb7df7, #00d5ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ant-menu {
  flex: 1;
  border-bottom: none;
  line-height: 62px;
}

.header-right {
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
  margin-right: 16px;
}

.login-button {
  white-space: nowrap;
}

.ant-menu-horizontal > .ant-menu-item::after,
.ant-menu-horizontal > .ant-menu-submenu::after {
  border-bottom: 2px solid #00d5ff !important;
}

.ant-menu-horizontal > .ant-menu-item-selected a,
.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-submenu:hover,
.ant-menu-horizontal > .ant-menu-item-active,
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-item-open,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-submenu-selected {
  color: #00d5ff !important;
  border-bottom-color: #00d5ff !important;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 16px;
  }

  .logo {
    margin-bottom: 16px;
  }

  .ant-menu {
    width: 100%;
    line-height: 44px;
  }

  .header-right {
    width: 100%;
    margin-top: 16px;
  }

  .search-input {
    flex: 1;
    margin-right: 12px;
  }
}

.dark-theme {
  /* Arco Design dark theme styles */
  --color-bg-1: #17171a;
  --color-bg-2: #232324;
  --color-bg-3: #2a2a2b;
  --color-bg-4: #313132;
  --color-bg-5: #373739;
  --color-text-1: rgba(255, 255, 255, 0.9);
  --color-text-2: rgba(255, 255, 255, 0.7);
  --color-text-3: rgba(255, 255, 255, 0.5);
  --color-text-4: rgba(255, 255, 255, 0.3);

  /* Element Plus dark theme styles */
  --el-bg-color: #141414;
  --el-text-color-primary: #E5EAF3;
  --el-border-color: #4C4D4F;
  --el-color-primary: #409EFF;

  /* Vuetify dark theme styles */
  --v-theme-surface: #121212;
  --v-theme-on-surface: #FFFFFF;
  --v-theme-primary: #1976D2;
  --v-theme-on-primary: #FFFFFF;

  /* Custom styles for your app */
  background-color: var(--color-bg-1);
  color: var(--color-text-1);
}

.dark-theme .header {
  background-color: var(--color-bg-2);
  box-shadow: 0 2px 8px rgba(255,255,255,0.08);
}

.dark-theme .ant-menu {
  background-color: var(--color-bg-2);
  color: var(--color-text-1);
}

.dark-theme .ant-input-search {
  background-color: var(--color-bg-1);
}

.dark-theme .text-gradient {
  background: linear-gradient(to right, #eb7df7, #00d5ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark-theme .theme-toggle {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text-1);
}

.dark-theme .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dark-theme .dark-content {
  background-color: var(--color-bg-2);
  color: var(--color-text-1);
}

.dark-theme .dark-footer {
  height: 100%;
  background-color: var(--color-bg-3);
  color: var(--color-text-2);
}

.dark-theme {
  background-color: var(--color-bg-1);
  color: var(--color-text-1);
}

.dark-theme .dark-content {
  background-color: var(--color-bg-2);
  color: var(--color-text-1);
}

.dark-theme .dark-view {
  background-color: var(--color-bg-2);
  color: var(--color-text-1);
  min-height: calc(105vh - 64px - 70px); /* 减去头部和底部的高度 */
}

.dark-theme .dark-footer {
  background-color: var(--color-bg-3);
  color: var(--color-text-2);
}

</style>