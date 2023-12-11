<template>
  <div>
    <h3>{{ recipeName }}</h3>
    <p>Prep Time: {{ prepTime }}</p>
    <p>Servings: {{ servings }}</p>
    <h4>Ingredients</h4>
    <ul class="list">
      <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    ingredients: {
      type: Array,
      default: () => []
    },
    recipeName: String,
    prepTime: String,
    servings: String
  },
  mounted() {
    console.log('IngredientsList Props:', {
      recipeName: this.recipeName,
      prepTime: this.prepTime,
      servings: this.servings
    });
  }
};
</script>

<style>
  .list {
    list-style: none;
  }
</style>

