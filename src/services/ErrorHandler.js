import { showErrorMessage, showInfoMessage } from './ToastService';

/**
 * Maneja los errores de la aplicación.
 * @param {*} error - Mensaje de error.
 */
export const handleError = (error) => {
	let message = 'Ocurrió un error';

	if (error.response?.data?.msg) {
		message = error.response.data.msg;
	} else if (error instanceof Error) {
		message = error.message;
	}

	if (error.response?.status === 404) {
		showInfoMessage(message);
	} else {
		showErrorMessage(message);
	}
};
