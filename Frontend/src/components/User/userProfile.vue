<template>
  <div>
    <navigation-bar />
    <v-container v-if="isAuthenticated && user">
      <v-row class="profile">
        <v-col class="profile-header">
          <div class="avatar-container">
            <div v-if="user.avatar" class="avatar">
              <img :src="user.avatar" alt="Profile Picture" />
            </div>
            <div v-else class="initials-avatar">
              {{ userInitials }}
            </div>
          </div>
          <h1>{{ fullName }}</h1>
          <h3>{{ user.email }}</h3>
        </v-col>

        <!-- Include the PostsList component here -->
        <v-col>
          <userRecipes :recipes="recipeStore.recipes" :openRecipeDialog="openRecipeDialog" />
        </v-col>
      </v-row>
    </v-container>
    <v-row v-else>
      <v-col>
        <p>Du är inte inloggad.</p>
      </v-col>
    </v-row>

    <!-- Recipe Dialog -->
    <v-dialog v-model="recipeDialog" class="recipe-modal">
      <v-card>
        <v-card-text>
          <h1>{{ selectedRecipe.title }}</h1>
          <div>
            <h4>Ingredients:</h4>
            <p>{{ formattedIngredients }}</p> <!-- Use formatted ingredients -->
          </div>
          <div>
            <h4>Steps:</h4>
            <ol>
              <li v-for="(step, index) in formattedSteps" :key="index">{{ step }}</li>
            </ol> <!-- Display steps as an ordered list -->
          </div>
          <!-- Add other recipe details here -->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeRecipeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import navigationBar from '../Layout/navigationBar.vue';
import useAuthStore from '../../stores/authStore';
import apiService from '../../API/apiService';
import useRecipeStore from '../../stores/recipeStore';
import userRecipes from './userRecipes.vue'; // Import the PostsList component

export default {
  name: 'userProfile',
  components: {
    navigationBar,
    userRecipes, // Add the PostsList component to the components section
  },
  data() {
    return {
      userInitials: '',
      recipeDialog: false,
      selectedRecipe: {},
    };
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated;
    },
    user() {
      return useAuthStore().user || {};
    },
    fullName() {
      return `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim();
    },
    // Access recipes directly from the recipe store
    recipeStore() {
      return useRecipeStore();
    },
    formattedIngredients() {
      if (!this.selectedRecipe.ingredients) return '';
      try {
        return JSON.parse(this.selectedRecipe.ingredients).join(', ');
      } catch (e) {
        console.error('Error parsing ingredients:', e);
      }
    },
    formattedSteps() {
      if (!this.selectedRecipe.steps) return [];
      try {
        return JSON.parse(this.selectedRecipe.steps);
      } catch (e) {
        console.error('Error parsing steps:', e);
        return [this.selectedRecipe.steps];
      }
    },
  },
  created() {
    if (this.isAuthenticated && this.user) {
      this.fetchUserRecipes(this.user.id);
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        this.updateUserInitials(newUser);
        if (newUser && newUser.id) {
          this.fetchUserRecipes(newUser.id);
        }
      },
      deep: true,
    },
  },
  methods: {
    updateUserInitials(user) {
      if (user.firstName && user.lastName) {
        this.userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
      }
    },
    async fetchUserRecipes(userId) {
      try {
        const response = await apiService.getAllUserRecipes(userId);
        const store = useRecipeStore();
        store.setRecipes(response);
        console.log('Recipes:', store.recipes, response);
      } catch (error) {
        console.error('Error fetching user recipes in userProfile.vue:', error);
      }
    },
    openRecipeDialog(recipe) {
      this.selectedRecipe = recipe;
      this.recipeDialog = true;
    },
    closeRecipeDialog() {
      this.selectedRecipe = {};
      this.recipeDialog = false;
    },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  margin: 50px 0 20px 0;
}

.avatar-container {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 24px;
  color: #fff;
  background-color: #007BFF; /* You can change the background color here */
  border-radius: 50%;
}

.recipe-modal {
  max-width: 1000px;
  height: auto;
}
</style>
