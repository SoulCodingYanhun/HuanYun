<template>
  <div v-if="tf !== false">
    <a-layout>
      <a-layout-sider>
        <a-menu
            :style="{ height: '100%' }"
            :default-open-keys="['0']"
            :default-selected-keys="['0_1']"
            show-collapse-button
            mode="pop" showCollapseButton
        >
          <template v-for="(item, index) in menuItems" :key="index">
            <a-sub-menu v-if="item.children" :key="item.key">
              <template #title>{{ item.title }}</template>
              <a-menu-item v-for="(child, childIndex) in item.children" :key="child.key" @click="handleMenuItemClick(child.file)">
                <span>{{ child.title }}</span>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else :key="item.key" @click="handleMenuItemClick(item.file)">
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <div class="markdown-content">
            <div v-html="renderedMarkdown"></div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
  <div v-else>
    <el-empty description="没有此API文档">
    </el-empty>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute()
const mdFiles = ref([])
const selectedFileContent = ref('')
const specialKeywords = ['async', 'await', 'readonly', 'as', 'is', 'keyof', 'typeof', 'infer'];
const specialTypes = ['unknown', 'never', 'any'];
let tf = ref(true);

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        let highlighted = hljs.highlight(str, { language: lang }).value;

        if (lang === 'typescript' || lang === 'ts') {
          specialKeywords.forEach(keyword => {
            const regex = new RegExp(`(\\b${keyword}\\b)(?![^<]*>|[^<>]*<\/)`, 'g');
            highlighted = highlighted.replace(regex, `<span class="hljs-keyword" data-type="special">$1</span>`);
          });

          specialTypes.forEach(type => {
            const regex = new RegExp(`(\\b${type}\\b)(?![^<]*>|[^<>]*<\/)`, 'g');
            highlighted = highlighted.replace(regex, `<span class="hljs-type" data-type="special">$1</span>`);
          });
        }

        return highlighted;
      } catch (__) {}
    }

    return '';
  }
})
const renderedMarkdown = computed(() => md.render(selectedFileContent.value))

const importMarkdownFiles = async () => {
  let files = ''
  if (route.params.id === "SAlgorithm"){
    files = await import.meta.glob(`@/API/SAlgorithm/**/*.md`);
    tf.value = true
  }
  else {
    tf.value = false
    return
  }
  mdFiles.value = Object.keys(files)
}

const handleMenuItemClick = async (file) => {
  const response = await axios.get(file)
  selectedFileContent.value = response.data
}

const menuItems = computed(() => {
  const items = []
  const folderMap = {}

  mdFiles.value.forEach(file => {
    const parts = file.split('/')
    const folderName = parts[parts.length - 2]
    const fileName = parts[parts.length - 1].replace('.md', '')

    if (folderName === route.params.id) {
      items.push({
        key: fileName,
        title: fileName,
        file
      })
    } else {
      if (!folderMap[folderName]) {
        folderMap[folderName] = {
          key: folderName,
          title: folderName,
          children: []
        }
        items.push(folderMap[folderName])
      }
      folderMap[folderName].children.push({
        key: fileName,
        title: fileName,
        file
      })
    }
  })

  return items
})

onMounted(async () => {
  await importMarkdownFiles()

  // 默认显示第一个菜单项
  if (menuItems.value.length > 0) {
    const firstItem = menuItems.value[0]
    if (firstItem.children && firstItem.children.length > 0) {
      await handleMenuItemClick(firstItem.children[0].file)
    } else {
      await handleMenuItemClick(firstItem.file)
    }
  }
})
</script>

<style>
.ant-layout-sider {
  background-color: #001529; /* 深蓝色背景 */
  border-right: 1px solid #ddd; /* 右边框 */
}

.ant-menu {
  background-color: transparent; /* 透明背景 */
  color: #fff; /* 菜单项文字颜色 */
}

.ant-menu-item {
  border-radius: 4px; /* 菜单项圆角 */
  margin-bottom: 8px; /* 菜单项之间的间距 */
}

.ant-menu-item:hover,
.ant-menu-item-selected {
  background-color: rgba(255, 255, 255, 0.2); /* 鼠标悬停和选中时的背景颜色 */
}

.special-effect {
  opacity: 0;
}

.special-effect[data-effect="typing"] {
  opacity: 1;
  white-space: nowrap;
  overflow: hidden;
}

.special-effect[data-effect="scroll"] {
  transition: opacity 0.5s, transform 0.5s;
}
</style>