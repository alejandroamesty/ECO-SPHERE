import { toastController } from '@ionic/vue';
import { alertCircle } from 'ionicons/icons';

/**
 * Muestra un nensaje de tipo toast en pantalla.
 * @param {*} message - Mensaje a mostrar.
 * @param {*} options - Opciones del toast.
 */
const presentToast = async (message, options = {}) => {
	const { duration = 3000, position = 'bottom', color = '', cssClass = '' } = options;

	const toast = await toastController.create({
		message,
		duration,
		position,
		color,
		cssClass,
		icon: alertCircle,
		swipeGesture: 'vertical',
	});

	await toast.present();
};

export const showInfoMessage = async (message, options = {}) => {
	await presentToast(message, { cssClass: 'primary', ...options });
};

export const showErrorMessage = async (message, options = {}) => {
	await presentToast(message, { cssClass: 'danger', ...options });
};

export const showSuccessMessage = async (message, options = {}) => {
	await presentToast(message, { cssClass: 'success', ...options });
};

export const showWarnMessage = async (message, options = {}) => {
	await presentToast(message, { cssClass: 'warning', ...options });
};
