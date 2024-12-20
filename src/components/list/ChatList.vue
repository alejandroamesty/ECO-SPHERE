<template>
	<div class="chat-list">
		<div class="chat-item" v-for="chat in chats" :key="chat.id" @click="selectChat(chat)">
			<img :src="chat.image" alt="Chat Avatar" class="chat-image" />
			<div class="chat-info">
				<div class="chat-name">{{ chat.name }}</div>
				<div class="chat-latest">{{ chat.latest }}</div>
			</div>
			<div class="chat-time">{{ chat.time }}</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	chats: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(['chatClick']);

const selectChat = (chat) => {
	emit('chatClick', chat);
};
</script>

<style scoped>
.chat-list {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 12px;
}

.chat-item {
	display: flex;
	align-items: center;
	width: 100%;
	height: 74px;
	background: #f6f6f6;
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
		-1px -1px 2px rgba(230, 230, 230, 0.5),
		inset -5px 5px 10px rgba(230, 230, 230, 0.2),
		inset 5px -5px 10px rgba(230, 230, 230, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9),
		inset 5px 5px 13px rgba(230, 230, 230, 0.9);
	border-radius: 36px;
	padding: 0 14px;
	cursor: pointer;
}

.chat-image {
	width: 48px;
	height: 48px;
	border-radius: 50%;
}

.chat-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	flex: 1;
	margin-left: 14px;
}

.chat-name {
	font-family: 'Stolzl Regular';
	font-size: 14px;
	color: #292b2e;
	margin-bottom: 5px;
}

.chat-latest {
	font-family: 'Stolzl Regular';
	font-size: 12px;
	color: #80898d;
}

.chat-time {
	display: flex;
	justify-content: flex-end;
	height: 100%;
	padding: 15px 5px;
	font-family: 'Stolzl Regular';
	font-size: 12px;
	text-align: right;
	color: #80898d;
}
</style>
