import { defineStore } from 'pinia';
// import apiService from '../API/apiService';

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
    getRecipe(): CreateRecipeInterface {
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
