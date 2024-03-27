<template xmlns="">
  <v-container class="h-100  d-flex align-center justify-center" style="flex-direction: column;">
    <v-card width="500" class="mb-2">
      <v-card-title>用户注册</v-card-title>
      <v-card-text class="pa-30">
        <v-form ref="form">
          <v-text-field v-model="username" variant="underlined" prepend-icon="mdi-account-circle" label="用户名"
                        type="name"></v-text-field>
          <v-text-field v-model="password" variant="underlined" prepend-icon="mdi-lock" label="密码"
                        type="password"></v-text-field>
          <v-text-field v-model="confirmPassword" variant="underlined" prepend-icon="mdi-lock" label="确认密码"
                        type="password"></v-text-field>
          <v-text-field v-model="email" variant="underlined" prepend-icon="mdi-email" label="邮箱"
                        type="mailbox"></v-text-field>
          <v-row class="w-200 d-flex align-center justify-center">
            <v-otp-input v-model="otp" ></v-otp-input>
            <v-btn color="blue" @click="OtpButton" :disabled="countdown > 0">
              {{ countdown > 0 ? `重新发送 (${countdown})` : '获得验证码' }}
            </v-btn>
          </v-row>
          <v-btn width="550" color="blue" @click="Reg">注册账号</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card width="500" class="mb-20">
      <v-card-title>其他选项</v-card-title>
      <v-btn width="550" color="blue" @click="Login">登入账号</v-btn>
    </v-card>
    <v-snackbar v-model="snackbar" multi-line>
      {{ text }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false">关闭</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';
import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';
import Hex from 'crypto-js/enc-hex';

export default defineComponent({
  setup() {
    const countdown = ref(0);
    let verificationCode = '';
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const email = ref('');
    const snackbar = ref(false);
    const text = ref('');
    const otp = ref('');
    // 假设这是您的加密密钥和IV
    const encryptionKey = '1sjdek123';
    const iv = '19281378'; // AES的IV通常是16个字节

    const Login = async function () {
      router.push('/login');
    };

    const OtpButton = async function () {
      try {
        // 发送请求触发发送验证码的操作
        const response = await fetch(`http://localhost:3030/api/code/${email.value}`, {
          method: 'POST',
        });

        // 根据后端返回的结果处理逻辑
        if (response.ok) {
          text.value = '验证码已发送，请查收邮件';
          // 保存验证码到变量中
          verificationCode = await response.text();

          console.log(verificationCode)

          // 设置倒计时时间为60秒
          countdown.value = 60;
          const timer = setInterval(() => {
            countdown.value--;
            if (countdown.value === 0) {
              clearInterval(timer);
            }
          }, 1000);

        } else {
          text.value = '发送验证码失败';
        }
        snackbar.value = true;
      } catch (error) {
        console.error(error);
        text.value = '发送验证码失败';
        snackbar.value = true;
      }
    }

    const decryptVerificationCode = async (encryptedCode) => {
      try {
        // 假设 encryptedCode 是 Base64 编码的
        const encryptedCodeBytes = CryptoJS.enc.Base64.parse(encryptedCode);

        // 使用AES解密方法，传入密钥和IV
        const decryptedCode = AES.decrypt({
          ciphertext: encryptedCodeBytes
        }, encryptionKey, {
          iv: CryptoJS.enc.Utf8.parse(iv)
        });

        // 将解密后的数据转换为UTF8字符串
        return decryptedCode.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error('解密失败:', error);
        return null;
      }
    };


    const Reg = async function () {
      if (!username.value || !password.value || !confirmPassword.value || !email.value || !otp.value) {
        text.value = '请填写所有必填字段';
        snackbar.value = true;
      } else if (password.value !== confirmPassword.value) {
        text.value = '两次输入的密码不一致';
        snackbar.value = true;
      } else {
        if (!verificationCode) {
          console.error('验证码未正确设置');
          return;
        }

        const num = ref('')

        try {
          // 解析 JSON 字符串
          const parsedData = JSON.parse(verificationCode);
          // 提取 encryptedVerificationCode
          const encryptedVerificationCode = parsedData.encryptedVerificationCode;

          num.value = await decryptVerificationCode(encryptedVerificationCode);
          console.log(num);
        } catch (error) {
          console.error('解密过程中发生错误:', error);
        }
      }
    };



    return {
      countdown,
      verificationCode,
      OtpButton,
      Reg,
      Login,
      text,
      snackbar,
      username,
      password,
      confirmPassword,
      email,
      otp
    };
  },
});
</script>
