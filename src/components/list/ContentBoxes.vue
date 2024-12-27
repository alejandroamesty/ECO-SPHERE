<template>
	<div class="post-content">
		<div class="boxes-container">
			<ContentBox v-for="(box, index) in boxes" :key="index" :order="box.order" v-model="boxes[index].content" @update:modelValue="updateBoxContent(index, $event)" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import ContentBox from '../button/ContentBox.vue';

const props = defineProps({
	modelValue: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(['update:modelValue']);

const boxes = ref(props.modelValue);

const updateBoxContent = (index, content) => {
	boxes.value[index].content = content;
	emit('update:modelValue', [...boxes.value]);
};
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
