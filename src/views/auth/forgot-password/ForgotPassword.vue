<template>
	<ion-page>
		<ion-header class="ion-no-border">
			<ion-toolbar>
				<div class="header">
					<RoundButton :icon="BACK" :size="40" :onClick="goBack" />
					<div class="container">
						<div class="title">¿No puedes acceder?</div>
						<div class="subtitle">Te ayudamos a volver al camino verde.</div>
					</div>
				</div>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" scroll-y="false">
			<div class="body">
				<div class="content">
					<div class="label">Ingresa tu correo electrónico y te enviaremos un código para recuperar tu cuenta.</div>
					<TextInput v-model="email" placeholder="Ingresa tu correo electrónico" />
					<div class="button">
						<BigButton caption="Continuar" @click="forgotPassword" />
					</div>
				</div>
			</div>
			<div class="register" @click="openRegister">¿No tienes una cuenta? <span>Regístrate</span></div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonToolbar, IonContent } from '@ionic/vue';
import { BACK } from '../../../utils/icons';
import { RoundButton, TextInput, BigButton } from '../../../components/index';
import { useRouter } from 'vue-router';
import { authApi } from '../../../api/api';
import { handleError } from '../../../services/errorHandler';

const router = useRouter();

const email = ref('');

/**
 * Abre la vista de registro.
 */
const openRegister = () => {
	router.push('/auth/register');
};

/**
 * Realiza una solicitud de red para recuperar la contraseña.
 */
const forgotPassword = async () => {
	try {
		await authApi.setMethod('post').setEndpoint('forgot-password').send({ email: email.value });
		router.push({ path: '/auth/verify-code', query: { email: email.value } });
	} catch (error) {
		handleError(error);
	}
};

/**
 * Regresa a la vista anterior.
 */
const goBack = () => {
	router.back();
};
</script>

<style scoped>
ion-header {
	background-color: #40a578 !important;
}

ion-toolbar {
	--background: #40a578;
}

ion-content {
	--background: #40a578;
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
	color: #ffffff;
}

.subtitle {
	width: 100%;
	font-family: 'Stolzl Regular';
	font-size: 20px;
	color: #b8ffc0;
}

.body {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	width: 100%;
	height: 100%;
	bottom: 0;
	background: #ffffff;
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
	color: #292b2e;
}

.register {
	position: absolute;
	width: 393px;
	height: 22px;
	bottom: 25px;
	font-family: 'Stolzl Regular';
	font-size: 13px;
	text-align: center;
	color: #292b2e;
}

.register span {
	font-family: 'Stolzl Regular';
	color: #40a578;
}

.button {
	margin-top: 20px;
}
</style>
