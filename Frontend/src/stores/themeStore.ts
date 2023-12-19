import { defineStore } from 'pinia';

interface ThemeState {
  isDark: boolean;
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    isDark: false,
  }),
  actions: {
    toggleTheme() {
      console.log('Toggling theme. Current state (before toggle):', this.isDark);
      this.isDark = !this.isDark;
      console.log('New state (after toggle):', this.isDark);
    },
  },
});
