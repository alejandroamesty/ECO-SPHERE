<template>
	<div class="post-container">
		<div class="user-container">
			<img :src="icon" alt="icon" class="user-icon" />
			<div class="user-info">
				<div class="name">{{ name }}</div>
				<div class="username">{{ username }}</div>
			</div>
		</div>
		<div class="content-container" @click="handleClick">
			<div class="content-text">{{ content }}</div>
		</div>
		<div v-if="images.length > 0" class="carousel-container">
			<div class="carousel-button prev" @click="prevImage" :class="{ disabled: currentImage === 0 }">
				<img :src="ARROW_LEFT" alt="previous image" />
			</div>
			<div class="carousel-image-container">
				<div v-if="!imageLoaded" class="skeleton-loader"></div>
				<img :src="images[currentImage]" :class="{ loading: !imageLoaded }" alt="carousel image" class="carousel-image" @load="handleImageLoad" />
			</div>
			<div class="carousel-button next" @click="nextImage" :class="{ disabled: currentImage === images.length - 1 }">
				<img :src="ARROW_LEFT" alt="next image" />
			</div>
		</div>
		<div class="interactions-container">
			<Badge :text="likes" :is-like-mode="true" v-model:liked="likedState" />
			<Badge :text="comments" :icon="COMMENT" />
		</div>
	</div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { Badge } from '../index';
import { COMMENT, ARROW_LEFT } from '../../utils/icons';

const props = defineProps({
	value: { type: Number, required: true },
	content: { type: String, required: true },
	icon: { type: String, required: true },
	name: { type: String, required: true },
	username: { type: String, required: true },
	likes: { type: String, required: true, default: '0' },
	comments: { type: String, required: true, default: '0' },
	liked: { type: Boolean, default: true },
	onClick: { type: Function, default: () => {} },
	images: { type: Array, default: () => [] },
});

const { value, onClick } = toRefs(props);

const likedState = ref(props.liked);
const currentImage = ref(0);
const imageLoaded = ref(false);

/**
 * Cambia la imagen actual a la anterior.
 */
const prevImage = () => {
	if (currentImage.value > 0) {
		imageLoaded.value = false;
		currentImage.value--;
	}
};

/**
 * Cambia la imagen actual a la siguiente.
 */
const nextImage = () => {
	if (currentImage.value < props.images.length - 1) {
		imageLoaded.value = false;
		currentImage.value++;
	}
};

/**
 * Maneja el evento cuando la imagen ha cargado.
 */
const handleImageLoad = () => {
	imageLoaded.value = true;
};

/**
 * Maneja el evento cuando se hace clic en el componente.
 */
const handleClick = () => {
	onClick.value(value.value);
};
</script>

<style scoped>
.post-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 24px;
	padding: 24px;
	height: fit-content;
	background: #f6f6f6;
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
		-1px -1px 2px rgba(221, 221, 221, 0.5),
		inset -5px 5px 10px rgba(221, 221, 221, 0.2),
		inset 5px -5px 10px rgba(221, 221, 221, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9),
		inset 5px 5px 13px rgba(221, 221, 221, 0.9);
	border-radius: 30px;
}

.user-container {
	display: flex;
	align-items: center;
	width: 100%;
	height: fit-content;
	gap: 13px;
}

.user-icon {
	width: 40px;
	height: 40px;
	border-radius: 100%;
}

.user-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

.name {
	display: flex;
	align-items: center;
	/* width: 114px; */
	height: 16px;
	top: 0;
	font-family: 'Stolzl Medium';
	font-size: 14px;
	color: #292b2e;
}

.username {
	display: flex;
	align-items: center;
	/* width: 129px; */
	height: 16px;
	font-family: 'Stolzl Regular';
	font-size: 11px;
	color: #949799;
}

.content-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.content-text {
	width: 100%;
	height: fit-content;
	font-family: 'Stolzl Regular';
	font-size: 12px;
	color: #292b2e;
}

.carousel-container {
	position: relative;
	width: 100%;
	height: 300px;
	overflow: hidden;
}

.carousel-image-container {
	position: relative;
	width: 100%;
	height: 300px;
}

.carousel-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 20px;
	opacity: 1;
	transition: opacity 0.3s;
}

.carousel-image.loading {
	opacity: 0;
}

.loading-indicator {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: 'Stolzl Medium';
	color: #292b2e;
}

.carousel-button {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	height: 100%;
	top: 50%;
	transform: translateY(-50%);
	padding: 10px;
	cursor: pointer;
	opacity: 1;
	transition: opacity 0.3s;
}

.carousel-button.disabled {
	opacity: 0.5;
	pointer-events: none;
}

.carousel-button.prev {
	left: 0px;
	z-index: 1;
	border-radius: 20px 0 0 20px;
}

.carousel-button.next {
	right: 0px;
	border-radius: 0 20px 20px 0;
}

.carousel-button.next img {
	transform: rotate(180deg);
}

.interactions-container {
	display: flex;
	align-items: flex-start;
	width: 100%;
	height: fit-content;
	gap: 9px;
}

.skeleton-loader {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: skeleton-loading 1.5s infinite;
	border-radius: 20px;
}

@keyframes skeleton-loading {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}
</style>
