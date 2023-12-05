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
        <p>Don't have an account? <a href="#">Sign Up</a></p>
      </div>
    </v-card>
  </v-form>
</template>


<script lang="ts">
import apiService from '../API/apiService';
import { AxiosResponse } from 'axios';

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
        const { userData } = this;
        const response: AxiosResponse<UserResponse> = await apiService.loginUser(userData);
        
        // Assuming successful login just logs the response for demonstration
        console.log('Login successful:', response.data);
        
        // You can redirect or perform other actions upon successful login
      } catch (error) {
        // Handle login error (display error message, etc.)
        console.error('Login failed:', error.message);
      }
    },
  },
};
</script>


