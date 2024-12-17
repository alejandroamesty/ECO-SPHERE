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
                    <ion-content :fullscreen="true">
                        <Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
                            <template #slide1>
                                <div class="body sphere">
                                    <div class="sphere-data">
                                        <div class="sphere-title">TOTAL DE EMISIONES DE GEI</div>
                                        <div class="sphere-total">4.5 toneladas de CO2 kg/año</div>
                                    </div>
                                    <div class="chart-container">
                                        <Sphere :key="sphereKey"
                                            :options="{ option1: 30, option2: 40, option3: 20, option4: 10 }"
                                            @arcClick="handleArcClick" />
                                    </div>
                                    <div class="sphere-dropdown">
                                        <FootprintList
                                            :options="{ first: true, second: false, third: true, fourth: false }" />
                                    </div>
                                </div>
                            </template>
                            <template #slide2>
                                <div class="body posts">
                                    <Post :icon="SEARCH" name="Alejandro Ávila" username="@alejandroamesty"
                                        :content="text2" />
                                </div>
                            </template>
                        </Slider>
                    </ion-content>
                </ion-page>
            </template>
        </MenuContainer>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { ADD, HAMBURGER } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, MenuContainer, Slider, Stats, Sphere, Post, FootprintList } from '../../components/index';

const text2 = 'Test'

const toggleValue = ref(false);
const menu = ref();
const sphereKey = ref(0);

/**
 * Despliega el menú lateral.
 */
const toggleMenu = (event) => {
    event.stopPropagation();
    menu.value.toggleMenu();
}

/**
 * Captura el evento de clic en un arco del gráfico.
 */
const handleArcClick = (label) => {
    console.log('Arco clickeado:', label);
};

/**
 * Fuerza la actualización del componente Sphere al entrar a la vista.
 */
onIonViewWillEnter(() => {
    sphereKey.value += 1;
});
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

.body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 9;
}

.sphere {
    align-items: center;
}

.posts {
    padding: 30px;
}

.sphere-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 0;
}

.sphere-title {
    position: relative;
    height: 14px;
    font-family: 'Stolzl Regular';
    font-size: 12px;
    color: #747474;
}

.sphere-total {
    font-family: 'Stolzl Regular';
    font-size: 20px;
    color: #292B2E;
}

.chart-container {
    width: 230px;
}

.sphere-dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px;
    margin-bottom: 70px;
}
</style>
