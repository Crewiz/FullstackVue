<template>
  <div>
    <navigationBar />
    <div v-if="isAuthenticated && user">
      <div class="profile">
        <div class="profile-header">
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
        </div>

        <div class="profile-posts">
          <h2>Inlägg</h2>
          <ul class="post-container" v-if="recipeStore.recipes">
            <li class="recipe-container" v-for="recipe in recipeStore.recipes" :key="recipe.id">
              <h1>{{ recipe.title }}</h1>
              <h2>{{ recipe.description }}</h2>
            </li>
          </ul>
          <div v-else>
            <p>Inga recept tillgängliga.</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Du är inte inloggad.</p>
    </div>
  </div>
</template>

<script>
import navigationBar from '../Layout/navigationBar.vue';
import useAuthStore from '../../stores/authStore';
import apiService from '../../API/apiService';
import useRecipeStore from '../../stores/recipeStore';

export default {
  name: 'userProfile',
  components: {
    navigationBar,
  },
  data() {
    return {
      userInitials: '',
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

  .profile-posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    margin: 50px 0 20px 0;
    width: 100%;
    min-height: auto;
  }
  .profile-posts li {
    list-style: none;
    margin: 25px;
  }

  .post-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .recipe-container {
    width: 350px;
    height: 200px;
    display: flex;
    flex-direction: column;
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

  .recipe-container {
    border: 2px solid black;
  }

  </style>
  