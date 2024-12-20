<template>
	<div class="counter-container">
		<div class="minus-button" @mousedown="startDecrement" @mouseup="stopInterval" @mouseleave="stopInterval" @click="decrement" @touchstart="startDecrement" @touchend="stopInterval">
			<img :src="MINUS" alt="Minus Button" />
		</div>
		<div class="counter" :key="number">{{ formattedNumber }}</div>
		<div class="plus-button" @mousedown="startIncrement" @mouseup="stopInterval" @mouseleave="stopInterval" @click="increment" @touchstart="startIncrement" @touchend="stopInterval">
			<img :src="ADD" alt="Add Button" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ADD, MINUS } from '../../utils/icons';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const props = defineProps({
	initialNumber: {
		type: Number,
		default: 0,
	},
	min: {
		type: Number,
		default: -Infinity,
	},
	max: {
		type: Number,
		default: Infinity,
	},
});

const number = ref(props.initialNumber);
const emit = defineEmits(['updateNumber']);
let intervalId = null;
let isIncrementing = false;
let isDecrementing = false;

/**
 * Formatea el número para que tenga dos dígitos.
 */
const formattedNumber = computed(() => {
	return number.value.toString().padStart(2, '0');
});

/**
 * Incrementa el número del contador.
 */
const increment = () => {
	if (number.value < props.max) {
		number.value += 1;
		triggerHapticFeedback();
		emit('updateNumber', number.value);
	}
};

/**
 * Decrementa el número del contador.
 */
const decrement = () => {
	if (number.value > props.min) {
		number.value -= 1;
		triggerHapticFeedback();
		emit('updateNumber', number.value);
	}
};

/**
 * Emite una vibración háptica.
 */
const triggerHapticFeedback = () => {
	Haptics.impact({ style: ImpactStyle.Light });
};

/**
 * Inicia el incremento del contador al mantener presionado el botón.
 */
const startIncrement = () => {
	if (!isIncrementing) {
		clearInterval(intervalId);
		isIncrementing = true;
		intervalId = setInterval(() => {
			increment();
		}, 100);
	}
};

/**
 * Inicia el decremento del contador al mantener presionado el botón.
 */
const startDecrement = () => {
	if (!isDecrementing) {
		clearInterval(intervalId);
		isDecrementing = true;
		intervalId = setInterval(() => {
			decrement();
		}, 100);
	}
};

/**
 * Detiene el intervalo cuando se suelta el botón.
 */
const stopInterval = () => {
	clearInterval(intervalId);
	intervalId = null;
	isIncrementing = false;
	isDecrementing = false;
};

/**
 * Actualiza el número del contador cuando cambia la propiedad.
 */
watch(
	() => props.initialNumber,
	(newVal) => {
		number.value = newVal;
	},
);
</script>

<style scoped>
.counter-container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 27px;
}

.minus-button,
.plus-button {
	width: 51px;
	height: 51px;
	border-radius: 50%;
	background-color: #40a57836;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
}

.counter {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 96px;
	height: 51px;
	font-family: 'Stolzl Medium';
	font-size: 70px;
	color: #40a578;
	transition: transform 0.3s ease-in-out;
}

.counter[key] {
	transform: scale(1.1);
}
</style>
