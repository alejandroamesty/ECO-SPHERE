<template>
	<ion-page>
		<Header ref="header">
			<template #header-layout>
				<div class="header-layout">
					<span class="title-1">Reportes</span>
					<div class="buttons">
						<RoundButton :icon="ADD" :size="40" :onClick="handleClick" />
					</div>
				</div>
				<ToggleButton v-model="toggleValue" leftLabel="Mapa" rightLabel="Lista" />
			</template>
		</Header>
		<ion-content :fullscreen="true">
			<Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event" :fullscreen="true">
				<template #slide1>
					<div class="leaf-map">
						<LeafletMap :lat="lat" :lng="lng" :zoom="zoom" :shouldInitialize="viewEntered" :locations="locations" @onPinClick="openReport" />
					</div>
				</template>
				<template #slide2>
					<div class="content" :style="{ marginTop: headerHeight + 'px' }">
						<div class="report-list">
							<ReportList :reports="reports" />
						</div>
					</div>
				</template>
			</Slider>
		</ion-content>
		<ReportCard
			ref="report"
			:description="reportInfo.description"
			:latitude="reportInfo.latitude"
			:longitude="reportInfo.longitude"
			:date="reportInfo.date"
			:image="reportInfo.image"
			:icon="reportInfo.icon"
			:name="reportInfo.name"
			:username="reportInfo.username"
			:is-modal="true"
		/>
		<Modal title="Crear reporte" :isOpen="showModal" :onClose="closeModal" :backButton="closeModal" :nextButton="insertReport">
			<div class="modal-content">
				<span class="label">Descripción</span>
				<TextInput v-model="reportDescription" placeholder="Ingresa una descripción" :neumorphism="false" :paragraph="true" />
				<span class="label">Imagen</span>
				<div v-if="!imageFile" class="options">
					<BoxButton :icon="CAMERA" caption="Desde cámara del dispositivo" :onClick="openCamera" />
					<BoxButton :icon="GALLERY" caption="Desde galería de fotos" :onClick="openGallery" />
				</div>
				<div v-if="imageFile" class="image-preview">
					<div class="delete-button" @click="imageFile = null">
						<img :src="TRASH" alt="Borrar imagen" />
					</div>
					<img :src="imageFile" alt="Imagen seleccionada" />
				</div>
			</div>
		</Modal>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { onIonViewWillEnter, onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { ADD, CAMERA, GALLERY, TRASH } from '../../utils/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Header, RoundButton, ToggleButton, LeafletMap, ReportCard, Slider, Modal, ReportList, TextInput, BoxButton } from '../../components/index';
import { api, fileUploaderApi, fileReaderApi } from '../../api/api';
import { handleError } from '../../services/errorHandler';

const lat = ref(0);
const lng = ref(0);
const zoom = ref(13);
const toggleValue = ref(false);
const viewEntered = ref(false);

const report = ref();
const reportInfo = ref({});

const headerHeight = ref(0);
const showModal = ref(false);

const reportDescription = ref('');
const imageFile = ref(null);

const locations = ref([]);

const reports = [
	{
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies.',
		latitude: '19.432',
		longitude: '99.13',
		date: '12/12/2021',
		icon: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
		name: 'Alejandro Ávila',
		username: '@alejandroamesty',
	},
];

/**
 * Obtiene la posición actual del usuario y la muestra en el mapa.
 */
const printCurrentPosition = async () => {
	const coordinates = await Geolocation.getCurrentPosition();
	lat.value = coordinates.coords.latitude;
	lng.value = coordinates.coords.longitude;
};

/**
 * Renderiza el mapa cuando la vista está activa.
 */
onIonViewDidEnter(async () => {
	await printCurrentPosition();
	await getReports();
	viewEntered.value = true;
});

/**
 * Desactiva el mapa cuando la vista está inactiva.
 */
onIonViewWillLeave(() => {
	viewEntered.value = false;
});

/**
 * Muestra el modal para crear un reporte.
 */
const handleClick = (event) => {
	event.stopPropagation();
	showModal.value = true;
};

/**
 * Cierra el modal.
 */
const closeModal = () => {
	showModal.value = false;
};

/**
 * Calcula la altura del header al montar el componente.
 */
onIonViewWillEnter(() => {
	setTimeout(() => {
		const headerElement = document.querySelector('ion-toolbar');
		const rect = headerElement?.getBoundingClientRect();
		if (rect) {
			if (rect.height > 0) {
				headerHeight.value = rect.height;
			} else {
				headerHeight.value = 182;
			}
		}
	}, 0);
});

/**
 * Abre la cámara del dispositivo para tomar una foto.
 */
const openCamera = async () => {
	try {
		const image = await Camera.getPhoto({
			quality: 90,
			resultType: CameraResultType.DataUrl,
			source: CameraSource.Camera,
		});
		imageFile.value = image.dataUrl;
	} catch (error) {
		handleError(error);
	}
};

/**
 * Abre la galería de fotos del dispositivo.
 */
const openGallery = async () => {
	try {
		const image = await Camera.getPhoto({
			quality: 90,
			resultType: CameraResultType.DataUrl,
			source: CameraSource.Photos,
		});
		imageFile.value = image.dataUrl;
	} catch (error) {
		handleError(error);
	}
};

/**
 * Realiza una solicitud de red para obtener los reportes.
 */
const getReports = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint('reports').setParams({ x: lat.value, y: lng.value }).send();
		locations.value = data.map((report) => ({
			value: report.id,
			lat: report.x,
			lng: report.y,
			popupText: report.caption,
		}));
	} catch (error) {
		handleError(error);
	}
};

