<template>
  <ion-page>
    <Header>
      <template #header-layout>
        <div class="header-layout">
          <span class="title-1">Reportes</span>
          <div class="buttons">
            <RoundButton :icon="ADD" :size="40" :onClick="handleADD" />
          </div>
        </div>
        <ToggleButton v-model="toggleValue" leftLabel="Mapa" rightLabel="Lista" />
      </template>
    </Header>
    <ion-content :fullscreen="true">
      <div class="leaf-map">
        <LeafletMap :lat="lat" :lng="lng" :zoom="zoom" :shouldInitialize="viewEntered" :locations="locations"
          @onPinClick="handlePinClick" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { ADD } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, LeafletMap } from "../../components/index";

const lat = ref(51.505);
const lng = ref(-0.09);
const zoom = ref(13);
const toggleValue = ref(false);
const viewEntered = ref(false);

const locations = [
  { value: 1, lat: 51.505, lng: -0.09, popupText: 'Ubicación 1' },
  { value: 2, lat: 51.515, lng: -0.1, popupText: 'Ubicación 2' },
  { value: 3, lat: 51.525, lng: -0.11, popupText: 'Ubicación 3' }
];

/**
 * Obtiene la posición actual del usuario y la muestra en el mapa.
 */
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  // lat.value = coordinates.coords.latitude;
  // lng.value = coordinates.coords.longitude;
};

/**
 * Renderiza el mapa cuando la vista está activa.
 */
onIonViewDidEnter(async () => {
  await printCurrentPosition();
  viewEntered.value = true;
});

/**
 * Desactiva el mapa cuando la vista está inactiva.
 */
onIonViewWillLeave(() => {
  viewEntered.value = false;
});

/**
 * Maneja el evento cuando se hace clic en un pin (marcador).
 */
const handlePinClick = (pinValue) => {
  console.log('Pin seleccionado con valor:', pinValue);
};
</script>

<style scoped>
.leaf-map {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 110vh;
}
</style>
