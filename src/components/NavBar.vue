<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet id="main-content" animated="false"></ion-router-outlet>
            <div class="bottom-nav">
                <router-link v-for="(item, index) in menuWithIcons" :key="index" :to="item.to" class="nav-item"
                    :class="{ 'active-nav-item': $route.path === item.to }">
                    <img :src="item.icon" :alt="item.label" />
                </router-link>
            </div>
        </ion-tabs>
    </ion-page>
</template>

<script setup>
import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue';
import menuItems from '../utils/menu.json';
import { iconsMap } from '../utils/icons.js';

/**
 * Agrega los iconos a las opciones del menú.
 */
const menuWithIcons = menuItems.map(item => ({
    ...item,
    icon: iconsMap[item.icon]
}));
</script>

<style src="../assets/menu.css"></style>