<template>
  <el-form
      :model="formData"
      :rules="rules"
      :class="['register-form', { 'dark': isDarkMode }]"
      @submit.native.prevent="submitForm"
      ref="form"
  >
    <h2>注册</h2>
    <el-form-item prop="username">
      <el-input v-model="formData.username" placeholder="用户名">
        <template #prefix>
          <i class="el-input__icon el-icon-user"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="formData.email" placeholder="邮箱">
        <template #prefix>
          <i class="el-input__icon el-icon-message"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          v-model="formData.password"
          type="password"
          placeholder="密码"
          show-password
      >
        <template #prefix>
          <i class="el-input__icon el-icon-lock"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
          v-model="formData.confirmPassword"
          type="password"
          placeholder="确认密码"
          show-password
      >
        <template #prefix>
          <i class="el-input__icon el-icon-lock"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <div class="captcha-container">
        <el-input v-model="formData.captcha" placeholder="验证码">
          <template #prefix>
            <i class="el-input__icon el-icon-picture"></i>
          </template>
        </el-input>
        <el-button
            type="primary"
            :loading="captchaLoading"
            @click="sendVerificationCode"
            :disabled="captchaLoading"
        >
          {{ captchaButtonText }}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
      >
        注册
      </el-button>
    </el-form-item>
    <el-form-item>
      <span>已有账号?</span>
      <el-link type="primary" @click="goToLogin">
        立即登录
      </el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
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

const isDarkMode = ref(false);

// 在页面挂载时检查当前主题
onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
});
let vcode = Math.floor(100000 + Math.random() * 900000).toString();

const showCaptcha = ref(false);
const captchaButtonText = ref('获取验证码');
const captchaTimer = ref(null);
import { Notification } from '@arco-design/web-vue';

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
  if (!form.value) return;

  try {
    await form.value.validate();

    if (formData.captcha !== vcode) {
      ElMessage.error('验证码错误');
      return;
    }

    loading.value = true;

    const uuid = generateUUID();

    const userData = {
      uuid: uuid,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      phone_number: '',
      bio: '',
      role: 'user'
    };

    const response = await fetch(`http://huanyunapi.chatai.re/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '注册失败');
    }

    const user = await response.json();

    form.value.resetFields();

    setTimeout(() => {
      Notification.success({
        title: '系统',
        content: `注册成功！${user.username}`,
        position: 'bottomRight',
      });
      router.push('/login');
    }, 1500);

  } catch (error) {
    console.error('注册过程中发生错误:', error);

    if (error.message === '验证码错误') {
      ElMessage.error(error.message);
    } else {
      Notification.error({
        title: '系统',
        content: `注册失败, 请稍后重试`,
        position: 'bottomRight',
      });
    }
  } finally {
    loading.value = false;
  }
};

// UUID 生成函数
function generateUUID() {
  return 'yyxyyyyy-yyyy-yyxx-yxyy-yyyyyxyyyyxy'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const checkLoginStatus = () => {
  const dbName = 'UserDB';
  const dbVersion = 1;
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['user'], 'readwrite');
    const objectStore = transaction.objectStore('user');
    const getRequest = objectStore.get('user');

    getRequest.onerror = (event) => {
      console.error("Error getting user data:", event.target.error);
    };

    getRequest.onsuccess = (event) => {
      const userData = event.target.result;
      if (userData && userData.login === true) {
        // 如果用户已登录,跳转到 profile 页面
        router.push('/profile');
      } else if (!userData) {
        // 如果没有用户数据,创建一个新的
        const newUserData = { id: 'user', login: false, time: 0 };
        objectStore.add(newUserData);
      }
      // 如果用户未登录,保持在当前登录页面
    };
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('user')) {
      db.createObjectStore('user', { keyPath: 'id' });
    }
  };
};

const goToLogin = () => {
  router.push('/login');
};

const sendVerificationCode = async () => {
  if (captchaLoading.value) return;

  if (!formData.email) {
    ElMessage.warning('请输入邮箱地址');
    return;
  }

  try {
    captchaLoading.value = true;
    captchaButtonText.value = '发送中...';

    // 生成6位数字验证码
    vcode = Math.floor(100000 + Math.random() * 900000).toString();

    const response = await fetch('https://huanyun-api.onrender.com/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        vcode: vcode
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '发送验证码失败');
    }

    const data = await response.json();
    console.log(data.message); // 显示成功消息
    ElMessage.success('验证码已发送，请查看您的邮箱');

    // 开始倒计时
    startCountdown(60);
  } catch (error) {
    console.error('Error sending verification code:', error);
    ElMessage.error(error.message || '发送验证码失败, 请稍后重试');
  } finally {
    captchaLoading.value = false;
    if (!captchaTimer.value) {
      captchaButtonText.value = '获取验证码';
    }
  }
};

const startCountdown = (seconds) => {
  let remainingTime = seconds;
  captchaButtonText.value = `${remainingTime}s 后重新发送`;

  captchaTimer.value = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      clearInterval(captchaTimer.value);
      captchaTimer.value = null;
      captchaButtonText.value = '获取验证码';
      return;
    }

    captchaButtonText.value = `${remainingTime}s 后重新发送`;
  }, 1000);
};

checkLoginStatus()
</script>

<style scoped>
.register-form {
  width: 350px;
  margin: 100px auto;
  padding: 30px;
  //background-color: #fff;
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

.register-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.dark-theme .register-form {
  background-color: #1f1f1f;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.45);
}

.dark-theme .register-form:hover {
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.5);
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