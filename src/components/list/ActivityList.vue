<template>
	<div class="options-container">
		<div v-for="(option, index) in options" :key="option.value" class="option-container" @click="toggleCheck(index)">
			<div class="icon-container">
				<img :src="getCategoryIcon(option.category)" alt="" />
			</div>
			<div class="option-text">{{ option.option }}</div>
			<div class="check-container" :class="{ checked: option.checked }">
				<template v-if="option.checked">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM5.832 11.432L2.96 8.56C2.88593 8.48593 2.82718 8.39801 2.7871 8.30123C2.74701 8.20446 2.72638 8.10074 2.72638 7.996C2.72638 7.89126 2.74701 7.78754 2.7871 7.69077C2.82718 7.59399 2.88593 7.50607 2.96 7.432C3.03407 7.35793 3.12199 7.29918 3.21877 7.2591C3.31554 7.21901 3.41926 7.19838 3.524 7.19838C3.62874 7.19838 3.73246 7.21901 3.82923 7.2591C3.92601 7.29918 4.01393 7.35793 4.088 7.432L6.4 9.736L11.904 4.232C12.0536 4.08242 12.2565 3.99838 12.468 3.99838C12.6795 3.99838 12.8824 4.08242 13.032 4.232C13.1816 4.38158 13.2656 4.58446 13.2656 4.796C13.2656 5.00754 13.1816 5.21042 13.032 5.36L6.96 11.432C6.88599 11.5062 6.79808 11.565 6.7013 11.6051C6.60452 11.6453 6.50077 11.666 6.396 11.666C6.29123 11.666 6.18748 11.6453 6.0907 11.6051C5.99392 11.565 5.90601 11.5062 5.832 11.432Z"
							fill="#40A578"
						/>
					</svg>
				</template>
				<template v-else>
					<div class="icon-unchecked"></div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { CAR, ENERGY, FOOD, CUSTOM } from '../../utils/icons';

const props = defineProps({
	options: {
		type: Array,
		required: true,
		default: () => [],
	},
});

const emit = defineEmits(['update:options', 'select:option']);

/**
 * Cambia el estado de la opción.
 */
const toggleCheck = (index) => {
	props.options[index].checked = !props.options[index].checked;
	emit('update:options', [...props.options]);
	emit('select:option', { ...props.options[index] });
};

/**
 * Obtiene el icono según la categoría.
 */
const getCategoryIcon = (category) => {
	const name = category.toLowerCase();
	switch (name) {
		case 'transporte':
			return CAR;
		case 'energía':
			return ENERGY;
		case 'alimentación':
			return FOOD;
		default:
			return CUSTOM;
	}
};
</script>

<style scoped>
.options-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 20px;
}

.option-container {
	display: flex;
	align-items: center;
	width: 100%;
	height: 57px;
	background: #edeef0;
	border-radius: 20px;
	padding: 0 15px;
	gap: 15px;
}

.icon-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	background: #9dde8b;
	border-radius: 10px;
}

.check-container {
	display: flex;
	justify-content: center;
	align-items: center;
	justify-self: flex-end;
	width: 16px;
	height: 16px;
	margin-right: 5px;
}

.icon-unchecked {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 1px solid #a4a4a4;
}

.icon-check {
	width: 16px;
	height: 16px;
}

.option-text {
	width: 231px;
	font-family: 'Stolzl Medium';
	font-size: 12px;
	display: flex;
	align-items: center;
	color: #292b2e;
}
</style>
