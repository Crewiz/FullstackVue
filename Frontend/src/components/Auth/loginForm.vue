<template>
  <v-form @submit.prevent="login">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="userData.email" label="Email"></v-text-field>
        <v-text-field v-model="userData.password" label="Password" type="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="primary">Sign in</v-btn>
        <a href="#" class="ml-auto">Forgot Password?</a>
      </v-card-actions>
      <div class="mt-2">
        <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
      </div>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import useAuthStore from '../../stores/authStore'; // Adjust the path as necessary
import apiService from '../../API/apiService'; // Adjust the path as necessary

export default {
  data() {
    return {
      userData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        console.log('Attempting login with:', this.userData);
        const response = await apiService.loginUser(this.userData);

        // Access user and token based on the revised structure
        const user = response.result.data.user;
        const token = response.result.data.token;

        console.log('Login successful:', user);
        console.log('Updating authStore with user:', user);
        console.log('Updating authStore with token:', token);

        const authStore = useAuthStore();
        authStore.loginUser(user, token);

        // Optional: Emit an event for successful login
        this.$emit('login-success');
        this.$router.push('/homePage');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>


<style scoped>

</style>
