<template>
  <v-form @submit.prevent="send">
    <v-text-field v-model="input" label="Type a message" />
    <v-btn type="submit">Send</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  },
  methods: {
    send() {
      this.$emit('sendMessage', this.input);
      this.input = '';
    }
  }
};
</script>
