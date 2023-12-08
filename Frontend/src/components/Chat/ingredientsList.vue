<template>
    <div>
        <h3>Ingredients</h3>
        <ul>
            <li v-for="ingredient in ingredients" :key="ingredient">{( ingredient )}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        ingredients: Array
    }
};
</script>