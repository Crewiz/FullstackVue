<template>
  <v-container class="container d-flex justify-center">
    <v-row>
      <v-col class="chat-container d-flex flex-column">
        <v-card class="chat-content" ref="chatContent">
          <message-list :messages="messages" />
        </v-card>
        <v-card v-if="isLoading" class="loading">
          <div class="typewriter">
            <h3>
              Chatman is typing
              <span class="typed-text">{{ typeValue }}</span>
            </h3>
          </div>
        </v-card>
        <chat-input @sendMessage="handleSendMessage" />
      </v-col>

      <v-col v-if="ingredients.length" cols="4">
        <!-- Sidebar for ingredients -->
        <ingredients-list :ingredients="ingredients" :recipe-name="recipeName" :prep-time="prepTime" :servings="servings" />
        <v-btn class="review-button" @click.prevent="reviewRecipe">Review recipe</v-btn>
      </v-col>
      <v-col class="instructions" v-else>
        <h2>To get a recipe, simply type the ingredients you have.</h2>
        <h4>For example, "I have flour, milk, and eggs. Give me a recipe for pancakes."</h4>
        <h4>Press Enter, and RecipeBot will provide you with a delicious recipe.</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import MessageList from './messageList.vue';
import IngredientsList from './ingredientsList.vue';
import InstructionsList from './instructionsList.vue';
import ChatInput from './chatInput.vue';
import apiService from '../../API/apiService.ts';
import { GptRecipeResponse } from '../../API/apiService.ts';
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
      typeValue: '',
      typeStatus: false,
      displayTextArray: ['...'],
      typingSpeed: 100,
      erasingSpeed: 100,
      newTextDelay: 2000,
      displayTextArrayIndex: 0,
      charIndex: 0,
    };
  },
  methods: {
    scrollToBottom() {
      const chatContent = this.$refs.chatContent as HTMLElement;
      chatContent.scrollTop = chatContent.scrollHeight;
    },
    
    async handleSendMessage(userMessage: string): Promise<void> {
  console.log('User Message:', userMessage); 
  this.addMessage({ role: 'user', content: userMessage });
  this.setLoading(true);

  try {
    const response: string | GptRecipeResponse = await apiService.getAssistantResponse(userMessage);
    console.log('API Response:', response);

    let parsedResponse;
    if (typeof response === 'string') {
      this.addMessage({ role: 'assistant', content: response });
      this.ingredients = [];
      this.instructions = [];
    } else {
      // Check if 'result' property exists in GptRecipeResponse
      if (response.result && response.result.data) {
        //@ts-ignore
        parsedResponse = JSON.parse(response.result.data);
        console.log('Parsed Response:', parsedResponse);

        
        const normalizedRecipeData: Record<string, any> = normalizeRecipeData(parsedResponse);
        console.log('Normalized Data:', normalizedRecipeData);

        this.ingredients = normalizedRecipeData.ingredients as string[];
        this.instructions = normalizedRecipeData.instructions as string[];
        this.recipeName = normalizedRecipeData.recipe as string;
        this.prepTime = normalizedRecipeData.prepTime as string;
        this.servings = normalizedRecipeData.servings as string;

        this.instructions.forEach((instruction: string) => {
          this.addMessage({ role: 'assistant', content: instruction });
        });
      } else {
               console.error('Error parsing response:', response);
        // Handle the error appropriately
      }
    }
  } catch (error: any) {
    console.error('Error in handleSendMessage:', error);
    this.addMessage({ role: 'system', content: 'Sorry, there was an error processing your request.' });
    this.ingredients = [];
    this.instructions = [];
  } finally {
    this.setLoading(false);
  }

  this.$nextTick(() => {
    this.scrollToBottom();
  });
}

,


    setLoading(value: boolean) {
      this.isLoading = value;
    },

    addMessage(message: { role: string; content: string }) {
      console.log('Adding message to the list:', message);
      this.messages.push(message as never); // Explicitly assert the type
    },
    reviewRecipe() {
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
    typeText() {
      if (this.charIndex < this.displayTextArray[this.displayTextArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.displayTextArray[this.displayTextArrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.displayTextArray[this.displayTextArrayIndex].substring(0, this.charIndex - 1);
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.displayTextArrayIndex += 1;
        if (this.displayTextArrayIndex >= this.displayTextArray.length) this.displayTextArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    },
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
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
  flex-direction: column-reverse;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50px;
  min-height: 50px;
  width: inherit;
}

.review-button {
  margin-top: 20px;
}
.typewriter {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.instructions {
  display: flex;
  flex-direction: column;
}

.instructions h2 {
  margin: 250px 0 20px;
}
</style>
