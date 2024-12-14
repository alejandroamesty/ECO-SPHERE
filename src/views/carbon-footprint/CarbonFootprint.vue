<template>
    <ion-page>
        <ion-content :fullscreen="true" scroll-y="false">
            <div class="background-circles">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-4"></div>
            </div>
            <div class="blur-container"></div>
            <div class="steps-container">
                <ProgressBar :steps="questions.length" :currentStep="currentStep"
                    @update:currentStep="handleStepChange" />
                <template v-for="(question, index) in questions" :key="question.id">
                    <NumericDialog v-if="currentStep === index + 1 && question.type === 'numeric'"
                        :title="question.category" :subtitle="question.sub_category" :question="question.question"
                        @next="handleNextStep" />
                    <SelectDialog v-if="currentStep === index + 1 && question.type === 'select'"
                        :title="question.category" :subtitle="question.sub_category" :question="question.question"
                        :options="question.options" @next="handleNextStep" />
                </template>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { ProgressBar } from "../../components/index";
import { StatusBar, Style } from '@capacitor/status-bar';
import NumericDialog from './NumericDialog.vue';
import SelectDialog from './SelectDialog.vue';
import form from '../../utils/form.json';

const currentStep = ref(1);
const questions = ref(form.questions);

const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= questions.value.length) {
        currentStep.value = newStep;
    }
};

const handleNextStep = () => {
    if (currentStep.value < questions.value.length) {
        currentStep.value += 1;
    }
};

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
    transition: all 3s ease-in-out;
}

.circle-1 {
    width: 170px;
    height: 170px;
    left: 46px;
    top: 104px;
    background: #9DDE8B;
    z-index: 4;
}

.circle-2 {
    width: 258px;
    height: 257px;
    left: 181px;
    top: 136px;
    background: #40A578;
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
    background: #E6FF94;
    z-index: 1;
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
</style>