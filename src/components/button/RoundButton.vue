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

/**
 * Gestiona el evento click del botón.
 * @param event - Evento click.
 */
const handleClick = (event) => {
    onClick.value(event);
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
    box-shadow: -5px 5px 10px 0px rgba(47, 121, 88, 0.20) inset, 5px -5px 10px 0px rgba(47, 121, 88, 0.20) inset, -5px -5px 10px 0px rgba(57, 147, 108, 0.90) inset, 5px 5px 13px 0px rgba(47, 121, 88, 0.90) inset;
    filter: drop-shadow(-1px -1px 2px rgba(47, 121, 88, 0.50)) drop-shadow(1px 1px 2px rgba(57, 147, 108, 0.30));
    cursor: pointer;
}
</style>