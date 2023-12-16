<template>
  <v-container>
    <h1>Review Recipe</h1>
    <v-form @submit.prevent="handleSubmit">
      <div>{{ title }}</div>
      <div v-for="steps in description">{{ steps }}</div>
      <div v-for="ingredient in ingredients">{{ ingredient }}</div>
      <v-btn color="primary" type="submit">Save Recipe</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import useRecipeStore from '../../stores/recipeStore';
  export default {
    /* props: {
      title: String,
      ingredients: String,
      steps: String,
    }, */
    data() {
      return {
        // Initialize data properties to store received props
        // Ensure they match the prop names
        title: useRecipeStore().getRecipe.title,
        description: useRecipeStore().getRecipe.instructions,
        ingredients: useRecipeStore().getRecipe.ingredients,
        steps: [],
      };
    },
    mounted() {
      // Assign received props to component's data
      const recipeStore = useRecipeStore();
      console.log(recipeStore.getRecipe.title);
      console.log(recipeStore.getRecipe.instructions);
      console.log(recipeStore.getRecipe.ingredients);
    },
    methods: {
      handleSubmit() {
        // Handle form submission, possibly send data to the server
        // You can access the modified data in this.title, this.description, etc.
      },
    },
  };
</script>
