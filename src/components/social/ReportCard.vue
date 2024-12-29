<template>
	<Teleport v-if="isModal" to="body">
		<div class="overlay" v-if="isVisible" @click="handleOutsideClick">
			<div class="card-container" :class="{ modal: isModal }" @click.stop>
				<div class="report-image">
					<div class="report-badge">
						<Badge text="REPORTE" :icon="ASTERISK" />
					</div>
					<img :src="image" alt="Report Image" />
				</div>
				<div class="report-container">
					<div class="report-description">{{ description }}</div>
					<div class="report-detail">
						<div class="latitude">
							<span class="label">LATITUD</span>
							<span class="value">{{ latitude }}</span>
						</div>
						<div class="longitude">
							<span class="label">LONGITUD</span>
							<span class="value">{{ longitude }}</span>
						</div>
						<div class="date">
							<span class="label">FECHA</span>
							<span class="value">{{ date }}</span>
						</div>
					</div>
					<div class="user-container">
						<img class="user-icon" :src="icon" alt="User Icon" />
						<div class="user-info">
							<div class="name">{{ name }}</div>
							<div class="username">{{ username }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
	<div v-else class="card-container" :class="{ neumorphism: neumorphism }">
		<div class="report-image">
			<div class="report-badge">
				<Badge text="REPORTE" :icon="ASTERISK" />
			</div>
			<div v-if="isImageLoading" class="skeleton-image"></div>
			<img v-else :src="image" alt="Report Image" @load="handleImageLoad" />
		</div>
		<div class="report-container">
			<div class="report-description">{{ description }}</div>
			<div class="report-detail">
				<div class="latitude">
					<span class="label">LATITUD</span>
					<span class="value">{{ latitude }}</span>
				</div>
				<div class="longitude">
					<span class="label">LONGITUD</span>
					<span class="value">{{ longitude }}</span>
				</div>
				<div class="date">
					<span class="label">FECHA</span>
					<span class="value">{{ date }}</span>
				</div>
			</div>
			<div class="user-container">
				<img class="user-icon" :src="icon" alt="User Icon" />
				<div class="user-info">
					<div class="name">{{ name }}</div>
					<div class="username">{{ username }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { Badge } from '..';
import { ASTERISK } from '../../utils/icons';
import example from '../../../public/images/png/example.jpg';

const props = defineProps({
	image: { type: String, required: true, default: example },
	description: { type: String, required: true },
	latitude: { type: String, required: true },
	longitude: { type: String, required: true },
	date: { type: String, required: true },
	icon: { type: String, required: true },
	name: { type: String, required: true },
	username: { type: String, required: true },
	isModal: { type: Boolean, default: false },
	neumorphism: { type: Boolean, default: true },
});

const { image, description, latitude, longitude, date, icon, name, username, isModal } = toRefs(props);

const isVisible = ref(false);
const isImageLoading = ref(false);

/**
 * Maneja el evento cuando la imagen ha cargado.
 */
const handleImageLoad = () => {
	isImageLoading.value = false;
};

/**
 * Muestra la tarjeta de reporte.
 */
const showReportCard = () => {
	isVisible.value = true;
};

/**
 * Oculta la tarjeta de reporte.
 */
const handleOutsideClick = () => {
	isVisible.value = false;
};

defineExpose({
	showReportCard,
});
</script>

<style scoped>
.overlay {
	position: absolute;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(23px) saturate(1) opacity(70%) !important;
	animation: fadeIn 0.3s ease-out;
}

.card-container {
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: #ffffff;
	border-radius: 30px;
}

.card-container.neumorphism {
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
		-1px -1px 2px rgba(230, 230, 230, 0.5),
		inset -5px 5px 10px rgba(230, 230, 230, 0.2),
		inset 5px -5px 10px rgba(230, 230, 230, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9),
		inset 5px 5px 13px rgba(230, 230, 230, 0.9);
}

.modal {
	position: fixed;
	bottom: -100px;
	animation: slideUp 0.5s forwards;
}

.report-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 338px;
	height: fit-content;
	border-bottom-left-radius: 30px;
	border-bottom-right-radius: 30px;
	gap: 22px;
	padding-top: 22px;
	padding-bottom: 22px;
}

.report-image {
	width: 338px;
	height: 254px;
	left: 27px;
	top: 358px;
	border-radius: 30px;
	overflow: hidden;
}

.report-badge {
	position: absolute;
	top: 22px;
	left: 22px;
}

.report-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.report-description {
	width: 293px;
	max-height: 48px;
	font-family: 'Stolzl Regular';
	font-size: 13px;
	color: #292b2e;
}

.report-detail {
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	padding-left: 22px;
	padding-right: 22px;
}

.latitude,
.longitude,
.date {
	display: flex;
	flex-direction: column;
}

.label {
	font-family: 'Stolzl Regular';
	font-size: 12px;
	color: #949799;
}

.value {
	font-family: 'Stolzl Regular';
	font-size: 20px;
	color: #292b2e;
}

.user-container {
	display: flex;
	align-items: center;
	gap: 13px;
	width: 100%;
	padding-left: 22px;
	padding-right: 22px;
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

.skeleton-image {
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
	background-size: 200% 100%;
	animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}

@keyframes slideUp {
	0% {
		bottom: -100px;
	}

	100% {
		bottom: 30px;
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
