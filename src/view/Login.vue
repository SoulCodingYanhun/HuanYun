<template>
  <v-container class="h-100  d-flex align-center justify-center" style="flex-direction: column;">
    <v-card width="500" class="mb-2">
      <v-card-title>用户登录</v-card-title>
      <v-card-text class="pa-30">
        <v-form ref="form">
          <v-text-field v-model="username" variant="underlined" prepend-icon="mdi-account-circle" label="用户名"
                        type="name"></v-text-field>
          <v-text-field v-model="password" variant="underlined" prepend-icon="mdi-lock" label="密码"
                        type="password"></v-text-field>
          <v-btn width="550" color="blue" @click="Login">
            登入账号
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card width="500" class="mb-20">
      <v-card-title>其他选项</v-card-title>
      <v-card-text>第三方登入 (暂无)</v-card-text>

      <v-btn width="550" color="blue" @click="Reg">注册账号</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {

    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const Reg = async function () {
      router.push('/register');
    };

    const Login = async function() {
        try {
          const response = await axios.get(`http://localhost:3030/api/users/login/${username.value}/${password.value}`);
          if (response.status === 200) {
            // 登录成功，跳转到主页或其他需要登录的页面
            router.push('/');
          } else {
            // 处理登录失败的情况
            console.error('登录失败');
          }
        } catch (error) {
          console.error('登录失败', error);
        }
    };

    return {
      username,
      password,
      Reg,
      Login
    };
  },
});
</script>
