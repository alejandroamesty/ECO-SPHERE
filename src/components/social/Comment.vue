<template>
	<div class="comment-container">
		<div class="user-container">
			<img class="user-icon" :src="icon" alt="User Icon" />
			<div class="comment-content">
				<div class="user-info">
					<div class="name">{{ name }}</div>
					<div class="username">{{ username }}</div>
				</div>
				<div class="comment">{{ comment }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
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
	comment: {
		type: String,
		required: true,
	},
});

// const emit = defineEmits(['select-profile']);

const { icon, name, username, comment } = toRefs(props);
</script>

<style scoped>
.comment-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: start;
	background: #edeef0;
	/* height: 96px; */
	padding: 20px;
	border-radius: 30px;
}

.user-container {
	display: flex;
	align-items: flex-start;
	gap: 13px;
}

.comment-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
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
	/* gap: 5px; */
}

.name {
	display: flex;
	flex-direction: row;
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
	width: 129px;
	height: 16px;
	font-family: 'Stolzl Regular';
	font-size: 11px;
	color: #949799;
}

.comment {
	display: flex;
	align-items: center;
	width: 100%;
	/* height: 16px; */
	font-family: 'Stolzl Regular';
	font-size: 12px;
	color: #292b2e;
}
</style>
