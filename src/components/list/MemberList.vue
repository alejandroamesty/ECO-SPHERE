<template>
	<div class="member-list">
		<div v-for="(members, letter) in groupedMembers" :key="letter" class="letter-section">
			<div class="alphabet-letter">{{ letter }}</div>
			<div class="members-container">
				<div v-for="member in members" :key="member.id" class="member-item">
					<img :src="member.icon" alt="icon" class="member-icon" />
					<div class="member-info">
						<div class="member-name">{{ member.name }}</div>
						<div class="member-username">{{ member.username }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
	name: 'MemberList',
	props: {
		options: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const groupedMembers = computed(() => {
			const grouped = {};
			props.options.forEach((member) => {
				const letter = member.name.charAt(0).toUpperCase();
				if (!grouped[letter]) {
					grouped[letter] = [];
				}
				grouped[letter].push(member);
			});

			for (const key in grouped) {
				grouped[key].sort((a, b) => a.name.localeCompare(b.name));
			}
			return Object.keys(grouped)
				.sort()
				.reduce((sorted, key) => {
					sorted[key] = grouped[key];
					return sorted;
				}, {});
		});

		return {
			groupedMembers,
		};
	},
});
</script>

<style scoped>
.member-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 16px;
}

.letter-section {
	width: 100%;
}

.alphabet-letter {
	width: 100%;
	height: 33px;
	font-family: 'Stolzl Medium';
	font-size: 25px;
	color: rgba(41, 43, 46, 0.5);
	margin-bottom: 8px;
}

.members-container {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.member-item {
	width: 100%;
	height: 58px;
	background: #f6f6f6;
	box-shadow:
		1px 1px 2px rgba(255, 255, 255, 0.3),
		-1px -1px 2px rgba(221, 221, 221, 0.5),
		inset -5px 5px 10px rgba(221, 221, 221, 0.2),
		inset 5px -5px 10px rgba(221, 221, 221, 0.2),
		inset -5px -5px 10px rgba(255, 255, 255, 0.9),
		inset 5px 5px 13px rgba(221, 221, 221, 0.9);
	border-radius: 20px;
	display: flex;
	align-items: center;
	padding: 10px;
}

.member-icon {
	width: 36px;
	height: 36px;
	border-radius: 50%;
	object-fit: cover;
}

.member-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2px;
	margin-left: 12px;
}

.member-name,
.member-username {
	font-family: 'Stolzl Regular';
	font-size: 12px;
	color: #292b2e;
}

.member-username {
	color: #949799;
}
</style>
