<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="header">
                    <RoundButton :icon="BACK" :size=40 />
                    <div class="container">
                        <div class="title">Inicia sesión</div>
                        <div class="subtitle">Bienvenido a un mundo más verde.</div>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" scroll-y="false">
            <div class="body">
                <div class="content">
                    <div class="label">Correo electrónico</div>
                    <TextInput v-model="inputValue" placeholder="Ingresa tu correo electrónico" />
                    <div class="label">Contraseña</div>
                    <TextInput v-model="inputValue" placeholder="Ingresa tu contraseña" />
                    <div class="label right" @click="openForgotPassword">¿Olvidaste tu contraseña?</div>
                    <BigButton caption="Continuar" @click="login" />
                </div>
                <div class="register" @click="openRegister">¿No tienes una cuenta? <span>Regístrate</span></div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonToolbar, IonContent } from '@ionic/vue';
import { BACK } from '../../utils/icons';
import { RoundButton, TextInput, BigButton } from "../../components/index";
import { useRouter } from 'vue-router';

const router = useRouter();

const inputValue = ref('');

const login = () => {
    router.push('/tabs/feed');
};

const openRegister = () => {
    router.push('/auth/register');
};

const openForgotPassword = () => {
    router.push('/auth/forgot-password');
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
    width: 332px;
    font-family: 'Stolzl Medium';
    font-size: 27px;
    color: #FFFFFF;
}

.subtitle {
    width: 332px;
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
    top: 37px;
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

.right {
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;
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
</style>