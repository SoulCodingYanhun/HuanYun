<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();

onMounted(() => {
  const userLogin = Cookies.get('user_login');

  if (userLogin !== 'true') {
    // 如果 user_login 不是 'true'，重定向到登录页面
    router.push('/login');
  }
});
</script>

<template>

</template>

<style scoped>

</style>