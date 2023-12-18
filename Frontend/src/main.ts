import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia';
import homePage from './components/Layout/homePage.vue';
// import loginForm from './components/Auth/loginForm.vue';
import registrationForm from './components/Auth/registrationForm.vue';
import userProfile from './components/user/userProfile.vue';
import recipeReview from './components/Recipe/recipeReview.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // Default theme
    themes: {
      dark: {
        colors: {
          primary: '#8D6C68',
          secondary: '#4E523D',
          accent: '#647557',
          background: '#060404',
          surface: '#2A2A2A',
          text: '#F0EBEA',
        },
      },
      light: {
        colors: {
          primary: '#A68B6E',
          secondary: '#C9B79C',
          accent: '#D3C0AE',
          background: '#FFF6E5',
          surface: '#f0f0f0',
          text: '#503D2E',
        },
      },
    },
  },
});

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: homePage,
  },
  {
    path: '/register',
    name: 'register',
    component: registrationForm,
  },
  {
    path: '/profile',
    name: 'profile',
    component: userProfile,
  },
  {
    path: '/:pathMatch(.*)*', // redirectar alla odefinerade routes till homepage
    redirect: '/',
  },
  {
    path: '/recipeReview',
    name: 'recipeReview',
    component: recipeReview,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(vuetify).use(createPinia()).use(router).mount('#app');
