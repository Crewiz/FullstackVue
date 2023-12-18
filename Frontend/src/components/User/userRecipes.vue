<template>
    <div class="profile-posts">
      <h2>Saved recipes</h2>
      <v-list v-if="recipes.length" class="post-container">
        <v-list-item v-for="recipe in recipes" :key="recipe.id" class="recipe-container">
          <v-list-item-content @click="openRecipeDialog(recipe)">
            <v-list-item-title>{{ recipe.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ recipe.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-else>
        <p>Inga recept tillgängliga.</p>
      </div>
    </div>
  </template>
  
  <script>
export default {
  props: {
    recipes: Array,
    isAuthenticated: Boolean,
    user: Object,
    openRecipeDialog: Function,
  },
};
  </script>
  
  <style scoped>
  .recipe-container {
    width: 350px;
    height: 200px;
    border: 2px solid black;
    margin: 1rem;
    display: flex;
    justify-content: center;
  }

  .profile-posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  margin: 50px 0 20px 0;
  width: 100%;
  min-height: auto;
}

.post-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

  </style>
  