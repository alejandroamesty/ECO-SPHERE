<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="header">
                    <RoundButton :icon="SEARCH" :size=40 />
                    <div class="container">
                        <div class="title">Nueva contraseña</div>
                        <div class="subtitle">Renueva tu acceso hacia un futuro sostenible.</div>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" scroll-y="false">
            <div class="body">
                <div class="content">
                    <div class="label"> Nueva contraseña</div>
                    <TextInput v-model="inputValue" placeholder="Ingresa tu contraseña" />
                    <div class="label">Confirmar contraseña</div>
                    <TextInput v-model="inputValue" placeholder="Reingresa tu contraseña" />
                    <div class="button">
                        <BigButton caption="Continuar" @click="openLogin" />
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonToolbar, IonContent } from '@ionic/vue';
import { SEARCH } from '../../../utils/icons';
import { RoundButton, TextInput, BigButton } from "../../../components/index";
import { useRouter } from 'vue-router';

const router = useRouter();

const openVerifyCode = () => {
    router.push('/auth/verify-code');
};

const openLogin = () => {
    router.push('/auth/login');
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
}

.register {
    position: absolute;
    width: 393px;
    height: 22px;
    bottom: 25px;
    font-family: 'Stolzl Regular';
    font-size: 13px;
    text-align: center;
    color: #292B2E;
}

.register span {
    font-family: 'Stolzl Regular';
    color: #40A578;
}

.button {
    margin-top: 20px;
}
</style>