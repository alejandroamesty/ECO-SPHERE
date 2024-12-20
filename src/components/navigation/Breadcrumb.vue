<template>
	<div class="breadcrumb" @click="handleBackClick">
		<img class="arrow-icon" :src="ARROW_LEFT" alt="Back" />
		<span class="breadcrumb-label">{{ label }}</span>
	</div>
</template>

<script setup>
import { ARROW_LEFT } from '../../utils/icons';

const props = defineProps({
	label: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['back']);

/**
 * Gestiona el evento click del botón de retroceso.
 */
const handleBackClick = () => {
	emit('back');
};
</script>

<style scoped>
.breadcrumb {
	display: flex;
	align-items: center;
	height: 48px;
}

.arrow-icon {
	width: 18px;
	height: 18px;
	position: relative;
}

.breadcrumb-label {
	font-family: 'Stolzl Medium';
	font-size: 20px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #ffffff;
	margin-left: 9px;
}
</style>
