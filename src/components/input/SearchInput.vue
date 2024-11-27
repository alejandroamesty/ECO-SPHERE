<template>
    <div class="search-input-container">
        <input type="text" v-bind="$attrs" class="search-input" :placeholder="placeholder" @input="onInputChange" />
        <RoundButton :icon="SEARCH" :size=40 :onClick="handleClick" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { RoundButton } from '../index';
import { SEARCH } from '../../utils/icons';

const props = defineProps({
    placeholder: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue']);

/**
 * Emite el evento de cambio del valor del input.
 * @param event - Evento de cambio.
 */
const onInputChange = (event) => {
    emit('update:modelValue', event.target.value);
};

/**
 * Maneja el evento de clic en el botón de búsqueda.
 */
const handleClick = () => {
    console.log('Search button clicked');
};
</script>

<style scoped>
.search-input-container {
    width: 340px;
    height: 57px;
    background: #d9d9d9;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 27px;
}

.search-input {
    width: 257px;
    height: 16px;
    border: none;
    outline: none;
    background: none;
    font-family: 'Stolzl Regular', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(41, 43, 46, 0.5);
}

.search-input::placeholder {
    color: rgba(41, 43, 46, 0.5);
}
</style>