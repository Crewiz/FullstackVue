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
  background-color: #4e4e4e;
  color: rgb(255, 255, 255);
  text-align: right;
  padding: 10px;
  /* Other styling as needed */
}

.assistant-message {
  /* Styles for assistant messages */
  background-color: #181818;
  text-align: left;
  color: rgb(193, 191, 191);
  padding: 10px;
  /* Other styling as needed */
}
</style>
