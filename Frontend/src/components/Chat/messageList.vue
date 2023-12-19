<template>
  <div>
    <message-item v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>

<script>
import MessageItem from './messageItem.vue';

export default {
  components: { MessageItem },
  props: {
    messages: Array
  }
};
</script>