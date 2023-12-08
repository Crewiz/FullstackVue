<template>
  <v-container class="container">
    <navigationBar />
    <div v-if="!authStore.isAuthenticated">
      <h2>Welcome to Kitchencraft, log in or create an account to continue!</h2>
      <loginForm />
    </div>

    <div v-else>
      <v-row>
        <v-col>
          <h1>Welcome back, {{ formattedUserFirstName }}!</h1>
          <p v-if="!userFirstName"> User first name is empty</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="text-center">
          <recipeChat />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import useAuthStore from '../../stores/authStore';
import loginForm from '../Auth/loginform.vue';
import recipeChat from '../Chat/recipeChat.vue';
import navigationBar from './navigationBar.vue';
import { computed } from 'vue';

export default {
  name: 'Home',
  components: {
    loginForm,
    recipeChat,
    navigationBar,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      featuredRecipes: [
        { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish...', image: 'carbonara.jpg' },
        // Add more recipe objects here
      ],
    };
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logoutUser();
      this.$router.push('/');
    },
  },
  computed: {
    userFirstName() {
      const authStore = useAuthStore();
      return authStore.user ? authStore.user.firstName : '';
    },
    formattedUserFirstName() {
      return this.userFirstName ? this.userFirstName.charAt(0).toUpperCase() + this.userFirstName.slice(1) : '';
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
