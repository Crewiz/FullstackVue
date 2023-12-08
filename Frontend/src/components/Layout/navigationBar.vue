<template>
  <v-app>
    <v-app-bar app class="nav-bar">
      <v-container class="nav-container">
        <v-row justify="center" align="center" class="nav-row">
          <v-btn text to="/">placeholder</v-btn>
          <v-btn text to="/">placeholder</v-btn>
          <v-btn text to="/">placeholder</v-btn>
          <v-spacer></v-spacer>
          <themeToggle/>
          <v-btn text color="red" v-if="authStore.isAuthenticated" @click="logout">Logout</v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAuthStore from '../../stores/authStore'; 
import themeToggle from './themeToggle.vue';

export default defineComponent({
  components: {
    themeToggle
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logoutUser();
      this.$router.push('/');
    }
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  }
});

</script>

<style scoped>
</style>
