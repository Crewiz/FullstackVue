<template>
  <v-app-bar app class="nav-bar">
    <v-container class="nav-container ">
      <v-list class="nav-list d-flex justify-center">
        <v-list-item>
          <v-btn class="" to="/">placeholder</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn class="" to="/">placeholder</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn class="" to="/">placeholder</v-btn>
        </v-list-item>
        <v-list-item class="ml-auto">
          <themeToggle />
          <router-link v-if="authStore.isAuthenticated" to="/profile">
            <v-btn class="">Profile</v-btn>
          </router-link>
          <v-btn color="red" v-if="authStore.isAuthenticated" @click="logout">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-container>
  </v-app-bar>
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
