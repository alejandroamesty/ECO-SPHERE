<template>
	<div class="container">
		<div class="content">
			<div class="name">Hola {{ name }},</div>
			<div class="description">{{ description }}</div>
		</div>
		<div class="graphic">
			<canvas ref="chartRef"></canvas>
			<div class="percentage">{{ percentage }}%</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
	name: {
		type: String,
		required: true,
		default: "usuario",
	},
	value: {
		type: Number,
		required: true,
	},
	actualValue: {
		type: Number,
		required: true,
	},
});

const description = ref("");
const percentage = ref("");
const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
	renderChart();
});

/**
 * Actualiza el gráfico cuando cambia alguna de las propiedades.
 */
watch([() => props.value, () => props.actualValue], () => {
	if (chartInstance) {
		chartInstance.destroy();
	}
	renderChart();
});

/**
 * Renderiza el gráfico circular.
 */
const renderChart = () => {
	const progress = Math.min((props.actualValue / props.value) * 100, 100);
	percentage.value = progress.toFixed(0);

	if (progress < 30) {
		description.value = "¡Es hora de empezar! Aún tienes mucho por hacer.";
	} else if (progress < 50) {
		description.value = "Vas por buen camino, sigue así.";
	} else if (progress < 80) {
		description.value = "Recuerda completar tus actividades del mes.";
	} else if (progress < 100) {
		description.value = "¡Casi lo logras! Un último esfuerzo.";
	} else {
		description.value = "¡Felicidades! Has completado tus actividades.";
	}

	const data = {
		datasets: [
			{
				data: [progress, 100 - progress],
				backgroundColor: ["#9DDE8B", "#9DDE8B50"],
				borderWidth: 0,
				borderRadius: 33,
				cutout: "85%",
			},
		],
	};

	chartInstance = new ChartJS(chartRef.value, {
		type: "doughnut",
		data,
		options: {
			plugins: {
				tooltip: { enabled: false },
				legend: { display: false },
			},
			maintainAspectRatio: false,
			responsive: true,
		},
	});
};
</script>

<style scoped>
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 94px;
	background: #edeef0;
	border-radius: 30px;
	padding: 25px;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 2px;
}

.name {
	display: flex;
	align-items: center;
	width: 215px;
	font-family: "Stolzl Medium";
	font-size: 16px;
	color: #40a578;
}

.description {
	display: flex;
	align-items: center;
	width: 215px;
	font-family: "Stolzl Regular";
	font-size: 13px;
	color: #a0a0a0;
}

.graphic {
	position: relative;
	width: 58px;
	height: 58px;
}

.percentage {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: "Stolzl Regular";
	font-size: 13px;
	color: #a0a0a0;
}
</style>
