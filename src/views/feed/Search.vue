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
		<ContextMenu ref="filterMenu" :options="menuOptions" @selected="filterSearch" />
		<div class="content">
			<SearchInput v-model="searchValue" placeholder="Buscar por nombre de usuario" :onClick="search" @input="debouncedSearch" />
			<ProfileList :profiles="filteredProfiles" @profile-selected="handleProfileClick" />
		</div>
	</ion-page>
</template>

<script setup>
import { ref, watch } from 'vue';
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
const filterValue = ref('');

const profiles = ref([]);
const filteredProfiles = ref([]);

const filterMenu = ref(null);

let debounceTimeout = null;

const menuOptions = [
	{ label: 'Perfiles', icon: PROFILE },
	{ label: 'Comunidades', icon: COMMUNITY },
];

/**
 * Muestra u oculta el menú contextual al hacer clic en el botón de filtro.
 * @param event - Evento click.
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
	filterMenu.value.showMenu({ x, y });
};

const handleBackClick = () => {
	router.push('/tabs/feed');
};

/**
 * Realiza una búsqueda de perfiles al escribir en el campo de búsqueda.
 */
const debouncedSearch = () => {
	if (debounceTimeout) {
		clearTimeout(debounceTimeout);
	}

	debounceTimeout = setTimeout(() => {
		search();
	}, 500);
};

/**
 * Realiza una solicitud de red para obtener perfiles que coincidan con el valor de búsqueda.
 */
const search = async () => {
	if (!searchValue.value) return;

	try {
		const { data } = await api.setMethod('get').setEndpoint(`search?parameter=${searchValue.value}&page=1`).send();
		const username = store.user.username;
		const profilesData = [];

		if (data && data.users) {
			data.users.forEach((user) => {
				if (user.username !== username) {
					profilesData.push({
						id: user.id,
						name: `${user.fname} ${user.lname}`,
						username: `@${user.username}`,
						icon: user.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
						checked: false,
						type: 'user',
					});
				}
			});
		}

		if (data && data.communities) {
			data.communities.forEach((community) => {
				profilesData.push({
					id: community.id,
					name: community.name,
					username: 'Comunidad',
					icon: community.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
					checked: false,
					type: 'community',
				});
			});
		}

		if (!profilesData.length) profiles.value = [];
		if (profilesData.length > 0) {
			profiles.value = profilesData;
			filteredProfiles.value = profilesData;
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Filtra la búsqueda de perfiles por tipo.
 * @param option - Opción seleccionada.
 */
const filterSearch = (option) => {
	if (filterValue.value === option.label) {
		filteredProfiles.value = profiles.value;
		filterValue.value = '';
		return;
	}

	if (option.label === 'Perfiles') {
		filterValue.value = 'Perfiles';
		filteredProfiles.value = profiles.value.filter((profile) => profile.type === 'user');
	} else if (option.label === 'Comunidades') {
		filterValue.value = 'Comunidades';
		filteredProfiles.value = profiles.value.filter((profile) => profile.type === 'community');
	}
};

/**
 * Maneja el perfil seleccionado.
 * @param profile - Datos del perfil seleccionado.
 */
const handleProfileClick = (profile) => {
	if (profile.type === 'user') {
		router.push({ path: '/user-profile', query: { id: profile.id } });
	} else if (profile.type === 'community') {
		router.push({ path: '/community-profile', query: { id: profile.id } });
	}
};

/**
 * Oculta el menú de filtro al salir de la vista.
 */
onIonViewWillLeave(() => {
	filterMenu.value.hideMenu();
	filteredProfiles.value = [];
});

/**
 * Limpia la lista de perfiles al borrar el campo de búsqueda.
 */
watch(searchValue, (newValue) => {
	if (newValue === '') {
		filteredProfiles.value = [];
		profiles.value = [];
	}
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
