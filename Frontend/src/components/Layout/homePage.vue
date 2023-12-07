<template>
  <v-container>
    <!-- Navbar template -->
    <v-app-bar app>
      <v-toolbar-title>AI Recipe Assistant</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>My recipes</v-btn>
      <v-btn text>Profile</v-btn>
      <v-btn text>Recipe Planner</v-btn>
      <v-btn text color="red" v-if="authStore.isAuthenticated" @click="logout">Logout</v-btn>
    </v-app-bar>

    <!-- Conditional Rendering Based on Authentication -->
    <div v-if="!authStore.isAuthenticated">
      <login-form></login-form>
    </div>

    <div v-else>
      <!-- Welcome message -->
      <v-row>
        <v-col>
          <h1>Welcome back, {{ userFirstName }}!</h1>
          <p v-if="!userFirstName"> User first name is empty</p>
        </v-col>
      </v-row>
      <recipeChat/>

      <!-- Featured recipes -->
      <!-- <v-row>
        <v-col
          v-for="recipe in featuredRecipes"
          :key="recipe.id"
          cols="12" md="4">
          <v-card>
            <v-img :src="recipe.image" height="200px"></v-img>
            <v-card-title>{{ recipe.title }}</v-card-title>
            <v-card-text>{{ recipe.description }}</v-card-text>
            <v-card-actions>
              <v-btn text>View Recipe</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row> -->

      <!-- Quick access -->
      <v-row>
        <v-col>
          <v-btn color="primary" class="mx-2">Add a Recipe</v-btn>
          <v-btn color="primary" class="mx-2">Plan a Meal</v-btn>
          <v-btn color="primary" class="mx-2">Create Shopping List</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import useAuthStore from '../../stores/authStore'; 
import loginForm from '../Auth/loginform.vue'; 
import recipeChat from'../Chat/recipeChat.vue';
import { computed } from 'vue';

export default {
  name: 'Home',
  components: {
    loginForm,
    recipeChat
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
    }
  },
  computed: {
    userFirstName() {
      const authStore = useAuthStore();
      console.log('authStore:', authStore);
      console.log('authStore.user:', authStore.user);
      return authStore.user ? authStore.user.firstName : '';
    }
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
