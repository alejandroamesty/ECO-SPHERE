<template>
	<div class="post-list-container">
		<Post
			v-for="(post, index) in posts"
			:key="index"
			:value="post.value"
			:content="post.content"
			:icon="post.icon"
			:name="post.name"
			:username="post.username"
			:likes="post.likes"
			:comments="post.comments"
			:liked="post.liked"
			:images="post.images"
			@update:liked="(value) => handleLikedChange(index, value)"
			:onClick="handlePostClick"
		/>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';
import Post from '../social/Post.vue';

const props = defineProps({
	posts: {
		type: Array,
		required: true,
	},
	clicked: {
		type: Function,
		default: () => {},
	},
});

const { posts, clicked } = toRefs(props);

function handleLikedChange(index, value) {
	posts.value[index].liked = value;
}

function handlePostClick(event) {
	clicked.value(event);
}
</script>

<style scoped>
.post-list-container {
	display: flex;
	flex-direction: column;
	gap: 22px;
	margin-bottom: 70px;
}
</style>
