<template>
	<div class="check-list">
		<div class="check-button-container" v-for="(button, index) in buttons" :key="index" :class="{ selected: button.selected }" @click="toggleSelection(index)">
			<div class="check-icon" :class="{ selected: button.selected }">
				<svg v-if="button.selected" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8 0.000244141C3.584 0.000244141 0 3.58424 0 8.00024C0 12.4162 3.584 16.0002 8 16.0002C12.416 16.0002 16 12.4162 16 8.00024C16 3.58424 12.416 0.000244141 8 0.000244141ZM5.832 11.4322L2.96 8.56024C2.88593 8.48618 2.82718 8.39825 2.7871 8.30148C2.74701 8.20471 2.72638 8.10099 2.72638 7.99624C2.72638 7.8915 2.74701 7.78778 2.7871 7.69101C2.82718 7.59424 2.88593 7.50631 2.96 7.43224C3.03407 7.35818 3.12199 7.29943 3.21877 7.25934C3.31554 7.21926 3.41926 7.19863 3.524 7.19863C3.62874 7.19863 3.73246 7.21926 3.82923 7.25934C3.92601 7.29943 4.01393 7.35818 4.088 7.43224L6.4 9.73624L11.904 4.23224C12.0536 4.08266 12.2565 3.99863 12.468 3.99863C12.6795 3.99863 12.8824 4.08266 13.032 4.23224C13.1816 4.38183 13.2656 4.5847 13.2656 4.79624C13.2656 5.00779 13.1816 5.21066 13.032 5.36024L6.96 11.4322C6.88599 11.5064 6.79808 11.5652 6.7013 11.6054C6.60452 11.6455 6.50077 11.6662 6.396 11.6662C6.29123 11.6662 6.18748 11.6455 6.0907 11.6054C5.99392 11.5652 5.90601 11.5064 5.832 11.4322Z"
						fill="white"
					/>
				</svg>
			</div>
			<div class="option-text" :class="{ selected: button.selected }">
				{{ button.option }}
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	buttons: {
		type: Array,
		required: true,
		validator: (value) => {
			return value.every((item) => typeof item.option === 'string' && typeof item.selected === 'boolean');
		},
	},
});

const emit = defineEmits(['update:buttons']);

/**
 * Cambia el estado de selección de un botón.
 */
const toggleSelection = (index) => {
	props.buttons.forEach((button, i) => {
		button.selected = i === index;
	});
	emit('update:buttons', [...props.buttons]);
};
</script>

<style scoped>
.check-list {
	display: flex;
	flex-direction: column;
	gap: 30px;
}

.check-button-container {
	width: 323px;
	height: 57px;
	background: rgba(250, 250, 250, 0.8);
	border-radius: 30px;
	display: flex;
	align-items: center;
	padding: 0 24px;
	cursor: pointer;
	transition: background 0.3s ease;
}

.check-button-container.selected {
	background: #40a578;
}

.check-icon {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 1px solid #a4a4a4;
	display: flex;
	justify-content: center;
	align-items: center;
	transition:
		border-color 0.3s ease,
		background 0.3s ease;
}

.check-icon.selected {
	border-color: transparent;
}

.option-text {
	width: 244px;
	height: 15px;
	font-family: 'Stolzl Medium', sans-serif;
	font-size: 12px;
	display: flex;
	align-items: center;
	color: #292b2e;
	margin-left: 18px;
	transition: color 0.3s ease;
}

.option-text.selected {
	color: #ffffff;
}
</style>
