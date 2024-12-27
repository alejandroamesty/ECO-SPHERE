import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
	'auth',
	() => {
		const token = ref(null);
		const user = ref(null);

		const setToken = (newToken) => {
			token.value = newToken;
		};

		const isAuthenticated = () => {
			if (!token.value) {
				return false;
			}

			const decoded = jwtDecode(token.value);
			const now = Date.now() / 1000;

			return decoded.exp > now;
		};

		const setUser = (newUser) => {
			user.value = newUser;
		};

		const $reset = () => {
			token.value = null;
			user.value = null;
		};

		return {
			token,
			setToken,
			isAuthenticated,
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
