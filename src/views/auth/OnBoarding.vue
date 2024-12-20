<template>
	<ion-page>
		<ion-content>
			<div class="button">
				<BigButton caption="Continuar" @click="Login" />
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import { BigButton } from '../../components/index';
import { useRouter } from 'vue-router';

const router = useRouter();

const Login = () => {
	router.push('/auth/login');
};
</script>

<style scoped>
.button {
	display: flex;
	justify-content: center;
	margin-top: 50%;
}
</style>
