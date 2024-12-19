<template>
    <div class="post-list-container">
        <Post v-for="(post, index) in posts" :key="index" :content="post.content" :icon="post.icon" :name="post.name"
            :username="post.username" :liked="post.liked" @update:liked="(value) => handleLikedChange(index, value)" />
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
});

const { posts } = toRefs(props);

function handleLikedChange(index, value) {
    posts.value[index].liked = value;
}
</script>

<style scoped>
.post-list-container {
    display: flex;
    flex-direction: column;
    gap: 22px;
}
</style>
