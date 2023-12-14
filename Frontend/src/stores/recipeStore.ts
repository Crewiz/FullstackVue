import { defineStore } from 'pinia';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  author: string;
}

const useRecipeStore = defineStore({
  id: 'recipe',
  state: () => ({
    recipes: [] as Recipe[],
  }),
  actions: {
    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
    },
  },
});

export default useRecipeStore;