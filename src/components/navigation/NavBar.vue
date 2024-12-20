<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet id="main-content" animated="false"></ion-router-outlet>
			<div class="bottom-nav">
				<router-link v-for="(item, index) in menuWithIcons" :key="index" :to="item.to" class="nav-item" :class="{ 'active-nav-item': isActive(item.to) }">
					<img :src="item.icon" :alt="item.label" />
				</router-link>
			</div>
		</ion-tabs>
	</ion-page>
</template>

<script setup>
import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue';
import { useRoute } from 'vue-router';
import menuItems from '../../utils/menu.json';
import { iconsMap } from '../../utils/icons.js';

/**
 * Agrega los iconos a las opciones del menú.
 */
const menuWithIcons = menuItems.map((item) => ({
	...item,
	icon: iconsMap[item.icon],
}));

const route = useRoute();

/**
 * Determina si el menú debe estar activo para la ruta actual.
 *
 * @param {string} path Ruta asociada al menú.
 * @returns {boolean}
 */
const isActive = (path) => {
	return route.path.startsWith(path);
};
</script>

<style src="../../assets/menu.css"></style>
