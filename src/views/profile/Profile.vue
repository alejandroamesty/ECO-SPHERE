<template>
    <ion-page>
        <MenuContainer ref="menu">
            <template #menu></template>
            <template #profile>
                <ion-page>
                    <Header>
                        <template #header-layout>
                            <div class="header-layout">
                                <span class="title-1">Perfil</span>
                                <div class="buttons">
                                    <RoundButton :icon="HAMBURGER" :size="40" @click="toggleMenu" />
                                </div>
                            </div>
                            <ToggleButton v-model="toggleValue" leftLabel="MySphere" rightLabel="Publicaciones" />
                        </template>
                    </Header>
                    <ion-content></ion-content>
                </ion-page>
            </template>
        </MenuContainer>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { HAMBURGER } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, MenuContainer } from '../../components/index';

const toggleValue = ref(false);
const menu = ref();

/**
 * Despliega el menú lateral.
 */
const toggleMenu = () => {
    menu.value.toggleMenu();
}
</script>
