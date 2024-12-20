<template>
	<div class="profile-list-container">
		<Profile v-for="(profile, index) in profiles" :key="index" :icon="profile.icon" :name="profile.name" :username="profile.username" :checked="profile.checked" @update:checked="(value) => handleCheckedChange(index, value)" />
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

const emit = defineEmits(['update:profiles']);

/**
 * Maneja el cambio de la propiedad checked de un perfil.
 * @param index - Índice del perfil en el array de perfiles.
 * @param value - Nuevo valor de la propiedad checked.
 */
const handleCheckedChange = (index, value) => {
	const updatedProfiles = [...props.profiles];
	updatedProfiles[index].checked = value;
	emit('update:profiles', updatedProfiles);
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
