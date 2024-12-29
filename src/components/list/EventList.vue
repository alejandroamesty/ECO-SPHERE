<template>
	<div class="event-list">
		<EventCard
			v-for="(event, index) in options"
			:key="index"
			:description="event.description"
			:latitude="event.latitude"
			:longitude="event.longitude"
			:date="event.date"
			:icon="event.icon"
			:name="event.name"
			:username="event.username"
			:neumorphism="event.neumorphism || true"
		/>
	</div>
</template>

<script setup>
import EventCard from '../social/EventCard.vue';

const props = defineProps({
	options: {
		type: Array,
		required: true,
		default: () => [],
	},
});
</script>

<style scoped>
.event-list {
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
	align-items: center;
}
</style>
