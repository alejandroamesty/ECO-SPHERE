<template>
	<ion-page>
		<ion-header class="ion-no-border">
			<ion-toolbar>
				<div class="leaf-header">
					<div class="header-layout">
						<Breadcrumb label="Buscar" @back="handleBackClick" />
						<RoundButton :icon="FILTER" :size="40" :onClick="handleFilterClick" />
					</div>
					<div class="buttons"></div>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" scroll-y="false"></ion-content>
		<ContextMenu ref="filterMenu" :options="menuOptions" />
		<div class="content">
			<SearchInput v-model="searchValue" placeholder="Buscar por nombre de usuario" :onClick="search" />
			<ProfileList :profiles="profiles" />
		</div>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/vue';
import { onIonViewWillLeave } from '@ionic/vue';
import { FILTER, PROFILE, COMMUNITY } from '../../utils/icons';
import { RoundButton, ContextMenu, SearchInput, Breadcrumb, ProfileList } from '../../components/index';
import { api } from '../../api/api';
import { useGlobalStore } from '../../stores/globalStore';

const router = useRouter();
const store = useGlobalStore();

const searchValue = ref('');

const menuOptions = [
	{ label: 'Perfiles', icon: PROFILE },
	{ label: 'Comunidades', icon: COMMUNITY },
];

const profiles = ref([]);

const filterMenu = ref(null);

/**
 * Posiciona el menú de filtro en la pantalla.
 * @param event
 */
const handleFilterClick = (event) => {
	if (filterMenu.value.isVisible) {
		filterMenu.value.hideMenu();
		return;
	}

	const rect = event.currentTarget.getBoundingClientRect();
	const menuWidth = 160;

	const x = window.innerWidth - menuWidth - 25;
	const y = rect.bottom + 10;

	const position = { x, y };
	filterMenu.value.showMenu(position);
};

/**
 * Navega a la vista anterior.
 */
const handleBackClick = () => {
	router.push('/tabs/feed');
};

/**
 * Realiza una solicitud de red para obtener los perfiles que coincidan con el valor de búsqueda.
 */
const search = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`users/username/${searchValue.value}`).send();
		const username = store.user.username;

		const profilesData = [];
		if (data && data.user) {
			if (data.user.username !== username) {
				profilesData.push({
					name: `${data.user.fname} ${data.user.lname}`,
					username: `@${data.user.username}`,
					icon: data.user.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
					checked: false,
				});
			}
		}

		if (!profilesData.length) profiles.value = [];
		if (profilesData.length > 0) profiles.value = profilesData;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Oculta el menú de filtro al salir de la vista.
 */
onIonViewWillLeave(() => {
	filterMenu.value.hideMenu();
});
</script>

<style scoped>
ion-header {
	background-color: #40a578 !important;
}

ion-toolbar {
	--background: #40a578;
	border-radius: 0px 0px 0px 50px;
}

ion-content {
	--background: #40a578;
	border-radius: 50px 50px 0px 0px;
}

.leaf-header {
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	width: 100%;
	left: 0px;
	right: 25px;
	flex-direction: column;
	padding-top: 8px;
	padding-bottom: 10px;
	background: #40a578;
	border-radius: 0px 0px 0px 50px;
}

.header-layout {
	display: flex;
	align-items: center;
	width: 100%;
	padding-left: 25px;
	padding-right: 25px;
	height: fit-content;
	justify-content: space-between;
	position: relative;
	flex-direction: row;
	flex-shrink: 0;
}

.title-1 {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	left: 25px;
	color: #fff;
	font-family: 'BR Omny SemiBold';
	font-size: 20px;
}

.title-2 {
	font-family: 'BR Omny Regular';
}

.buttons {
	display: flex;
	flex-direction: row;
	position: relative;
	gap: 8px;
}

.content {
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	width: 100%;
	height: 100%;
	gap: 30px;
	padding: 30px;
	bottom: 0;
	border-radius: 50px 50px 0px 0px;
	z-index: 5;
}
</style>
