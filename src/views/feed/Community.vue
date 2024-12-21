<template>
	<ion-page>
		<ion-page>
			<Header>
				<template #header-layout>
					<div class="header-layout">
						<Breadcrumb label="Comunidad" @back="goBack" />
						<div class="buttons">
							<RoundButton :icon="ADD" :size="40" />
						</div>
					</div>
					<div class="bottom-layout">
						<Stats icon="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" :name="name" :username="username" />
						<ToggleButton v-model="toggleValue" leftLabel="Miembros" rightLabel="Eventos" />
					</div>
				</template>
			</Header>
			<ion-content :fullscreen="true">
				<Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
					<template #slide1>
						<div class="body sphere"></div>
					</template>
					<template #slide2>
						<div class="body posts"></div>
					</template>
				</Slider>
			</ion-content>
		</ion-page>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { ADD } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, Breadcrumb, Slider, Stats } from '../../components/index';
import { api } from '../../api/api';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const name = ref('');
const username = ref('');

const toggleValue = ref(false);

/**
 * Navega a la vista anterior.
 */
const goBack = () => {
	router.back();
};

/**
 * Realiza una solicitud de red para obtener la información del usuario.
 */
const getCommunity = async () => {
	const community = route.query.id;
	if (!community) return;

	try {
		const { data } = await api.setMethod('get').setEndpoint(`communities/${community}`).send();
		console.log(data);
		name.value = data.name;
		username.value = `Comunidad`;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Fuerza la actualización del componente Sphere al entrar a la vista.
 */
onIonViewWillEnter(() => {
	getCommunity();
});
</script>

<style scoped>
.menu-title {
	display: flex;
	/* justify-content: center; */
	align-items: center;
	position: relative;
	top: 5%;
	width: 100%;
	font-size: 20px;
	font-family: 'Stolzl Medium';
	color: #ffffff;
	padding: 40px;
	text-align: center;
}

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
	padding-left: 25px;
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
	color: #292b2e;
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
