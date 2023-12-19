<template>
  <div :class="messageClass">
    {{ message.content }}
  </div>
</template>

<script>
import { useThemeStore } from '../../stores/themeStore';
export default {
  props: {
    message: Object
  },
  computed: {
    isDarkTheme() {
      console.log('[Component] isDarkTheme computed property:', this.$themeState.isDark);
      return this.$themeState.isDark;
    },
    messageClass() {
      const classes = {
        'user-message': this.message.role === 'user',
        'assistant-message': this.message.role === 'assistant',
        'dark-theme': this.isDarkTheme,
      };

      console.log(`Message role: ${this.message.role}, Classes:`, classes);
      console.log('Current theme in messageItem:', this.isDarkTheme ? 'Dark' : 'Light');
      return classes;
    }
  },
  mounted() {
    console.log('CSS variable --v-theme-background:', getComputedStyle(document.documentElement).getPropertyValue('--v-theme-background'));
    console.log('CSS variable --v-theme-surface:', getComputedStyle(document.documentElement).getPropertyValue('--v-theme-surface'));
  }
};
</script>



<style>
.user-message, .assistant-message {
  padding: 10px;
  border-radius: 10px;
}

.user-message {
  background-color: #363636;
  text-align: right;

}

.assistant-message {
  background-color: #5d5d5d;
  text-align: left;

}


/* Light Theme */
.user-message:not(.dark-theme) {
  background-color: #c5ab85; /* Light grey for user messages */
  color: #000; /* Dark text for readability */
}

.assistant-message:not(.dark-theme) {
  background-color: #e3d0be; /* Slightly lighter grey for assistant messages */
  color: #000;
}

/* Dark Theme */
.dark-theme .user-message {
  background-color: #333; /* Darker color for user messages */
  color: #fff; /* Light text for readability */
}

.dark-theme .assistant-message {
  background-color: #444; /* Slightly lighter color for assistant messages */
  color: #fff;
}

</style>