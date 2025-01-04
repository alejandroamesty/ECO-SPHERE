<template>
	<div class="text-input-container" :class="{ neumorphism: neumorphism, paragraph: paragraph }" :style="{ height: height }">
		<template v-if="paragraph">
			<textarea class="text-input paragraph" :placeholder="placeholder" v-model="value" @input="handleInput"></textarea>
		</template>
		<template v-else>
			<input type="text" class="text-input" :placeholder="placeholder" v-model="value" @input="handleInput" />
		</template>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: 'Ingrese texto...',
	},
	neumorphism: {
		type: Boolean,
		default: true,
	},
	paragraph: {
		type: Boolean,
		default: false,
	},
	height: {
		type: String,
		default: '55px',
	},
});

const emit = defineEmits(['update:modelValue']);
const value = ref(props.modelValue);

watch(value, (newValue) => {
	emit('update:modelValue', newValue);
});

const handleInput = (event) => {
	value.value = event.target.value;
};
</script>

<style scoped>
.text-input-container {
	display: flex;
	align-items: center;
	width: 333px;
	height: 55px;
	padding: 0 17px;
	border-radius: 100px;
	background: #edeef0;
}

.text-input-container.neumorphism {
	background: #ebebeb;
	box-shadow:
		-5px 5px 10px 0px rgba(212, 212, 212, 0.2) inset,
		5px -5px 10px 0px rgba(212, 212, 212, 0.2) inset,
		-5px -5px 10px 0px rgba(255, 255, 255, 0.9) inset,
		5px 5px 13px 0px rgba(212, 212, 212, 0.9) inset;
}

.text-input-container.paragraph {
	align-items: flex-start;
	border-radius: 30px;
	height: 108px;
	padding: 17px;
}

.text-input {
	width: 100%;
	font-family: 'Stolzl Regular';
	font-size: 13px;
	color: #292b2e;
	background: none;
	border: none;
	outline: none;
	resize: none;
}

.text-input.paragraph {
	height: 100%;
}

.text-input::placeholder {
	color: rgba(41, 43, 46, 0.5);
}
</style>
