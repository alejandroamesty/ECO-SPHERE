<template>
	<ion-page>
		<Header>
			<template #header-layout>
				<div class="header-layout">
					<span class="title-1">Actividades</span>
					<div class="buttons">
						<RoundButton :icon="ADD" :size="40" :onClick="openScreen" />
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
} from "../../components/index";
import { useRouter } from "vue-router";

const router = useRouter();

const toggleValue = ref(false);
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

const openScreen = () => {
	router.push("/carbon-footprint");
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
</style>
