<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="leaf-header">
          <div class="header-layout">
            <span class="title-1">Reportes</span>
            <div class="buttons">
              <RoundButton :icon="SEARCH" :size=40 :onClick="handleSearch" />
            </div>
          </div>
          <ToggleButton v-model="toggleValue" leftLabel="Mapa" rightLabel="Lista" />
        </div>
      </ion-toolbar>
      <div class="leaf-end"></div>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="leaf-map">
        <LeafletMap :lat="lat" :lng="lng" :zoom="zoom" :shouldInitialize="viewEntered" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/vue';
import { onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { SEARCH, NOTIFICATIONS } from '../../utils/icons';
import { RoundButton, ToggleButton, LeafletMap } from "../../components/index";

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
ion-header {
  background-color: transparent !important;
}

ion-toolbar {
  --background: #40A578;
  border-radius: 0px 0px 0px 50px;
  position: relative;
}

.leaf-header {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 129px;
  left: 0px;
  flex-direction: column;
  gap: 20px;
  background: #40A578;
  border-radius: 0px 0px 0px 50px;
}

.leaf-end {
  position: absolute;
  right: 0;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 0 50px 0 0;
  box-shadow: 25px -25px 0 25px #40A578;
  z-index: 9999;
}

.header-layout {
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  position: relative;
  flex-direction: row;
  flex-shrink: 0;
}

.title-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 25px;
  color: #FFF;
  font-family: "BR Omny SemiBold";
  font-size: 20px;
}

.buttons {
  display: flex;
  flex-direction: row;
  position: relative;
  right: 25px;
  gap: 8px;
}

.leaf-map {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
