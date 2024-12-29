<template>
	<div class="custom-select" :tabindex="tabindex" @blur="open = false">
		<div class="selected" :class="{ open: open }" @click="open = !open">
			{{ selected.label }}
		</div>
		<div class="items" :class="{ selectHide: !open }">
			<div v-for="(option, i) of options" :key="i" @click="selectOption(option)">
				{{ option.label }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	modelValue: {
		type: [Object, String, Number],
		required: true,
	},
	tabindex: {
		type: Number,
		required: false,
		default: 0,
	},
});

const emit = defineEmits(['update:modelValue', 'change']);

const selected = ref(props.modelValue || (props.options.length > 0 ? props.options[0] : { label: '' }));
const open = ref(false);

watch(selected, (newValue) => {
	emit('update:modelValue', newValue);
});

const selectOption = (option) => {
	selected.value = option;
	open.value = false;
	emit('change', option);
};
</script>

<style scoped>
.custom-select {
	position: relative;
	width: 100%;
	text-align: left;
	outline: none;
	height: 55px;
	line-height: 55px;
}

.custom-select .selected {
	background-color: #edeef0;
	border-radius: 100px;
	color: #292b2e;
	padding-left: 17px;
	cursor: pointer;
	user-select: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 1.5em;
	transition: all 0.2s ease;
	font-family: 'Stolzl Regular';
	font-size: 13px;
}

.custom-select .selected:after {
	position: absolute;
	content: '';
	top: 50%;
	right: 1em;
	width: 0;
	height: 0;
	border: 5px solid transparent;
	border-color: #292b2e transparent transparent transparent;
	transform: translateY(-50%);
}

.custom-select .items {
	color: #292b2e;
	border-radius: 10px;
	overflow: hidden;
	position: absolute;
	width: 100%;
	background-color: #edeef0;
	left: 0;
	z-index: 1;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
	max-height: 150px;
	overflow-y: auto;
}

.custom-select .items div {
	color: #292b2e;
	padding-left: 1em;
	padding-right: 1em;
	cursor: pointer;
	user-select: none;
	height: 40px;
	display: flex;
	align-items: center;
	font-family: 'Stolzl Regular';
	font-size: 13px;
}

.selectHide {
	display: none;
}
</style>
