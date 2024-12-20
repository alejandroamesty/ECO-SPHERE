<template>
	<ion-page>
		<ion-content :fullscreen="true" scroll-y="false">
			<div class="background-circles">
				<div class="circle circle-1" :class="{ 'animate-circle': animate }"></div>
				<div class="circle circle-2" :class="{ 'animate-circle': animate }"></div>
				<div class="circle circle-3" :class="{ 'animate-circle': animate }"></div>
				<div class="circle circle-4" :class="{ 'animate-circle': animate }"></div>
			</div>
			<div class="blur-container"></div>
			<div class="steps-container">
				<ProgressBar :steps="questions.length" :currentStep="currentStep" @update:currentStep="handleStepChange" />
				<div :class="['step-content', { 'animate-fade': isAnimating }]">
					<template v-for="(question, index) in questions" :key="question.id">
						<NumericDialog v-if="currentStep === index + 1 && question.type === 'numeric'" :title="question.category" :subtitle="question.sub_category" :question="question.question" @next="handleNextStep" />
						<SelectDialog v-if="currentStep === index + 1 && question.type === 'select'" :title="question.category" :subtitle="question.sub_category" :question="question.question" :options="question.options" @next="handleNextStep" />
					</template>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ProgressBar } from '../../components/index';
import NumericDialog from './NumericDialog.vue';
import SelectDialog from './SelectDialog.vue';
import form from '../../utils/emissions.json';

const currentStep = ref(1);
const questions = ref(form.questions);
const animate = ref(false);
const isAnimating = ref(false);

/**
 * Controla el cambio de paso en la barra de progreso.
 */
const handleStepChange = (newStep) => {
	if (newStep >= 1 && newStep <= questions.value.length) {
		triggerAnimation();
		setTimeout(() => {
			currentStep.value = newStep;
		}, 500);
	}
};

/**
 * Controla el paso siguiente en la barra de progreso.
 */
const handleNextStep = () => {
	if (currentStep.value < questions.value.length) {
		triggerAnimation();
		setTimeout(() => {
			currentStep.value += 1;
		}, 500);
	}
};

/**
 * Activa la animación de las circunferencias y el desvanecimiento de los pasos.
 */
const triggerAnimation = () => {
	animate.value = true;
	isAnimating.value = true;

	setTimeout(() => {
		animate.value = false;
	}, 500);

	setTimeout(() => {
		isAnimating.value = false;
	}, 500);
};

/**
 * Cambia el estilo de la barra de estado al entrar y salir de la vista.
 */
onIonViewWillEnter(() => {
	StatusBar.setStyle({ style: Style.Light });
});
onIonViewWillLeave(() => {
	StatusBar.setStyle({ style: Style.Dark });
});
</script>

<style scoped>
.background-circles {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
}

.circle {
	position: absolute;
	border-radius: 50%;
	transition:
		transform 0.5s ease,
		background-color 0.5s ease;
}

.circle-1 {
	width: 170px;
	height: 170px;
	left: 46px;
	top: 104px;
	background: #9dde8b;
	z-index: 4;
}

.circle-2 {
	width: 258px;
	height: 257px;
	left: 181px;
	top: 136px;
	background: #40a578;
	z-index: 3;
}

.circle-3 {
	width: 258px;
	height: 257px;
	left: -35px;
	top: 462px;
	background: #006769;
	z-index: 2;
}

.circle-4 {
	width: 170px;
	height: 170px;
	left: 167px;
	top: 462px;
	background: #e6ff94;
	z-index: 1;
}

.animate-circle {
	transform: scale(1.2);
	background-color: #9dde8b !important;
}

.blur-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.35);
	backdrop-filter: blur(100px);
	z-index: 5;
}

.steps-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 58px;
	z-index: 6;
}

.step-content {
	transition:
		opacity 0.5s ease,
		transform 0.5s ease;
	opacity: 1;
	transform: translateY(0);
}

.step-content.animate-fade {
	opacity: 0;
	transform: translateY(20px);
}
</style>
