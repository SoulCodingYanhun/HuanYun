import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../view/Home.vue'),
  },
  {
    path: '/api',
    name: 'API',
    component: () => import('../view/API.vue')
  },
  {
    path: '/api/:id',
    name: 'APIDetails',
    component: () => import('../view/APIDetails.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../view/Forum.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../view/Register.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;