<template>
  <v-container class="mx-auto d-flex align-center justify-center">
    <!-- <img src="./assets/logo.png" class="logo"> -->

    <v-btn v-for="link in links" :key="link" :text="link" variant="text"></v-btn>

    <v-spacer></v-spacer>

    <v-btn @click="l">登入</v-btn>
    <v-btn @click="r">注册</v-btn>
  </v-container>
  <router-view>

  </router-view>
</template>

<script setup>
import { ref } from 'vue';
import router from "@/router";

const l = async function () {
  router.push('/login');
};

const r = async function () {
  router.push('/register');
}

const links = [
  '主页',
  '社区',
  'API',
  '库',
];

const userData = ref({ name: null, password: null, login: false });

</script>
