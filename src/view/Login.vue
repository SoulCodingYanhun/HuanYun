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
      <el-button type="primary" native-type="submit">登入
      </el-button>
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
import { Notification } from '@arco-design/web-vue';
import Cookies from 'js-cookie';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const goToRegister = () => {
      // 跳转到注册页面
      router.push('/register');
    };

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

    const submitForm = async () => {
      try {
        const response = await fetch('https://huanyunapi.chatai.re/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          // 登录成功,更新 IndexedDB 中的用户信息
          updateUserLoginStatus(true, 30, data);

          // 设置 login cookie
          Cookies.set('login', 'true', { expires: 7 }); // 设置 cookie 有效期为 7 天

          Notification.success({
            title: '系统',
            content: `登入成功！${username.value}`,
            position: 'bottomRight',
          });
          router.push('/profile');
        } else {
          Notification.error({
            title: '系统',
            content: '登入失败！可能是你的用户名和密码错误！再或者是没有这个用户',
            position: 'bottomRight',
          });
        }
      } catch (error) {
        console.error(error);
        Notification.error({
          title: '系统',
          content: '登入失败,请稍后再试',
          position: 'bottomRight',
        });
      }
    };

    const updateUserLoginStatus = (login, time, data) => {
      const dbName = 'UserDB';
      const dbVersion = 1;
      const request = indexedDB.open(dbName, dbVersion);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['user'], 'readwrite');
        const objectStore = transaction.objectStore('user');
        const updateData = { id: 'user', login, time };
        const updateUserData = { id: 'data', data: data}
        objectStore.put(updateData);
        objectStore.put(updateUserData);
      };

      request.onerror = (event) => {
        console.error("Error updating user data:", event.target.error);
      };
    };

    // 在组件初始化时检查登录状态
    checkLoginStatus();

    return {
      username,
      password,
      submitForm,
      goToRegister,
    };
  },
};
</script>

<style scoped>
.login-form {
  width: 300px;
  margin: 100px auto;
  padding: 30px;
  //background-color: #fff;
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

.dark-theme .login-form {
  background-color: #1f1f1f;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.45);
}

.dark-theme .login-form:hover {
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.5);
}

.dark-theme h2 {
  color: #fff;
}

.dark-theme .el-input__inner {
  background-color: #2a2a2a;
  color: #fff;
  border-color: #3a3a3a;
}

.dark-theme .el-input__inner:focus {
  border-color: #409eff;
}

.dark-theme .el-button {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}

.dark-theme .el-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

@media (max-width: 480px) {
  .login-form {
    width: 90%;
    margin: 50px auto;
    padding: 20px;
  }
}
</style>
