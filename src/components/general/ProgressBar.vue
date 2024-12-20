<template>
	<div class="progress-bar-container">
		<div class="arrow-left" @click="goToPreviousStep" :class="{ disabled: currentStep <= 1 }">
			<img :src="ARROW_RIGHT" alt="Arrow Left" />
		</div>
		<div class="bar-container">
			<div class="progress-bar" :style="{ width: `${progressPercentage}%` }"></div>
		</div>
		<div class="arrow-right" @click="goToNextStep" :class="{ disabled: currentStep >= steps }">
			<img :src="ARROW_RIGHT" alt="Arrow Right" />
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { ARROW_RIGHT } from '../../utils/icons';

const props = defineProps({
	steps: {
		type: Number,
		required: true,
		default: 1,
	},
	currentStep: {
		type: Number,
		required: true,
		default: 1,
	},
});

const emit = defineEmits(['update:currentStep']);

const progressPercentage = computed(() => (props.currentStep / props.steps) * 100);

/**
 * Emite el evento para ir al paso anterior.
 */
const goToPreviousStep = () => {
	if (props.currentStep > 1) {
		emit('update:currentStep', props.currentStep - 1);
	}
};

/**
 * Emite el evento para ir al siguiente paso.
 */
const goToNextStep = () => {
	if (props.currentStep < props.steps) {
		emit('update:currentStep', props.currentStep + 1);
	}
};
</script>

<style scoped>
.progress-bar-container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px;
	gap: 52px;
	width: 323px;
	height: 24px;
}

.arrow-left,
.arrow-right {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;
	background-size: contain;
	cursor: pointer;
}

.arrow-left {
	transform: matrix(-1, 0, 0, 1, 0, 0);
}

.arrow-left.disabled,
.arrow-right.disabled {
	cursor: not-allowed;
	opacity: 0.5;
	transition: opacity 0.3s ease;
}

.bar-container {
	width: 175px;
	height: 5px;
	background: rgba(64, 165, 120, 0.25);
	border-radius: 100px;
	position: relative;
	overflow: hidden;
}

.progress-bar {
	height: 5px;
	background: #40a578;
	border-radius: 100px;
	transition: width 0.3s ease;
}
</style>
