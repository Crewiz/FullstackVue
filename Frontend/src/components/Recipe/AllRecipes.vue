<template>
  <div>
    <h1>All Recipes</h1>
    <div v-if="loading">
      Loading recipes...
    </div>
    <div v-else-if="error">
      Error: {{ error }}
    </div>
    <ul v-else>
      <li v-for="recipe in recipes" :key="recipe.id">
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <p>Ingredients: {{ formatList(recipe.ingredients) }}</p>
        <p>Steps: {{ formatList(recipe.steps) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import apiService from '../../API/apiService';
import useRecipeStore from '../../stores/recipeStore';
import { ref, onMounted } from 'vue';

export default {
  name: 'AllRecipes',
  setup() {
    console.log("AllRecipes component is being rendered");
    const recipeStore = useRecipeStore();
    const loading = ref(true);
    const error = ref(null);

    const fetchAllRecipes = async () => {
      try {
        const fetchedRecipes = await apiService.getAllRecipes();
        console.log("Fetched all recipes:", fetchedRecipes);

        const adaptedRecipes = fetchedRecipes.map(recipe => ({
          ...recipe,
          ingredients: parseList(recipe.ingredients),
          steps: parseList(recipe.steps),
        }));

        recipeStore.setRecipes(adaptedRecipes);
        loading.value = false;
      } catch (e) {
        error.value = e.message;
        loading.value = false;
      }
    };
    const parseList = (list) => {
  console.log('Raw list:', list);

  // If it's an array, return it directly
  if (Array.isArray(list)) {
    return list;
  }

  // If it's a string, assume JSON format and return the parsed array
  if (typeof list === 'string') {
    try {
      return JSON.parse(list);
    } catch (e) {
      // If parsing fails, assume it's a CSV string and split by commas
      console.error('Error parsing list:', e);
      console.error('List:', list);
      return list.split(', ').map(item => item.trim());
    }
  }

  // If it's another type, return it directly
  return list;
};

    const formatList = (list) => list.join(', ');

    onMounted(() => {
      fetchAllRecipes();
    });

    return { recipes: recipeStore.recipes, loading, error, formatList };
  },
};
</script>