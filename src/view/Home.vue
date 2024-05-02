<template>
  <v-container class="home" fluid>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-center">欢迎来到<span class="text-gradient">幻云科技</span></h1>
        <p class="text-center">
          开启您的创新之旅。在这里，您将发现一个充满无限可能性的空间，旨在激发您的创意火花，提升工作效率。
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h1 class="text-center">特色</h1>
      </v-col>
    </v-row>

    <v-row style="height: 70vh">
      <v-col v-for="card in cards" :key="card.id" cols="12" sm="4">
        <v-card class="card-hover" elevation="4">
          <v-card-title>
            <v-icon size="24" class="mr-2">{{ card.icon }}</v-icon>
            {{ card.title }}
          </v-card-title>
          <v-card-text>{{ card.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">我们的模板支持语言</h2>
      </v-col>
    </v-row>

   <!-- 前端技术卡片 -->
   <v-col cols="12" sm="6">
      <v-card class="card-hover" elevation="4">
        <p class="text-center">前端</p>
        <div class="language-icons">
          <AngularIcon :size="24" color="black" />
          <VueDotjsIcon :size="24" color="black" />
          <ReactIcon :size="24" color="black" />
          <LitIcon :size="24" color="black" />
          <SvelteIcon :size="24" color="black" />
          <PreactIcon :size="24" color="black" />
          <QwikIcon :size="24" color="black" />
          <SolidIcon :size="24" color="black" />
          <BootstrapIcon :size="24" color="black" />
          <JavaScriptIcon :size="24" color="black" />
          <Typescript :size="24" color="black" />
          <Html5Icon :size="24" color="black" />
          <EmberDotjsIcon :size="24" color="black" />
        </div>
      </v-card>
    </v-col>

    <!-- 后端技术卡片 -->
    <v-col cols="12" sm="6">
      <v-card class="card-hover" elevation="4">
        <p class="text-center">后端</p>
        <div class="language-icons">
          <PythonIcon :size="24" color="black" />
          <PhpIcon :size="24" color="black" />
          <RubyIcon :size="24" color="black" />
          <NodeDotjsIcon :size="24" color="black" />
          <GoIcon :size="24" color="black" />
          <KotlinIcon :size="24" color="black" />
          <PerlIcon :size="24" color="black" />
          <DartIcon :size="24" color="black" />
          <ScalaIcon :size="24" color="black" />
          <RustIcon :size="24" color="black" />
        </div>
      </v-card>
    </v-col>

    <!-- 全栈技术卡片 -->
    <v-col cols="12" sm="6">
      <v-card class="card-hover" elevation="4">
        <p class="text-center">全栈</p>
        <div class="language-icons">
          <AstroIcon :size="24" color="black" />
          <AstroIcon :size="24" color="black" />
          <NextDotjsIcon :size="24" color="black" />
          <NuxtDotjsIcon :size="24" color="black" />
          <NuxtDotjsIcon :size="24" color="black" />
          <RemixIcon :size="24" color="black" />
          <SvelteIcon :size="24" color="black" />
          <QuasarIcon :size="24" color="black" />
          <GnuBashIcon :size="24" color="black" />
        </div>
      </v-card>
    </v-col>

      <div style="height: 50vh"></div>


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

<script setup>
import { AngularIcon, ReactIcon, VueDotjsIcon, PreactIcon, LitIcon, SvelteIcon, QwikIcon, SolidIcon, BootstrapIcon, JavaScriptIcon, Typescript, Html5Icon, EmberDotjsIcon, PythonIcon, PhpIcon, RubyIcon, NodeDotjsIcon, GoIcon, RustIcon, KotlinIcon, PerlIcon, DartIcon, ScalaIcon, AstroIcon, NextDotjsIcon, NuxtDotjsIcon, RemixIcon, QuasarIcon, GnuBashIcon } from 'vue3-simple-icons'
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const register = () => {
  console.log('注册新用户');
};

const learnMore = () => {
  console.log('了解更多信息');
};

const cards = ref([
  { id: 1, icon: '', title: '🎨 模板库', description: '我们的模板库拥有丰富多样的设计模板，覆盖各种风格和主题。无论是寻找灵感，还是需要快速启动项目，这里都能满足您的需求。' },
  { id: 2, icon: '', title: '🤝 交流社区', description: '幻云科技的交流社区是一个充满活力的专业社交平台。在这里，您可以与来自世界各地的专业人士和创意人士交流想法，分享经验，共同成长。' },
  { id: 3, icon: '', title: '🌐 技术支持', description: '我们为前端和后端开发者提供了全面的技术支持。无论您使用的是哪种技术，我们都有专业的资源和团队支持您。' },
]);

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.from('.card-hover', {
    scrollTrigger: {
      trigger: '.card-hover',
      start: 'top 80%', // 当元素到达视口顶部80%的位置时开始动画
      toggleActions: 'play none none reverse', // 进入视口时播放动画，离开时反向播放
    },
    y: 100, // 元素的初始Y位置
    opacity: 0, // 初始不透明度
    duration: 1, // 动画持续时间
    stagger: 0.2, // 动画之间的延迟
    ease: 'power3.out', // 动画缓动函数
  });
  gsap.from('h1', {
    scrollTrigger: {
      trigger: 'h1',
      start: 'top 80%', // 当元素到达视口顶部80%的位置时开始动画
      toggleActions: 'play none none reverse', // 进入视口时播放动画，离开时反向播放
    },
    x: -100, // 元素的初始X位置，使其位于视图左侧之外
    opacity: 0, // 初始不透明度
    duration: 1, // 动画持续时间
    ease: 'power3.out', // 动画缓动函数
  });
  
  // 前端技术卡片动画
  gsap.from('.front-end .language-icons img', {
    scrollTrigger: {
      trigger: '.front-end',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      // markers: true, // 用于调试，显示动画触发区域
    },
    x: -100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
  });

  // 后端技术卡片动画
  gsap.from('.back-end .language-icons img', {
    scrollTrigger: {
      trigger: '.back-end',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      // markers: true, // 用于调试，显示动画触发区域
    },
    x: 100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
  });

  // 全栈技术卡片动画
  gsap.from('.full-stack .language-icons img', {
    scrollTrigger: {
      trigger: '.full-stack',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      // markers: true, // 用于调试，显示动画触发区域
    },
    x: -100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
  });
});

</script>

<style scoped>
.home {
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.text-gradient {
  background: linear-gradient(to right, rgb(235 125 247), rgb(0, 213, 255));
  -webkit-background-clip: text;
  color: transparent;
  /* font-size: 2em; */
}

h1 {
  font-weight: bold;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1rem;
}

.card-hover {
  transition: transform 0.3s ease-in-out;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button {
  border-radius: 4px;
  transition: background-color 0.3s;
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}

.v-icon {
  color: #1976d2;
  margin-bottom: 0.5rem;
}

.language-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.language-icons img {
  margin: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

/* 媒体查询，针对小屏幕优化 */
@media (max-width: 600px) {
  .v-card {
    padding: 12px;
  }
}

/* 针对超小屏幕的额外样式调整 */
@media (max-width: 400px) {
  h2 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }

  button {
    padding: 8px 16px;
    margin: 5px;
  }
}
</style>
