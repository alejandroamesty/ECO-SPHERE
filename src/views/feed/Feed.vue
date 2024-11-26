<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="leaf-header">
          <div class="header-layout">
            <span class="title-1">eco<span class="title-2">sphere</span></span>
            <div class="buttons">
              <RoundButton :icon="SEARCH" :size=40 :onClick="handleSearch" />
              <RoundButton :icon="NOTIFICATIONS" :size=40 :onClick="handleNotif" />
            </div>
          </div>
          <ToggleButton v-model="toggleValue" leftLabel="Descubre" rightLabel="Siguiendo" />
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true"></ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent } from '@ionic/vue';
import { SEARCH, NOTIFICATIONS } from '../../utils/icons';
import { RoundButton, ToggleButton } from "../../components/index"

const toggleValue = ref(false);
const router = useRouter();

/**
 * Navega a la vista de búsqueda.
 */
const handleSearch = () => {
  router.push('/tabs/feed/search');
};

/**
 * Navega a la vista de notificaciones.
 */
const handleNotif = () => {
  router.push('/tabs/feed/notifications');
};
</script>

<style scoped>
ion-header {
  background-color: #FFFFFF !important;
}

ion-toolbar {
  --background: #40A578;
  border-radius: 0px 0px 0px 50px;
}

ion-content {
  border-radius: 0px 0px 0px 50px;
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

.title-2 {
  font-family: "BR Omny Regular";
}

.buttons {
  display: flex;
  flex-direction: row;
  position: relative;
  right: 25px;
  gap: 8px;
}
</style>