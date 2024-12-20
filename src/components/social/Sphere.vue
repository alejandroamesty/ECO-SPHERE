<template>
	<div>
		<Doughnut :data="chartData" :options="chartOptions" />
	</div>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
	options: {
		type: Object,
		required: true,
	},
});

const { options } = toRefs(props);

const emit = defineEmits(['arcClick']);

/**
 * Calcula los datos del gráfico.
 */
const chartData = computed(() => {
	const { option1, option2, option3, option4 } = options.value;
	const total = option1 + option2 + option3 + option4;

	return {
		labels: ['Option1', 'Option2', 'Option3', 'Option4'],
		datasets: [
			{
				data: [(option1 / total) * 100, (option2 / total) * 100, (option3 / total) * 100, (option4 / total) * 100],
				backgroundColor: ['#9DDE8B', '#40A578', '#006869', '#E7F994'],
				hoverBackgroundColor: ['#9DDE8B', '#40A578', '#006869', '#E7F994'],
				borderRadius: 33,
				borderWidth: 0,
			},
		],
	};
});

/**
 * Renderiza las opciones del gráfico.
 */
const chartOptions = computed(() => ({
	responsive: true,
	plugins: {
		tooltip: {
			enabled: false,
		},
		legend: {
			display: false,
		},
	},
	cutout: '65%',
	onClick: (event, elements, chart) => {
		if (elements.length > 0) {
			const clickedElementIndex = elements[0].index;
			const label = chart.data.labels[clickedElementIndex];
			emit('arcClick', label);
		}
	},
}));
</script>
