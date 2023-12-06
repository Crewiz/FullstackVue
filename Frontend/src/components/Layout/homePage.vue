<template>
    <v-container>
    <!--Bah en liten navbar template-->
    <v-app-bar app>
        <v-toolbar-title>AI Recipe Assistant</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>My recipes</v-btn>
        <v-btn text>Profile</v-btn>
        <v-btn text>Recipe Planner</v-btn>
        <v-btn text color="red">Logout</v-btn>
    </v-app-bar>

    <!-- Welcome message -->

    <v-row>
        <v-col>
        <h1>Welcome back, {{ userName }}!</h1>
        </v-col>
    </v-row>

    <!-- Featured recipes -->
    <v-row>
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
    </v-row>

    <!-- Quick access -->

    <v-row>
      <v-col>
        <v-btn color="primary" class="mx-2">Add a Recipe</v-btn>
        <v-btn color="primary" class="mx-2">Plan a Meal</v-btn>
        <v-btn color="primary" class="mx-2">Create Shopping List</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userName: 'John Doe',
      featuredRecipes: [
        // This should be populated with actual recipe data
        { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish...', image: 'carbonara.jpg' },
        // Add more recipe objects here
      ]
    }
  },
  // Add methods, computed properties, etc. as needed
}
</script>

<style scoped>
</style>

