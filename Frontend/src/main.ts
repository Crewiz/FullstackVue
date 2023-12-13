import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia'
import homePage from './components/Layout/homePage.vue';
// import loginForm from './components/Auth/loginForm.vue';
import registrationForm from './components/Auth/registrationForm.vue';
import userProfile from './components/user/userProfile.vue';


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
          text: '#F0EBEA'
        },
      },
      light: {
        colors: {
          primary: '#987773', 
          secondary: '#BFC3AD', 
          accent: '#98A98A', 
          background: '#FBF9F9',
          text: '#140F0E'
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(vuetify).use(createPinia()).use(router).mount('#app');
