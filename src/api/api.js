import Communication from '../services/Communication.js';
import { useGlobalStore } from '../stores/globalStore.js';

const globalStore = useGlobalStore();

/**
 * Determina si la aplicación se está ejecutando en localhost.
 */
const isLocalhost = window.location.hostname === 'localhost';
const backendHost = isLocalhost ? import.meta.env.VITE_API_LOCAL_URL : import.meta.env.VITE_API_BASE_URL;

/**
 * Inicializa una instancia de Communication con los valores de configuración.
 * @param {*} baseURL - URL base de la API.
 * @returns
 */
const createInstance = (baseURL) => {
	return new Communication({
		baseURL,
		fetchOptions: {
			mode: 'cors',
			credentials: 'include',
		},
		token: globalStore.token,
	});
};

export const api = createInstance(`${backendHost}`);
export const authApi = createInstance(`${backendHost}auth/`);
