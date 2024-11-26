<template>
  <ion-page>
    <Header>
      <template #header-layout>
        <div class="header-layout">
          <span class="title-1">Reportes</span>
          <div class="buttons">
            <RoundButton :icon="SEARCH" :size=40 :onClick="handleSearch" />
          </div>
        </div>
        <ToggleButton v-model="toggleValue" leftLabel="Mapa" rightLabel="Lista" />
      </template>
    </Header>
    <ion-content :fullscreen="true">
      <div class="leaf-map">
        <LeafletMap :lat="lat" :lng="lng" :zoom="zoom" :shouldInitialize="viewEntered" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { SEARCH } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, LeafletMap } from "../../components/index";

const lat = ref(51.505);
const lng = ref(-0.09);
const zoom = ref(13);
const toggleValue = ref(false);
const viewEntered = ref(false);

/**
 * Obtiene la posición actual del usuario y la muestra en el mapa.
 */
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  lat.value = coordinates.coords.latitude;
  lng.value = coordinates.coords.longitude;
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
</script>

<style scoped>
.leaf-map {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
