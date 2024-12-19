<template>
	<div class="category-boxes-container">
		<div
			class="category-box"
			v-for="category in options"
			:key="category.value"
			@click="handleClick(category)"
		>
			<div class="icon-container">
				<img :src="category.icon" alt="Icon" class="icon" />
			</div>
			<div class="info">
				<div class="option-text">{{ category.option }}</div>
				<div class="description-text">{{ category.description }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	options: {
		type: Array,
		required: true,
		default: () => [],
	},
});

const emit = defineEmits(["selected"]);

const handleClick = (category) => {
	emit("selected", category);
};
</script>

<style scoped>
.category-boxes-container {
	display: grid;
	justify-content: center;
	align-items: center;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
}

.category-box {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 155px;
	height: 153px;
	background: #edeef0;
	border-radius: 30px;
	padding: 25px;
	cursor: pointer; 
}

.icon-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 44px;
	height: 44px;
	background: #9dde8b;
	border-radius: 100px;
}

.icon {
	width: 22px;
	height: 22px;
}

.info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
}

.option-text {
	display: flex;
	align-items: center;
	color: #292b2e;
	text-align: center;
	width: 109px;
	font-family: "Stolzl Regular", sans-serif;
	font-size: 14px;
}

.description-text {
	display: flex;
	align-items: center;
	width: 109px;
	font-family: "Stolzl Regular", sans-serif;
	font-size: 12px;
	color: #949799;
	text-align: left;
}
</style>
