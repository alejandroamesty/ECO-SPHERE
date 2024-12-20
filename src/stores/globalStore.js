import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
	'auth',
	() => {
		const token = ref(null);
		const user = ref(null);

		const setToken = (newToken) => {
			token.value = newToken;
		};

		const setUser = (newUser) => {
			user.value = newUser;
		};

		const $reset = () => {
			token.value = null;
		};

		return {
			token,
			setToken,
			user,
			setUser,
			$reset,
		};
	},
	{
		persist: {
			enabled: true,
			strategies: [
				{
					key: 'auth',
					storage: localStorage,
					paths: ['token', 'user'],
				},
			],
		},
	},
);
