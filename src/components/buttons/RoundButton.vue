<template>
    <button :style="buttonStyle" @click="handleClick" class="round-button">
        <img :src="icon" :style="iconStyle" alt="button-icon" />
    </button>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 40
    },
    onClick: {
        type: Function,
        required: true
    },
    invert: {
        type: Boolean,
        default: false
    }
});

const { icon, size, onClick, invert } = toRefs(props);

const buttonStyle = computed(() => ({
    width: `${size.value}px`,
    height: `${size.value}px`,
}));

const iconStyle = computed(() => ({
    width: `${size.value * 0.45}px`,
    height: `${size.value * 0.45}px`,
    filter: invert.value ? 'invert(1) brightness(255%) contrast(100%) grayscale(0)' : 'none'
}));

const handleClick = () => {
    onClick.value();
};
</script>

<style scoped>
.round-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    outline: none;
    background-color: #348662;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
}
</style>