<template>
  <div :class="messageClass">
    {{ message.content }}
  </div>
</template>

<script>
export default {
  props: {
    message: Object
  },
  computed: {
    messageClass() {
      return {
        'user-message': this.message.role === 'user',
        'assistant-message': this.message.role === 'assistant',
        'dark-theme': this.$vuetify.theme.dark,
      };
    }
  }
};
</script>

<style>
.user-message, .assistant-message {
  padding: 10px;
  border-radius: 10px;
  text-align: left;
}

.user-message {
  --message-background: var(--v-theme-background); /* Lighter/darker based on theme */
  --message-color: var(--v-theme-on-background);
}

.assistant-message {
  --message-background: var(--v-theme-surface); /* Lighter/darker based on theme */
  --message-color: var(--v-theme-on-surface);
}

.dark-theme .user-message, .dark-theme .assistant-message {
  --message-background: var(--v-theme-surface); /* Adjust for dark theme */
  --message-color: var(--v-theme-on-surface);
}

.user-message {
  background-color: var(--message-background);
  color: var(--message-color);
  text-align: right; /* Align user messages to right */
}

.assistant-message {
  background-color: var(--message-background);
  color: var(--message-color);
}
</style>
