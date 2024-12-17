<template>
    <div id="map" style="height: 100%; width: 100%;"></div>
</template>

<script setup>
import * as L from 'leaflet';
import { ref, watch, defineEmits, onBeforeMount } from 'vue';
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
    }
});

const emit = defineEmits(['onPinClick']);

const map = ref(null);

/**
 * Agrega un icono personalizado para los marcadores.
 */
const customIcon = L.icon({
    iconUrl: MAP,
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

/**
 * Inicializa el mapa de Leaflet.
 */
const initMap = () => {
    if (map.value) return;

    map.value = L.map('map').setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    L.marker([lat, lng], { icon: customIcon }).addTo(map.value)
        .bindPopup('Estás aquí.')
        .openPopup();

    locations.forEach(location => {
        if (location.lat && location.lng) {
            const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map.value)
                .bindPopup(location.popupText || 'Ubicación');

            marker.on('click', () => {
                emit('onPinClick', location.value);
            });

            if (location.lat === lat && location.lng === lng) {
                marker.openPopup();
            }
        }
    });
};

/**
 * Inicializa el mapa al montar el componente.
 */
onBeforeMount(() => {
    setTimeout(() => {
        initMap();
    }, 0);
});

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

<style src="../../assets/map.css" scoped></style>