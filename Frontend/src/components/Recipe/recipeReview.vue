<template>
  <v-container>
    <h1 class="text-h3">Review Recipe</h1>
    <v-form @submit.prevent="handleSubmit">
      <div class="text-h4">{{ title }}</div>
      <v-list lines="one" tag="ol">
        <v-list-item v-for="(steps, index) in instructions" :key="index">
          <template v-if="editableIndex !== index">
          {{ index + 1 }}. {{ steps }}
          <v-btn color="primary" @click="startEditStep(steps, index)">Edit</v-btn>
        </template>
        <template v-else>
          <v-text-field v-model="editableStep" label="Edit step"></v-text-field>
          <v-btn color="success" @click="saveEditStep(index)">Save Edit</v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-list lines="one" tag="ul">
        <h5>Ingredients:</h5>
        <v-list-item v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</v-list-item>
      </v-list>
      <v-btn color="primary" type="submit">Save Recipe</v-btn>
    </v-form>
    <span v-if="submissionMessage" class="success-message">{{ submissionMessage }}</span>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useRecipeStore from '../../stores/recipeStore';
  import useAuthStore from '../../stores/authStore'
  import apiService from '../../API/apiService';

  export default defineComponent({
    data() {
      return {
        title: useRecipeStore().getRecipe.title,
        instructions: useRecipeStore().getRecipe.instructions,
        ingredients: useRecipeStore().getRecipe.ingredients,
        steps: [],
        isEditable: false,
        editableIndex: null as number | null,
        editableStep: '',
        submissionMessage: ''
      };
    },
    mounted() {
      const recipeStore = useRecipeStore();
      console.log(recipeStore.getRecipe.title);
      console.log(recipeStore.getRecipe.instructions);
      console.log(recipeStore.getRecipe.ingredients);
    },
    methods: {
      startEditStep(step: string, index: number) {
        console.log(`Starting to edit step at index ${index}`);
        this.editableStep = step;
        this.editableIndex = index;
      },
      saveEditStep(index: number) {
        console.log(`Saving edited step at index ${index}: ${this.editableStep}`);
        if (index >= 0 && index < this.instructions.length) {
          this.instructions[index] = this.editableStep;
        }
        this.editableIndex = null;
        console.log('Updated instructions:', this.instructions);
      },
      async handleSubmit() {

        const authStore = useAuthStore();
        const authorId = authStore.user?.id;

        if (typeof authorId !== 'number') {
          console.error('Author ID is missing or invalid');
          return;
        }

        //serialize arrays into strings for the backend
        const ingredientsStr = JSON.stringify(this.ingredients);
        const stepsStr = JSON.stringify(this.instructions);

        // Handle form submission, possibly send data to the server
        // You can access the modified data in this.title, this.description, etc.
        const recipeData = {
          title: this.title,
          description: this.instructions.join('\n'),
          ingredients: ingredientsStr,
          steps: stepsStr,
          authorId: authorId,
        }
        console.log('Submitting recipe:', recipeData);


        try {
    console.log('sending request with data:', recipeData);
    const response = await apiService.createRecipe(recipeData);
    console.log('Response from creating recipe:', response);
    // If the request was processed successfully
    if (response.status === 200 || response.status === 201) {
      this.submissionMessage = 'Recipe uploaded to DB!';
      console.log('Recipe successfully uploaded to DB');
      /* this.$router.push('/homePage') */;
    } else {
      // Handle other status codes appropriately
      throw new Error(`Failed to upload recipe, ${response.status}`);
    }
  } catch (error) {
    console.error("Error submitting form", error);
    this.submissionMessage = 'Failed uploading recipe. Please try again.';
  }
      },
    },
  });
</script>
