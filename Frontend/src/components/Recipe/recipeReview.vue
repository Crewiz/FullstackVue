<template>
  <v-container>
    <h1>Review Recipe</h1>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        label="Recipe Title"
        v-model="title"
        required
      ></v-text-field>

      <v-textarea
        label="Description"
        v-model="description"
        required
      ></v-textarea>

      <v-textarea
        label="Ingredients "
        v-model="ingredientsString"
        required
      ></v-textarea>

      <v-textarea
        label="Preparation Steps "
        v-model="stepsString"
        required
      ></v-textarea>

      <v-btn color="primary" type="submit">Save Recipe</v-btn>
    </v-form>
  </v-container>
</template>
  
  <script>
  export default {
    props: {
      title: String,
      ingredients: String,
      steps: String,
    },
    data() {
      return {
        // Initialize data properties to store received props
        // Ensure they match the prop names
        title: '',
        description: '',
        ingredients: [],
        steps: [],
      };
    },
    mounted() {
      // Assign received props to component's data
      this.title = this.$route.params.title;
      this.description = this.$route.params.description;
      this.ingredients = this.$route.params.ingredients;
      this.steps = this.$route.params.steps;
    },
    methods: {
      handleSubmit() {
        // Handle form submission, possibly send data to the server
        // You can access the modified data in this.title, this.description, etc.
      },
    },
  };
  </script>
  