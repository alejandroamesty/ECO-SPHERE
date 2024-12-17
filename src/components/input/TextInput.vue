<template>
    <div class="text-input-container">
        <input type="text" class="text-input" :placeholder="placeholder" v-model="value" @input="handleInput" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: 'Ingrese texto...',
    },
});

const emit = defineEmits(['update:modelValue']);
const value = ref(props.modelValue);

watch(value, (newValue) => {
    emit('update:modelValue', newValue);
});

const handleInput = (event) => {
    value.value = event.target.value;
};
</script>

<style scoped>
.text-input-container {
    display: flex;
    align-items: center;
    width: 333px;
    height: 55px;
    padding: 0 12px;
    border-radius: 100px;
    background: #ebebeb;
    box-shadow: -5px 5px 10px 0px rgba(212, 212, 212, 0.20) inset, 5px -5px 10px 0px rgba(212, 212, 212, 0.20) inset, -5px -5px 10px 0px rgba(255, 255, 255, 0.90) inset, 5px 5px 13px 0px rgba(212, 212, 212, 0.90) inset;
}

.text-input {
    width: 100%;
    height: 22px;
    font-family: 'Stolzl Regular';
    font-size: 13px;
    color: #292b2e;
    background: none;
    border: none;
    outline: none;
}

.text-input::placeholder {
    color: rgba(41, 43, 46, 0.5);
}
</style>