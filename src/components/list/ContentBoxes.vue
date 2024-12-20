<template>
	<div class="post-content">
		<div class="boxes-container">
			<ContentBox v-for="(box, index) in boxes" :key="index" :order="box.order" :content="box.content" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import ContentBox from '../button/ContentBox.vue';

const boxes = ref([{ order: 1 }, { order: 2 }, { order: 3 }, { order: 4 }, { order: 5 }, { order: 6 }]);
</script>

<style scoped>
.post-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.boxes-container {
	display: grid;
	grid-template-columns: repeat(3, 99px);
	gap: 20px;
}
</style>
