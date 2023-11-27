<template>
  <v-form @submit.prevent="login">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password"></v-text-field>
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
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      //  validation o authentication logic här 
    },
  },
};
</script>


