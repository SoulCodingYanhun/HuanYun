<template>
  <v-app>
    <v-main>
      <v-container>
        <h2 class="text-h4 font-weight-bold text-center mb-5">API 展示</h2>
        <v-row>
          <v-col v-for="api in apis" :key="api.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="pa-3 mb-4" elevation="2">
              <v-card-title class="font-weight-bold">{{ api.name }}</v-card-title>
              <v-card-text>
                {{ api.description }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="showDetails(api.name)">查看详情</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const apis = ref([
  {
    id: 'SAlgorithm',
    name: 'SAlgorithm',
    description: 'Python 算法简化库'
  },
])


const showDetails = (id) => {
  router.push(`/api/${id}`)
}
</script>

<style scoped>
.v-card {
  border-radius: 10px; /* 设置卡片圆角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 设置卡片阴影 */
}

.v-card-title {
  color: #303133; /* 设置标题颜色 */
}

.v-card-text {
  font-size: 14px; /* 设置文本大小 */
  color: #555; /* 设置文本颜色 */
}

.v-btn {
  background-color: #00bbff; /* 设置按钮背景颜色 */
  color: #fff; /* 设置按钮文本颜色 */
  border: none; /* 移除按钮边框 */
  transition: all 0.3s ease; /* 添加按钮过渡效果 */
}

.v-btn:hover {
  background-color: #00bbff; /* 设置按钮悬停时的背景颜色 */
}
</style>