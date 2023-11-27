<template>
  <v-btn @click="toggleTheme">
  Toggle Theme</v-btn>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const darkMode = ref(false);

const toggleTheme = () => {
  darkMode.value = !darkMode.value;
  theme.global.name.value = darkMode.value ? "dark" : "light";
};
</script>
