<template>
  <v-container class="container d-flex justify-center">
    <v-row>
      <v-col class="chat-container d-flex flex-column">
        <v-card class="chat-content" ref="chatContent">
          <message-list :messages="messages" />
        </v-card>
        <chat-input @sendMessage="handleSendMessage" />
      </v-col>
      <v-col cols="4">
        <!-- Sidebar for ingredients -->
        <ingredients-list 
          v-if="ingredients.length"
          :ingredients="ingredients"
          :recipe-name="recipeName"
          :prep-time="prepTime" 
          :servings="servings" />

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import MessageList from './MessageList.vue';
import IngredientsList from './IngredientsList.vue';
import InstructionsList from './instructionsList.vue';
import ChatInput from './ChatInput.vue';
import apiService from '../../API/apiService.ts';

function normalizeRecipeData(data: Record<string, any>): Record<string, any> {
  const normalizedData: Record<string, any> = {};

  const keyMappings: Record<string, string> = {
    'prep_time': 'prepTime',
    'PrepTime': 'prepTime',
    'Prep time': 'prepTime',
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
    InstructionsList
  },
  data() {
    return {
      messages: [],
      ingredients: [],
      instructions: [],
      recipeName: '',
      prepTime: '',
      servings: ''
    };
  },
  methods: {
    scrollToBottom() {
      const chatContent = this.$refs.chatContent;
      chatContent.scrollTop = chatContent.scrollHeight;
    },
    async handleSendMessage(userMessage: string) {
  this.addMessage({ role: 'user', content: userMessage });

  try {
    const response = await apiService.getAssistantResponse(userMessage);

    if (response && response.result && typeof response.result.data === 'string') {
      const recipeData = JSON.parse(response.result.data);
      const normalizedRecipeData = normalizeRecipeData(recipeData);
      console.log('Normalized Data:', normalizedRecipeData);

      if (normalizedRecipeData && ('ingredients' in normalizedRecipeData) && ('instructions' in normalizedRecipeData)) {
        this.ingredients = normalizedRecipeData.ingredients;
        this.instructions = normalizedRecipeData.instructions;
        this.recipeName = normalizedRecipeData.recipe;
        this.prepTime = normalizedRecipeData.prepTime;
        console.log('Prep time:', this.prepTime);
        this.servings = normalizedRecipeData.servings;

        this.instructions.forEach(instruction => {
          this.addMessage({ role: 'assistant', content: instruction });
        });
      }
    } else {
      this.addMessage({ role: 'assistant', content: response as string });
      this.ingredients = [];
      this.instructions = [];
    }
  } catch (error) {
    console.error("Error in handleSendMessage:", error);
    this.addMessage({ role: 'system', content: 'Sorry, there was an error processing your request.' });
    this.ingredients = [];
    this.instructions = [];
  }

  this.$nextTick(() => {
    this.scrollToBottom();
  });
},

    addMessage(message: { role: string; content: string }) {
      console.log("Adding message to the list:", message);
      this.messages.push(message); // Lägger till meddelandet längst bak i listan istället för längst fram
    }
  }
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
}

.chat-content {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse; /* Ändrad riktning för att chatten ska börja längst ner och röra sig uppåt */
}

/* Lägg till andra stilar efter behov */
</style>
