<template>
  <v-app>
    <div class="d-flex justify-center align-center" style="height: 100vh;">
      <v-card class="pa-6" style="width: 400px; background-color: rgba(255, 255, 255, 0.8)" title="用户注册">
        <v-row rols="12" class="d-flex justify-center align-center">
          <v-icon size="x-large" icon="mdi-account"></v-icon>
          <v-text-field variant="underlined" width="300px" label="输入用户名"></v-text-field>
        </v-row>
        <v-row rols="12" class="d-flex justify-center align-center">
          <v-icon size="x-large" icon="mdi-email"></v-icon>
          <v-text-field variant="underlined" width="300px" label="输入邮箱"></v-text-field>
        </v-row>
        <v-row rols="12" class="d-flex justify-center align-center">
          <v-icon size="x-large" icon="mdi-key-outline"></v-icon>
          <v-text-field variant="underlined" width="300px" label="输入密码"></v-text-field>
        </v-row>
        <v-row rols="12" class="d-flex justify-center align-center">
          <v-icon size="x-large" icon="mdi-key-outline"></v-icon>
          <v-text-field variant="underlined" width="300px" label="再次输入密码"></v-text-field>
        </v-row>
        <v-row rols="12" class="d-flex justify-center align-center">
          <v-icon size="x-large" icon="mdi-code-array"></v-icon>
          <v-text-field variant="underlined" width="200px" label="输入验证码"></v-text-field>
          <v-btn variant="text">获得验证码</v-btn>
        </v-row>
        <v-btn width="100%" color="primary">注册用户</v-btn>
        <p class="d-flex justify-center align-center" style="color:#6464f8" @click="login">有账号,立即登入</p>
      </v-card>
    </div>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useClerk } from '@clerk/clerk-js';

const { signUp, sendVerification } = useClerk();
const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const verificationCode = ref('');

async function register() {
  try {
    await signUp.create({
      username: username.value,
      emailAddress: email.value,
      password: password.value,
    });
    await sendVerification.send();
    router.push('/login');
  } catch (error) {
    console.error('Registration error:', error);
  }
}

async function sendVerificationCode() {
  try {
    await sendVerification.send();
  } catch (error) {
    console.error('Verification code send error:', error);
  }
}

async function login() {
  router.push('/login');
}
</script>