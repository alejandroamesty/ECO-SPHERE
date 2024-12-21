<template>
	<div class="profile-list-container">
		<Profile v-for="(profile, index) in profiles" :key="index" :id="profile.id" :icon="profile.icon" :name="profile.name" :username="profile.username" :type="profile.type" @select-profile="handleProfileSelect" />
	</div>
</template>

<script setup>
import { Profile } from '..';

const props = defineProps({
	profiles: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(['profile-selected']);

/**
 * Emite un evento con el perfil seleccionado del listado.
 * @param profile - Datos del perfil seleccionado.
 */
const handleProfileSelect = (profile) => {
	emit('profile-selected', profile);
};
</script>

<style scoped>
.profile-list-container {
	display: flex;
	flex-direction: column;
	gap: 25px;
	z-index: 9999;
}
</style>
