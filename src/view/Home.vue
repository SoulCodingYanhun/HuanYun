<script setup></script>

<template>
  <v-container class="home" fluid>
    <v-row justify="center" align="center" style="height: 80vh">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">欢迎来到幻云科技</h1>
        <p class="text-center">
          开启您的创新之旅。在这里，您将发现一个充满无限可能性的空间，旨在激发您的创意火花，提升工作效率。
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="pa-4 text-center" elevation="5">
          <v-icon size="64">mdi-palette</v-icon>
          <h2>🎨 模板库</h2>
          <p>
            我们的模板库拥有丰富多样的设计模板，覆盖各种风格和主题。无论是寻找灵感，还是需要快速启动项目，这里都能满足您的需求。
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="pa-4 text-center" elevation="5">
          <v-icon size="64">mdi-account-group</v-icon>
          <h2>🤝 交流社区</h2>
          <p>
            幻云科技的交流社区是一个充满活力的专业社交平台。在这里，您可以与来自世界各地的专业人士和创意人士交流想法，分享经验，共同成长。
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="pa-4 text-center" elevation="5">
          <v-icon size="64">mdi-console</v-icon>
          <h2>🌐 技术支持</h2>
          <p>
            我们为前端和后端开发者提供了全面的技术支持。无论您使用的是哪种技术，我们都有专业的资源和团队支持您。
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-5">
      <v-col cols="12" sm="6" md="4">
        <h2 class="text-center">🌟 加入我们</h2>
        <p class="text-center">
          幻云科技期待您的加入。让我们一起探索科技的边界，共同创造一个更加美好的未来。
        </p>
        <div class="text-center">
          <el-button type="primary" @click="register" class="mr-3"
            >立即注册</el-button
          >
          <el-button @click="learnMore">了解更多</el-button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    register() {
      // 处理注册逻辑或跳转到注册页面
      console.log('注册新用户');
    },
    learnMore() {
      // 处理了解更多逻辑或跳转到相关页面
      console.log('了解更多信息');
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
}

h1 {
  font-weight: normal;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.v-card {
  transition: transform 0.3s ease-in-out;
}

.v-card:hover {
  transform: translateY(-10px);
}

button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.v-icon {
  color: #1976d2;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .v-card {
    margin-bottom: 1rem;
  }
}
</style>
