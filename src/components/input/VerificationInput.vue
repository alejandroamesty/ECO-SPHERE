<template>
    <div class="verification-input-container">
        <div v-for="(digit, index) in digits" :key="index" class="digit-container">
            <input type="text" maxlength="1" class="digit-input" v-model="digits[index]"
                @input="handleInput(index, $event)" @focus="selectDigit($event)" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:code']);

const digits = ref(Array(6).fill(''));

const handleInput = (index, event) => {
    const value = event.target.value;
    digits.value[index] = value.replace(/[^0-9]/g, '').charAt(0); // Solo dígitos
    emit('update:code', digits.value.join(''));

    if (value && index < 5) {
        event.target.nextElementSibling?.focus();
    }
};

const selectDigit = (event) => {
    event.target.select();
};
</script>

<style scoped>
.verification-input-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 9px;
}

.digit-container {
    width: 47.96px;
    height: 47.96px;
    background: #ebebeb;
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3),
        -1px -1px 2px rgba(212, 212, 212, 0.5),
        inset -5px 5px 10px rgba(212, 212, 212, 0.2),
        inset 5px -5px 10px rgba(212, 212, 212, 0.2),
        inset -5px -5px 10px rgba(255, 255, 255, 0.9),
        inset 5px 5px 13px rgba(212, 212, 212, 0.9);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.digit-input {
    width: 14px;
    height: 20px;
    font-family: 'Stolzl Regular';
    font-size: 20px;
    color: #292b2e;
    background: none;
    border: none;
    outline: none;
    text-align: center;
}
</style>