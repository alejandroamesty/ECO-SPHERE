<template>
  <ion-page>
    <Header>
      <template #header-layout>
        <div class="header-layout">
          <span class="title-1">eco<span class="title-2">sphere</span></span>
          <div class="buttons">
            <RoundButton :icon="SEARCH" :size=40 :onClick="handleSearch" />
            <!-- <RoundButton :icon="NOTIFICATIONS" :size=40 :onClick="handleNotif" /> -->
          </div>
        </div>
        <ToggleButton v-model="toggleValue" leftLabel="Descubre" rightLabel="Siguiendo" />
      </template>
    </Header>
    <ion-content>
      <Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
        <template #slide1>
          <div class="discover">
            <Post :icon="SEARCH" name="Alejandro Ávila" username="@alejandroamesty" :content="text" />
          </div>
        </template>
        <template #slide2>
          <div class="following">
            <Post :icon="SEARCH" name="Alejandro Ávila" username="@alejandroamesty" :content="text2" />
          </div>
        </template>
      </Slider>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent } from '@ionic/vue';
import { SEARCH, NOTIFICATIONS } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, Post, Slider } from "../../components/index"

const text = 'Hoy planté mi primer árbol y entendí lo poderosa que puede ser una acción individual. Cada paso cuenta cuando cuidamos nuestro planeta. ¿Qué harás tú hoy por el medio ambiente?'
const text2 = 'Test'

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
.discover,
.following {
  padding: 30px;
  width: 100%;
}

.title-2 {
  font-family: "BR Omny Regular";
}
</style>