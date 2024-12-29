<template>
	<ion-page>
		<Header ref="header">
			<template #header-layout>
				<div class="header-layout">
					<span class="title-1">Mapa</span>
					<div class="buttons">
						<RoundButton :icon="ADD" :size="40" :onClick="handleClick" />
					</div>
				</div>
				<ToggleButton v-model="toggleValue" leftLabel="Global" rightLabel="Lista" />
			</template>
		</Header>
		<ion-content :fullscreen="true">
			<Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event" :fullscreen="true">
				<template #slide1>
					<div class="leaf-map">
						<LeafletMap :lat="lat" :lng="lng" :zoom="zoom" :shouldInitialize="viewEntered" :reports="reportLocations" :events="eventLocations" @onPinClick="openLocation" />
					</div>
				</template>
				<template #slide2>
					<div class="content" :style="{ marginTop: headerHeight + 'px' }">
						<div class="report-list">
							<div class="section">
								<div class="title">Lista de reportes</div>
								<div class="subtitle">Administra los reportes que has creado</div>
							</div>
							<ReportList :reports="reports" />
						</div>
					</div>
				</template>
			</Slider>
		</ion-content>
		<ContextMenu ref="createMenu" :options="menuOptions" @selected="selectCreation" />
		<LocationList ref="list" :options="options" :is-modal="true" />
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
		<Modal title="Crear evento" :isOpen="showEventModal" :onClose="closeEventModal" :backButton="closeEventModal" :nextButton="insertEvent">
			<div class="modal-content">
				<span class="label">Comunidad</span>
				<Select v-model="community" :options="communities" :neumorphism="false" />
				<span class="label">Nombre</span>
				<TextInput v-model="eventName" placeholder="Ingresa un nombre" :neumorphism="false" />
				<span class="label">Descripción</span>
				<TextInput v-model="eventDescription" placeholder="Ingresa una descripción" :neumorphism="false" :paragraph="true" />
				<span class="label">Fecha</span>
				<CalendarInput v-model="eventDate" :neumorphism="false" />
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
import { Header, RoundButton, ToggleButton, LeafletMap, ContextMenu, LocationList, Slider, Modal, ReportList, TextInput, BoxButton, EventCard, Select, CalendarInput } from '../../components/index';
import { useGlobalStore } from '../../stores/globalStore';
import { api, fileUploaderApi, fileReaderApi } from '../../api/api';
import { handleError } from '../../services/errorHandler';

const store = useGlobalStore();

const lat = ref(0);
const lng = ref(0);
const zoom = ref(13);
const toggleValue = ref(false);
const viewEntered = ref(false);

const report = ref();
const reportInfo = ref({});

const headerHeight = ref(0);
const showModal = ref(false);
const showEventModal = ref(false);

const reportDescription = ref('');
const imageFile = ref(null);

const list = ref(null);
const options = ref([]);
const locations = ref([]);
const reportLocations = ref([]);
const eventLocations = ref([]);
const reports = ref([]);

const createMenu = ref(null);
const menuOptions = [
	{ label: 'Reporte', icon: ADD },
	{ label: 'Evento', icon: ADD },
];

const communities = ref([]);
const community = ref('');
const eventName = ref('');
const eventDescription = ref('');
const eventDate = ref('');

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
	await getLocations();
	await getUserReports();
	await getCommunities();
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
	if (createMenu.value.isVisible) {
		createMenu.value.hideMenu();
		return;
	}

	const rect = event.currentTarget.getBoundingClientRect();
	const menuWidth = 160;
	const x = window.innerWidth - menuWidth + 10;
	const y = rect.bottom + 10;
	createMenu.value.showMenu({ x, y });
};

/**
 * Cierra el modal.
 */
const closeModal = () => {
	showModal.value = false;
};

/**
 * Cierra el modal de eventos.
 */
const closeEventModal = () => {
	showEventModal.value = false;
};

/**
 * Filtra la búsqueda.
 */
