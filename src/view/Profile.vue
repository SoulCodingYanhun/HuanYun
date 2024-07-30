<script setup>
import { ref, onMounted } from 'vue';
import { Notification } from '@arco-design/web-vue';

// 创建一个响应式引用来存储用户数据
const userData = ref(null);

// 定义数据库配置
const DB_CONFIG = {
  name: 'UserDB',
  version: 1,
  storeName: 'user',
  keyPath: 'data'
};

// 定义一个函数来从 IndexedDB 获取用户数据
const fetchUserData = async () => {
  try {
    const db = await openDatabase();
    const storedData = await getUserData(db);

    if (storedData?.data?.user) {
      userData.value = storedData.data.user;
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    showErrorNotification(error.message);
  }
};

// 打开数据库
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
    request.onerror = () => reject(new Error('Failed to open database'));
    request.onsuccess = (event) => resolve(event.target.result);
  });
};

// 获取用户数据
const getUserData = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([DB_CONFIG.storeName], 'readonly');
    const objectStore = transaction.objectStore(DB_CONFIG.storeName);
    const request = objectStore.get(DB_CONFIG.keyPath);

    request.onerror = () => reject(new Error('Failed to fetch user data'));
    request.onsuccess = (event) => resolve(event.target.result);
  });
};

// 显示错误通知
const showErrorNotification = (message) => {
  Notification.error({
    title: '错误',
    content: message || '获取用户数据时出错',
    position: 'bottomRight',
  });
};

const getRoleTagType = (role) => {
  switch (role) {
    case 'admin':
      return 'danger';
    case 'moderator':
      return 'warning';
    case 'user':
      return 'success';
    default:
      return 'info';
  }
};

// 组件挂载时调用 fetchUserData 函数
onMounted(fetchUserData);
</script>

<template>
  <div class="profile-container" v-if="userData" :class="{ 'dark-theme': isDarkTheme }">
    <el-card class="profile-card">
      <div class="profile-header">
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :xs="24" :sm="8" class="avatar-col">
            <el-avatar
                :size="120"
                :src="userData.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                class="profile-avatar"
            ></el-avatar>
          </el-col>
          <el-col :xs="24" :sm="16" class="info-col">
            <div class="name-tag-wrapper">
              <h2 class="profile-username">{{ userData.username || '数据未响应' }}</h2>
              <el-tag :type="getRoleTagType(userData.role)" class="profile-role-tag">
                {{ userData.role || '未知角色' }}
              </el-tag>
            </div>
            <div class="contact-info">
              <p>邮箱: <i class="el-icon-message"></i> {{ userData.email || '数据未响应' }}</p>
              <p>手机号: <i class="el-icon-phone"></i> {{ userData.phone_number || '未设置' }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="profile-info">
        <div class="info-item profile-bio">
          <i class="el-icon-document"></i>
          <span>
            <strong>个人简介:</strong>
            {{ userData.bio || '这个用户很懒,什么都没有留下。' }}
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.name-tag-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.profile-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 20px;
}

.profile-card {
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.profile-header {
  background: linear-gradient(to right, #eb7df7, #00d5ff);
  padding: 2rem;
  color: #ffffff;
}

.avatar-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-avatar {
  border: 4px solid #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.info-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-username {
  font-size: 2rem;
  margin: 0;
  margin-right: 1rem;
  color: #ffffff;
}

.profile-role-tag {
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  white-space: nowrap;
}

.contact-info {
  font-size: 0.9rem;
}

.contact-info p {
  margin: 0.5rem 0;
}

.contact-info i {
  margin-right: 0.5rem;
}

.profile-info {
  padding: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;
}

.info-item:hover {
  transform: translateX(5px);
}

.info-item i {
  font-size: 1.2rem;
  margin-right: 1rem;
  color: #667eea;
  flex-shrink: 0;
}

.info-item strong {
  font-weight: 600;
  color: #2c3e50;
  margin-right: 0.5rem;
}

.profile-bio {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }

  .profile-header {
    padding: 1.5rem;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .name-tag-wrapper {
    justify-content: center;
  }

  .profile-username {
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }

  .profile-role-tag {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }

  .contact-info {
    text-align: center;
  }

  .profile-info {
    padding: 1.5rem;
  }

  .info-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-item i {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}

.dark-theme {
  background-color: #121212;
  color: #ffffff;
}

.dark-theme .profile-card {
  background-color: #1E1E1E;
  color: #ffffff;
}

.dark-theme .profile-header {
  background: linear-gradient(to right, #6335d7, #0d2341);
}

.dark-theme .profile-username {
  color: #ffffff;
}

.dark-theme .contact-info p {
  color: #e2e8f0;
}

.dark-theme .info-item strong {
  color: #e2e8f0;
}

.dark-theme .profile-bio {
  background-color: #2D3748;
  color: #e2e8f0;
}

.dark-theme .el-card {
  background-color: #1E1E1E;
  border-color: #2D3748;
}

.dark-theme .el-card__body {
  color: #e2e8f0;
}

.theme-toggle-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

body {
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.dark-theme body {
  background-color: #121212;
}

html {
  scrollbar-color: #4a5568 #1a202c;
  scrollbar-width: thin;
}

html::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

html::-webkit-scrollbar-thumb {
  background-color: #4a5568;
  border-radius: 4px;
}

html::-webkit-scrollbar-track {
  background-color: #1a202c;
}

.dark-theme html {
  scrollbar-color: #718096 #2d3748;
}

.dark-theme html::-webkit-scrollbar-thumb {
  background-color: #718096;
}

.dark-theme html::-webkit-scrollbar-track {
  background-color: #2d3748;
}
</style>