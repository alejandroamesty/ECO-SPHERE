<template>
  <ion-page>
    <Header>
      <template #header-layout>
        <div class="header-layout">
          <span class="title-1">eco<span class="title-2">sphere</span></span>
          <div class="buttons">
            <RoundButton :icon="SEARCH" :size=40 :onClick="handleSearch" />
          </div>
        </div>
        <ToggleButton v-model="toggleValue" leftLabel="Descubre" rightLabel="Siguiendo" />
      </template>
    </Header>
    <ion-content>
      <Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
        <template #slide1>
          <div class="discover">
            <PostList :posts="posts" />
          </div>
        </template>
        <template #slide2>
          <div class="following">
            <PostList :posts="posts" />
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
import { SEARCH } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, PostList, Slider } from "../../components/index"

const toggleValue = ref(false);
const router = useRouter();

const posts = ref([
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien at purus.',
    icon: 'https://via.placeholder.com/48',
    name: 'John Doe',
    username: '@johndoe',
    liked: true,
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien at purus.',
    icon: 'https://via.placeholder.com/48',
    name: 'Jane Doe',
    username: '@janedoe',
    liked: false,
  },
]);

/**
 * Navega a la vista de búsqueda.
 */
const handleSearch = () => {
  router.push('/tabs/feed/search');
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