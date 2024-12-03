<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Configura los estilos de la barra de estado.
 */
onMounted(async () => {
  await StatusBar.setStyle({ style: Style.Dark });
  await StatusBar.setBackgroundColor({
    color: '#40A578'
  });
});
</script>
