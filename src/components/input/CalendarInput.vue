<template>
	<div class="calendar-input-container" :class="{ neumorphism: neumorphism }">
		<input type="date" class="calendar-input" :placeholder="placeholder" v-model="value" @input="handleInput" />
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
		default: 'Selecciona una fecha...',
	},
	neumorphism: {
		type: Boolean,
		default: true,
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
.calendar-input-container {
	display: flex;
	align-items: center;
	width: 100%;
	height: 55px;
	padding: 0 17px;
	border-radius: 100px;
	background: #edeef0;
}

.calendar-input-container.neumorphism {
	background: #ebebeb;
	box-shadow:
		-5px 5px 10px 0px rgba(212, 212, 212, 0.2) inset,
		5px -5px 10px 0px rgba(212, 212, 212, 0.2) inset,
		-5px -5px 10px 0px rgba(255, 255, 255, 0.9) inset,
		5px 5px 13px 0px rgba(212, 212, 212, 0.9) inset;
}

.calendar-input {
	width: 100%;
	font-family: 'Stolzl Regular';
	font-size: 13px;
	color: #292b2e;
	background: none;
	border: none;
	outline: none;
	appearance: none; /* Elimina el estilo de los navegadores para el input tipo date */
}

.calendar-input::placeholder {
	color: rgba(41, 43, 46, 0.5);
}

input[type='date']::-webkit-calendar-picker-indicator {
	background: none;
	border: none;
	height: 20px;
	width: 20px;
	cursor: pointer;
}

input[type='date']::-webkit-input-placeholder {
	color: rgba(41, 43, 46, 0.5);
}

input[type='date']:focus {
	border: none;
	box-shadow: none;
}
</style>
