import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore(
	"auth",
	() => {
		const token = ref(null);

		const setToken = (token) => {
			token.value = token;
		};

		const $reset = () => {
			token.value = null;
		};

		return {
			token,
			setToken,
			$reset,
		};
	},
	{
		persist: {
			enabled: true,
			strategies: [
				{
					key: "auth",
					storage: localStorage,
					paths: ["token"],
				},
			],
		},
	}
);
