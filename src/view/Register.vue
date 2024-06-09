<template>
  <el-form class="register-form" @submit.native.prevent="submitForm">
    <h2>注册</h2>
    <el-form-item>
      <el-input v-model="username" placeholder="用户名" :prefix-icon="User">
        <template #prefix>
          <i class="el-input__icon el-icon-user"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="email" placeholder="邮箱">
        <template #prefix>
          <i class="el-input__icon el-icon-message"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="password" type="password" placeholder="密码">
        <template #prefix>
          <i class="el-input__icon el-icon-lock"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="confirmPassword" type="password" placeholder="确认密码">
        <template #prefix>
          <i class="el-input__icon el-icon-lock"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="captcha-container">
        <el-input v-model="captcha" placeholder="验证码">
          <template #prefix>
            <i class="el-input__icon el-icon-picture"></i>
          </template>
        </el-input>
        <el-button type="primary" @click="refreshCaptcha">获取验证码</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" round>注册</el-button>
    </el-form-item>
    <el-form-item>
      <span>已有账号?</span>
      <el-link type="primary" @click="goToLogin">立即登录</el-link>
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
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const captcha = ref('');
    const captchaSrc = ref('');

    const submitForm = () => {
      // 验证验证码是否正确
      if (captcha.value !== '1234') {
        alert('验证码错误');
        return;
      }

      // 在这里处理注册表单提交
      console.log(`用户名: ${username.value}, 邮箱: ${email.value}, 密码: ${password.value}`);
    };

    const goToLogin = () => {
      // 跳转到登录页面
      router.push('/login');
    };

    const refreshCaptcha = () => {
      // 这里应该调用后端接口获取新的验证码图片
      captchaSrc.value = 'https://dummyimage.com/120x40/000/fff'; // 仅作为示例
    };

    refreshCaptcha(); // 初始化时加载验证码图片

    return {
      username,
      email,
      password,
      confirmPassword,
      captcha,
      captchaSrc,
      submitForm,
      goToLogin,
      refreshCaptcha
    };
  }
};
</script>

<style scoped>
.register-form {
  width: 350px;
  margin: 100px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.register-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.el-input__inner {
  border-radius: 20px;
  padding-left: 35px;
}

.el-input__icon {
  color: #8492a6;
}

.el-button {
  width: 100%;
  border-radius: 20px;
  background-color: #409eff;
  border-color: #409eff;
}

.el-link {
  color: #409eff;
  text-decoration: none;
}

h2 {
  text-align: center;
  color: #303133;
  margin-bottom: 30px;
}

@media (max-width: 480px) {
  .register-form {
    width: 90%;
    margin: 50px auto;
    padding: 20px;
  }
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-container .el-button {
  width: auto;
  margin-left: 10px;
}
</style>