<template>
	<div :style="{ backgroundColor: backgroundColor }" class="badge-container" @click="toggleLike" v-if="isLikeMode">
		<div class="badge-items">
			<img
				:src="liked ? LIKED : UNLIKED"
				alt="icon"
				class="badge-icon"
				:class="{
					'liked-animation': liked && animating,
					'unliked-animation': !liked && animating,
				}"
				@animationend="handleAnimationEnd"
			/>
			<span :style="{ fontSize: fontSize, color: textColor }" class="badge-text">{{ text }}</span>
		</div>
	</div>
	<div v-else :style="{ backgroundColor: backgroundColor }" class="badge-container">
		<div class="badge-items">
			<img :src="icon" alt="icon" class="badge-icon" />
			<span :style="{ fontSize: fontSize, color: textColor }" class="badge-text">{{ text }}</span>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { LIKED, UNLIKED } from '../../utils/icons';

const props = defineProps({
	text: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	backgroundColor: {
		type: String,
		default: 'rgba(79, 84, 88, 0.5)',
	},
	textColor: {
		type: String,
		default: '#FFFFFF',
	},
	isLikeMode: {
		type: Boolean,
		default: false,
	},
	liked: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:liked']);

const animating = ref(false);

function toggleLike() {
	if (!props.isLikeMode) return;

	animating.value = true;
	emit('update:liked', !props.liked);
}

function handleAnimationEnd() {
	animating.value = false;
}
</script>

<style scoped>
.badge-container {
	display: flex;
	align-self: center;
	width: fit-content;
	height: 33px;
	padding: 0 13px;
	backdrop-filter: blur(26px);
	border-radius: 100px;
}

.badge-items {
	display: flex;
	align-items: center;
	justify-content: center;
}

.badge-icon {
	flex-shrink: 0;
	width: 15px;
	height: 15px;
	margin-right: 6px;
	transition:
		transform 0.3s ease,
		opacity 0.3s ease;
}

/* Animation for liked state */
.liked-animation {
	animation: like-scale 0.3s ease forwards;
}

/* Animation for unliked state */
.unliked-animation {
	animation: unlike-scale 0.3s ease forwards;
}

/* Keyframes for animations */
@keyframes like-scale {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.5);
	}

	100% {
		transform: scale(1);
	}
}

@keyframes unlike-scale {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
}

.badge-text {
	display: flex;
	align-items: center;
	font-size: 11px;
	font-family: 'Stolzl Regular';
	line-height: 13px;
}
</style>
