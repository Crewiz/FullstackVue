import { createApp } from 'vue';
import App from './App.vue';

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
          primary: '#2196F3', // Primary color for the light theme
          secondary: '#FFC107', // Secondary color for the light theme
          accent: '#FF5252', // Accent color for the light theme
          // ... other colors for the light theme
      
        },
      },
      light: {
        colors: {
          primary: '#ff5722', // Primary color for the dark theme
          secondary: '#424242', // Secondary color for the dark theme
          accent: '#82B1FF', // Accent color for the dark theme
          // ... other colors for the dark theme
        },
      },
    },
  },
});

createApp(App).use(vuetify).mount('#app');
