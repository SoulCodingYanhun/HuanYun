<script setup>
import { ref } from 'vue';

const register = () => {
  console.log('注册新用户');
};

const learnMore = () => {
  console.log('了解更多信息');
};

const cards = ref([
  { id: 1, icon: 'mdi-palette', title: '🎨 模板库', description: '我们的模板库拥有丰富多样的设计模板，覆盖各种风格和主题。无论是寻找灵感，还是需要快速启动项目，这里都能满足您的需求。' },
  { id: 2, icon: 'mdi-account-group', title: '🤝 交流社区', description: '幻云科技的交流社区是一个充满活力的专业社交平台。在这里，您可以与来自世界各地的专业人士和创意人士交流想法，分享经验，共同成长。' },
  { id: 3, icon: 'mdi-console', title: '🌐 技术支持', description: '我们为前端和后端开发者提供了全面的技术支持。无论您使用的是哪种技术，我们都有专业的资源和团队支持您。' },
]);

const frontEnd = {
  icon: 'mdi-palette',
  title: '前端',
  description: '前端技术包括HTML、CSS和JavaScript，以及流行的框架如Vue、React和Angular。',
  languages: [
  { icon: 'fa-brands:angular', name: 'Angular' },
    { icon: 'fa-brands:react', name: 'React' },
    { icon: 'fa-brands:vuejs', name: 'Vue' },
    { icon: 'fa-brands:preact', name: 'Preact' },
    { icon: 'fa-brands:lit', name: 'Lit' },
    { icon: 'fa-brands:svelte', name: 'Svelte' },
    { icon: 'fa-brands:qwik', name: 'Qwik' },
    { icon: 'fa-brands:solidjs', name: 'Solid' },
    { icon: 'fa-brands:bootstrap', name: 'Bootstrap5' },
    { icon: 'fa-solid:file-code', name: 'Static' },
    { icon: 'fa-brands:vanilla', name: 'Vanilla' },
    { icon: 'fa-solid:code', name: 'Effector' },
    { icon: 'fa-brands:ember', name: 'Ember' },
  ],
};

const backEnd = {
  icon: 'mdi-console',
  title: '后端',
  description: '后端技术涉及服务器、数据库和应用程序逻辑，常用的语言包括Node.js、Python、Java和PHP。',
  languages: [
    { icon: 'mdi-nodejs', name: 'Node.js' },
    { icon: 'mdi-language-python', name: 'Python' },
    { icon: 'mdi-language-java', name: 'Java' },
    { icon: 'mdi-language-php', name: 'PHP' },
  ],
};
</script>

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
      <v-col cols="12">
        <h2 class="text-center">介绍</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-icon size="64" aria-hidden="true">{{ frontEnd.icon }}</v-icon>
        <h3>{{ frontEnd.title }}</h3>
        <p>{{ frontEnd.description }}</p>
        <div class="language-icons">
          <i v-for="language in frontEnd.languages" :key="language.name" :class="language.icon" class="fa-2x"></i>
        </div>
      </v-col> 
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="6">
        <v-icon size="64" aria-hidden="true">{{ frontEnd.icon }}</v-icon>
        <h3>{{ frontEnd.title }}</h3>
        <p>{{ frontEnd.description }}</p>
        <div class="language-icons">
          <v-icon v-for="language in frontEnd.languages" :key="language.name" size="32" aria-hidden="true">{{ language.icon }}</v-icon>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <v-icon size="64" aria-hidden="true">{{ backEnd.icon }}</v-icon>
        <h3>{{ backEnd.title }}</h3>
        <p>{{ backEnd.description }}</p>
        <div class="language-icons">
          <v-icon v-for="language in backEnd.languages" :key="language.name" size="32" aria-hidden="true">{{ language.icon }}</v-icon>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-5">
      <v-col cols="12" sm="6" md="4">
        <h2 class="text-center">🌟 加入我们</h2>
        <p class="text-center">
          幻云科技期待您的加入。让我们一起探索科技的边界，共同创造一个更加美好的未来。
        </p>
        <div class="text-center">
          <el-button type="primary" @click="register" class="mr-3">立即注册</el-button>
          <el-button @click="learnMore" type="button">了解更多</el-button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

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

.card-hover {
  transition: transform 0.3s ease-in-out;
}

.card-hover:hover {
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

/* 优化小屏幕上的卡片间距 */
@media (max-width: 600px) {
  .v-card {
    margin-bottom: 1rem;
  }
}

/* 针对超小屏幕的额外样式调整 */
@media (max-width: 400px) {
  .v-card {
    padding: 8px; /* 减少内边距以适应小屏幕 */
  }

  h2 {
    font-size: 1.5rem; /* 减小标题字体大小 */
  }

  p {
    font-size: 0.875rem; /* 减小描述字体大小 */
  }

  button {
    padding: 8px 16px; /* 减小按钮尺寸 */
    margin: 5px; /* 减小按钮间距 */
  }
}
</style>
