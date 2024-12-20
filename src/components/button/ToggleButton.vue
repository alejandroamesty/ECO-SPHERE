<template>
	<div class="toggle-container" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch">
		<div class="selected-indicator" :class="{ right: isSelected }"></div>
		<div class="option" @click="toggle(false)">
			<span class="left-text">{{ leftLabel }}</span>
		</div>
		<div class="option" @click="toggle(true)">
			<span class="right-text">{{ rightLabel }}</span>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue';

const props = defineProps({
	modelValue: Boolean,
	leftLabel: {
		type: String,
		required: true,
	},
	rightLabel: {
		type: String,
		required: true,
	},
});

const { modelValue, leftLabel, rightLabel } = toRefs(props);

const touchStartX = ref(0);
const isTouching = ref(false);

const emit = defineEmits(['update:modelValue']);

const isSelected = computed({
	get: () => modelValue.value,
	set: (val) => emit('update:modelValue', val),
});

/**
 * Cambia la opción seleccionada.
 * @param val - Valor asociado a la opción.
 */
const toggle = (val) => {
	if (val !== isSelected.value) {
		isSelected.value = val;
	}
};

/**
 * Inicia la detección de un toque.
 */
const startTouch = (event) => {
	isTouching.value = true;
	touchStartX.value = event.touches[0].clientX;
};

/**
 * Mueve el toque en la pantalla.
 */
const moveTouch = (event) => {
	if (!isTouching.value) return;

	const touchEndX = event.touches[0].clientX;
	const movement = touchEndX - touchStartX.value;

	if (Math.abs(movement) > 50) {
		isSelected.value = movement > 0;
		isTouching.value = false;
	}
};

/**
 * Finaliza la detección de un toque.
 */
const endTouch = () => {
	if (!isTouching.value) return;
	isTouching.value = false;
};
</script>

<style scoped>
.toggle-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	width: 208px;
	height: 45px;
	border-radius: 15px;
	background: linear-gradient(135deg, #43ad7e 100%, #3d9d72 0%);
	box-shadow:
		1px 1px 2px 0px rgba(82, 211, 154, 0.3) inset,
		-1px -1px 2px 0px rgba(46, 119, 86, 0.5) inset;
	filter: drop-shadow(5px 5px 13px rgba(46, 119, 86, 0.9)) drop-shadow(-5px -5px 10px rgba(82, 211, 154, 0.9)) drop-shadow(5px -5px 10px rgba(46, 119, 86, 0.2)) drop-shadow(-5px 5px 10px rgba(46, 119, 86, 0.2));
	cursor: pointer;
}

.option {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 97px;
	height: 30px;
	border-radius: 10px;
	font-family: 'Stolzl Medium';
	font-size: 10px;
	z-index: 1;
	color: #ffffff;
}

.selected-indicator {
	position: absolute;
	top: 7px;
	left: 7px;
	width: 97px;
	height: 30px;
	border-radius: 10px;
	transition: left 0.3s ease;
	background: #348662;
	box-shadow:
		1px 1px 2px 0px rgba(57, 147, 108, 0.3),
		-1px -1px 2px 0px rgba(47, 121, 88, 0.5),
		-5px 5px 10px 0px rgba(47, 121, 88, 0.2) inset,
		5px -5px 10px 0px rgba(47, 121, 88, 0.2) inset,
		-5px -5px 10px 0px rgba(57, 147, 108, 0.9) inset,
		5px 5px 13px 0px rgba(47, 121, 88, 0.9) inset;
}

.selected-indicator.right {
	left: 104px;
}

.left-text {
	position: relative;
	text-align: center;
	left: 7px;
}

.right-text {
	position: relative;
	text-align: center;
	right: 7px;
}
</style>
