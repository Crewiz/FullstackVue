<template>
  <v-container class="container">
    <v-row>
      <v-col>
        <message-list :messages="messages" />
        <chat-input @sendMessage="handleSendMessage" />
      </v-col>
      <!-- <v-col cols="4">
        <ingredients-list v-if="ingredients.length" :ingredients="ingredients" />
        <instructions-list v-if="instructions.length" :instructions="instructions" />
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import MessageList from './MessageList.vue';
import IngredientsList from './IngredientsList.vue';
import InstructionsList from './InstructionsList.vue';
import ChatInput from './ChatInput.vue';
import apiService from '../../API/apiService.ts';

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
      instructions: []
    };
  },
  methods: {
  async handleSendMessage(userMessage) {
    console.log("Sending user message:", userMessage);
    this.addMessage({ role: 'user', content: userMessage });

    try {
      const response = await apiService.getAssistantResponse(userMessage);
      console.log("Response received from assistant:", response);

      const assistantMessage = response.result.data;
      console.log("Extracted assistant message:", assistantMessage);

      if (typeof assistantMessage === 'string') {
        console.log("Handling as a ChatResponse:", assistantMessage);
        this.addMessage({ role: 'assistant', content: assistantMessage });
        this.ingredients = [];
        this.instructions = [];
      } else {
        console.log("Handling as a RecipeResponse:", assistantMessage);
        // Check for property existence in the response
        if (assistantMessage.ingredients) this.ingredients = assistantMessage.ingredients;
        if (assistantMessage.instructions) this.instructions = assistantMessage.instructions;
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      this.addMessage({ role: 'system', content: 'Sorry, there was an error processing your request.' });
      this.ingredients = [];
      this.instructions = [];
    }
  },
  addMessage(message) {
    console.log("Adding message to the list:", message);
    this.messages.push(message);
  }
},
}
</script>



<style>

</style>

