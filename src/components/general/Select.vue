<template>
	<div class="custom-select" :tabindex="tabindex" @blur="open = false">
		<div class="selected" :class="{ border: open }" @click="open = !open">
			{{ selected.label }}
			<div class="dropdown" :class="{ open: open }">
				<img :src="ARROW_LEFT" alt="" />
			</div>
		</div>
		<div class="items" :class="{ open: open }" :style="{ height: open ? `${options.length * 55}px` : '0px' }">
			<div v-for="(option, i) of options" :key="i" @click="selectOption(option)">
				{{ option.label }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { ARROW_LEFT } from '../../utils/icons';

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

onMounted(() => {
	console.log(props.options);
	console.log(props.modelValue);
	if (!props.modelValue && props.options.length > 0) {
		selected.value = props.options[0];
	}
});

watch(
	() => props.options,
	(newOptions) => {
		if (!props.modelValue && newOptions.length > 0) {
			selected.value = newOptions[0];
		}
	},
);

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

.custom-select .selected .dropdown {
	display: flex;
	justify-content: center;
	align-items: center;
}

.custom-select .selected.border {
	border-radius: 32px;
}

.custom-select .selected img {
	width: 16px;
	height: 16px;
	transform: rotate(-90deg);
	transition: transform 0.3s;
	filter: invert(1) brightness(255%) contrast(40%) grayscale(0);
}

.custom-select .selected.open img {
	transform: rotate(90deg);
}

.custom-select .items {
	color: #292b2e;
	border-radius: 32px;
	overflow: hidden;
	position: relative;
	width: 100%;
	background-color: #edeef0;
	top: 10px;
	left: 0;
	z-index: 1;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
	/* box-shadow:
		-5px 5px 10px rgba(213, 214, 216, 0.2),
		5px -5px 10px rgba(213, 214, 216, 0.2),
		-5px -5px 10px rgba(255, 255, 255, 0.9),
		5px 5px 13px rgba(213, 214, 216, 0.9),
		inset 1px 1px 2px rgba(255, 255, 255, 0.3),
		inset -1px -1px 2px rgba(213, 214, 216, 0.5); */
	height: 0;
	overflow-y: auto;
	transition: height 0.3s ease-in-out;
}

.custom-select .items div {
	color: #292b2e;
	padding-left: 17px;
	padding-right: 17px;
	cursor: pointer;
	user-select: none;
	height: 55px;
	display: flex;
	align-items: center;
	font-family: 'Stolzl Regular';
	font-size: 13px;
}

.custom-select .items div:hover {
	background-color: #d5d6d850;
}
</style>
