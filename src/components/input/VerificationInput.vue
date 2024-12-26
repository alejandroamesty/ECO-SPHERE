<template>
	<div class="verification-input-container">
		<div v-for="(digit, index) in digits" :key="index" class="digit-container">
			<input
				v-model="digits[index]"
				type="tel"
				maxlength="1"
				class="digit-input"
				@input="handleInput(index, $event)"
				@keydown.backspace="handleBackspace(index, $event)"
				@focus="selectDigit($event)"
				@paste="handlePaste($event, index)"
				inputmode="numeric"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const emit = defineEmits(['update:code']);

const digits = ref(Array(5).fill(''));

/**
 * Observa los cambios en los dígitos y emite el código completo al padre.
 */
watch(
	digits,
	() => {
		emit('update:code', digits.value.join(''));
	},
	{ deep: true },
);

/**
 * Maneja la entrada en un campo específico y pasa al siguiente campo.
 */
const handleInput = (index, event) => {
	const value = event.target.value.replace(/[^0-9]/g, '');
	digits.value[index] = value;

	if (value && index < digits.value.length - 1) {
		const nextInput = document.querySelectorAll('.digit-input')[index + 1];
		nextInput?.focus();
	}
};

/**
 * Maneja el evento de retroceso y enfoca el campo anterior si está vacío.
 */
const handleBackspace = (index, event) => {
	if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
		const previousInput = document.querySelectorAll('.digit-input')[index - 1];
		previousInput?.focus();
	}
};

/**
 * Selecciona el contenido del campo cuando se enfoca.
 */
const selectDigit = (event) => {
	event.target.select();
};

/**
 * Maneja el pegado de datos y distribuye los caracteres entre los campos.
 */
const handlePaste = (event, index) => {
	event.preventDefault();
	const pasteData = event.clipboardData.getData('text').replace(/[^0-9]/g, '');
	const inputs = document.querySelectorAll('.digit-input');

	pasteData.split('').forEach((char, i) => {
		if (index + i < digits.value.length) {
			digits.value[index + i] = char;
			if (inputs[index + i]) {
				inputs[index + i].focus();
			}
		}
	});
};

/**
 * Enfoca el primer campo al montar el componente.
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
	width: 48px;
	height: 48px;
	background: #ebebeb;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
		-1px -1px 2px rgba(212, 212, 212, 0.5),
		inset -5px 5px 10px rgba(212, 212, 212, 0.2),
		inset 5px -5px 10px rgba(212, 212, 212, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9),
		inset 5px 5px 13px rgba(212, 212, 212, 0.9);
}

.digit-input {
	width: 100%;
	height: 100%;
	font-family: 'Stolzl Regular', sans-serif;
	font-size: 20px;
	color: #292b2e;
	background: none;
	border: none;
	outline: none;
	text-align: center;
}
</style>
