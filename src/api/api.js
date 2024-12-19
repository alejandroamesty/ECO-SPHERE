import Communication from "../services/Communication.js";
import { useGlobalStore } from "../stores/globalStore.js";

const globalStore = useGlobalStore();

export const api = new Communication({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	fetchOptions: {
		mode: "cors",
		credentials: "include",
	},
	token: globalStore.token,
});
