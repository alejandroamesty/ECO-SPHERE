<template>
	<Teleport v-if="isModal" to="body">
		<div class="overlay" v-if="isVisible" :class="{ 'fade-out': !isVisible }">
			<div class="spacing" @click="handleOutsideClick">
				<Breadcrumb label="Localización" @back="handleOutsideClick" />
			</div>
			<div class="location-list-container" @click.stop>
				<div v-for="option in options" :key="option.value" class="card-item">
					<ReportCard
						v-if="option.type === 'report'"
						:description="option.description"
						:latitude="option.latitude"
						:longitude="option.longitude"
						:date="option.date"
						:icon="option.icon"
						:name="option.name"
						:username="option.username"
						:image="option.image"
						:isModal="false"
						:neumorphism="false"
					/>
					<EventCard v-if="option.type === 'event'" :description="option.description" :latitude="option.latitude" :longitude="option.longitude" :date="option.date" :icon="option.icon" :name="option.name" :username="option.username" />
				</div>
				<div class="suggestion" v-if="onlyReports" @click="handleSuggestionClick">
					<div class="icon">
						<img :src="CHECK" alt="Crear" />
					</div>
					<div class="text">
						<div class="title">Crear un nuevo evento</div>
						<div class="subtitle">Invita a tu comunidad</div>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref, toRefs, computed } from 'vue';
import { ReportCard, EventCard, Breadcrumb } from '..';
import { CHECK } from '../../utils/icons';

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	isModal: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['suggestionClick']);

const { options, isModal } = toRefs(props);
const isVisible = ref(false);

/**
 * Comprobar si solo hay reportes en la lista.
 */
const onlyReports = computed(() => {
	return options.value.every((option) => option.type === 'report');
});

/**
 * Mostrar la lista de localizaciones en el modal.
 */
const showLocationList = () => {
	isVisible.value = true;
};

/**
 * Ocultar el modal de localizaciones.
 */
const handleOutsideClick = () => {
	isVisible.value = false;
};

/**
 * Manejar el clic en el contenedor de sugerencia.
 */
const handleSuggestionClick = () => {
	const coordinates = options.value.map((option) => ({
		latitude: option.latitude,
		longitude: option.longitude,
	}));
	handleOutsideClick();
	emit('suggestionClick', coordinates);
};

defineExpose({
	showLocationList,
});
</script>

<style scoped>
.overlay {
	position: fixed;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(23px) saturate(1) opacity(100%) !important;
	animation: fadeIn 0.3s ease-out;
	transition: opacity 0.3s ease-out;
}

.overlay .fade-out {
	animation: fadeOut 0.3s forwards;
}

.spacing {
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	/* height: 150px; */
	padding: 50px 25px 10px 25px;
}

.location-list-container {
	display: flex;
	flex-direction: column;
	border-radius: 30px 30px 0 0;
	width: fit-content;
	overflow: auto;
	scrollbar-width: none;
	padding-bottom: 20px;
	gap: 20px;
	animation: slideUp 0.5s forwards;
}

.location-list-container::-webkit-scrollbar {
	display: none;
}

.card-item {
	display: flex;
	justify-content: center;
	/* padding: 8px 0; */
}

.suggestion {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	min-height: 80px;
	border-radius: 30px;
	gap: 20px;
	padding: 20px;
	background: #ffffff;
}

.icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background: #edeef0;
	border-radius: 50%;
}

.icon img {
	width: 18px;
	height: 18px;
	filter: invert(1) brightness(255%) contrast(100%) grayscale(0);
}

.text {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.title {
	height: 17px;
	font-family: 'Stolzl Medium';
	font-size: 14px;
	display: flex;
	align-items: center;
	color: #292b2e;
}

.subtitle {
	height: 17px;
	font-family: 'Stolzl Regular';
	font-size: 14px;
	display: flex;
	align-items: center;
	color: #949799;
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

@keyframes fadeOut {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}
</style>
