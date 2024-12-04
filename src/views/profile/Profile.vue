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
                                    <RoundButton :icon="ADD" :size="40" />
                                    <RoundButton :icon="HAMBURGER" :size="40" @click="toggleMenu" />
                                </div>
                            </div>
                            <div class="bottom-layout">
                                <Stats icon="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                                    name="Alejandro Ávila" username="@alejandroamesty" followers="100" following="200"
                                    reduced="4.8 tons" />
                                <ToggleButton v-model="toggleValue" leftLabel="MySphere" rightLabel="Publicaciones" />
                            </div>
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
import { ADD, HAMBURGER } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, MenuContainer, Stats } from '../../components/index';

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

.header-layout {
    margin-top: 12px;
}

.bottom-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 25px;
    margin-bottom: 12px;
}
</style>
