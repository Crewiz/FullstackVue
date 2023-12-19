<template>
    <h2 class="saved-recipes">Saved recipes</h2>
    <div class="profile-posts">
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
    max-width: 20rem;
    height: 200px;
    border: 2px solid black;
    margin: 1rem;
    display: flex;
  }

  .profile-posts {
  display: flex;
  border-top: 2px solid black;
  margin: 50px 0 20px 0;
  text-align: center;
  background-color: #F0DFC0;
}

.post-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.saved-recipes {
  display: flex;
  margin-bottom: -40px;
  justify-content: center;
}

  </style>
  