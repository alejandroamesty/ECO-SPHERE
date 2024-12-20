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
		required: true,
	},
	size: {
		type: Number,
		default: 40,
	},
	onClick: {
		type: Function,
		required: true,
	},
	invert: {
		type: Boolean,
		default: false,
	},
	gray: {
		type: Boolean,
		default: false,
	},
});

const { icon, size, onClick, invert, gray } = toRefs(props);

const buttonStyle = computed(() => ({
	width: `${size.value}px`,
	height: `${size.value}px`,
	backgroundColor: gray.value ? 'var(--gray-background-color)' : 'var(--green-background-color)',
	boxShadow: gray.value ? 'var(--gray-box-shadow-color)' : 'var(--green-box-shadow-color)',
	filter: gray.value ? 'var(--gray-filter)' : 'var(--green-filter)',
}));

const iconStyle = computed(() => ({
	width: `${size.value * 0.45}px`,
	height: `${size.value * 0.45}px`,
	filter: invert.value ? 'invert(1) brightness(255%) contrast(100%) grayscale(0)' : 'none',
}));

/**
 * Gestiona el evento click del botón.
 * @param event - Evento click.
 */
const handleClick = (event) => {
	onClick.value(event);
};
</script>

<style>
:root {
	--green-background-color: #348662;
	--green-box-shadow-color: -5px 5px 10px 0px rgba(47, 121, 88, 0.2) inset, 5px -5px 10px 0px rgba(47, 121, 88, 0.2) inset, -5px -5px 10px 0px rgba(57, 147, 108, 0.9) inset, 5px 5px 13px 0px rgba(47, 121, 88, 0.9) inset;
	--green-filter: drop-shadow(-1px -1px 2px #2f795880) drop-shadow(1px 1px 2px rgba(57, 147, 108, 0.3));
	--gray-background-color: #949799;
	--gray-box-shadow-color: -5px 5px 10px 0px rgba(133, 136, 138, 0.2) inset, 5px -5px 10px 0px rgba(133, 136, 138, 0.2) inset, -5px -5px 10px 0px rgba(163, 166, 168, 0.9) inset, 5px 5px 13px 0px rgba(133, 136, 138, 0.9) inset;
	--gray-filter: drop-shadow(-1px -1px 2px rgba(133, 136, 138, 0.5)) drop-shadow(1px 1px 2px rgba(163, 166, 168, 0.3));
}

.round-button {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: none;
	outline: none;
	cursor: pointer;
}
</style>
