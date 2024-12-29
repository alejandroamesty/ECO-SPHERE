<template>
	<ion-page>
		<Header>
			<template #header-layout>
				<div class="header-layout">
					<span class="title-1">Chats</span>
					<div class="buttons">
						<RoundButton :icon="ADD" :size="40" :onClick="openModal" />
					</div>
				</div>
				<ToggleButton v-model="toggleValue" leftLabel="Amigos" rightLabel="Comunidades" />
			</template>
		</Header>
		<ion-content>
			<Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
				<template #slide1>
					<div class="body">
						<ChatList :chats="chatData" @chatClick="handleChatClick" />
					</div>
				</template>
				<template #slide2>
					<div class="body">
						<ChatList :chats="chatData" @chatClick="handleChatClick" />
					</div>
				</template>
			</Slider>
		</ion-content>
		<template>
			<Modal title="Comunidad" :isOpen="showModal" :onClose="resetModal" :backButton="previousStep" :nextButton="nextStep">
				<transition name="fade-slide" mode="out-in">
					<div v-if="currentStep === 1" key="step1" class="modal-content">
						<span class="label">Agrega miembros a tu nueva comunidad</span>
						<TextInput placeholder="Buscar por nombre o usuario" :neumorphism="false" />
						<CheckList :options="options" @update:checkedOptions="handleCheckedOptions" />
					</div>
					<div v-else-if="currentStep === 2" key="step2" class="modal-content">
						<div class="image">
							<img :src="CIRCLE_ADD" alt="Add image" />
						</div>
						<span class="label">Nombre</span>
						<TextInput placeholder="Ingresa un nombre" :neumorphism="false" />
						<span class="label">Descripción</span>
						<TextInput placeholder="Ingresa una descripción" :neumorphism="false" :paragraph="true" />
					</div>
				</transition>
			</Modal>
		</template>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent, onIonViewWillEnter } from '@ionic/vue';
import { ADD, CIRCLE_ADD } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, ChatList, Slider, Modal, TextInput, CheckList } from '../../components/index';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../../stores/globalStore';
import { api } from '../../api/api';
import { handleError } from '../../services/errorHandler';

const router = useRouter();
const { user } = useGlobalStore();

const toggleValue = ref(false);
const showModal = ref(false);
const currentStep = ref(1);
const isAnimating = ref(false);

const chatData = [
	{
		id: 1,
		image: 'https://via.placeholder.com/48',
		name: 'John Doe',
		latest: 'Hello, how are you?',
		time: '10:45 AM',
	},
	{
		id: 2,
		image: 'https://via.placeholder.com/48',
		name: 'Jane Smith',
		latest: 'Lets catch up later.',
		time: 'Yesterday',
	},
];

const options = ref([]);
const members = ref([]);

/**
 * Abre la vista de chat privado.
 */
const handleChatClick = (chat) => {
	console.log('Chat clicked:', chat);
	router.push('/private-chat');
};

const getFollowing = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`followers/following/${user.id}`).send();

		options.value = data.following.map((option) => ({
			value: option.id,
			option: `${option.fname} ${option.lname}`,
			checked: false,
		}));

		console.log('Following:', options.value);
	} catch (error) {
		handleError(error);
	}
};

/**
 * Abre el modal de creación de comunidad.
 */
const openModal = () => {
	showModal.value = true;
};

/**
 * Cierra el modal de creación de comunidad.
 */
const closeModal = () => {
	showModal.value = false;
};

/**
 * Maneja las opciones chequeadas.
 */
const handleCheckedOptions = (checkedOptions) => {
	members.value = checkedOptions;
};

/**
 * Avanza al siguiente paso del modal.
 */
const nextStep = () => {
	if (members.value.length === 0) return;

	if (currentStep.value < 2) {
		currentStep.value++;
		triggerAnimation();
	} else {
		closeModal();
	}
};

/**
 * Retrocede al paso anterior del modal.
 */
const previousStep = () => {
	if (currentStep.value > 1) {
		currentStep.value--;
		triggerAnimation();
	} else {
		closeModal();
	}
};

/**
 * Reinicia el modal al paso inicial.
 */
const resetModal = () => {
	currentStep.value = 1;
	closeModal();
};

/**
 * Dispara la animación entre pasos del modal.
 */
const triggerAnimation = () => {
	isAnimating.value = true;
	setTimeout(() => {
		isAnimating.value = false;
	}, 500);
};

onIonViewWillEnter(() => {
	getFollowing();
});
</script>

<style scoped>
.body {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 25px;
}

.modal-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	padding: 30px;
	gap: 20px;
	transition:
		opacity 0.5s ease,
		transform 0.5s ease;
	opacity: 1;
	transform: translateY(0);
}

.modal-content.animate-fade {
	opacity: 0;
	transform: translateY(20px);
}

.label {
	display: flex;
	align-self: flex-start;
	font-family: 'Stolzl Regular';
	font-size: 13px;
	color: #292b2e;
}

.options {
	display: flex;
	justify-content: space-between;
	gap: 20px;
}

.image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 108px;
	height: 108px;
	background: #edeef0;
	border-radius: 100px;
}

.image img {
	width: 40px;
	height: 40px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
	transition:
		opacity 0.5s ease,
		transform 0.5s ease;
	position: absolute;
	width: 100%;
}

.fade-slide-enter-from {
	opacity: 0;
	transform: translateY(20px);
}

.fade-slide-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}
</style>
