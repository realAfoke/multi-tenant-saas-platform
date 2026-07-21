import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const instance = applyCaseMiddleware(
	axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		withCredentials: true
	})
)


let isRefreshing = false
let failedRequest = []


const processFailedRequest = (error, token = null) => {
	failedRequest.forEach((prom) => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})
	failedRequest = []
}
instance.interceptors.response.use((resp) => (resp), async (e) => {
	const { config } = e?.response
	if (e.response.status === 401 && !config.url.includes('auth')) {
		if (config._retry) {
			return Promise.reject(e)
		}
		if (isRefreshing) {
			return new Promise((reject, resolve) => {
				failedRequest.push({ reject, resolve })
			}).then(() => {
				return instance(config)
			})
		}

		config._retry = true
		isRefreshing = true
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}auth/refresh-token/`, {}, { withCredentials: true })
			processFailedRequest()
			return instance(config)
		} catch (error) {
			if (window.location.pathname === '/login') {
				return Promise.reject(e)
			}
			window.location.href = '/login'
			return Promise.reject(e)
		} finally {
			isRefreshing = false
		}
	}

})