const selectCreation = (option) => {
	if (option.label === 'Reporte') {
		showModal.value = true;
	} else if (option.label === 'Evento') {
		showEventModal.value = true;
	}
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
const getLocations = async () => {
	try {
		const [reportsResponse, eventsResponse] = await Promise.all([api.setMethod('get').setEndpoint('reports').setParams({ x: lat.value, y: lng.value, radius: 2 }).send(), api.setMethod('get').setEndpoint('events').send()]);

		const reportsData = reportsResponse.data;
		const eventsData = eventsResponse.data;

		locations.value = [...reportsData, ...eventsData];

		reportLocations.value = reportsData.map((report) => ({
			value: report.id,
			lat: report.x,
			lng: report.y,
			popupText: report.caption,
		}));

		eventLocations.value = eventsData.map((event) => ({
			value: event.id,
			lat: event.event_location.x,
			lng: event.event_location.y,
			popupText: event.name,
		}));
	} catch (error) {
		handleError(error);
	}
};

const getUserReports = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`users/${store.user.id}`).send();

		console.log(data);

		reports.value = data.posts
			.filter((post) => post.caption.toLowerCase() === 'reporte')
			.map((report) => ({
				description: report.caption,
				latitude: parseFloat(report.latitude).toFixed(2),
				longitude: parseFloat(report.longitude).toFixed(2),
				date: `${String(new Date(report.post_date).getDate()).padStart(2, '0')}/${String(new Date(report.post_date).getMonth() + 1).padStart(2, '0')}/${new Date(report.post_date).getFullYear()}`,
				icon: report.images?.[0] || null,
				name: `${data.user.fname} ${data.user.lname}`,
				username: `@${data.user.username.toLowerCase()}`,
				image: report.images?.[0] ? `${fileReaderApi}${report.images[0]}` : null,
			}));
	} catch (error) {
		handleError(error);
	}
};

const getCommunities = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint('communities').send();
		communities.value = data.map((community) => ({
			value: community.id,
			label: community.name,
		}));
	} catch (error) {
		handleError(error);
	}
};

/**
 * Realiza una solicitud de red para obtener la información de un reporte o evento.
 */
const openLocation = async (pin) => {
	options.value = [];

	const eventIds = pin.value.events;
	const reportIds = pin.value.reports;

	reportIds.forEach((reportId) => {
		const report = locations.value.find((location) => location.id === reportId);
		if (report) {
			options.value.push({
				value: report.id,
				type: 'report',
				description: report.content,
				latitude: parseFloat(report.x).toFixed(2),
				longitude: parseFloat(report.y).toFixed(2),
				date: new Date(report.post_date).toLocaleDateString(),
				name: report.fname + ' ' + report.lname,
				username: '@' + report.username,
				image: report.images ? fileReaderApi + report.images[0] : null,
			});
		}
	});

	eventIds.forEach((eventId) => {
		const event = locations.value.find((location) => location.id === eventId);
		if (event) {
			options.value.push({
				value: event.id,
				type: 'event',
				description: event.description,
				latitude: parseFloat(event.event_location.x).toFixed(2),
				longitude: parseFloat(event.event_location.y).toFixed(2),
				date: new Date(event.event_date).toLocaleDateString(),
				// name: 'Undefined',
				username: '@' + event.username,
			});
		}
	});

	list.value.showLocationList();
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
		await getLocations();
	} catch (error) {
		handleError(error);
	}
};

/**
 * Realiza una solicitud de red para crear un evento.
 */
const insertEvent = async () => {
	if (!lat.value || !lng.value) {
		await printCurrentPosition();
	}

	if (!eventName.value || !eventDescription.value || !eventDate.value) return;

	const communityId = community.value.value;

	try {
		await api
			.setMethod('post')
			.setEndpoint(`events/${communityId}`)
			.send({
				name: eventName.value,
				description: eventDescription.value,
				event_date: new Date(eventDate.value).toISOString(),
				event_location: {
					x: lat.value,
					y: lng.value,
				},
			});

		closeEventModal();
		await getLocations();
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
	padding-top: 30px;
}

.report-list {
	display: flex;
	flex-direction: column;
	gap: 30px;
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
	font-family: 'Stolzl Medium';
	font-size: 16px;
	color: #292b2e;
}

.subtitle {
	display: flex;
	align-items: center;
	width: 100%;
	font-family: 'Stolzl Regular';
	font-size: 13px;
	color: #a0a0a0;
}
</style>
