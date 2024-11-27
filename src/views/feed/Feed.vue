<template>
  <ion-page>
    <Header>
      <template #header-layout>
        <div class="header-layout">
          <span class="title-1">eco<span class="title-2">sphere</span></span>
          <div class="buttons">
            <RoundButton :icon="SEARCH" :size=40 :onClick="handleSearch" />
            <RoundButton :icon="NOTIFICATIONS" :size=40 :onClick="handleNotif" />
          </div>
        </div>
        <ToggleButton v-model="toggleValue" leftLabel="Descubre" rightLabel="Siguiendo" />
      </template>
    </Header>
    <ion-content></ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent } from '@ionic/vue';
import { SEARCH, NOTIFICATIONS } from '../../utils/icons';
import { Header, RoundButton, ToggleButton } from "../../components/index"

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
.title-2 {
  font-family: "BR Omny Regular";
}
</style>