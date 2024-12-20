<template>
	<div class="report-list-container">
		<ReportCard
			v-for="(report, index) in reports"
			:key="index"
			:image="report.image"
			:description="report.description"
			:latitude="report.latitude"
			:longitude="report.longitude"
			:date="report.date"
			:icon="report.icon"
			:name="report.name"
			:username="report.username"
			:isModal="false"
		/>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';
import { ReportCard } from '..';

const props = defineProps({
	reports: {
		type: Array,
		required: true,
	},
});

const { reports } = toRefs(props);
</script>

<style scoped>
.report-list-container {
	display: flex;
	flex-direction: column;
	gap: 30px;
}
</style>
