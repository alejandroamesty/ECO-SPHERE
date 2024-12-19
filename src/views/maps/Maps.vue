<template>
  <ion-page>
    <Header ref="header">
      <template #header-layout>
        <div class="header-layout">
          <span class="title-1">Reportes</span>
          <div class="buttons">
            <RoundButton :icon="ADD" :size="40" :onClick="handleClick" />
          </div>
        </div>
        <ToggleButton v-model="toggleValue" leftLabel="Mapa" rightLabel="Lista" />
      </template>
    </Header>
    <ion-content :fullscreen="true">
      <Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event" :fullscreen="true">
        <template #slide1>
          <div class="leaf-map">
            <LeafletMap :lat="lat" :lng="lng" :zoom="zoom" :shouldInitialize="viewEntered" :locations="locations"
              @onPinClick="handlePinClick" />
          </div>
        </template>
        <template #slide2>
          <div class="content" :style="{ marginTop: headerHeight + 'px' }">
            <div class="report-list">
              <ReportList :reports="reports" />
            </div>
          </div>
        </template>
      </Slider>
    </ion-content>
    <ReportCard ref="report" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec
                    ultricies." latitude="19.432" longitude="99.13" date="12/12/2021"
      icon="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" name="Alejandro Ávila"
      username="@alejandroamesty" :is-modal="true" />
    <Modal title="Crear reporte" :isOpen="showModal" :onClose="closeModal" :backButton="closeModal"
      :nextButton="closeModal">
      <div class="modal-content">
        <span class="label">Título</span>
        <TextInput placeholder="Ingresa un título" :neumorphism="false" />
        <span class="label">Descripción</span>
        <TextInput placeholder="Ingresa una descripción" :neumorphism="false" :paragraph="true" />
        <span class="label">Imagen</span>
        <div class="options">
          <BoxButton :icon="CAMERA" caption="Desde cámara del dispositivo" :onClick="openCamera" />
          <BoxButton :icon="GALLERY" caption="Desde galería de fotos" :onClick="openGallery" />
        </div>
      </div>
    </Modal>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewWillEnter, onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { ADD, CAMERA, GALLERY } from '../../utils/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Header, RoundButton, ToggleButton, LeafletMap, ReportCard, Slider, Modal, ReportList, TextInput, BoxButton } from "../../components/index";

const lat = ref(51.505);
const lng = ref(-0.09);
const zoom = ref(13);
const toggleValue = ref(false);
const viewEntered = ref(false);
const report = ref();
const headerHeight = ref(0);
const showModal = ref(false);

const locations = [
  { value: 1, lat: 51.505, lng: -0.09, popupText: 'Ubicación 1' },
  { value: 2, lat: 51.515, lng: -0.1, popupText: 'Ubicación 2' },
  { value: 3, lat: 51.525, lng: -0.11, popupText: 'Ubicación 3' }
];

const reports = [
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies.',
    latitude: '19.432',
    longitude: '99.13',
    date: '12/12/2021',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
    name: 'Alejandro Ávila',
    username: '@alejandroamesty',
  }
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
  report.value.showReportCard();
  console.log('Pin seleccionado con valor:', pinValue);
};

/**
 * Muestra el modal para crear un reporte.
 */
const handleClick = (event) => {
  event.stopPropagation();
  showModal.value = true;
};

/**
 * Cierra el modal.
 */
const closeModal = () => {
  showModal.value = false;
};

/**
 * Calcula la altura del header al montar el componente.
 */
onIonViewWillEnter(() => {
  setTimeout(() => {
    const headerElement = document.querySelector('ion-toolbar');
    const rect = headerElement?.getBoundingClientRect();
    if (rect) {
      if (rect.height > 0) {
        headerHeight.value = rect.height;
      } else {
        headerHeight.value = 182;
      }
    }
  }, 0);
});

/**
 * Abre la cámara del dispositivo para tomar una foto.
 */
const openCamera = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    console.log("Imagen desde la cámara:", image);
  } catch (error) {
    console.error("Error al abrir la cámara:", error);
  }
};

/**
 * Abre la galería de fotos del dispositivo.
 */
const openGallery = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log("Imagen desde la galería:", image);
  } catch (error) {
    console.error("Error al abrir la galería:", error);
  }
};
</script>

<style scoped>
.leaf-map {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 110vh;
}

.content {
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 30px;
}

.report-list {
  width: 100%;
  margin-bottom: 70px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
}

.label {
  display: flex;
  align-items: center;
  font-family: 'Stolzl Regular';
  font-size: 13px;
  color: #292B2E;
}

.options {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
