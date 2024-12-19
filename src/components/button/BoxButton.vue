<template>
    <div class="container" @click="onClick">
        <div class="icon">
            <img :src="icon" alt="Icon">
        </div>
        <div class="caption">{{ caption }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    onClick: {
        type: Function,
        default: () => { },
    },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 154px;
    height: 119px;
    background: #EDEEF0;
    border-radius: 30px;
    gap: 13px;
    padding: 17px;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #D6D7DA;
}

.icon img {
    width: 18px;
    height: 18px;
}

.caption {
    display: flex;
    align-items: center;
    width: 117px;
    height: 29px;
    font-family: 'Stolzl Regular';
    font-size: 13px;
    color: rgba(41, 43, 46, 0.5);
}
</style>