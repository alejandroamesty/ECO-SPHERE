<template>
	<ion-page>
		<ion-header class="ion-no-border">
			<ion-toolbar>
				<div class="header">
					<RoundButton :icon="BACK" :size="40" :onClick="goBack" />
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
					<div class="label">Ingresa el código de 5 dígitos que recibiste en tu correo electrónico.</div>
					<VerificationInput @update:code="handleCodeUpdate" />
					<div class="button">
						<BigButton caption="Continuar" @click="verifyCode" />
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/vue';
import { BACK } from '../../../utils/icons';
import { RoundButton, VerificationInput, BigButton } from '../../../components/index';
import { useRoute, useRouter } from 'vue-router';
import { authApi } from '../../../api/api';

const route = useRoute();
const router = useRouter();

const key = ref('');

/**
 * Realiza una solicitud de red para verificar el código.
 */
const verifyCode = async () => {
	const body = { email: route.query.email, key: Number(key.value) };

	try {
		await authApi.setMethod('post').setEndpoint('verify-key').send(body);
		router.push({ path: '/auth/reset-password', query: body });
	} catch (error) {
		console.log(error);
	}
};

/**
 * Maneja la actualización del código de verificación.
 */
const handleCodeUpdate = (code) => {
	key.value = code;
	if (code.length === 5) {
		verifyCode();
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
	margin-bottom: 15px;
}

.button {
	margin-top: 20px;
}
</style>
