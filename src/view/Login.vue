<template>
  <el-form class="login-form" @submit.native.prevent="submitForm">
    <h2>登录</h2>
    <el-form-item>
      <el-input v-model="username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="password" type="password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">登录</el-button>
    </el-form-item>
    <el-form-item>
      <span>没有账号?</span>
      <el-link type="primary" @click="goToRegister">立即注册</el-link>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const submitForm = () => {
      // 在这里处理表单提交
      console.log(`用户名: ${username.value}, 密码: ${password.value}`);
    };

    const goToRegister = () => {
      // 跳转到注册页面
      router.push('/register'); // 假设您的注册页面路由为 /register
    };

    return {
      username,
      password,
      submitForm,
      goToRegister
    };
  }
};
</script>

<style scoped>
.login-form {
  width: 300px;
  margin: 100px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.el-input__inner {
  border-radius: 20px;
  padding-left: 15px;
}

.el-button {
  width: 100%;
  border-radius: 20px;
}

.el-link {
  color: #409eff;
  text-decoration: none;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.login-form {
  transition: all 0.3s ease;
}

.login-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 480px) {
  .login-form {
    width: 90%;
    margin: 50px auto;
    padding: 20px;
  }
}
</style>
