<template>
    <ion-page>
        <Header>
            <template #header-layout>
                <div class="header-layout">
                    <span class="title-1">Actividades</span>
                    <div class="buttons">
                        <RoundButton :icon="ADD" :size=40 :onClick="openScreen" />
                    </div>
                </div>
                <ToggleButton v-model="toggleValue" leftLabel="Historial" rightLabel="Ranking" />
            </template>
        </Header>
        <ion-content></ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { ADD } from '../../utils/icons';
import { Header, RoundButton, ToggleButton } from "../../components/index";
import { useRouter } from 'vue-router';

const router = useRouter();

const toggleValue = ref(false);

const openScreen = () => {
    router.push('/carbon-footprint');
};
</script>