import { createApp, watch, reactive } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia';
import { useThemeStore } from './stores/themeStore.ts';

//component imports
import homePage from './components/Layout/homePage.vue';
import registrationForm from './components/Auth/registrationForm.vue';
import userProfile from './components/User/userProfile.vue';
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
          background: '#3b3a3a',
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
          surface: '#f0dfc0',
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

const pinia = createPinia();

// Define a reactive object for theme state
const themeState = reactive({
  isDark: false
});

// Access the theme store
const themeStore = useThemeStore(pinia);

// Watch for changes in theme state
watch(
  () => themeStore.isDark,
  (newVal: boolean) => {
    console.log('Theme changed in watch. New Theme:', newVal ? 'dark' : 'light');
    vuetify.theme.global.name.value = newVal ? 'dark' : 'light';
    themeState.isDark = newVal; // Update the reactive object
    console.log('Vuetify theme set to:', vuetify.theme.global.name.value);
  },
  { immediate: true }
);

// Create Vue app
const app = createApp(App);

// Set the theme state as a global property
app.config.globalProperties.$themeState = themeState;

// Apply Pinia, Vuetify, and router to the app
app.use(pinia).use(vuetify).use(router).mount('#app');
