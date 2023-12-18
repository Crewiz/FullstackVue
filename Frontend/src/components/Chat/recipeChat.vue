<template>
  <v-container class="container d-flex justify-center">
    <v-row>
      <v-col class="chat-container d-flex flex-column">
        <v-card class="chat-content" ref="chatContent">
          <message-list :messages="messages" />
          <div v-if="isLoading" class="loading"></div>
        </v-card>
        <chat-input @sendMessage="handleSendMessage" />
      </v-col>

      <v-col v-if="ingredients.length" cols="4">
        <!-- Sidebar for ingredients -->
        <ingredients-list
          :ingredients="ingredients"
          :recipe-name="recipeName"
          :prep-time="prepTime"
          :servings="servings"
        />
        <v-btn class="review-button" @click.prevent="reviewRecipe">Review recipe</v-btn>
      </v-col>
      <v-col v-else>
        <h1>Oh no 😢</h1>
      </v-col>
      

    </v-row>
  </v-container>
  <div v-if="isLoading">loadingtest</div>
</template>

<script lang="ts">
  import MessageList from './messageList.vue';
  import IngredientsList from './ingredientsList.vue';
  import InstructionsList from './instructionsList.vue';
  import ChatInput from './chatInput.vue';
  import apiService from '../../API/apiService.ts';

  import useRecipeStore from '../../stores/recipeStore';

  function normalizeRecipeData(data: Record<string, any>): Record<string, any> {
    const normalizedData: Record<string, any> = {};

    const keyMappings: Record<string, string> = {
      prep_time: 'prepTime',
      PrepTime: 'prepTime',
      'Prep time': 'prepTime',
      'Prep Time': 'prepTime',
      // Add other variations if needed
    };

    // Iterate over each key in the object
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Convert the key to a standardized format (e.g., lowercase)
        let normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
        normalizedKey = keyMappings[normalizedKey] || normalizedKey; // Apply mapping
        normalizedData[normalizedKey] = data[key];
      }
    }

    return normalizedData;
  }

  export default {
    components: {
      MessageList,
      ChatInput,
      IngredientsList,
      InstructionsList,
    },
    data() {
      return {
        messages: [],
        ingredients: [] as string[],
        instructions: [] as string[],
        recipeName: '' as string,
        prepTime: '',
        servings: '',
        isLoading: false,
      };
    },
    methods: {
      scrollToBottom() {
        const chatContent = this.$refs.chatContent;
        chatContent.scrollTop = chatContent.scrollHeight;
      },
      async handleSendMessage(userMessage: string) {
        this.addMessage({ role: 'user', content: userMessage });
        this.setLoading(true)
        try {
          const response = await apiService.getAssistantResponse(userMessage);
          console.log(this.isLoading);
          
          
          if (response && response.result && typeof response.result.data === 'string') {
            const recipeData = JSON.parse(response.result.data);
            const normalizedRecipeData = normalizeRecipeData(recipeData);
            console.log('Normalized Data:', normalizedRecipeData);

            if (normalizedRecipeData && 'ingredients' in normalizedRecipeData && 'instructions' in normalizedRecipeData) {
              this.ingredients = normalizedRecipeData.ingredients;
              this.instructions = normalizedRecipeData.instructions;
              this.recipeName = normalizedRecipeData.recipe;
              this.prepTime = normalizedRecipeData.prepTime;
              console.log('Prep time:', this.prepTime);
              this.servings = normalizedRecipeData.servings;

              this.instructions.forEach((instruction) => {
                this.addMessage({ role: 'assistant', content: instruction });
              });
            }
          } else {
            this.addMessage({ role: 'assistant', content: response as string });
            this.ingredients = [];
            this.instructions = [];
          }
        } catch (error) {
          console.error('Error in handleSendMessage:', error);
          this.addMessage({ role: 'system', content: 'Sorry, there was an error processing your request.' });
          this.ingredients = [];
          this.instructions = [];
        } finally {
          console.log(this.isLoading);
          
          this.setLoading(false)
          console.log(this.isLoading);
        }

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      setLoading(value: boolean){
        this.isLoading = value
      },

      addMessage(message: { role: string; content: string }) {
        console.log('Adding message to the list:', message);
        this.messages.push(message); // Lägger till meddelandet längst bak i listan istället för längst fram
      },
      reviewRecipe() {
        // Assuming you're using Vue Router
        console.log('recipeName:', this.recipeName);
        console.log('ingredients:', this.ingredients);
        console.log('instructions:', this.instructions);

        const recipeStore = useRecipeStore();
        const recipe = {
          title: this.recipeName,
          ingredients: this.ingredients,
          instructions: this.instructions,
        };
        recipeStore.setRecipe(recipe);
        console.log('stored recipe:', recipe);

        this.$router.push({
          name: 'recipeReview',
        });
      },
    },
  };
</script>

<style scoped>
  .container {
    height: 100vh;
    overflow: hidden;
  }

  .chat-container {
    height: calc(100vh - 250px);
    overflow-y: auto;
    position: relative;
    max-width: 65%;
  }

  .chat-content {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse; /* Ändrad riktning för att chatten ska börja längst ner och röra sig uppåt */
  }
  .loading {
  background: transparent url('https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif') center no-repeat;
  height: 400px;
  width: 400px;
  margin-left: 380px;
  text-align: center;
}

  .review-button {
    margin-top: 20px;
  }
  /* Lägg till andra stilar efter behov */
</style>
