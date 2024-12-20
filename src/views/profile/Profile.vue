<template>
	<ion-page>
		<MenuContainer ref="menu">
			<template #view>
				<ion-page>
					<Header>
						<template #header-layout>
							<div class="header-layout">
								<span class="title-1">Perfil</span>
								<div class="buttons">
									<RoundButton :icon="ADD" :size="40" :onClick="openModal" />
									<RoundButton :icon="HAMBURGER" :size="40" :onClick="toggleMenu" />
								</div>
							</div>
							<div class="bottom-layout">
								<Stats icon="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" :name="name" :username="username" :followers="followers" :following="followers" reduced="4.8 tons" />
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
										<Sphere :key="sphereKey" :options="sphereOptions" @arcClick="handleArcClick" />
									</div>
									<div class="sphere-dropdown">
										<FootprintList :options="footprintOptions" />
									</div>
								</div>
							</template>
							<template #slide2>
								<div class="body posts">
									<Post :icon="SEARCH" name="Alejandro Ávila" username="@alejandroamesty" :content="text2" />
								</div>
							</template>
						</Slider>
					</ion-content>
					<Modal title="Publicación" :isOpen="showModal" :onClose="closeModal" :backButton="closeModal" :nextButton="closeModal">
						<div class="modal-content">
							<span class="label">Descripción</span>
							<TextInput placeholder="Ingresa una descripción" :neumorphism="false" :paragraph="true" />
							<span class="label">Contenido</span>
							<ContentBoxes :boxes="boxes" @select-content="selectContent" />
						</div>
					</Modal>
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
import { Header, RoundButton, ToggleButton, MenuContainer, Slider, Stats, Sphere, Post, FootprintList, Modal, TextInput, ContentBoxes } from '../../components/index';
import { useGlobalStore } from '../../stores/globalStore';
import { api } from '../../api/api';

const store = useGlobalStore();

const name = `${store.user.fname} ${store.user.lname}`;
const username = `@${store.user.username.toLowerCase()}`;
const followers = ref(0);
const following = ref(0);

const text2 = 'Test';

const toggleValue = ref(false);
const menu = ref();
const sphereKey = ref(0);
const showModal = ref(false);

const sphereOptions = ref({
	option1: 10,
	option2: 20,
	option3: 30,
	option4: 40,
});

const footprintOptions = ref({
	first: false,
	second: false,
	third: false,
	fourth: false,
});

/**
 * Despliega el menú lateral.
 */
const toggleMenu = (event) => {
	event.stopPropagation();
	menu.value.toggleMenu();
};

/**
 * Captura el evento de clic en un arco del gráfico.
 */
const handleArcClick = (label) => {
	const selectedLabel = label.toLowerCase();

	const currentState = {
		option1: footprintOptions.value.first,
		option2: footprintOptions.value.second,
		option3: footprintOptions.value.third,
		option4: footprintOptions.value.fourth,
	};

	Object.keys(footprintOptions.value).forEach((key) => {
		footprintOptions.value[key] = false;
	});

	if (selectedLabel === 'option1') {
		footprintOptions.value.first = !currentState.option1;
	} else if (selectedLabel === 'option2') {
		footprintOptions.value.second = !currentState.option2;
	} else if (selectedLabel === 'option3') {
		footprintOptions.value.third = !currentState.option3;
	} else if (selectedLabel === 'option4') {
		footprintOptions.value.fourth = !currentState.option4;
	}
};

/**
 * Muestra el modal.
 */
const openModal = () => {
	showModal.value = true;
};

/**
 * Cierra el modal.
 */
const closeModal = () => {
	showModal.value = false;
};

/**
 * Realiza una solicitud de red para obtener la información del usuario.
 */
const getUser = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`users/${store.user.id}`).send();
		console.log(data);
		followers.value = data.user.followers_nu;
		following.value = data.user.following_nu;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Fuerza la actualización del componente Sphere al entrar a la vista.
 */
onIonViewWillEnter(() => {
	sphereKey.value += 1;
	getUser();
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

.modal-content {
	display: flex;
	flex-direction: column;
	padding: 30px;
	gap: 20px;
}

.label {
	display: flex;
	align-items: center;
	font-family: 'Stolzl Regular';
	font-size: 13px;
	color: #292b2e;
}
</style>
