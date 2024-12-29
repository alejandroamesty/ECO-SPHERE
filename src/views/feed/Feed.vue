<template>
	<ion-page>
		<Header>
			<template #header-layout>
				<div class="header-layout">
					<span class="title-1">eco<span class="title-2">sphere</span></span>
					<div class="buttons">
						<RoundButton :icon="SEARCH" :size="40" :onClick="handleSearch" />
					</div>
				</div>
				<ToggleButton v-model="toggleValue" leftLabel="Descubre" rightLabel="Siguiendo" />
			</template>
		</Header>
		<ion-content>
			<Slider :currentIndex="toggleValue" @update:currentIndex="toggleValue = $event">
				<template #slide1>
					<div class="discover">
						<PostList :posts="popularPosts" :clicked="openPost" />
					</div>
				</template>
				<template #slide2>
					<div class="following">
						<PostList :posts="followingPosts" />
					</div>
				</template>
			</Slider>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, onIonViewWillEnter } from '@ionic/vue';
import { SEARCH } from '../../utils/icons';
import { Header, RoundButton, ToggleButton, PostList, Slider } from '../../components/index';
import { api, fileReaderApi } from '../../api/api';
import { handleError } from '../../services/errorHandler';

const toggleValue = ref(false);
const router = useRouter();

const popularPosts = ref([]);
const followingPosts = ref([]);
const page = ref(1);

/**
 * Navega a la vista de búsqueda.
 */
const handleSearch = () => {
	router.push('/tabs/feed/search');
};

/**
 * Abre la publicación.
 */
const openPost = (id) => {
	router.push({ path: '/post', query: id });
};

/**
 * Recorre los datos de las publicaciones y los procesa.
 */
const processPosts = (data) => {
	return data
		.filter((post) => post.caption !== 'REPORTE')
		.map((post) => {
			const images = post.images && post.images.every((image) => image === null) ? [] : post.images.map((image) => (image ? `${fileReaderApi}${image}` : ''));

			const postData = {
				value: post.id,
				content: post.caption,
				icon: post.image,
				name: `${post.fname} ${post.lname}`,
				username: `@${post.username.toLowerCase()}`,
				likes: post.likes,
				comments: post.comments,
				liked: false,
			};

			if (images.length > 0) {
				postData.images = images;
			}

			return postData;
		});
};

/**
 * Realiza una solicitud de red para obtener las publicaciones populares.
 */
const getPopularPosts = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`posts/popular?page=${page.value}`).send();
		popularPosts.value = processPosts(data);
	} catch (error) {
		handleError(error);
	}
};

/**
 * Realiza una solicitud de red para obtener las publicaciones de los seguidos.
 */
const getFollowingPosts = async () => {
	try {
		const { data } = await api.setMethod('get').setEndpoint(`posts/following?page=${page.value}`).send();
		followingPosts.value = processPosts(data);
	} catch (error) {
		handleError(error);
	}
};

onIonViewWillEnter(() => {
	getPopularPosts();
	getFollowingPosts();
});
</script>

<style scoped>
.discover,
.following {
	padding: 30px;
	width: 100%;
}

.title-2 {
	font-family: 'BR Omny Regular';
}
</style>
