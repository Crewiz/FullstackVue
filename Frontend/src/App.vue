<script setup>
  import registrationForm from './components/registrationForm.vue'
  import loginForm from './components/loginForm.vue'
  import navigationBar from './components/navigationBar.vue'
  import themeToggle from './components/themeToggle.vue'
  import recipeChat from './components/recipeChat.vue'
</script>


<template>
  <v-app>
    <navigation-bar/>
    <v-main> 
      <v-container fluid> 
        <v-row justify="center" align="center" style="min-height: 100vh;"> <!-- Vertical and horizontal centering -->
          <v-col cols="12" sm="8" md="6" lg="4"> <!-- Adjusted for different screen sizes -->
            <theme-toggle/>
            <recipe-chat/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>

</style>
