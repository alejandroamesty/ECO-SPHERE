<template>
	<div class="verification-input-container">
		<div v-for="(digit, index) in digits" :key="index" class="digit-container">
			<input type="tel" maxlength="1" class="digit-input" v-model="digits[index]" @input="handleInput(index)" @keydown.backspace="handleBackspace(index, $event)" @focus="selectDigit($event)" inputmode="numeric" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const emit = defineEmits(['update:code']);

const digits = ref(Array(6).fill(''));

watch(digits, () => {
	emit('update:code', digits.value.join(''));
});

/**
 * Maneja el evento de cambio de valor en un input.
 */
const handleInput = (index) => {
	const currentValue = digits.value[index];
	digits.value[index] = currentValue.replace(/[^0-9]/g, '');

	if (digits.value[index] && index < digits.value.length - 1) {
		const nextInput = document.querySelectorAll('.digit-input')[index + 1];
		nextInput?.focus();
	}
};

/**
 * Maneja el evento de tecla de retroceso.
 */
const handleBackspace = (index, event) => {
	if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
		const previousInput = document.querySelectorAll('.digit-input')[index - 1];
		previousInput?.focus();
	}
};

/**
 * Selecciona el contenido de un input al hacer clic en él.
 */
const selectDigit = (event) => {
	event.target.select();
};

/**
 * Enfoca el primer input al montar el componente.
 */
onMounted(() => {
	const firstInput = document.querySelectorAll('.digit-input')[0];
	firstInput?.focus();
});
</script>

<style scoped>
.verification-input-container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px;
}

.digit-container {
	width: 47.96px;
	height: 47.96px;
	background: #ebebeb;
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
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
	font-family: 'Stolzl Regular', sans-serif;
	font-size: 20px;
	color: #292b2e;
	background: none;
	border: none;
	outline: none;
	text-align: center;
}
</style>
