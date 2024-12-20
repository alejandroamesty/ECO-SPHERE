<template>
	<transition name="context-menu">
		<div v-if="isVisible" ref="contextMenuRef" class="context-menu" :style="{ top: `${position.y}px`, left: `${position.x}px` }" @touchmove="handleTouchMove">
			<div v-for="(option, index) in options" :key="index" :class="['context-menu-option', { clicked: activeOption === index }]" @touchstart="startDragging(index)" @touchend="stopDragging" @click="handleOptionClick(option)">
				<img :src="option.icon" alt="option-icon" class="context-menu-icon" />
				<span class="context-menu-label">{{ option.label }}</span>
			</div>
		</div>
	</transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const { options } = defineProps({
	options: {
		type: Array,
		required: true,
	},
});

const isVisible = ref(false);
const position = ref({ x: 0, y: 0 });
const activeOption = ref(null);
const isDragging = ref(false);
const contextMenuRef = ref(null);
let hasEmitted = ref(false);

const emit = defineEmits(['selected']);

/**
 * Muestra el menú contextual en la posición especificada.
 * @param pos - Posición del menú.
 */
const showMenu = (pos) => {
	position.value = pos;
	isVisible.value = true;
};

/**
 * Oculta el menú contextual.
 */
const hideMenu = () => {
	isVisible.value = false;
	activeOption.value = null;
	isDragging.value = false;
};

/**
 * Inicia el arrastre de una opción del menú.
 * @param index - Índice de la opción.
 */
const startDragging = (index) => {
	activeOption.value = index;
	isDragging.value = true;
	triggerHapticFeedback();
};

/**
 * Detiene el arrastre de una opción del menú.
 */
const stopDragging = () => {
	if (!isDragging.value || hasEmitted.value) return;

	isDragging.value = false;

	if (activeOption.value !== null) {
		handleOptionClick(options[activeOption.value]);
		hasEmitted.value = true;
		setTimeout(() => (hasEmitted.value = false), 200);
	}
};

/**
 * Maneja el clic en una opción del menú.
 * @param option - Opción seleccionada.
 */
const handleOptionClick = (option) => {
	if (hasEmitted.value) return;

	emit('selected', option);
	hasEmitted.value = true;
	setTimeout(() => (hasEmitted.value = false), 200);
	setTimeout(hideMenu, 100);
};

/**
 * Maneja el movimiento táctil en el menú.
 * @param event - Evento táctil.
 */
const handleTouchMove = (event) => {
	if (!isDragging.value || !contextMenuRef.value) return;

	const touch = event.touches[0];
	const options = contextMenuRef.value.querySelectorAll('.context-menu-option');

	options.forEach((option, index) => {
		const rect = option.getBoundingClientRect();
		if (touch.clientY >= rect.top && touch.clientY <= rect.bottom && activeOption.value !== index) {
			activeOption.value = index;
			triggerHapticFeedback();
		}
	});
};

/**
 * Emite una vibración háptica.
 */
const triggerHapticFeedback = () => {
	Haptics.impact({ style: ImpactStyle.Light });
};

/**
 * Maneja el clic en cualquier parte del documento.
 */
onMounted(() => {
	document.addEventListener('touchend', stopDragging);
});

/**
 * Elimina el evento de clic al desmontar el componente.
 */
onBeforeUnmount(() => {
	document.removeEventListener('touchend', stopDragging);
});

/**
 * Expone las propiedades y métodos del componente.
 */
defineExpose({
	showMenu,
	hideMenu,
	isVisible,
	position,
});
</script>

<style scoped>
.context-menu {
	position: absolute;
	background: rgba(33, 83, 61, 0.5);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 10px;
	z-index: 1000;
	transform-origin: top right;
}

.context-menu-option {
	display: flex;
	align-items: center;
	padding: 10px;
	border-radius: 10px;
	transition: background 0.2s ease;
}

.context-menu-option.clicked {
	background: rgba(33, 83, 61, 0.2);
}

.context-menu-icon {
	width: 18px;
	height: 18px;
	margin-right: 10px;
	filter: invert(1) brightness(255%) contrast(100%) grayscale(0);
}

.context-menu-label {
	font-family: 'Stolzl Regular';
	font-size: 12px;
	color: #ffffff;
}

.context-menu-enter-active,
.context-menu-leave-active {
	transition:
		transform 0.3s ease-out,
		opacity 0.3s ease-out;
}

.context-menu-enter-from {
	transform: scale(0) translateX(0%);
	opacity: 0;
}

.context-menu-enter-to {
	transform: scale(1) translateX(0%);
	opacity: 1;
}

.context-menu-leave-from {
	transform: scale(1) translateX(0%);
	opacity: 1;
}

.context-menu-leave-to {
	transform: scale(0) translateX(0%);
	opacity: 0;
}
</style>
