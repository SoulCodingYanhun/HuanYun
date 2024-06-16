<template>
  <el-form class="register-form" @submit.native.prevent="submitForm" ref="form">
    <h2>注册</h2>
    <el-form-item prop="username">
      <el-input v-model="username" placeholder="用户名">
        <template #prefix>
          <i class="el-input__icon el-icon-user"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="email" placeholder="邮箱" >
        <template #prefix>
          <i class="el-input__icon el-icon-message"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="password" type="password" placeholder="密码" show-password>
        <template #prefix>
          <i class="el-input__icon el-icon-lock"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input v-model="confirmPassword" type="password" placeholder="确认密码" show-password>
        <template #prefix>
          <i class="el-input__icon el-icon-lock"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <div class="captcha-container">
        <el-input v-model="captcha" placeholder="验证码">
          <template #prefix>
            <i class="el-input__icon el-icon-picture"></i>
          </template>
        </el-input>
        <el-button type="primary" :loading="captchaLoading" @click="sendVerificationCode" :disabled="captchaLoading">
          {{ captchaButtonText }}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" round :loading="loading">注册</el-button>
    </el-form-item>
    <el-form-item>
      <span>已有账号?</span>
      <el-link type="primary" @click="goToLogin">立即登录</el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const form = ref(null);
const loading = ref(false);
const captchaLoading = ref(false);

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  captcha: '',
});

const showCaptcha = ref(false);
const captchaButtonText = ref('获取验证码');
const captchaTimer = ref(null);

const username = ref();
const password = ref();
const email = ref();
const confirmPassword = ref();
const captcha = ref();

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度至少为 3 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度为 6 位', trigger: 'blur' }
  ]
});

const submitForm = async () => {
  form.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;

        const response = await fetch('https://huanyuncoding-api.oocc.cn/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        loading.value = false;

        if (response.ok) {
          // 注册成功后，重置表单
          form.value.resetFields();

          // 设置延迟跳转
          setTimeout(() => {
            router.push('/login');
          }, 1500); // 1.5 秒后跳转
        } else {
          const error = await response.json();
          console.error('注册失败:', error.error);

          // 使用 ElMessage 组件显示错误消息
          ElMessage.error('注册失败, 请稍后重试');
        }
      } catch (error) {
        console.error('注册过程中发生错误:', error);

        // 使用 ElMessage 组件显示错误消息
        ElMessage.error('注册过程中发生错误, 请稍后重试');
      } finally {
        loading.value = false;
      }
    } else {
      console.log('表单验证失败!');
    }
  });
};

const goToLogin = () => {
  router.push('/login');
};

const sendVerificationCode = async () => {
  if (captchaLoading.value) return;

  try {
    // 验证邮箱是否为空
    if (!email.value) {
      console.log(`邮箱 ${email.value}`)
      return;
    }

    captchaLoading.value = true;
    captchaButtonText.value = '发送中...';

    const response = await fetch('https://huanyuncoding-api.oocc.cn/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });

    if (response.ok) {
      console.log('Verification code sent successfully');
      showCaptcha.value = true;
      startCountdown(60);

      // 使用 ElMessage 组件显示成功消息
      ElMessage({
        message: '验证码已发送',
        type: 'success'
      });
    } else {
      const error = await response.json();
      console.error('Failed to send verification code:', error.error);

      // 使用 ElMessage 组件显示错误消息
      ElMessage.error('发送验证码失败, 请稍后重试');
    }
  } catch (error) {
    console.error('Error sending verification code:', error);

    // 使用 ElMessage 组件显示错误消息
    ElMessage.error('发送验证码失败, 请稍后重试');
  } finally {
    captchaLoading.value = false;
  }
};

const startCountdown = (seconds) => {
  let remainingTime = seconds;
  captchaButtonText.value = `${remainingTime}s 后重新发送`;

  captchaTimer.value = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      clearInterval(captchaTimer.value);
      captchaButtonText.value = '获取验证码';
      return;
    }

    captchaButtonText.value = `${remainingTime}s 后重新发送`;
  }, 1000);
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