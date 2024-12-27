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
						<GraphicCard name="Alejandro" :value="100" :actualValue="percentage" />
						<div class="section">
							<div class="title">Agenda de actividades</div>
							<div class="subtitle">Mes de {{ month }}</div>
						</div>
						<ActivityList :options="registeredActivities" @select:option="updateActivity" />
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
		<Modal title="Actividad" :isOpen="showModal" :onClose="resetModal" :backButton="previousStep" :nextButton="nextStep">
			<transition name="fade-slide" mode="out-in">
				<div v-if="currentStep === 1" key="step1" class="modal-content">
					<span class="label">Selecciona una categoría</span>
					<CategoryBoxes :options="categories" @selected="handleClick" />
				</div>
				<div v-else-if="currentStep === 2" key="step2" class="modal-content">
					<span class="label">Selecciona una actividad</span>
					<ActivityList :options="activities" @update:options="selectActivity" />
				</div>
				<div v-else-if="currentStep === 3" key="step3" class="modal-content">
					<span class="label">Ingresa una actividad personalizada</span>
					<TextInput v-model="customActivity" placeholder="Escribe una actividad" :neumorphism="false" />
				</div>
			</transition>
		</Modal>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent, onIonViewDidEnter } from '@ionic/vue';
import { Header, RoundButton, ToggleButton, Slider, GraphicCard, GraphicBar, ActivityList, Modal, TextInput, CategoryBoxes } from '../../components/index';
import { ADD } from '../../utils/icons';
import { iconsMap } from '../../utils/icons.js';
import { api } from '../../api/api';
import activitiesJson from '../../utils/activities.json';

const toggleValue = ref(false);
const showModal = ref(false);
const currentStep = ref(1);
const isAnimating = ref(false);

const categories = ref([]);
const selectedCategory = ref(null);

const activities = ref([]);
const customActivity = ref('');
const selectedActivities = ref([]);
const registeredActivities = ref([]);

const month = ref('');
const year = ref('');

const percentage = ref(0);
const months = ref({});

/**
 * Agrega íconos a las categorías y actividades.
 */
categories.value = activitiesJson.categories.map((category) => ({
	...category,
	icon: iconsMap[category.icon],
	description: category.description ?? `${category.activities?.length || 0} sugerencias`,
}));

month.value = new Date().toLocaleString('es-ES', { month: 'long' });
year.value = new Date().getFullYear();

/**
 * Maneja la selección de categorías y actividades.
 */
const handleClick = (category) => {
	selectedCategory.value = category;
	const selected = categories.value.find((cat) => cat.option === category.option);

	if (selected?.activities) {
		activities.value = selected.activities.map((activity) => ({
			...activity,
			checked: false,
			category: category.option,
		}));
	} else {
		activities.value = [];
	}

	currentStep.value = activities.value.length > 0 ? 2 : 3;
	triggerAnimation();
};

/**
 * Avanza al siguiente paso del modal.
 */
const nextStep = () => {
	if (currentStep.value === 1) {
		if (activities.value && activities.value.length > 0) {
			currentStep.value = 2;
		} else {
			resetModal();
		}
	} else {
		insertActivities();
		closeModal();
	}
	triggerAnimation();
};

/**
 * Retrocede al paso anterior del modal.
 */
const previousStep = () => {
	if (currentStep.value === 3 && activities.value && activities.value.length > 0) {
		currentStep.value = 2;
	} else if (currentStep.value > 1) {
		currentStep.value = 1;
	} else if (currentStep.value === 1) {
		resetModal();
	}
	triggerAnimation();
};

/**
 * Reinicia el modal al paso inicial.
 */
const resetModal = () => {
	currentStep.value = 1;
	selectedCategory.value = null;
	activities.value = [];
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

/**
 * Captura las actividades seleccionadas.
 */
const selectActivity = (selected) => {
	selectedActivities.value = selected;
};

/**
 * Obtiene las actividades completadas por mes.
 */
const getMonthlyActivities = (activities) => {
	const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

	const monthlyActivities = activities.reduce((acc, activity) => {
		if (activity.checked && activity.completedAt && activity.completedAt.getFullYear() === year.value) {
			const month = activity.completedAt.getMonth();
			acc[month] = (acc[month] || 0) + 1;
		}
		return acc;
	}, {});

	months.value = monthNames.reduce((acc, month, index) => {
		acc[month] = monthlyActivities[index] || 0;
		return acc;
	}, {});
};

/**
 * Realiza una solicitud de red para obtener las actividades registradas.
 */
const getActivities = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint('activities').send();

		const activitiesWithCategory = data.map((activity) => {
			const category = activitiesJson.categories?.find((cat) => cat.activities?.some((act) => act.option === activity.activity_description));

			return {
				value: activity.id,
				option: activity.activity_description,
				checked: activity.completed,
				category: category ? category.option : 'Personalizada',
				registeredAt: new Date(activity.registered_at),
				completedAt: activity.completed ? new Date(activity.completed_at) : null,
			};
		});

		const currentDate = new Date();
		const currentMonth = currentDate.getMonth();

		// Filtrar actividades no completadas
		const notCompleted = activitiesWithCategory.filter((act) => !act.checked);

		// Filtrar actividades completadas en el mes actual
		const completedThisMonth = activitiesWithCategory.filter((act) => act.checked && act.completedAt && act.completedAt.getMonth() === currentMonth && act.completedAt.getFullYear() === year.value);

		// Ordenar actividades no completadas por fecha de registro
		notCompleted.sort((a, b) => a.registeredAt - b.registeredAt);

		// Ordenar actividades completadas en el mes actual por fecha de finalización
		completedThisMonth.sort((a, b) => a.completedAt - b.completedAt);

		// Concatenar las listas
		registeredActivities.value = [...notCompleted, ...completedThisMonth];

		// Calcular el porcentaje de actividades completadas
		const totalActivities = activitiesWithCategory.length;
		const completedActivities = completedThisMonth.length;
		percentage.value = (completedActivities / totalActivities) * 100;

		getMonthlyActivities(activitiesWithCategory);
	} catch (error) {
		console.error(error);
	}
};

/**
 * Realiza una solicitud de red para insertar las actividades seleccionadas.
 */
const insertActivities = async () => {
	if (!selectedActivities.value.length && !customActivity.value) {
		return;
	}

	const activitiesToInsert = [];
	if (customActivity.value) {
		activitiesToInsert.push(customActivity.value);
	} else {
		activitiesToInsert.push(...selectedActivities.value.filter((activity) => activity.checked).map((activity) => activity.option));
	}

	try {
		const requestBody = {
			activity_description: activitiesToInsert,
		};

		await api.setMethod('post').setEndpoint('activities').send(requestBody);
		await getActivities();
	} catch (error) {
		console.error(error);
	}
};

/**
 * Realiza una solicitud de red para actualizar el estado de una actividad.
 */
const updateActivity = async (updated) => {
	try {
		await api.setMethod('put').setEndpoint(`activities/${updated.value}`).send({ completed: updated.checked });
		await getActivities();
	} catch (error) {
		console.error(error);
	}
};

/**
 * Abre y cierra el modal.
 */
const openModal = () => {
	showModal.value = true;
};
const closeModal = () => {
	showModal.value = false;
};

/**
 * Actualiza las actividades registradas.
 */
onIonViewDidEnter(() => {
	getActivities();
});
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
	font-family: 'Stolzl Medium';
	font-size: 16px;
	color: #292b2e;
}

.subtitle {
	display: flex;
	align-items: center;
	width: 100%;
	font-family: 'Stolzl Regular';
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
	font-family: 'Stolzl Regular';
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
