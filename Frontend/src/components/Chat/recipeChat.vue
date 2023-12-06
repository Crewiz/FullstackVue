<template>
  <v-container>
    <message-list :messages="messages" />
    <chat-input @sendMessage="handleSendMessage" />
  </v-container>
</template>

<script>
import MessageList from './MessageList.vue';
import ChatInput from './ChatInput.vue';
import apiService from '../../API/apiService.ts';

export default {
  components: { MessageList, ChatInput },
  data() {
    return {
      messages: []
    };
  },
  methods: {
    async handleSendMessage(userMessage) {
      // Add user message to messages array
      this.addMessage({ role: 'user', content: userMessage });

      try {
        // Call API service to get the assistant's response
        const response = await apiService.getAssistantResponse(userMessage);

        const assistantMessage = response.data.result.data;
        // Add assistant response to messages array
        this.addMessage({ role: 'assistant', content: assistantMessage });
      } catch (error) {
        console.error(error);
        // Handle errors (e.g., display error message to the user)
        this.addMessage({ role: 'system', content: 'Sorry, there was an error processing your request.' });
      }
    },
    addMessage(message) {
      this.messages.push(message);
    }
  }
};
</script>
