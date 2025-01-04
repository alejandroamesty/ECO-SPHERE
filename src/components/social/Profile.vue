<template>
	<div class="profile-container" @click="handleClick">
		<div class="user-container">
			<img class="user-icon" :src="icon" alt="User Icon" />
			<div class="user-info">
				<div class="name">{{ name }}</div>
				<div class="username">{{ username }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['select-profile']);

const { id, icon, name, username, type } = toRefs(props);

/**
 * Emite un evento con los datos del perfil seleccionado.
 */
const handleClick = () => {
	emit('select-profile', { id: id.value, icon: icon.value, name: name.value, username: username.value, type: type.value });
};
</script>

<style scoped>
.profile-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.user-container {
	display: flex;
	align-items: center;
	gap: 13px;
}

.user-icon {
	width: 40px;
	height: 40px;
	border-radius: 100%;
}

.user-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

.name {
	display: flex;
	align-items: center;
	/* width: 114px; */
	height: 16px;
	top: 0;
	font-family: 'Stolzl Medium';
	font-size: 14px;
	color: #292b2e;
}

.username {
	display: flex;
	align-items: center;
	/* width: 129px; */
	height: 16px;
	font-family: 'Stolzl Regular';
	font-size: 11px;
	color: #949799;
}
</style>
