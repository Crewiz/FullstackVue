<template>
  <v-container>
    <h1 class="text-h3">Review Recipe</h1>
    <v-form @submit.prevent="handleSubmit">
      <div class="text-h4">{{ title }}</div>
      <v-list lines="one" tag="ol">
        <v-list-item v-for="(steps, index) in description">
          {{ index + 1 }}. {{ steps }}
          <v-btn color="primary">Edit</v-btn>
        </v-list-item>
      </v-list>
      <v-list lines="one" tag="ul">
        <h5>Ingredients:</h5>
        <v-list-item v-for="ingredient in ingredients"> {{ ingredient }}</v-list-item>
      </v-list>
      <v-btn color="primary" type="submit">Save Recipe</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useRecipeStore from '../../stores/recipeStore';
  export default defineComponent({
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
        isEditable: false,
        editableTitle: '',
        editableDescription: [] as string[],
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
  });
</script>
