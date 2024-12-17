<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="header">
                    <RoundButton :icon="BACK" :size=40 />
                    <div class="container">
                        <div class="title">Código de verificación</div>
                        <div class="subtitle">Conecta nuevamente con la naturaleza.</div>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" scroll-y="false">
            <div class="body">
                <div class="content">
                    <div class="label">Ingresa el código de 6 dígitos que recibiste en tu correo electrónico.</div>
                    <VerificationInput @update:code="updateCode" />
                    <div class="button">
                        <BigButton caption="Continuar" @click="openResetPassword" />
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonToolbar, IonContent } from '@ionic/vue';
import { BACK } from '../../../utils/icons';
import { RoundButton, VerificationInput, BigButton } from "../../../components/index";
import { useRouter } from 'vue-router';

const router = useRouter();

const verificationCode = ref('');

const updateCode = (code) => {
    verificationCode.value = code;
};

const openResetPassword = () => {
    router.push('/auth/reset-password');
};
</script>

<style scoped>
ion-header {
    background-color: #40A578 !important;
}

ion-toolbar {
    --background: #40A578;
}

ion-content {
    --background: #40A578;
    border-radius: 50px 50px 0px 0px;
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    width: 100%;
    padding: 30px;
    gap: 36px;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.title {
    width: 100%;
    font-family: 'Stolzl Medium';
    font-size: 27px;
    color: #FFFFFF;
}

.subtitle {
    width: 100%;
    font-family: 'Stolzl Regular';
    font-size: 20px;
    color: #B8FFC0;
}

.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: #FFFFFF;
    border-radius: 50px 50px 0px 0px;
}

.content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    top: 7px;
    gap: 20px;
}

.label {
    display: flex;
    justify-content: flex-start;
    text-align: left;
    width: 100%;
    font-family: 'Stolzl Regular';
    font-size: 13px;
    color: #292B2E;
    margin-bottom: 15px;
}

.button {
    margin-top: 20px;
}
</style>