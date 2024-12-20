<template>
	<div class="search-input-container">
		<input type="text" v-bind="$attrs" class="search-input" :placeholder="placeholder" v-model="inputValue" @input="onInputChange" />
		<RoundButton :icon="SEARCH" :size="40" :gray="true" :onClick="handleClick" />
	</div>
</template>

<script setup>
import { defineProps, defineEmits, ref, toRefs } from 'vue';
import { RoundButton } from '../index';
import { SEARCH } from '../../utils/icons';

const props = defineProps({
	placeholder: {
		type: String,
		required: true,
	},
	modelValue: {
		type: String,
		default: '',
	},
	onClick: {
		type: Function,
		default: () => {},
	},
});

const { placeholder, onClick } = toRefs(props);

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

/**
 * Emite el evento de cambio del valor del input.
 * @param event - Evento de cambio.
 */
const onInputChange = () => {
	emit('update:modelValue', inputValue.value);
};

/**
 * Maneja el evento de clic en el botón de búsqueda.
 */
const handleClick = (event) => {
	onClick.value(event);
};
</script>

<style scoped>
.search-input-container {
	width: 100%;
	height: 57px;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 20px;
	padding-right: 8px;
	z-index: 9999;
	background: #ebebeb;
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
		-1px -1px 2px rgba(212, 212, 212, 0.5),
		inset -5px 5px 10px rgba(212, 212, 212, 0.2),
		inset 5px -5px 10px rgba(212, 212, 212, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9),
		inset 5px 5px 13px rgba(212, 212, 212, 0.9);
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
