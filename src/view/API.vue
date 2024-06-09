<template>
  <v-app>
    <h2>API 展示</h2>
    <div class="card-container">
      <el-card v-for="api in apis" :key="api.id" class="api-card">
        <div slot="header" class="clearfix">
          <span>{{ api.name }}</span>
        </div>
        <div>
          <p>{{ api.description }}</p>
          <el-button type="primary" @click="showDetails(api.name)">查看详情</el-button>
        </div>
      </el-card>
    </div>
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

<style>
h2 {
  text-align: center;
  color: #303133;
  margin-bottom: 30px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.api-card {
  width: 300px;
  margin: 10px;
}
</style>