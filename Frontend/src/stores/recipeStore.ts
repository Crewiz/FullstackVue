import { defineStore } from 'pinia';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  author: string;
}

interface CreateRecipeInterface {
  title: string;
  instructions: string[];
  ingredients: string[];
}

const useRecipeStore = defineStore({
  id: 'recipe',
  state: () => ({
    recipes: [] as Recipe[],
    recipe: {} as CreateRecipeInterface,
  }),
  getters: {
    getRecipe() {
      return this.recipe;
    },
  },
  actions: {
    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
    },
    setRecipe(recipe: CreateRecipeInterface) {
      this.recipe = recipe;
    },
  },
});

export default useRecipeStore;