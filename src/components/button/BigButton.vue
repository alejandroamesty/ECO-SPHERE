<template>
    <button class="text-button">{{ caption }}</button>
</template>

<script setup>
const props = defineProps({
    caption: {
        type: String,
        required: true,
    },
});
</script>

<style scoped>
.text-button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 333px;
    height: 55px;
    background: #40A578;
    font-family: 'Stolzl Medium';
    font-size: 15px;
    color: #FFFFFF;
    border-radius: 100px;
}
</style>