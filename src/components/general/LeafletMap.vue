<template>
	<div id="map" style="height: 100%; width: 100%"></div>
</template>

<script setup>
import * as L from 'leaflet';
import { ref, watch, defineEmits } from 'vue';
import { MAP } from '../../utils/icons';

const { lat, lng, zoom, shouldInitialize, locations } = defineProps({
	lat: {
		type: Number,
		required: true,
		default: 51.505,
	},
	lng: {
		type: Number,
		required: true,
		default: -0.09,
	},
	zoom: {
		type: Number,
		required: true,
		default: 13,
	},
	shouldInitialize: {
		type: Boolean,
		required: true,
	},
	locations: {
		type: Array,
		required: true,
		default: () => [],
	},
});

const emit = defineEmits(['onPinClick']);

const map = ref(null);

/**
 * Inicializa el mapa de Leaflet.
 */
const initMap = () => {
	if (map.value) {
		map.value.setView([lat, lng], zoom);
		return;
	}

	map.value = L.map('map').setView([lat, lng], zoom);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map.value);

	const customIcon = L.icon({
		iconUrl: MAP,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
	});

	// L.marker([lat, lng], { icon: customIcon }).addTo(map.value).bindPopup('Estás aquí.').openPopup();

	locations.forEach((location) => {
		if (location.lat && location.lng) {
			const marker = L.marker([location.lat, location.lng], { icon: customIcon })
				.addTo(map.value)
				.bindPopup(location.popupText || 'Ubicación');

			marker.on('click', () => emit('onPinClick', location.value));
		}
	});
};

/**
 * Observa cambios en las coordenadas y actualiza el mapa.
 */
watch(
	() => [lat, lng],
	([newLat, newLng]) => {
		if (map.value && (newLat !== 0 || newLng !== 0)) {
			map.value.setView([newLat, newLng], zoom);
		}
	},
	{ immediate: true },
);

/**
 * Observa si se debe inicializar el mapa.
 */
watch(
	() => shouldInitialize,
	(newVal) => {
		if (newVal) {
			initMap();
		}
	},
	{ immediate: true },
);
</script>

<style src="../../assets/map.css" scoped></style>
