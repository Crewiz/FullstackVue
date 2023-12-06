<script setup>
  import registrationForm from './components/Auth/registrationForm.vue';
  import loginForm from './components/Auth/loginForm.vue';
  import navigationBar from './components/Layout/navigationBar.vue';
  import themeToggle from './components/Layout/themeToggle.vue';
  import recipeChat from './components/Chat/recipeChat.vue';
</script>


<template>
  <v-app>
    
    <v-main> 
      <v-container fluid> 
        <v-row justify="center" align="center" style="min-height: 100vh;"> <!-- Vertical and horizontal centering -->
          <v-col cols="12" sm="8" md="6" lg="4"> <!-- Adjusted for different screen sizes -->
            <theme-toggle/>
            <!-- <loginForm/> -->
              <!-- <router-link to="/">Home</router-link> -->
              <!-- <router-link to="/loginForm">Login</router-link> -->
              <!-- <router-link to="/registrationForm">Register</router-link>
              <router-link to="/recipeChat">Chat</router-link> -->
              <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>

</style>
