<template>
	<div class="graphic-bar-container">
		<canvas ref="chartCanvas"></canvas>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

const props = defineProps({
	months: {
		type: Object,
		required: true,
		default: () => ({}),
	},
});

const chartCanvas = ref(null);
let chartInstance = null;

/**
 * Crea el gráfico de barras.
 */
const createChart = () => {
	if (chartInstance) {
		chartInstance.destroy();
	}

	const monthNames = Object.keys(props.months).map((month) => month.charAt(0).toUpperCase() + month.slice(1));
	const monthValues = Object.values(props.months);
	const maxValue = Math.max(...monthValues);

	const data = {
		labels: monthNames,
		datasets: [
			{
				data: monthValues,
				backgroundColor: '#9DDE8B',
				hoverBackgroundColor: '#9DDE8B',
				borderWidth: 0,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {
						size: 12,
						family: 'Stolzl Regular, sans-serif',
					},
					color: '#292B2E',
				},
			},
			y: {
				beginAtZero: true,
				max: maxValue,
				grid: {
					display: false,
				},
				ticks: {
					font: {
						size: 12,
						family: 'Stolzl Regular, sans-serif',
					},
					color: '#A0A0A0',
				},
			},
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
			legend: {
				display: false,
			},
		},
		elements: {
			bar: {
				borderRadius: 5,
			},
		},
	};

	chartInstance = new Chart(chartCanvas.value, {
		type: 'bar',
		data,
		options,
	});
};

/**
 * Actualiza el gráfico de barras cuando cambian los meses.
 */
watch(
	() => props.months,
	() => {
		createChart();
	},
	{ deep: true, immediate: true },
);

onMounted(() => {
	createChart();
});
</script>

<style scoped>
.graphic-bar-container {
	width: 100%;
	height: 300px;
	position: relative;
}
</style>
