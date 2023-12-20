<template>
  <v-container class="container">
    <navigationBar />
    <div v-if="!authStore.isAuthenticated">
      <h2>Welcome to Kitchencraft, log in or create an account to continue!</h2>
      <loginForm />
    </div>

    <div v-else>
      <v-row class="d-flex">
        <v-col>
          <h1 class="d-flex justify-center pt-10">Welcome back, {{ formattedUserFirstName }}!</h1>
          <p v-if="!userFirstName"> User first name is empty</p>
          <!-- <typewriter/> -->
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
import loginForm from '../Auth/loginForm.vue';
import recipeChat from '../Chat/recipeChat.vue';
import navigationBar from './navigationBar.vue';
import typewriter from './typewriter.vue';

export default {
  name: 'Home',
  components: {
    loginForm,
    recipeChat,
    navigationBar,
    typewriter,
  },
  data() {
    return {
      featuredRecipes: [
        { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish...', image: 'carbonara.jpg' },
      ],
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    userFirstName() {
      return this.authStore.user ? this.authStore.user.firstName : '';
    },
    formattedUserFirstName() {
      return this.userFirstName ? this.userFirstName.charAt(0).toUpperCase() + this.userFirstName.slice(1) : '';
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.authStore.logoutUser();
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
.container {
  min-height: 100vh;
}
</style>
