<template>
	<div class="carousel-container" @mousedown="startSwipe" @touchstart="startSwipe" @mousemove="moveSwipe" @touchmove="moveSwipe" @mouseup="endSwipe" @touchend="endSwipe" @mouseleave="endSwipe">
		<div
			class="carousel"
			:style="{
				transform: `translateX(-${currentIndex * 100}%)`,
			}"
		>
			<div class="carousel-item" v-for="(image, index) in imageList" :key="index" @click="openPhotoViewer(index)">
				<img :src="image.url" :alt="'Image ' + (index + 1)" />
			</div>
		</div>
	</div>
	<Teleport to="body">
		<div v-if="isViewerOpen" class="photo-viewer" @click="closePhotoViewer">
			<div class="photo-viewer-content" @wheel="zoomImage" @touchmove="onTouchMove" @touchstart="onTouchStart" @touchend="onTouchEnd">
				<img :src="imageList[currentIndex].url" alt="Full-screen image" :style="{ transform: `scale(${scale})` }" />
			</div>
			<div class="photo-viewer-controls">
				<button @click="prev" class="control-btn">Prev</button>
				<button @click="next" class="control-btn">Next</button>
			</div>
		</div>
	</Teleport>
</template>

<script>
export default {
	props: {
		imageList: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			currentIndex: 0,
			startX: 0,
			isSwiping: false,
			isViewerOpen: false,
			scale: 1,
			touchStartDistance: 0,
		};
	},
	methods: {
		/**
		 * Inicia el desplazamiento de la galería.
		 */
		startSwipe(event) {
			this.isSwiping = true;
			this.startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
		},
		/**
		 * Mueve la galería.
		 */
		moveSwipe(event) {
			if (!this.isSwiping) return;
			const moveX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
			const diff = this.startX - moveX;

			if (Math.abs(diff) > 50) {
				if (diff > 0) {
					this.next();
				} else {
					this.prev();
				}
				this.isSwiping = false;
			}
		},
		/**
		 * Finaliza el desplazamiento de la galería.
		 */
		endSwipe() {
			this.isSwiping = false;
		},
		/**
		 * Muestra la siguiente imagen.
		 */
		next() {
			if (this.currentIndex < this.imageList.length - 1) {
				this.currentIndex++;
			}
		},
		/**
		 * Muestra la imagen anterior.
		 */
		prev() {
			if (this.currentIndex > 0) {
				this.currentIndex--;
			}
		},
		/**
		 * Abre el visor de imágenes.
		 * @param {number} index - Índice de la imagen.
		 */
		openPhotoViewer(index) {
			this.currentIndex = index;
			this.isViewerOpen = true;
		},
		/**
		 * Cierra el visor de imágenes.
		 */
		closePhotoViewer() {
			this.isViewerOpen = false;
			this.scale = 1;
		},
		/**
		 * Amplía o reduce la imagen.
		 */
		zoomImage(event) {
			event.preventDefault();
			if (event.deltaY < 0) {
				this.scale += 0.1;
			} else {
				this.scale -= 0.1;
			}
			if (this.scale < 1) this.scale = 1;
		},
		/**
		 * Inicia el cálculo de la distancia entre dos toques.
		 */
		onTouchStart(event) {
			if (event.touches.length === 2) {
				this.touchStartDistance = this.getTouchDistance(event);
			}
		},
		/**
		 * Calcula la distancia entre dos toques.
		 */
		onTouchMove(event) {
			if (event.touches.length === 2) {
				const newDistance = this.getTouchDistance(event);
				const distanceDiff = newDistance - this.touchStartDistance;

				const scaleChange = distanceDiff * 0.005;
				this.scale += scaleChange;

				if (this.scale < 1) this.scale = 1;
				if (this.scale > 3) this.scale = 3;

				this.touchStartDistance = newDistance;
			}
		},
		/**
		 * Finaliza el cálculo de la distancia entre dos toques.
		 */
		onTouchEnd() {
			this.touchStartDistance = 0;
		},
		/**
		 * Calcula la distancia entre dos toques.
		 */
		getTouchDistance(event) {
			const dx = event.touches[0].clientX - event.touches[1].clientX;
			const dy = event.touches[0].clientY - event.touches[1].clientY;
			return Math.sqrt(dx * dx + dy * dy);
		},
	},
};
</script>

<style scoped>
.carousel-container {
	position: relative;
	width: 270px;
	height: 270px;
	cursor: grab;
}

.carousel {
	display: flex;
	gap: 30px;
	transition: transform 0.3s ease;
}

.carousel-item {
	min-width: 270px;
	height: 270px;
	box-sizing: border-box;
	border-radius: 30px;
	overflow: hidden;
}

.carousel img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.photo-viewer {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(23px) saturate(1) opacity(90%) !important;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.photo-viewer-content {
	display: contents;
	position: relative;
}

.photo-viewer img {
	max-width: 90%;
	max-height: 90%;
	object-fit: contain;
}

.photo-viewer-controls {
	position: absolute;
	bottom: 20px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 30px;
}

.control-btn {
	background-color: rgba(255, 255, 255, 0.7);
	border: none;
	padding: 10px;
	font-size: 18px;
	cursor: pointer;
	border-radius: 5px;
}

.control-btn:hover {
	background-color: rgba(255, 255, 255, 0.9);
}
</style>
