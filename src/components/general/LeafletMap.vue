<template>
	<div id="map" style="height: 100%; width: 100%"></div>
</template>

<script setup>
import * as L from 'leaflet';
import { ref, watch, computed } from 'vue';
import { REPORT, EVENT, MIXED, MAP } from '../../utils/icons';

const { lat, lng, zoom, shouldInitialize, reports, events } = defineProps({
	lat: { type: Number, required: true, default: 51.505 },
	lng: { type: Number, required: true, default: -0.09 },
	zoom: { type: Number, required: true, default: 13 },
	shouldInitialize: { type: Boolean, required: true },
	reports: { type: Array, required: true, default: () => [] },
	events: { type: Array, required: true, default: () => [] },
});

const emit = defineEmits(['onPinClick']);
const map = ref(null);

/**
 * Procesa las ubicaciones para determinar los tipos de marcadores y agrupar valores.
 */
const markers = computed(() => {
	const markerMap = new Map();

	reports.forEach((report) => {
		const key = `${report.lat},${report.lng}`;
		if (!markerMap.has(key)) {
			markerMap.set(key, {
				lat: report.lat,
				lng: report.lng,
				popupText: report.popupText || '',
				type: 'report',
				value: { reports: new Set(), events: new Set() },
			});
		}
		const marker = markerMap.get(key);
		marker.value.reports.add(report.value);
	});

	events.forEach((event) => {
		const key = `${event.lat},${event.lng}`;
		if (!markerMap.has(key)) {
			markerMap.set(key, {
				lat: event.lat,
				lng: event.lng,
				popupText: event.popupText || '',
				type: 'event',
				value: { reports: new Set(), events: new Set() },
			});
		}
		const marker = markerMap.get(key);
		marker.value.events.add(event.value);
		if (marker.type === 'report') {
			marker.type = 'mixed';
			marker.popupText = 'COMBINADO';
		}
	});

	return Array.from(markerMap.values());
});

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

	// L.marker([lat, lng], {
	// 	icon: L.icon({ iconUrl: MAP, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
	// })
	// 	.addTo(map.value)
	// 	.bindPopup('Estás aquí.')
	// 	.openPopup();

	markers.value.forEach((markerData) => {
		const icon = L.icon({
			iconUrl: markerData.type === 'report' ? REPORT : markerData.type === 'event' ? EVENT : MIXED,
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32],
		});

		const marker = L.marker([markerData.lat, markerData.lng], { icon })
			.addTo(map.value)
			.bindPopup(markerData.popupText || 'Ubicación');

		marker.on('click', () => {
			const formattedValue = {
				reports: Array.from(markerData.value.reports),
				events: Array.from(markerData.value.events),
			};
			emit('onPinClick', { ...markerData, value: formattedValue });
		});
	});
};

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
