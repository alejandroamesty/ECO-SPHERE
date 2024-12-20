<template>
	<div class="box" :style="{ order: order }" :class="{ border: content }" @click="handleClick">
		<div v-if="content" class="content-preview">
			<img :src="content" alt="content" />
			<!-- <video v-if="content.type === 'video'" controls>
				<source :src="content.src" type="video/mp4" />
			</video> -->
		</div>
		<div v-else class="empty-box">
			<img :src="CIRCLE_ADD" alt="icon" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CIRCLE_ADD } from '../../utils/icons';

const props = defineProps({
	order: {
		type: Number,
		required: true,
	},
});

const content = ref(null);

const handleClick = async () => {
	try {
		const image = await Camera.getPhoto({
			quality: 90,
			source: CameraSource.Prompt,
			resultType: CameraResultType.Uri,
		});

		content.value = image.webPath;
	} catch (error) {
		console.error('Error al seleccionar contenido:', error);
	}
};
</script>

<style scoped>
.box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 99px;
	height: 99px;
	border-radius: 30px;
	border: 2px dashed rgba(41, 43, 46, 0.5);
	cursor: pointer;
}

.border {
	border: none;
}

.empty-box {
	display: flex;
	justify-content: center;
	align-items: center;
}

.empty-box img {
	width: 30px;
	height: 30px;
}

.content-preview {
	width: 99px;
	height: 99px;
	border-radius: 30px;
}

.content-preview img,
.content-preview video {
	width: 100%;
	height: 100%;
	border-radius: 30px;
	object-fit: cover;
}
</style>
