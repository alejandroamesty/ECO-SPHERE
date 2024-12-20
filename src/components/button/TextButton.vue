<template>
	<button :class="['text-button', { selected: checked }]" @click="toggleChecked">
		{{ caption }}
	</button>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const props = defineProps({
	caption: {
		type: String,
		required: true,
	},
	checked: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:checked']);

const isChecked = ref(props.checked);

watch(
	() => props.checked,
	(newValue) => {
		isChecked.value = newValue;
	},
);

/**
 * Cambia el estado de la selección.
 */
const toggleChecked = () => {
	isChecked.value = !isChecked.value;
	triggerHapticFeedback();
	emit('update:checked', isChecked.value);
};

/**
 * Emite una vibración háptica.
 */
const triggerHapticFeedback = () => {
	Haptics.impact({ style: ImpactStyle.Light });
};
</script>

<style scoped>
.text-button {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #292b2e;
	border-radius: 100px;
	padding: 12px;
	min-width: 91px;
	font-family: 'Stolzl Regular';
	font-size: 11px;
	text-transform: uppercase;
	border: none;
	cursor: pointer;
	transition:
		background 0.3s,
		box-shadow 0.3s;
	background: #ffffff;
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
		-1px -1px 2px rgba(230, 230, 230, 0.5),
		inset -5px 5px 10px rgba(230, 230, 230, 0.2),
		inset 5px -5px 10px rgba(230, 230, 230, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9),
		inset 5px 5px 13px rgba(230, 230, 230, 0.9);
	backdrop-filter: blur(26px);
}

.text-button.selected {
	background: linear-gradient(135deg, #d8facf 100%, #c4e2bb 0%);
	box-shadow:
		-5px 5px 10px rgba(185, 214, 177, 0.2),
		5px -5px 10px rgba(185, 214, 177, 0.2),
		-5px -5px 10px rgba(227, 255, 217, 0.9),
		5px 5px 13px rgba(185, 214, 177, 0.9),
		inset 1px 1px 2px rgba(227, 255, 217, 0.3),
		inset -1px -1px 2px rgba(185, 214, 177, 0.5);
}
</style>
