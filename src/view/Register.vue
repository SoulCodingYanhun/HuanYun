<template>
  <div class="d-flex justify-center align-center">
    <SignUp />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { SignUp } from 'vue-clerk'

const router = useRouter();

async function login() {
  router.push('/login');
}
</script>