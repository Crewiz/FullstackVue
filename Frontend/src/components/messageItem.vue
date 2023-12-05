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
        'assistant-message': this.message.role === 'assistant'
      };
    }
  }
};
</script>

<style>
.user-message {
  /* Styles for user messages */
  background-color: #106173;
  text-align: right;
  /* Other styling as needed */
}

.assistant-message {
  /* Styles for assistant messages */
  background-color: #A60D0D;
  text-align: left;
  /* Other styling as needed */
}
</style>
