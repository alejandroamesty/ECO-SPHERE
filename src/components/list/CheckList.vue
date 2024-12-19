<template>
	<div class="checklist-container">
		<div v-for="(group, letter) in sortedGroupedOptions" :key="letter" class="letter-group">
			<div class="letter">{{ letter }}</div>
			<div
				v-for="option in group"
				:key="option.value"
				class="option-container"
				@click="toggleCheck(option)"
			>
				<div class="option-text">{{ option.option }}</div>
				<div class="icon-container">
					<div v-if="option.checked" class="icon checked">
						<img :src="CIRCLE_CHECK" alt="Checked" />
					</div>
					<div v-else class="icon unchecked"></div>
				</div>
			</div>
			<div class="separator"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, watchEffect, computed } from "vue";
import { CIRCLE_CHECK } from "../../utils/icons";

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(["update:checkedOptions"]);

const options = ref([...props.options]);

const groupedOptions = ref({});

/**
 * Agrupa las opciones por la primera letra de la opción.
 */
watchEffect(() => {
	const groups = {};
	options.value.forEach((option) => {
		const letter = option.option.charAt(0).toUpperCase();
		if (!groups[letter]) {
			groups[letter] = [];
		}
		groups[letter].push(option);
	});

	Object.keys(groups).forEach((letter) => {
		groups[letter].sort((a, b) => a.option.localeCompare(b.option));
	});

	groupedOptions.value = groups;
});

/**
 * Ordena las opciones agrupadas por letra.
 */
const sortedGroupedOptions = computed(() => {
	return Object.keys(groupedOptions.value)
		.sort()
		.reduce((acc, letter) => {
			acc[letter] = groupedOptions.value[letter];
			return acc;
		}, {});
});

/**
 * Cambia el estado de la opción.
 * @param {Object} option
 */
const toggleCheck = (option) => {
	option.checked = !option.checked;
	emit("update:checkedOptions", getCheckedOptions());
};

/**
 * Retorna las opciones seleccionadas.
 */
const getCheckedOptions = () => {
	return options.value.filter((option) => option.checked);
};
</script>

<style scoped>
.checklist-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 12px;
}

.letter-group {
	display: flex;
	flex-direction: column;
}

.letter {
	font-family: "Stolzl Regular", sans-serif;
	font-size: 14px;
	color: #7d7d7d;
	margin-bottom: 8px;
}

.option-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 6px 0;
}

.option-text {
	font-family: "Stolzl Regular", sans-serif;
	font-size: 14px;
	color: #000000;
	flex-grow: 1;
}

.icon-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20px;
	height: 20px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.icon {
	border-radius: 50%;
}

.icon.unchecked {
	width: 16px;
	height: 16px;
	background: #ffffff;
	border: 1px solid #d9d9d9;
}

.separator {
	border: 0.5px solid #747474;
	margin-top: 8px;
}
</style>
