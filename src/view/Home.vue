<template>
  <v-container class="home" fluid>
    <div class="page-enter-animation">
      <v-row justify="center" align="center" style="height: 100vh">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text-center h11">欢迎来到<span class="text-gradient">幻云科技</span></h1>
          <p class="text-center p11">
            开启您的创新之旅。在这里，您将发现一个充满无限可能性的空间，旨在激发您的创意火花，提升工作效率。
          </p>
        </v-col>
      </v-row>
    </div>

    <section class="features-section py-16">
      <v-container>
        <v-row justify="center" class="mb-12">
          <v-col cols="12" md="8">
            <h2 class="text-h3 font-weight-light text-center section-title-animation">
              我们的<span class="font-weight-bold primary--text">特色</span>
            </h2>
            <p class="text-subtitle-1 text-center mt-4 grey--text text--darken-1">
              探索幻云科技为您带来的独特优势
            </p>
          </v-col>
        </v-row>

        <v-row class="card-animation">
          <v-col v-for="card in cards" :key="card.id" cols="12" sm="6" md="4" class="mb-6">
            <v-card class="feature-card fill-height d-flex flex-column" elevation="2">
              <v-card-text>
                <div class="d-flex align-center mb-4">
                  <v-avatar :color="card.color" size="48" class="mr-4">
                    <v-icon dark>{{ card.icon }}</v-icon>
                  </v-avatar>
                  <h3 class="text-h5 font-weight-medium">{{ card.title }}</h3>
                </div>
                <p class="body-1 grey--text text--darken-1">{{ card.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn text :color="card.color" class="ml-2 mt-2">
                  了解更多
                  <v-icon right small>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-row>
      <v-col cols="12">
        <h2 class="text-center section-title-animation">我们的模板支持语言</h2>
      </v-col>
    </v-row>

    <div class="language-icons-animation">
      <!-- 前端技术卡片 -->
      <v-col cols="12" sm="140">
        <v-card class="card-hover front-end" elevation="4">
          <p class="text-center">前端</p>
          <div class="language-icons">
            <img v-for="icon in FrontendIcons" :key="icon.icon" :src="`https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${icon.icon}.svg`" :alt="icon.title" />
          </div>
        </v-card>
      </v-col>

      <!-- 后端技术卡片 -->
      <v-col cols="12" sm="140">
        <v-card class="card-hover back-end" elevation="4">
          <p class="text-center">后端</p>
          <div class="language-icons">
            <img v-for="icon in BackendIcons" :key="icon.icon" :src="`https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${icon.icon}.svg`" :alt="icon.title" />
          </div>
        </v-card>
      </v-col>

      <!-- 全栈技术卡片 -->
      <v-col cols="12" sm="140">
        <v-card class="card-hover full-stack" elevation="4">
          <p class="text-center">全栈</p>
          <div class="language-icons">
            <img v-for="icon in FullstackIcons" :key="icon.icon" :src="`https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${icon.icon}.svg`" :alt="icon.title" />
          </div>
        </v-card>
      </v-col>
    </div>

    <div style="height: 50vh"></div>

    <v-col cols="12">
      <v-card class="team-card pa-6" elevation="4">
        <h3 class="text-h5 font-weight-bold mb-4 text-center primary--text">
          <v-icon large color="primary" class="mr-2">mdi-account-group</v-icon>
          开创人 / 程序员
        </h3>
        <v-divider class="mb-6"></v-divider>
        <v-row justify="center" align="center">
          <v-col v-for="member in teamMembers" :key="member.name" cols="auto" class="text-center">
            <v-hover v-slot="{ hover }">
              <v-avatar size="60" class="ma-3 team-member-avatar" :class="{ 'on-hover': hover }">
                <v-img :src="member.avatar" :alt="member.name">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </v-hover>
            <p class="mt-2 font-weight-medium">{{ member.name }}</p>
            <p class="caption text-caption">{{ member.role }}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <div style="height: 50vh"></div>

    <div class="join-us-section button-animation">
      <v-row justify="center" align="center" class="mt-10">
        <v-col cols="12" sm="8" md="6" lg="5">
            <h2 class="text-h4 font-weight-bold mb-4 text-center primary--text">
              🌟 加入我们
            </h2>
            <p class="text-body-1 text-center mb-6">
              幻云科技期待您的加入。让我们一起探索科技的边界，共同创造一个更加美好的未来。
            </p>
            <div class="d-flex justify-center">
              <v-btn
                  x-large
                  color="primary"
                  class="mr-4 text-capitalize font-weight-bold"
                  elevation="2"
                  @click="register"
              >
                立即注册
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn
                  x-large
                  outlined
                  color="secondary"
                  class="text-capitalize font-weight-bold"
                  @click="learnMore"
              >
                了解更多
                <v-icon right>mdi-information-outline</v-icon>
              </v-btn>
            </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from "gsap";

import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import Cookies from 'js-cookie';

import { useRouter } from 'vue-router'

const router = useRouter()

gsap.registerPlugin(Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin);

const teamMembers = [
  { name: 'SoulCodingYanhun-开创人', avatar: 'https://avatars.githubusercontent.com/u/155857563?v=4' },
];


const FrontendIcons = [
  { icon: 'angular', title: 'Angular' },
  { icon: 'react', title: 'React' },
  { icon: 'vuedotjs', title: 'Vue' },
  { icon: 'preact', title: 'Preact' },
  { icon: 'lit', title: 'Lit' },
  { icon: 'svelte', title: 'Svelte' },
  { icon: 'qwik', title: 'Qwik' },
  { icon: 'solid', title: 'Solid' },
  { icon: 'bootstrap', title: 'Bootstrap 5' },
  { icon: 'javascript', title: 'Javascript' },
  { icon: 'typescript', title: 'Typescript' },
  { icon: 'html5', title: 'Static' },
  { icon: 'emberdotjs', title: 'Ember' },
];

const BackendIcons = [
  { icon: 'nestjs', title: 'Nestjs' },
  { icon: 'express', title: 'Express' },
  { icon: 'koa', title: 'Koa' },
  { icon: 'graphql', title: 'Graphql' },
];

const FullstackIcons = [
  { icon:'astro', title: 'Astro Basics'},
  { icon:'astro', title: 'Astro Minimal'},
  { icon:'nextdotjs', title: 'Next.js'},
  { icon:'nuxtdotjs', title: 'Nuxt3'},
  { icon:'nuxtdotjs', title: 'Nuxt2'},
  { icon:'remix', title: 'Remix'},
  { icon:'svelte', title: 'Sveltekit'},
  { icon:'quasar', title: 'Quasar'},
  { icon:'gnubash', title: 'WebContainer API'},
]

const register = () => {
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : { login: false, time: 0 };

  if (!user.login) {
    // 如果 login 为 false，则跳转到注册页面
    router.push('/register');
  } else {
    // 如果 login 为 true，则跳转到个人资料页面
    router.push('/profile');
  }

  // 如果 cookie 中没有 user 数据，则新建一个 user 数据
  if (!Cookies.get('user')) {
    Cookies.set('user', JSON.stringify({ login: false, time: 0 }));
  }
};

const learnMore = () => {
  console.log('了解更多信息');
};

const cards = ref([
  { id: 1, icon: '', title: '🎨 模板库', description: '我们的模板库拥有丰富多样的设计模板，覆盖各种风格和主题。无论是寻找灵感，还是需要快速启动项目，这里都能满足您的需求。' },
  { id: 2, icon: '', title: '🤝 交流社区', description: '幻云科技的交流社区是一个充满活力的专业社交平台。在这里，您可以与来自世界各地的专业人士和创意人士交流想法，分享经验，共同成长。' },
  { id: 3, icon: '', title: '🌐 技术支持', description: '我们为前端和后端开发者提供了全面的技术支持。无论您使用的是哪种技术，我们都有专业的资源和团队支持您。' },
]);

onMounted(() => {


  gsap.from('.h11', { opacity: 0, y: -50, duration: 1, delay: 0.2 });
  gsap.from('.p11', { opacity: 0, y: 50, duration: 1, delay: 0.4 });
  // Page enter animation
  gsap.from('.page-enter-animation', {
    y: '100%',
    duration: 1,
    ease: 'power3.out',
  });

  // 标题和段落动画
  gsap.from('.title-animation', {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.title-animation',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.paragraph-animation', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.paragraph-animation',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // 章节标题动画
  gsap.from('.section-title-animation', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section-title-animation',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // 卡片动画
  gsap.from('.card-animation .card-hover', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.card-animation',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // Language icons animations
  gsap.from('.language-icons-animation .front-end .language-icons img', {
    x: -100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.front-end',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.language-icons-animation .back-end .language-icons img', {
    x: 100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.back-end',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.language-icons-animation .full-stack .language-icons img', {
    x: -100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.full-stack',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // Team member card animation
  gsap.from(".team-member-animation", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".team-member-animation",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Team member item animation
  gsap.from(".team-member-item-animation", {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".team-member-item-animation",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Button animations
  gsap.from('.button-animation .el-button', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.button-animation',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // 新添加的动画效果
  gsap.from('.join-us-section', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.join-us-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.join-us-card', {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.join-us-card',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.button-animation .v-btn', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.button-animation',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

</script>

<style scoped>
.join-us-section {
  //background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 60px 0;
  border-radius: 16px;
  margin-top: 40px;
}

.join-us-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.join-us-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

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

.team-card {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.team-member-avatar {
  border: 4px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.team-member-avatar.on-hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

.feature-card {
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
}

.v-card__text {
  flex-grow: 1;
}

.v-avatar {
  transition: all 0.3s ease;
}

.feature-card:hover .v-avatar {
  transform: scale(1.1);
}
</style>