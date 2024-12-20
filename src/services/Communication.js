import axios from 'axios';

class Communication {
	constructor({ baseURL = '', fetchOptions = {}, token = '' } = {}) {
		this.baseURL = baseURL;
		this.fetchOptions = fetchOptions;
		this.token = token;
		this.method = 'get';
		this.endpoint = '';
		this.params = {};
	}

	/**
	 * Actualiza el valor del nombre del método.
	 * @param {String} method
	 * @returns {Communication} Instancia de la clase.
	 */
	setMethod(method) {
		this.method = method;
		return this;
	}

	/**
	 * Actualiza el valor del nombre del endpoint.
	 * @param {String} endpoint
	 * @returns {Communication} Instancia de la clase.
	 */
	setEndpoint(endpoint) {
		this.endpoint = endpoint;
		return this;
	}

	/**
	 * Actualiza el valor de los parámetros.
	 * @param {Object} params
	 * @returns {Communication} Instancia de la clase.
	 */
	setParams(params) {
		this.params = params;
		return this;
	}

	/**
	 * Limpia los datos de la instancia.
	 */
	clear() {
		this.method = 'get';
		this.endpoint = '';
		this.params = {};
		this.fetchOptions = {};
	}

	/**
	 * Realiza una solicitud de red a la API.
	 * @param {Object} body
	 * @returns {Promise} Promesa con la respuesta de la API.
	 * @throws {Error} Error en la solicitud.
	 */
	async send(body = null) {
		const config = {
			method: this.method,
			url: `${this.baseURL}${this.endpoint}`,
			params: this.params,
			headers: {
				Authorization: `Bearer ${this.token}`,
				...this.fetchOptions.headers,
			},
			...this.fetchOptions,
			data: body,
		};
		try {
			const response = await axios(config);
			return response.data;
		} catch (error) {
			throw error;
		} finally {
			this.clear();
		}
	}
}

export default Communication;
