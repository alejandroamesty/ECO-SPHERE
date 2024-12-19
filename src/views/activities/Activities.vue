<template>
	<ion-page>
		<Header>
			<template #header-layout>
				<div class="header-layout">
					<span class="title-1">Actividades</span>
					<div class="buttons">
						<RoundButton :icon="ADD" :size="40" :onClick="openModal" />
					</div>
				</div>
				<ToggleButton v-model="toggleValue" leftLabel="Historial" rightLabel="Eventos" />
			</template>
		</Header>
		<ion-content>
			<Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
				<template #slide1>
					<div class="body">
						<GraphicCard name="Alejandro" :value="100" :actualValue="80" />
						<div class="section">
							<div class="title">Agenda de actividades</div>
							<div class="subtitle">Mes de {{ month }}</div>
						</div>
						<ActivityList :options="options" />
						<div class="section">
							<div class="title">Historial de actividades</div>
							<div class="subtitle">Año {{ year }}</div>
						</div>
						<div class="graphic">
							<GraphicBar :months="months" />
						</div>
					</div>
				</template>
				<template #slide2></template>
			</Slider>
		</ion-content>
		<Modal
			title="Actividad"
			:isOpen="showModal"
			:onClose="resetModal"
			:backButton="previousStep"
			:nextButton="nextStep"
		>
			<transition name="fade-slide" mode="out-in">
				<div v-if="currentStep === 1" key="step1" class="modal-content">
					<span class="label">Selecciona una categoría</span>
					<CategoryBoxes :options="categories" @selected="handleClick" />
				</div>
				<div v-else-if="currentStep === 2" key="step2" class="modal-content">
					<span class="label">Selecciona una actividad</span>
					<ActivityList :options="options" />
				</div>
				<div v-else-if="currentStep === 3" key="step3" class="modal-content">
					<span class="label">Ingresa una actividad personalizada</span>
					<TextInput placeholder="Escribe una actividad" :neumorphism="false" />
				</div>
			</transition>
		</Modal>
	</ion-page>
</template>

<script setup>
import { ref } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { ADD } from "../../utils/icons";
import {
	Header,
	RoundButton,
	ToggleButton,
	Slider,
	GraphicCard,
	GraphicBar,
	ActivityList,
	Modal,
	TextInput,
	CategoryBoxes,
} from "../../components/index";
import { CAR, ENERGY, FOOD, CUSTOM } from "../../utils/icons";

const toggleValue = ref(false);
const showModal = ref(false);
const currentStep = ref(1);
const isAnimating = ref(false);

const month = "Septiembre";
const year = "2021";

const options = ref([
	{
		value: 1,
		option: "Usa el carro menos",
		checked: true,
		category: "Transporte",
	},
	{
		value: 2,
		option: "Usa transporte público",
		checked: false,
		category: "Transporte",
	},
]);

const months = {
	enero: 10,
	febrero: 20,
	marzo: 30,
	abril: 40,
	mayo: 50,
	junio: 60,
	julio: 70,
	agosto: 80,
	septiembre: 90,
	octubre: 100,
	noviembre: 100,
	diciembre: 100,
};

const categories = [
	{
		value: 1,
		option: "Transporte",
		description: "16 sugerencias",
		icon: CAR,
	},
	{
		value: 2,
		option: "Energía",
		description: "16 sugerencias",
		icon: ENERGY,
	},
	{
		value: 3,
		option: "Alimentación",
		description: "16 sugerencias",
		icon: FOOD,
	},
	{
		value: 4,
		option: "Personalizada",
		description: "16 sugerencias",
		icon: CUSTOM,
	},
];

const openModal = () => {
	showModal.value = true;
};

const closeModal = () => {
	showModal.value = false;
};

/**
 * Avanza al siguiente paso del modal.
 */
const nextStep = () => {
	if (currentStep.value < 3) {
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

const handleClick = (category) => {
	console.log(category);
	nextStep();
};
</script>

<style scoped>
.body {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 25px;
	gap: 25px;
}

.section {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.title {
	display: flex;
	align-items: center;
	width: 100%;
	font-family: "Stolzl Medium";
	font-size: 16px;
	color: #292b2e;
}

.subtitle {
	display: flex;
	align-items: center;
	width: 100%;
	font-family: "Stolzl Regular";
	font-size: 13px;
	color: #a0a0a0;
}

.graphic {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 80px;
}

.modal-content {
	display: flex;
	flex-direction: column;
	padding: 30px;
	gap: 25px;
	transition:
		opacity 0.5s ease,
		transform 0.5s ease;
	opacity: 1;
	transform: translateY(0);
}

.label {
	display: flex;
	align-items: center;
	font-family: "Stolzl Regular";
	font-size: 13px;
	color: #292b2e;
}

.options {
	display: flex;
	justify-content: space-between;
	gap: 20px;
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
