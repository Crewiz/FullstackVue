<template>
  <v-card outlined class="ma-2">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ datePosted }}</v-card-subtitle>
    <v-card-text>
      {{ description }}
      <div><strong>Ingredients:</strong> {{ ingredientsOverview }}</div>
    </v-card-text>
    <v-card-actions>
      <v-rating
        value="rating"
        readonly
        dense
      ></v-rating>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script lang="ts">
export default {
    name: 'RecipeCard',
    props: {
        title: String,
        description: String,
        rating: Number,
        ingrdientsOverview: String,
        datePosted: String,
    },
    // addition component options like data, computed, methods etc.
}
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
  font-size: 1.2em;
}
.v-card-subtitle {
  font-size: 0.9em;
  color: grey;
}
.v-card-text {
  font-size: 1em;
}
</style>
