<template>
    <div id="map" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import * as L from 'leaflet';
import { ref, watch } from 'vue';

const { lat, lng, zoom, shouldInitialize } = defineProps({
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
});

const map = ref(null);

/**
 * Inicializa el mapa de Leaflet.
 */
const initMap = () => {
    if (map.value) return;

    map.value = L.map('map').setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    L.marker([lat, lng]).addTo(map.value)
        .bindPopup('Estás aquí.')
        .openPopup();
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
    }
);
</script>

<style src="../../assets/map.css"></style>