/**
 * Realiza una solicitud de red para obtener la información de un reporte.
 */
const openReport = async (id) => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`reports/${id}`).send();

		const latitude = parseFloat(data.x).toFixed(2);
		const longitude = parseFloat(data.y).toFixed(2);

		const date = new Date(data.post_date);
		const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

		const image = data.images[0];

		reportInfo.value = {
			description: data.content,
			latitude,
			longitude,
			date: formattedDate,
			name: `${data.fname} ${data.lname}`,
			username: `@${data.username.toLowerCase()}`,
			image: `${fileReaderApi}${image}`,
			icon: data.image,
		};
		report.value.showReportCard();
	} catch (error) {
		handleError(error);
	}
};

/**
 * Realiza una solicitud de red para crear un reporte.
 */
const insertReport = async () => {
	if (!lat.value || !lng.value) {
		await printCurrentPosition();
	}

	if (!reportDescription.value) return;

	const formData = new FormData();
	const imageBlob = await fetch(imageFile.value).then((res) => res.blob());
	formData.append('file', imageBlob, 'report-image.jpg');

	try {
		const { fileNames } = await fileUploaderApi.setMethod('post').send(formData);

		await api
			.setMethod('post')
			.setEndpoint('reports')
			.send({
				caption: 'REPORTE',
				content: reportDescription.value,
				coordinates: {
					x: lat.value,
					y: lng.value,
				},
				images: fileNames,
			});

		closeModal();
		await getReports();
	} catch (error) {
		handleError(error);
	}
};
</script>

<style scoped>
.leaf-map {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 110vh;
}

.content {
	display: flex;
	justify-content: center;
	overflow: hidden;
	padding: 30px;
}

.report-list {
	width: 100%;
	margin-bottom: 70px;
}

.modal-content {
	display: flex;
	flex-direction: column;
	padding: 30px;
	gap: 20px;
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

.delete-button {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 40px;
	height: 40px;
	top: 18px;
	right: 18px;
	background: #edeef0;
	border-radius: 50%;
	z-index: 1;
}

.image-preview .delete-button img {
	width: 20px;
	height: 20px;
	filter: invert(1) brightness(255%) contrast(100%) grayscale(0);
}

.image-preview {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	height: 248px;
	border-radius: 30px;
	overflow: hidden;
}

.image-preview img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
