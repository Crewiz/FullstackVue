<template>
  <div>
    <h3>Instructions</h3>
    <ol>
      <li v-for="instruction in instructions" :key="instruction">{{ instruction }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    instructions: Array
  }
};
</script>
