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
										<div class="sphere-total">{{ emissions }} toneladas de CO2 kg/año</div>
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
									<PostList :posts="posts" />
								</div>
							</template>
						</Slider>
					</ion-content>
					<Modal title="Publicación" :isOpen="showModal" :onClose="closeModal" :backButton="closeModal" :nextButton="post">
						<div class="modal-content">
							<span class="label">Descripción</span>
							<TextInput v-model="description" placeholder="Ingresa una descripción" :neumorphism="false" :paragraph="true" />
							<span class="label">Contenido</span>
							<ContentBoxes v-model="boxesContent" />
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
import { Header, RoundButton, ToggleButton, MenuContainer, Slider, Stats, Sphere, PostList, FootprintList, Modal, TextInput, ContentBoxes } from '../../components/index';
import { useGlobalStore } from '../../stores/globalStore';
import { api, fileUploaderApi, fileReaderApi } from '../../api/api';
import { handleError } from '../../services/errorHandler';

const store = useGlobalStore();

const name = `${store.user.fname} ${store.user.lname}`;
const username = `@${store.user.username.toLowerCase()}`;
const followers = ref(0);
const following = ref(0);

const toggleValue = ref(false);
const menu = ref();
const sphereKey = ref(0);
const showModal = ref(false);

const emissions = ref('');
const posts = ref([]);

/**
 * Datos de las opciones de la esfera y la huella de carbono.
 */
const sphereOptions = ref({});
const footprintOptions = ref({
	first: { value: 0, checked: false },
	second: { value: 0, checked: false },
	third: { value: 0, checked: false },
	fourth: { value: 0, checked: false },
});

/**
 * Datos de la publicación.
 */
const description = ref('');
const boxesContent = ref([
	{ order: 1, content: null },
	{ order: 2, content: null },
	{ order: 3, content: null },
	{ order: 4, content: null },
	{ order: 5, content: null },
	{ order: 6, content: null },
]);

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
		option1: footprintOptions.value.first.checked,
		option2: footprintOptions.value.second.checked,
		option3: footprintOptions.value.third.checked,
		option4: footprintOptions.value.fourth.checked,
	};

	Object.keys(footprintOptions.value).forEach((key) => {
		footprintOptions.value[key].checked = false;
	});

	if (selectedLabel === 'option1') {
		footprintOptions.value.first.checked = !currentState.option1;
	} else if (selectedLabel === 'option2') {
		footprintOptions.value.second.checked = !currentState.option2;
	} else if (selectedLabel === 'option3') {
		footprintOptions.value.third.checked = !currentState.option3;
	} else if (selectedLabel === 'option4') {
		footprintOptions.value.fourth.checked = !currentState.option4;
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
	description.value = '';
	boxesContent.value.forEach((box) => (box.content = null));
	showModal.value = false;
};

/**
 * Realiza una solicitud de red para obtener la información del usuario.
 */
const getUser = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`users/${store.user.id}`).send();

		followers.value = data.user.followers_nu;
		following.value = data.user.following_nu;

		posts.value = data.posts
			.filter((post) => post.caption !== 'REPORTE')
			.map((post) => {
				return {
					value: post.id,
					content: post.caption,
					icon: post.images[0],
					name: `${data.user.fname} ${data.user.lname}`,
					username: `@${data.user.username.toLowerCase()}`,
					likes: post.likes,
					comments: post.comments,
					liked: false,
				};
			});

		const directEmissions = data.user.direct_emissions / 1000;
		const indirectEmissions = data.user.indirect_emissions / 1000;
		const otherEmissions = data.user.other_emissions / 1000;

		sphereOptions.value = {
			option1: directEmissions,
			option2: indirectEmissions,
			option3: otherEmissions,
			option4: data.user.option4 || 0,
		};

		footprintOptions.value.first.value = directEmissions.toFixed(2);
		footprintOptions.value.second.value = indirectEmissions.toFixed(2);
		footprintOptions.value.third.value = otherEmissions.toFixed(2);
	} catch (error) {
		handleError(error);
	}
};

/**
 * Realiza una solicitud de red para crear una publicación.
 */
const post = async () => {
	if (!description.value) return;

	const images = boxesContent.value.filter((box) => box.content !== null).map((box) => box.content);
	if (images.length === 0) return;

	try {
		const formData = new FormData();

		for (const [index, imagePath] of images.entries()) {
			const imageBlob = await fetch(imagePath).then((res) => res.blob());
			r;
			formData.append('file', imageBlob, `post-image-${index}.jpg`);
		}

		const { fileNames } = await fileUploaderApi.setMethod('post').send(formData);

		const payload = {
			caption: description.value,
			content: description.value,
			images: fileNames,
		};

		await api.setMethod('post').setEndpoint('posts').send(payload);

		closeModal();
		await getPosts();
	} catch (error) {
		handleError(error);
	}
};

/**
 * Fuerza la actualización del componente Sphere al entrar a la vista.
 */
onIonViewWillEnter(async () => {
	await getUser();
	emissions.value = parseFloat(footprintOptions.value.first.value) + parseFloat(footprintOptions.value.second.value) + parseFloat(footprintOptions.value.third.value) + parseFloat(footprintOptions.value.fourth.value);
	sphereKey.value += 1;
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
