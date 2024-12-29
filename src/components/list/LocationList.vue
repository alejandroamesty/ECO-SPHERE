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
			</div>
		</div>
	</Teleport>
</template>

<script setup>
import { defineProps, ref, toRefs } from 'vue';
import { ReportCard, EventCard, Breadcrumb } from '..';

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

const { options, isModal } = toRefs(props);
const isVisible = ref(false);

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
	animation: slideUp 0.5s forwards;
}

.location-list-container::-webkit-scrollbar {
	display: none;
}

.card-item {
	display: flex;
	justify-content: center;
	padding: 8px 0;
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
