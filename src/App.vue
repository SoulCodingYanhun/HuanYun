<template>
  <v-app>
    <v-header>
      <v-app-bar :elevation="0" scroll-behavior="hide">
        <v-app-bar-title class="text-gradient"><span class="text-gradient">幻云科技</span></v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-home" @click="goToHome"></v-btn>
          <v-btn icon="mdi-api" @click="goToApi"></v-btn>
          <v-btn icon="mdi-forum" @click="goToForum"></v-btn>
          <div v-if="isLoggedIn">
            <v-btn></v-btn>
          </div>
          <div v-else>
            <v-btn @click="goToLogin">注册/登入</v-btn>
          </div>
        </template>
      </v-app-bar>
    </v-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const isLoggedIn = ref(false);

const goToHome = () => {
  router.push('/');
};

const goToApi = () => {
  router.push('/api');
};

const goToForum = () => {
  router.push('/forum');
};

const goToProfile = () => {
  router.push('/profile');
};

const goToLogin = () => {
  router.push('/login');
};

onMounted(() => {
  // 检查是否有 user cookie
  const userCookie = getCookie('user');
  if (userCookie) {
    // 如果有 user cookie,解析它的值
    const user = JSON.parse(userCookie);
    isLoggedIn.value = user.login;
  } else {
    // 如果没有 user cookie,则创建一个新的 cookie
    createUserCookie();
  }
});

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

function createUserCookie() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // 设置 cookie 有效期为 7 天
  document.cookie = `user=${JSON.stringify({ login: false })}; expires=${expirationDate.toUTCString()}; path=/`;
}
</script>

<style>
.text-gradient {
  background: linear-gradient(to right, rgb(235 125 247), rgb(0, 213, 255));
  -webkit-background-clip: text;
  color: transparent;
}
</style>