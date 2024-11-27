<template>
    <ion-page>
        <MenuContainer ref="menu">
            <template #menu>
                <div class="user-preview">
                    <img class="pfp" src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                        alt="Avatar" />
                    <div class="user-info">
                        <div class="user-name">Alejandro Ávila</div>
                        <div class="user-status">Active Status</div>
                    </div>
                </div>
            </template>
            <template #view>
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
const toggleMenu = (event) => {
    event.stopPropagation();
    menu.value.toggleMenu();
}
</script>

<style scoped>
.user-preview {
    position: relative;
    display: flex;
    justify-content: end;
    align-items: center;
    top: 8%;
    right: 36px;
    background: #006769;
    color: white;
    gap: 15px;
}

.pfp {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.user-name {
    font-size: 16px;
    font-family: 'Stolzl Medium';
}

.user-status {
    font-size: 12px;
    font-family: 'Stolzl Regular';
}
</style>
